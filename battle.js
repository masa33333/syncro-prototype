console.log("USING battle.js 2026-03-11 test");
// --- Mock Data: Sentences & their specific transcripts ---
const BATTLE_ROUNDS = [
    {
        text: "I made a decision.",
        outcomes: [
            "I made a decision",
            "I made decision",
            "I made the decision"
        ]
    },
    {
    text: "Would you do me a favor?",
    outcomes: [
        "Would you do me a favor",
        "Would you do me favor",
        "Would you do me a favor please"
    ]
},
    {
        text: "It's my first time here.",
        outcomes: [
            "It's my first time here",
            "It's my time here",
            "It is my first time here"
        ]
    },
    {
        text: "How can I get to the station?",
        outcomes: [
            "How can I get to the station",
            "How can I get station",
            "How do I get to the station"
        ]
    },
    {
        text: "Could you say that again?",
        outcomes: [
            "Could you say that again",
            "Could you say that",
            "Can you say that again"
        ]
    }
];

// --- DOM Elements ---
const battleScreen = document.getElementById('battleScreen');
const youSaidText = document.getElementById('youSaidText');
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
const successOverlay = document.getElementById('successOverlay');
const successText = document.getElementById('successText');
const stageClearOverlay = document.getElementById('stageClearOverlay');
const confettiContainer = document.getElementById('confettiContainer');
let audioCtx;

// --- State ---
let currentRoundIndex = 0;
let currentOutcomeIndex = 0; // Cycles 0 -> 1 -> 2 on retry
let clearedCount = 0;
let missedQuestions = new Set();
let isStageComplete = false;
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
    youSaidText.innerText = "";
    isRecording = false;
btnRecord.classList.remove('hidden');
btnRecord.disabled = false;
btnRecord.innerText = "Start Battle";
btnStop.classList.add('hidden');
    // Reset Views
    battleScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    
    // Reset Controls
    btnRecord.classList.remove('hidden');
btnRecord.disabled = false;
btnRecord.innerText = "Start Battle";
btnRecord.classList.remove('recording-mode');
    btnRecord.classList.remove('hidden');
    btnRecord.disabled = false;
    btnRecord.disabled = false;
    recordingArea.classList.add('hidden');
    recordingArea.classList.remove('pulsing');
    statusText.innerText = "Ready";
    btnNext.innerText = "Next Round";
btnRetry.classList.remove('hidden');
isStageComplete = false;
scoreBadge.style.display = '';
youSaidText.style.display = '';
diffContainer.parentElement.style.display = '';

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
    if (isRecording) {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            btnRecord.disabled = true;
            statusText.innerText = "Transcribing...";
            mediaRecorder.stop();
        }
        return;
    }

    if (isBusy) return;
    isBusy = true;

    btnRecord.disabled = true;
    statusText.innerText = "Listening...";
    recordingArea.classList.remove('hidden');

    playRealAudio(
        () => {
            startRecording();
        },
        (error) => {
            alert(`Audio playback failed: ${error}. Please try again.`);
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
    initRound();
};
function autoStartCurrentRound() {
    isBusy = true;
    btnRecord.disabled = true;
    statusText.innerText = "Listening...";
    recordingArea.classList.remove('hidden');

    playRealAudio(
        () => {
            startRecording();
        },
        (error) => {
            alert(`Audio playback failed: ${error}. Please try again.`);
            initRound();
        }
    );
}

function showRoundCueAndStart() {
    countdownOverlay.classList.remove('hidden');
    countdownNum.textContent = `Round ${currentRoundIndex + 1}`;
    statusText.innerText = `${currentRoundIndex + 1}/${BATTLE_ROUNDS.length}`;

    setTimeout(() => {
        countdownOverlay.classList.add('hidden');
        countdownNum.textContent = "";
        statusText.innerText = "Listening...";
        autoStartCurrentRound();
    }, 900);
}

btnNext.onclick = () => {
    if (currentRoundIndex < BATTLE_ROUNDS.length - 1) {
        currentRoundIndex++;
        initRound();
        showRoundCueAndStart();
    } else {
        battleScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        diffContainer.innerHTML = '';
        scoreBadge.style.display = 'none';
        youSaidText.style.display = 'none';
        diffContainer.parentElement.style.display = 'none';

        resultTitle.innerText = "Stage Complete!";
        resultTitle.style.color = "var(--primary)";
        feedbackText.innerText = "5問おつかれさま！ New Stageで最初からもう一度できます。";

        btnRetry.classList.add('hidden');
        btnNext.classList.remove('hidden');
        btnNext.innerText = "New Stage";

        currentRoundIndex = -1;
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

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        isRecording = true;
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        // ここが大事：録音開始時に Start Battle を Stop に変える
        btnRecord.classList.remove('hidden');
        btnRecord.disabled = false;
        btnRecord.innerText = "Stop";
        btnRecord.classList.add('recording-mode');
        btnStop.classList.add('hidden');

        recordingArea.classList.remove('hidden');
        recordingArea.classList.add('pulsing');
        statusText.innerText = "Recording...";

        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            // Stop all media tracks to release the microphone
            stream.getTracks().forEach(track => track.stop());

            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

            if (userAudioUrl) {
                URL.revokeObjectURL(userAudioUrl);
            }
            userAudioUrl = URL.createObjectURL(audioBlob);

            // ここも大事：録音終了後に状態を戻す
            isRecording = false;
btnRecord.disabled = true;
btnStop.classList.add('hidden');

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

        mediaRecorder.start();
    } catch (error) {
        console.error("[MIC ERROR]", error);
        alert("Microphone access failed. Please allow microphone access and try again.");
        isRecording = false;
        isBusy = false;
        btnRecord.innerText = "Start Battle";
        btnRecord.disabled = false;
        btnStop.classList.add('hidden');
        statusText.innerText = "Ready";
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

    const spokenText = (userText || "").trim();

if (spokenText) {
    youSaidText.innerText = `You said: ${spokenText}`;
} else {
    youSaidText.innerText = "You said: (could not catch your answer)";
}

    scoreBadge.innerText = `SCORE: ${retentionScore}/20`;

    if (passed) {
        // Always play "Perfect!" first for consistency
        playSuccessSound();
        showSuccessAnimation("Perfect!", () => {
            renderResultScreenContent();

            if (currentRoundIndex >= BATTLE_ROUNDS.length - 1) {
                // Final Round: Auto-transition
                feedbackText.innerText = "正解！ステージクリア！";
                btnNext.classList.add('hidden');
                setTimeout(transitionToStageComplete, 1500);
            } else {
                // Normal Round
                btnNext.innerText = "次の問題へ";
                feedbackText.innerText = "正解！次の問題へ。";
                btnNext.classList.remove('hidden');
            }
        });
    } else {
        resultTitle.innerText = "Try Again...";
        resultTitle.style.color = "var(--danger)";
        feedbackText.innerText = "出来なかったところに集中してもう一度！";
        btnNext.classList.add('hidden');
    }
    isBusy = false;
}

function renderResultScreenContent() {
    resultTitle.innerText = "Round Clear!";
    resultTitle.style.color = "var(--primary)";
}

function transitionToStageComplete() {
    playStageClearSound();
    showStageClearAnimation();
    setupStageCompleteScreen();
}

function setupStageCompleteScreen() {
    diffContainer.innerHTML = '';
    scoreBadge.style.display = 'none';
    youSaidText.style.display = 'none';
    
    if (diffContainer && diffContainer.parentElement) {
        diffContainer.parentElement.style.display = 'none';
    }

    resultTitle.innerText = "Stage Complete!";
    resultTitle.style.color = "var(--primary)";
    feedbackText.innerText = "5問おつかれさま！ New Stageで最初からもう一度できます。";

    btnRetry.classList.add('hidden');
    btnNext.classList.remove('hidden');
    btnNext.innerText = "New Stage";

    currentRoundIndex = -1;
}

function showSuccessAnimation(text, onComplete) {
    if (!successOverlay || !successText) {
        if (onComplete) onComplete();
        return;
    }
    
    successText.innerText = text;
    successOverlay.classList.remove('hidden');
    
    setTimeout(() => {
        successOverlay.classList.add('hidden');
        if (onComplete) onComplete();
    }, 1000);
}

function showStageClearAnimation(onComplete) {
    if (!stageClearOverlay) {
        if (onComplete) onComplete();
        return;
    }

    stageClearOverlay.classList.remove('hidden');
    createConfetti();

    setTimeout(() => {
        stageClearOverlay.classList.add('hidden');
        if (onComplete) onComplete();
    }, 2500); // Display for 2.5 seconds
}

function createConfetti() {
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    const colors = ['#FFD700', '#FF4081', '#00E676', '#2979FF', '#FFFFFF'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        confetti.style.animationDelay = Math.random() * 1 + 's';
        
        // Randomize size slightly
        const size = Math.random() * 8 + 6;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        confettiContainer.appendChild(confetti);
    }
}

function playSuccessSound() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const playNote = (freq, startTime, duration, type = 'sine') => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;
    // Simple success: Do-So! (C5 - G5)
    playNote(523.25, now, 0.2, 'sine'); // C5
    playNote(783.99, now + 0.1, 0.4, 'sine'); // G5
}

function playStageClearSound() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const playNote = (freq, startTime, duration, type = 'triangle') => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;
    // Fanfare: C E G C (high)
    playNote(523.25, now, 0.2); // C5
    playNote(659.25, now + 0.15, 0.2); // E5
    playNote(783.99, now + 0.3, 0.2); // G5
    playNote(1046.50, now + 0.45, 1.0); // C6
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

        if (token.status === 'correct') {
            span.textContent = token.word;
        } else {
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
