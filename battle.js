// --- Mock Data: Sentences & their specific transcripts ---
const BATTLE_ROUNDS = [
    {
        text: "I made a decision.",
        outcomes: [
            "I made a decision",      // 0: Perfect
            "I made decision",        // 1: Missing 'a'
            "I made the decision"     // 2: Wrong 'the'
        ]
    },
    {
        text: "Excuse me.",
        outcomes: [
            "Excuse me",              // 0: Perfect
            "Excuse",                 // 1: Missing 'me'
            "Excuse you"              // 2: Wrong word
        ]
    },
    {
        text: "It's my first time here.",
        outcomes: [
            "It's my first time here", // 0: Perfect
            "It's my time here",       // 1: Missing word
            "It is my first time here" // 2: Expansion
        ]
    }
];

// --- DOM Elements ---
const battleScreen = document.getElementById('battleScreen');
const resultScreen = document.getElementById('resultScreen');
const btnRecord = document.getElementById('btnRecord');
const btnStop = document.getElementById('btnStop');
const recordingArea = document.getElementById('recordingArea');
const targetText = document.getElementById('targetText');
const statusText = document.getElementById('statusText');
const countdownOverlay = document.getElementById('countdownOverlay');
const countdownNum = document.getElementById('countdownNum');
const diffContainer = document.getElementById('diffContainer');
const scoreBadge = document.getElementById('scoreBadge');
const resultTitle = document.getElementById('resultTitle');
const feedbackText = document.getElementById('feedbackText');
const btnRetry = document.getElementById('btnRetry');
const btnNext = document.getElementById('btnNext');

// --- State ---
let currentRoundIndex = 0;
let currentOutcomeIndex = 0; // Cycles 0 -> 1 -> 2 on retry
let isBusy = false; // Prevents multiple clicks
let isRecording = false; // Tracks recording state
let mediaRecorder;
let audioChunks = [];
let userAudioUrl = null;

// --- Initialization ---
initRound();

// Warm up TTS on load to prevent first-time lag/failure
if (window.speechSynthesis) {
    const warmUp = new SpeechSynthesisUtterance("");
    warmUp.volume = 0;
    window.speechSynthesis.speak(warmUp);
}

function initRound() {
    isBusy = false;
    const roundData = BATTLE_ROUNDS[currentRoundIndex];
    targetText.innerText = roundData.text;
    
    // Reset Views
    battleScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    
    // Reset Controls
    btnRecord.classList.remove('hidden');
    btnRecord.disabled = false;
    btnRecord.disabled = false;
    recordingArea.classList.add('hidden');
    recordingArea.classList.remove('pulsing');
    statusText.innerText = "Ready";

    // Clean up previous audio object URL to prevent memory leaks
    if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
        userAudioUrl = null;
    }
    // userAudioPlayerContainer.innerHTML = ''; // This will be handled in finishRound
    
    currentOutcomeIndex = 0; 
}

async function transcribeRecordedAudio(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || 'Transcription failed');
    }

    return (data.transcript || '').trim();
}
// --- Event Listeners ---

btnRecord.onclick = () => {
    if (isBusy) return;
    isBusy = true;

    btnRecord.disabled = true;
    statusText.innerText = "Listening...";
    recordingArea.classList.remove('hidden');
    
    playRealAudio(
        () => { // onSuccess
            startCountdown(() => {
                startRecording();
            });
        },
        (error) => { // onError
            alert(`Audio playback failed: ${error}. Please try again.`);
            // Reset the round to a clean state
            initRound();
        }
    );
};

btnStop.onclick = () => {
    stopRecording();
};

btnRetry.onclick = () => {
    battleScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    btnRecord.classList.remove('hidden');
    btnRecord.disabled = false;
    recordingArea.classList.add('hidden');
    recordingArea.classList.remove('pulsing');
    statusText.innerText = "Ready";
};

btnNext.onclick = () => {
    if (currentRoundIndex < BATTLE_ROUNDS.length - 1) {
        currentRoundIndex++;
        initRound();
    } else {
        alert("All rounds completed! Restarting.");
        currentRoundIndex = 0;
        initRound();
    }
};

// --- TTS Module ---
const synth = window.speechSynthesis;

function getEnglishVoiceScore(voice) {
  const name = (voice.name || "").toLowerCase();
  const lang = (voice.lang || "").toLowerCase();

  if (name.includes("samantha")) return 100;
  if (lang.startsWith("en") && /female|samantha|victoria|karen|moira|ava|allison|susan/i.test(voice.name)) return 90;
  if (lang.startsWith("en")) return 70;
  if (voice.default) return 50;
  return 0;
}

function pickBestVoice(voices) {
  if (!voices || !voices.length) return null;

  const sorted = [...voices].sort((a, b) => getEnglishVoiceScore(b) - getEnglishVoiceScore(a));
  return sorted[0] || null;
}

function loadVoices() {
  return new Promise((resolve) => {
    let voices = synth.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }

    const handle = () => {
      voices = synth.getVoices();
      if (voices.length) {
        synth.removeEventListener("voiceschanged", handle);
        resolve(voices);
      }
    };

    synth.addEventListener("voiceschanged", handle);

    setTimeout(() => {
      synth.removeEventListener("voiceschanged", handle);
      resolve(synth.getVoices());
    }, 1500);
  });
}

async function speakText(text, { rate = 0.95, pitch = 1, volume = 1, timeoutMs = 8000 } = {}) {
  const voices = await loadVoices();

  console.log("[TTS] available voices:", voices.map(v => `${v.name} (${v.lang})`));

  const selectedVoice = pickBestVoice(voices);
  console.log("[TTS] selected voice:", selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : "none");
  console.log("[TTS] fallback used:", !selectedVoice || !selectedVoice.name.toLowerCase().includes("samantha"));

  return new Promise((resolve, reject) => {
    if (!text) {
        return reject(new Error("TTS error: No text provided."));
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = volume;

    if (selectedVoice) {
      utter.voice = selectedVoice;
      utter.lang = selectedVoice.lang || "en-US";
    } else {
      utter.lang = "en-US";
    }

    let finished = false;

    const timer = setTimeout(() => {
      if (finished) return;
      finished = true;
      synth.cancel();
      reject(new Error("TTS timeout: onend did not fire"));
    }, timeoutMs);

    utter.onend = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      resolve();
    };

    utter.onerror = (e) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      reject(new Error(`TTS error: ${e.error || "unknown"}`));
    };

    try {
      synth.cancel();
      if (synth.resume) synth.resume();
      synth.speak(utter);
    } catch (err) {
      clearTimeout(timer);
      reject(err);
    }
  });
}

// --- Core Logic ---

async function playRealAudio(onComplete, onError) {
    const text = BATTLE_ROUNDS[currentRoundIndex].text;
    console.log(`[Audio] Playing: "${text}"`);

    try {
        await speakText(text);
        if (onComplete) onComplete();
    } catch (error) {
        console.error("[Audio] Playback failed:", error.message);
        if (onError) onError(error.message);
    }
}

function startCountdown(callback) {
    countdownOverlay.classList.remove('hidden');
    let count = 3;
    
    const tick = () => {
        countdownNum.innerText = count;
        if (count > 0) {
            count--;
            setTimeout(tick, 1000);
        } else {
            countdownOverlay.classList.add('hidden');
            callback();
        }
    };
    tick();
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        isRecording = true;
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
    // Stop all media tracks to release the microphone
    stream.getTracks().forEach(track => track.stop());

    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

    if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
    }
    userAudioUrl = URL.createObjectURL(audioBlob);

    statusText.innerText = "Transcribing...";

    try {
        const userText = await transcribeRecordedAudio(audioBlob);

        console.log("[TRANSCRIPT]", userText);

        finishRound(userText);
    } catch (error) {
        console.error("[TRANSCRIBE ERROR]", error);
        alert(`Transcription failed: ${error.message}`);
        isBusy = false;
        statusText.innerText = "Ready";
    }
};

        btnRecord.classList.add('hidden');
        recordingArea.classList.add('pulsing');
        btnStop.classList.remove('hidden');
        btnStop.disabled = false;
        statusText.innerText = "Speak Now!";
        console.log("[Mic] Recording started...");
        mediaRecorder.start();

    } catch (err) {
        console.error("Microphone access denied:", err);
        alert("Microphone access is required. Please allow permission and try again.");
        initRound(); // Reset the round on error
    }
}

function stopRecording() {
    if (!isRecording || !mediaRecorder || mediaRecorder.state === 'inactive') return;
    
    btnStop.disabled = true;
    statusText.innerText = "Processing...";
    console.log("[Mic] Recording stopped.");
    mediaRecorder.stop(); // This will trigger the 'onstop' event handler
    isRecording = false;
}

function finishRound(userText) {
    battleScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const correctText = BATTLE_ROUNDS[currentRoundIndex].text;
    const diff = calculateDiff(correctText, userText);
    const retentionScore = calculateScore(diff);

    // Pass/fail is based on perfect retention only
    const passed = diff.every(token => token.status === 'correct');

    renderDiff(diff);

    scoreBadge.innerText = `SCORE: ${retentionScore}/20`;

    if (passed) {
        resultTitle.innerText = "Round Clear!";
        resultTitle.style.color = "var(--primary)";
        feedbackText.innerText = "Excellent retention! Ready for the next challenge.";
        btnNext.classList.remove('hidden');
    } else {
        resultTitle.innerText = "Try Again...";
        resultTitle.style.color = "var(--danger)";
        feedbackText.innerText = "A few gaps remain. Focus on the blanks and try again!";
        btnNext.classList.add('hidden');
    }
    isBusy = false;
}

// --- Diff Engine & Rendering ---

function calculateDiff(correctText, userText) {
    const c_tokens = tokenize(correctText);
    const u_tokens = tokenize(userText || "");
    const result = [];
    let u_idx = 0;

    for (let c_idx = 0; c_idx < c_tokens.length; c_idx++) {
        const c_word = c_tokens[c_idx];
        const c_norm = normalize(c_word);
        const u_word = u_tokens[u_idx];
        const u_norm = normalize(u_word);

        if (c_norm === u_norm) {
            result.push({ word: c_word, status: 'correct' });
            u_idx++;
        } else {
            const next_c_word = c_tokens[c_idx + 1];
            const next_c_norm = normalize(next_c_word);
            if (u_norm && u_norm === next_c_norm) {
                result.push({ word: c_word, status: 'missing' });
            } else {
                result.push({ word: c_word, status: u_word ? 'wrong' : 'missing' });
                if (u_word) {
                    u_idx++;
                }
            }
        }
    }

    const correctCount = result.filter(t => t.status === 'correct').length;

    // 完全不一致なら、正解語は見せず全部 missing 扱いにする
    if (correctCount === 0) {
        return c_tokens.map(() => ({
            word: '',
            status: 'missing'
        }));
    }

    return result;
}

function renderDiff(diff) {
    diffContainer.innerHTML = '';

    diff.forEach(token => {
        const span = document.createElement('span');
        span.className = `diff-token diff-${token.status}`;

        // correct のときだけ正解語を見せる
        if (token.status === 'correct') {
            span.textContent = token.word;
        } else {
            // wrong も missing も答えは見せず、下線だけ
            span.innerHTML = '&nbsp;';
        }

        diffContainer.appendChild(span);
    });
}

function calculateScore(diff) {
    if (!diff || diff.length === 0) return 0;
    const correctCount = diff.filter(t => t.status === 'correct').length;
    const total = diff.length;
    return Math.round((correctCount / total) * 20);
}

// --- Helper Functions ---
function tokenize(text) { return text ? text.trim().split(/\s+/) : []; }
function normalize(text) { return text ? text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() : ""; }
