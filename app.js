// --- Configuration ---
// This will be populated from sentences.json
let SENTENCES = [
    { 
        text: "Excuse me.", 
        passed: false,
        data: {
            stress: { target: "Excuse", weak: "me" },
            intonationType: 'statement_fall',
            pronunciation: {
                targets: [
                    { sound: "/ks/", label: "Excuse の x" },
                    { sound: "/juː/", label: "Excuse の u" },
                    { sound: "/z/", label: "Excuse の s" }
                ],
                issues: [
                    { text: "Excuse の /ks/ の音が少し弱く聞こえます。", penalty: 3 },
                    { text: "Excuse の母音 /juː/ が日本語の「ユー」に近くなっています。", penalty: 3 },
                    { text: "Excuse の語尾 /z/ が少し弱く、日本語的に聞こえます。", penalty: 4 }
                ]
            }
        }
    },
    { 
        text: "I'm here for sightseeing.", 
        passed: false,
        data: {
            stress: { target: "sightseeing", weak: "I'm/for" },
            intonationType: 'statement_fall',
            pronunciation: {
                targets: [
                    { sound: "/h/", label: "here の語頭" },
                    { sound: "/s/", label: "sight の語頭" },
                    { sound: "/ŋ/", label: "seeing の語尾" }
                ],
                issues: [
                    { text: "here の /h/ の息の音が少し弱く聞こえます。", penalty: 3 },
                    { text: "sight の語頭 /s/ が日本語の「サ」に近くなっています。", penalty: 3 },
                    { text: "seeing の語尾 /ŋ/ が少し弱く、日本語的に聞こえます。", penalty: 4 }
                ]
            }
        }
    },
    { 
        text: "It's my first time here.", 
        passed: false,
        data: {
            stress: { target: "first", weak: "It's/my" },
            intonationType: 'statement_fall',
            pronunciation: {
                targets: [
                    { sound: "/f/", label: "first の語頭" },
                    { sound: "/st/", label: "first の語尾" },
                    { sound: "/m/", label: "time の語尾" }
                ],
                issues: [
                    { text: "first の /f/ の音が少し弱く聞こえます。", penalty: 3 },
                    { text: "first の語尾 /st/ が少し弱く、日本語的に聞こえます。", penalty: 4 },
                    { text: "time の母音が日本語の「タイム」に近くなっています。", penalty: 3 }
                ]
            }
        }
    },
    { 
        text: "Could you help me?", 
        passed: false,
        data: {
            stress: { target: "help", weak: "you/me" },
            intonationType: 'question_rise',
            pronunciation: {
                targets: [
                    { sound: "/h/", label: "help の語頭" },
                    { sound: "/ɛ/", label: "help の母音" },
                    { sound: "/lp/", label: "help の語尾" }
                ],
                issues: [
                    { text: "help の /h/ の息の音が少し弱く聞こえます。", penalty: 3 },
                    { text: "help の母音 /ɛ/ が日本語の「エ」に近くなっています。", penalty: 3 },
                    { text: "help の語尾 /lp/ が少し弱く、日本語的に聞こえます。", penalty: 4 }
                ]
            }
        }
    },
    { 
        text: "Thank you, I appreciate it.", 
        passed: false,
        data: {
            stress: { target: "appreciate", weak: "I/it" },
            intonationType: 'statement_fall',
            pronunciation: {
                targets: [
                    { sound: "/θ/", label: "Thank の語頭" },
                    { sound: "/ʃ/", label: "appreciate の ci" },
                    { sound: "/t/", label: "it の語尾" }
                ],
                issues: [
                    { text: "Thank の /θ/ が日本語の「サ」に近くなっています。", penalty: 4 },
                    { text: "appreciate の /ʃ/ の音が少し弱く聞こえます。", penalty: 3 },
                    { text: "it の語尾 /t/ が少し弱く、日本語的に聞こえます。", penalty: 4 }
                ]
            }
        }
    }
];

const CATEGORY_TRANSLATIONS = {
    'Rhythm': 'リズム',
    'Stress': '強勢',
    'Intonation': '抑揚',
    'Flow': '流れ',
    'Pronunciation': '発音'
};

const FEEDBACK_DATA = {
    'Rhythm': {
        strengths: [
            "文全体のリズムは自然です。",
            "全体的に安定したテンポで話せています。"
        ],
        issues: [
            { text: "文の前半が少し速めでした。", penalty: 2 },
            { text: "文の前半に少し時間をかけすぎています。", penalty: 2 },
            { text: "重要な語に使う時間が少し短めです。", penalty: 3 },
            { text: "重要な語を少し長く言いすぎています。", penalty: 2 }
        ]
    },
    'Stress': {
        strengths: [
            "重要な語はしっかり立てられています。",
            "強い語と弱い語の差が自然です。"
        ],
        issues: [
            { text: "重要な語の強さが少し足りません。", penalty: 3 },
            { text: "あまり強くしなくてよい語が目立ちすぎています。", penalty: 2 },
            { text: "全体が少し平坦に聞こえます。", penalty: 4 },
            { text: "山を作る位置が少しずれています。", penalty: 3 }
        ]
    },
    'Intonation': {
        strengths: [
            "抑揚の流れは自然です。",
            "語尾の上昇は出ています。"
        ],
        question_rise: {
            strengths: [
                "語尾の上昇は出ています。",
                "疑問文らしい自然な上がり方です。"
            ],
            issues: [
                { text: "語尾の上昇があまり見られませんでした。", penalty: 4, type: 'missing' },
                { text: "語尾は上がっていますが、手本より少し弱めです。", penalty: 2, type: 'detected' },
                { text: "語尾の上がり方が少し強すぎます。", penalty: 2, type: 'detected' },
                { text: "上がり始める位置が少し早めです。", penalty: 2, type: 'detected' }
            ]
        },
        statement_fall: {
            strengths: [
                "語尾の落ち着きが自然です。",
                "文末がしっかり下がっています。"
            ],
            issues: [
                { text: "語尾が下がらず、疑問文のように聞こえます。", penalty: 3 },
                { text: "語尾の抑揚が少し不安定です。", penalty: 2 }
            ]
        },
        generic: {
            strengths: [
                "抑揚の流れは自然です。",
                "全体的に自然なイントネーションです。"
            ],
            issues: [
            { text: "全体の抑揚が少し平らに聞こえます。", penalty: 3 }
            ]
        }
    },
    'Flow': {
        strengths: [
            "全体の流れは自然です。",
            "語と語のつながりは自然です。"
        ],
        issues: [
            { text: "少しぶつ切り気味になっています。", penalty: 3 },
            { text: "単語の後で少し切れました。", penalty: 2 },
            { text: "重要な語の前で少し止まり気味でした。", penalty: 2 },
            { text: "文末が少し切れ気味に終わっています。", penalty: 2 },
            { text: "語を一語ずつ区切りすぎています。", penalty: 4 }
        ]
    },
    'Pronunciation': {
        strengths: [
            "ターゲット音がきれいに発音できています。",
            "母音がクリアで自然です。"
        ]
    }
};

// --- DOM Elements ---
const btnPlayModel = document.getElementById('btnPlayModel');
const btnRecord = document.getElementById('btnRecord');
const btnStop = document.getElementById('btnStop');
const btnRetry = document.getElementById('btnRetry');
const practiceScreen = document.getElementById('practice-screen');
const resultScreen = document.getElementById('result-screen');
const resultHeader = document.getElementById('result-header');
const passFailMessage = document.getElementById('pass-fail-message');
const resultContainer = document.querySelector('.app-container');
const tierBadge = document.getElementById('tier-badge');
const progressionStatus = document.getElementById('progression-status');
const statusText = document.getElementById('statusText');
const modelVoiceLabel = document.getElementById('modelVoiceLabel');
const radarSVG = document.getElementById('radarSVG');
const targetSentenceHeader = document.querySelector('.target-sentence');
const fullRunList = document.getElementById('fullRunList');
const scoreTotalValue = document.getElementById('scoreTotalValue');
const scoreCardsContainer = document.getElementById('scoreCardsContainer');
const detailModal = document.getElementById('detailModal');
const diffDisplay = document.getElementById('diffDisplay');
const diffPreviewContainer = document.getElementById('diffPreviewContainer');
const recognizedTextDisplay = document.getElementById('recognizedTextDisplay');
const modalTitle = document.getElementById('modalTitle');
const radarWrapper = document.getElementById('radarWrapper');
const modalFeedback = document.getElementById('modalFeedback');
const modalAdvice = document.getElementById('modalAdvice');
const modalTargetSentence = document.getElementById('modalTargetSentence');
const modalPronunciationTargets = document.getElementById('modalPronunciationTargets');
const btnModalPlayModel = document.getElementById('btnModalPlayModel');
const btnNext = document.getElementById('btnNext');
const btnModalPlayUser = document.getElementById('btnModalPlayUser');
const btnCloseModal = document.getElementById('btnCloseModal');
const levelClearOverlay = document.getElementById('levelClearOverlay');
const countdownOverlay = document.getElementById('countdownOverlay');
const levelClearTitle = document.getElementById('levelClearTitle');
const btnLevelClearNext = document.getElementById('btnLevelClearNext');
const fullRunPlaybackControls = document.getElementById('fullRunPlaybackControls');
const btnFRPlayModel = document.getElementById('btnFRPlayModel');
const btnFRPlayUser = document.getElementById('btnFRPlayUser');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const celebrationText = document.getElementById('celebrationText');
const celebrationMedal = document.getElementById('celebrationMedal');
const particlesContainer = document.getElementById('particlesContainer');
const btnLevelClearRetry = document.getElementById('btnLevelClearRetry'); // New button if needed, or reuse existing logic

// Audio State
let audioCtx;
let microphone;
let isRecording = false;
let mediaRecorder;
let speechRecognition;
let recognizedText = "";
let audioChunks = [];
let userAudioUrl = null;
let currentResults = {};
let currentSentenceIndex = 0;
let isFullRunChallenge = false;
let isBattleMode = true;

// Voice State
let selectedVoice = null;
let currentAudio = null;

// --- Initialization ---

// initVoiceSelection(); // Removed for Battle Mode MVP
loadSentences();

async function loadSentences() {
    try {
        const response = await fetch('sentences.json');
        SENTENCES = await response.json();
        console.log("Sentences loaded:", SENTENCES);
        resetUI();
    } catch (error) {
        console.error("Failed to load sentences:", error);
        statusText.innerText = "Error loading data";
        statusText.style.color = "#FF1744";
    }
}

// --- Event Listeners ---

btnPlayModel.onclick = () => {
    console.log("[UI] btnPlayModel clicked");
    playModelAudio();
};

btnRecord.onclick = async () => {
    // For this Step 1 MVP, we disable recording in Battle Mode
    console.log("[UI] 'Record' clicked (Disabled for Step 1)");
    alert("Recording is disabled in this step.");
};

btnStop.addEventListener('click', () => {
    console.log("[UI] 'Stop' clicked");
    stopRecordingProcess();
});

btnRetry.addEventListener('click', () => {
    console.log("[UI] 'Retry' clicked");
    resetUI();
});

btnNext.addEventListener('click', () => {
    console.log("[UI] 'Next' clicked");
    goToNext();
});

btnCloseModal.addEventListener('click', () => {
    detailModal.classList.add('hidden');
});

btnLevelClearNext.addEventListener('click', () => {
    startFullRun();
});

btnFRPlayModel.onclick = () => {
    console.log("[UI] btnFRPlayModel clicked");
    playModelAudio();
};

btnFRPlayUser.onclick = () => {
    console.log("[UI] Full Run 'Listen to User' clicked");
    if (userAudioUrl) {
        new Audio(userAudioUrl).play();
    }
};

// Add retry button logic for full run clear screen if we add one
// For now, we reuse the overlay but might need custom buttons for "Scene Clear"
// Let's assume btnLevelClearNext handles "Next Scene" or "Retry" based on context
// or we add a specific listener if we add a new button in HTML.

// --- Core Functions ---

function playModelAudio() {
    console.log("[Audio] playModelAudio called");

    // Battle Mode: Use fixed audio file
    if (isBattleMode) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const sentence = SENTENCES[currentSentenceIndex];
        if (sentence && sentence.audioUrl) {
            console.log(`[Audio] Playing file: ${sentence.audioUrl}`);
            currentAudio = new Audio(sentence.audioUrl);
            currentAudio.play().catch(e => console.error("Audio play error:", e));
        } else {
            console.warn("[Audio] No audioUrl found for this sentence.");
        }
        return;
    }

    // Classic SYNCRO Mode (TTS fallback)
    window.speechSynthesis.cancel();

    let textToSpeak = "";
    if (isFullRunChallenge) {
        textToSpeak = SENTENCES.map(s => s.text).join('. ');
    } else {
        if (SENTENCES[currentSentenceIndex]) {
            textToSpeak = SENTENCES[currentSentenceIndex].text;
        }
    }
    console.log(`[TTS] text: ${textToSpeak}`);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    // JIT Voice Check
    if (!selectedVoice) {
        const voices = window.speechSynthesis.getVoices();
        selectedVoice = voices.find(v => v.name.includes('Samantha')) || 
                        voices.find(v => v.name.includes('Google US English')) ||
                        voices.find(v => v.lang === 'en-US');
    }

    if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`[TTS] using voice: ${selectedVoice.name}`);
    } else {
        console.log("[TTS] using default voice");
    }
    
    window.speechSynthesis.speak(utterance);
}

function startCountdown(onComplete) {
    if (!countdownOverlay) return onComplete();
    
    countdownOverlay.classList.remove('hidden');
    let count = 3;
    
    const tick = () => {
        if (count > 0) {
            countdownOverlay.innerHTML = `<div class="countdown-number">${count}</div>`;
            count--;
            setTimeout(tick, 1000);
        } else {
            countdownOverlay.classList.add('hidden');
            onComplete();
        }
    };
    tick();
}

async function startRecordingProcess() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Request Mic Permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("[Mic] Permission granted");

        isRecording = true;
        statusText.innerText = "Recording...";
        statusText.style.color = "#FF1744"; // Red
        audioChunks = [];
        recognizedText = ""; // Reset text

        // UI Updates
        btnRecord.classList.add('hidden');
        btnStop.classList.remove('hidden');
        btnStop.disabled = false;

        // Setup MediaRecorder to capture audio
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
            console.log("[Recording] MediaRecorder stopped");
            try {
                // Create blob and url for playback
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                if (userAudioUrl) {
                    URL.revokeObjectURL(userAudioUrl); // Cleanup previous
                }
                userAudioUrl = URL.createObjectURL(audioBlob);

                // In a real app, we would process the audio blob here.
                // For this prototype, we proceed to scoring.
                calculateAndShowScores();
            } catch (e) {
                console.error("[Processing] Error in onstop:", e);
                statusText.innerText = "Error";
                statusText.style.color = "#FF1744";
                // Recover UI
                btnRecord.classList.remove('hidden');
                btnStop.classList.add('hidden');
            }
        };

        mediaRecorder.start();
        console.log("[Recording] Started");

        // --- Start Speech Recognition ---
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            speechRecognition = new SpeechRecognition();
            speechRecognition.lang = 'en-US';
            speechRecognition.continuous = false;
            speechRecognition.interimResults = false;

            speechRecognition.onresult = (event) => {
                if (event.results.length > 0) {
                    recognizedText = event.results[0][0].transcript;
                    console.log("[Recognition] Result:", recognizedText);
                }
            };

            speechRecognition.onerror = (event) => {
                console.error("[Recognition] Error:", event.error);
                // Prevent freezing on network error - keep going with empty text
                // statusText will be updated when onstop fires
            };

            speechRecognition.start();
        }

    } catch (err) {
        console.error("Mic Error:", err);
        alert("Could not access microphone. Please allow permissions.");
    }
}

function stopRecordingProcess() {
    if (!isRecording) return;

    if (isFullRunChallenge) {
        console.log("[FullRun] Stop clicked");
        // Full run specific stop logic if needed, otherwise standard flow works
    }
    
    isRecording = false;
    statusText.innerText = "Processing...";
    statusText.style.color = "#00E676"; // Green

    // Stop MediaRecorder (triggers onstop)
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }

    // Stop all audio tracks to release mic
    if (mediaRecorder && mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    
    // Stop Recognition
    if (speechRecognition) {
        speechRecognition.stop();
    }

    // UI Updates
    btnStop.disabled = true;
}

function calculateAndShowScores() {
    console.log("[Scoring] Calculating scores...");
    
    // Generate Mock Scores and Feedback
    currentResults = {};
    let totalScore = 0;

    // Prepare data for analysis
    const currentSentence = SENTENCES[currentSentenceIndex];
    if (!isFullRunChallenge && !currentSentence) {
        console.error("Error: No sentence data found for index", currentSentenceIndex);
        statusText.innerText = "Error: Data missing";
        return;
    }
    const sentenceData = (!isFullRunChallenge && currentSentence && currentSentence.data) ? currentSentence.data : {};

    if (isFullRunChallenge) {
        // Full Run Scoring
        let minScore = 21;
        let minIndex = -1;
        let maxScore = -1;
        let maxIndex = -1;

        SENTENCES.forEach((sentence, index) => {
            let sentenceScore = 0;
            Object.keys(CATEGORY_TRANSLATIONS).forEach(category => {
                 const result = analyzeCategory(category, sentence.data);
                 sentenceScore += result.score;
            });
            sentenceScore = Math.round(sentenceScore / Object.keys(CATEGORY_TRANSLATIONS).length);

            currentResults[`sentence_${index}`] = { score: sentenceScore, label: `文${index + 1}` };
            totalScore += sentenceScore;
            if (sentenceScore < minScore) { minScore = sentenceScore; minIndex = index; }
            if (sentenceScore > maxScore) { maxScore = sentenceScore; maxIndex = index; }
        });
        currentResults.summary = { minIndex, maxIndex };
        totalScore = Math.round((totalScore / SENTENCES.length / 20) * 100);
    } else {
        // Single Sentence Scoring
        Object.keys(CATEGORY_TRANSLATIONS).forEach(category => {
            const result = analyzeCategory(category, sentenceData);
            currentResults[category] = result;
            totalScore += result.score;
        });
    }

    // --- Diff Preview ---
    const userText = recognizedText || ""; 

    // --- Battle Mode Branch ---
    if (isBattleMode) {
        // 1. Calc Score from Diff (Correct Words / Total)
        const diffData = calculateDiff(currentSentence.text, userText);
        const correctCount = diffData.filter(d => d.status === 'correct').length;
        const totalWords = diffData.length;
        // Simple percentage score mapped to 20
        totalScore = Math.round((correctCount / totalWords) * 20);
        
        // 2. Hide Old Visuals
        radarWrapper.classList.add('hidden');
        scoreCardsContainer.innerHTML = ''; // Hide old cards
        fullRunPlaybackControls.classList.add('hidden');
        
        // 3. Show Diff
        renderDiffPreview(currentSentence.text, userText);
        
        // 4. Update Result Container Class
        scoreTotalValue.parentElement.classList.remove('full-run-total');
        
    } else {
        // --- Old SYNCRO Branch ---
    if (isFullRunChallenge) {
        radarWrapper.classList.add('hidden');
        fullRunPlaybackControls.classList.remove('hidden');
        renderFullRunResults(currentResults);
        scoreTotalValue.parentElement.classList.add('full-run-total');
    } else {
        radarWrapper.classList.remove('hidden');
        renderDiffPreview(currentSentence.text, userText);
        fullRunPlaybackControls.classList.add('hidden');
        const scoresForChart = Object.fromEntries(
            Object.entries(currentResults).map(([k, v]) => [k, v.score])
        );
        drawRadarChart(scoresForChart);
        renderScoreCards(currentResults);
        scoreTotalValue.parentElement.classList.remove('full-run-total');
    }
    }
    
    // --- Pass/Fail Logic ---
    const passed = totalScore >= 75;
    passFailMessage.className = ''; // Reset classes
    tierBadge.style.background = 'none';
    tierBadge.className = 'tier-badge'; // Reset badge classes
    tierBadge.style.color = 'inherit';
    tierBadge.textContent = '';
    resultContainer.classList.remove('glow-silver', 'glow-gold', 'glow-platinum');
    
    if (isFullRunChallenge && passed) {
             passFailMessage.innerHTML = 'STAGE CLEAR!<br><span style="font-size: 1rem; font-weight: normal; display: block; margin-top: 5px;">このシーンを攻略しました！</span>';
             passFailMessage.classList.add('stage-clear-message');
    }
    else if (passed) {
        if (isBattleMode) {
            // Battle Mode Success
            passFailMessage.textContent = "Round Clear!";
            tierBadge.textContent = `SCORE: ${totalScore}/20`;
            tierBadge.style.background = '#00E676';
            tierBadge.style.color = '#000';
        } else {
            const tier = getTierInfo(totalScore);
            passFailMessage.textContent = tier.celebrationText;
            tierBadge.textContent = tier.name;
            tierBadge.className = `tier-badge ${tier.badgeClass}`;
            tierBadge.style.background = tier.background;
            tierBadge.style.color = tier.color;
        }
        passFailMessage.classList.add('pass-message');
        
        if (!isFullRunChallenge) {
            SENTENCES[currentSentenceIndex].passed = true;
        }

        btnRetry.classList.remove('hidden');
        btnNext.classList.remove('hidden');

    } else { // Not passed
        let pointsNeeded = 0;
        if (isBattleMode) {
             pointsNeeded = 15 - totalScore; // 75% of 20 is 15
        } else {
             pointsNeeded = 75 - totalScore;
        }
        passFailMessage.textContent = `あと ${pointsNeeded} 点でクリア`;
        passFailMessage.classList.add('fail-message');
        btnRetry.classList.remove('hidden');
        btnNext.classList.add('hidden');
    }

    // --- Progression Logic ---
    const completedCount = SENTENCES.filter(s => s.passed).length;
    if (isFullRunChallenge) {
        if (passed && totalScore >= 75) {
            progressionStatus.textContent = ''; // Hide standard progression text on clear
            btnNext.textContent = '最初から';
        } else {
            progressionStatus.textContent = '通し読みチャレンジに失敗しました';
        }
    } else {
        progressionStatus.textContent = `進捗: ${completedCount} / ${SENTENCES.length} クリア`;
        if (completedCount === SENTENCES.length) {
            btnNext.textContent = '通し読みチャレンジへ！';
        } else {
            btnNext.textContent = '次のセリフへ進む →';
        }
    }
    
    if (isFullRunChallenge && passed) {
        // Special case to reset after full run clear
    } else if (completedCount === SENTENCES.length && !isFullRunChallenge) {
        // Ready for full run
    } else if (currentSentenceIndex >= SENTENCES.length -1 && !isFullRunChallenge) {
        btnNext.classList.add('hidden'); // No next sentence
    }


    
    if (isFullRunChallenge) {
        if (passed && totalScore >= 75) {
            progressionStatus.textContent = 'このシーンを攻略しました！';
            btnNext.textContent = '最初から';
        } else {
            progressionStatus.textContent = '通し読みチャレンジに失敗しました';
        }
    } else {
        progressionStatus.textContent = `進捗: ${completedCount} / ${SENTENCES.length} クリア`;
        if (completedCount === SENTENCES.length) {
            btnNext.textContent = '通し読みチャレンジへ！';
        } else {
            btnNext.textContent = '次のセリフへ進む →';
        }
    }
    
    if (isFullRunChallenge && passed) {
        // Special case to reset after full run clear
    } else if (completedCount === SENTENCES.length && !isFullRunChallenge) {
        // Ready for full run
    } else if (currentSentenceIndex >= SENTENCES.length -1 && !isFullRunChallenge) {
        btnNext.classList.add('hidden'); // No next sentence
    }

    // 1. Update Total
    scoreTotalValue.innerText = totalScore;
    
    // 2. Show Celebration then Result
    if (passed) {
        showCelebrationOverlay(totalScore, () => {
            showResultScreen(totalScore);
        });
    } else {
        showResultScreen(totalScore);
    }
}

function showResultScreen(totalScore) {
    practiceScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    // Diff preview is already rendered by renderDiffPreview in calculateAndShowScores

    if (isFullRunChallenge) {
        radarSVG.style.display = 'none';
        fullRunPlaybackControls.classList.remove('hidden');
        renderFullRunResults(currentResults);
        scoreTotalValue.parentElement.classList.add('full-run-total');
    } else if (isBattleMode) {
        // Battle Mode: diff preview is the main result
        radarSVG.style.display = 'none';
        fullRunPlaybackControls.classList.add('hidden');
    } else {
        radarSVG.style.display = 'block';
        fullRunPlaybackControls.classList.add('hidden');
        const scoresForChart = Object.fromEntries(
            Object.entries(currentResults).map(([k, v]) => [k, v.score])
        );
        drawRadarChart(scoresForChart);
        renderScoreCards(currentResults);
        scoreTotalValue.parentElement.classList.remove('full-run-total');
    }
}

function showCelebrationOverlay(score, callback) {
    let text = "クリア！";
    let soundType = "clear";
    let colorClass = "glow-clear";

    celebrationMedal.className = 'medal-icon hidden'; // Reset medal

    if (score >= 95) {
        text = "プラチナ達成！";
        soundType = "platinum";
        colorClass = "glow-platinum";
        celebrationMedal.className = 'medal-icon medal-platinum';
        createParticles(50, '#e5e5e5');
    } else if (score >= 90) {
        text = "金バッジ獲得！";
        soundType = "gold";
        colorClass = "glow-gold";
        celebrationMedal.className = 'medal-icon medal-gold';
        createParticles(40, '#FFD700');
    } else if (score >= 85) {
        text = "銀バッジ獲得！";
        soundType = "silver";
        colorClass = "glow-silver";
        celebrationMedal.className = 'medal-icon medal-silver';
        createParticles(30, '#C0C0C0');
    }

    celebrationText.textContent = text;
    celebrationOverlay.classList.remove('hidden');
    resultContainer.classList.add(colorClass);
    playSuccessSound(soundType);

    setTimeout(() => {
        celebrationOverlay.classList.add('hidden');
        if (callback) callback();
    }, 1200);
}

function createParticles(count, color) {
    particlesContainer.innerHTML = '';
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = '50%';
        particle.style.top = '50%';
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 200;
        particle.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
        particle.style.animationDelay = `${Math.random() * 0.2}s`;
        particlesContainer.appendChild(particle);
    }
}

function drawRadarChart(scores) {
    const svg = radarSVG;
    // Clear existing
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    const centerX = 150;
    const centerY = 150;
    const maxRadius = 100; // Increased to make chart larger
    const categories = Object.keys(scores);
    const numAxes = categories.length;
    const angleStep = (Math.PI * 2) / numAxes;
    const startAngle = -Math.PI / 2; // Start at top
    
    // Helper to get coordinates
    const getCoords = (angle, radius) => ({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
    });

    // 1. Draw Background Webs (5 levels)
    for (let level = 5; level >= 1; level--) {
        const r = (maxRadius / 5) * level;
        const points = [];
        for (let i = 0; i < numAxes; i++) {
            const angle = startAngle + (i * angleStep);
            const { x, y } = getCoords(angle, r);
            points.push(`${x},${y}`);
        }
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", points.join(" "));
        polygon.setAttribute("fill", "none");
        polygon.setAttribute("stroke", "#333");
        polygon.setAttribute("stroke-width", "1");
        svg.appendChild(polygon);
    }
    
    // 2. Draw Axes
    for (let i = 0; i < numAxes; i++) {
        const angle = startAngle + (i * angleStep);
        const { x, y } = getCoords(angle, maxRadius);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#333");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
    }
    
    // 3. Draw Data Polygon
    const dataPoints = [];
    categories.forEach((cat, i) => {
        const score = scores[cat];
        const r = (score / 20) * maxRadius;
        const angle = startAngle + (i * angleStep);
        const { x, y } = getCoords(angle, r);
        dataPoints.push(`${x},${y}`);
    });

    const dataPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    dataPolygon.setAttribute("points", dataPoints.join(" "));
    dataPolygon.setAttribute("fill", "rgba(0, 230, 118, 0.3)");
    dataPolygon.setAttribute("stroke", "#00E676");
    dataPolygon.setAttribute("stroke-width", "2");
    svg.appendChild(dataPolygon);
    
    // 4. Draw Labels
    categories.forEach((cat, i) => {
        const angle = startAngle + (i * angleStep);
        const labelRadius = maxRadius + 20; 
        const { x, y } = getCoords(angle, labelRadius);
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("fill", "#b0b0b0");
        text.setAttribute("font-size", "12");
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = CATEGORY_TRANSLATIONS[cat] || cat;
        svg.appendChild(text);
    });
}

function renderFullRunResults(results) {
    scoreCardsContainer.innerHTML = '';
    
    const list = document.createElement('div');
    list.className = 'full-run-result-list';

    SENTENCES.forEach((s, i) => {
        const res = results[`sentence_${i}`];
        const item = document.createElement('div');
        item.className = 'full-run-result-item';
        item.innerHTML = `
            <span class="fr-label">文${i+1}</span>
            <span class="fr-score">${res.score}/20</span>
        `;
        list.appendChild(item);
    });
    scoreCardsContainer.appendChild(list);

    // Add summary
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'full-run-summary';
    const { minIndex, maxIndex } = results.summary;
    // Simple logic: praise best, note worst. If same, just praise.
    summaryDiv.innerHTML = `<p>一番良かったのは文${maxIndex+1}でした！<br>文${minIndex+1}が少し崩れました。</p>`;
    scoreCardsContainer.appendChild(summaryDiv);
}

function renderScoreCards(results) {
    scoreCardsContainer.innerHTML = '';
    
    // Define layout: Row 1 (2 items), Row 2 (3 items)
    const rows = [
        ['Rhythm', 'Stress'],
        ['Intonation', 'Flow', 'Pronunciation']
    ];

    rows.forEach(rowKeys => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'score-row';
        
        rowKeys.forEach(category => {
            const resultData = results[category];
            if (!resultData) {
                return; // Skip if data is missing to prevent crash
            }
            const { score } = resultData;
            const card = document.createElement('div');
            card.className = 'score-card-small';
            card.innerHTML = `
                <span class="card-val">${score}</span>
                <span class="card-label">${CATEGORY_TRANSLATIONS[category] || category}</span>
            `;
            card.onclick = () => openDetailView(category);
            rowDiv.appendChild(card);
        });
        
        scoreCardsContainer.appendChild(rowDiv);
    });
}

function openDetailView(category) {
    const { score, feedback } = currentResults[category];
    const currentPhrase = isFullRunChallenge ? "通し読みチャレンジ" : SENTENCES[currentSentenceIndex].text;
    const currentData = isFullRunChallenge ? null : SENTENCES[currentSentenceIndex].data;

    modalTitle.innerText = `${CATEGORY_TRANSLATIONS[category] || category} (${score}/20)`;
    detailModal.classList.remove('hidden');
    modalTargetSentence.innerText = `"${currentPhrase}"`;
    
    // Handle Pronunciation Targets Section
    modalPronunciationTargets.innerHTML = '';
    modalPronunciationTargets.classList.add('hidden');

    if (category === 'Pronunciation' && currentData && currentData.pronunciation) {
        const targets = currentData.pronunciation.targets;
        if (targets) {
            modalPronunciationTargets.classList.remove('hidden');
            modalPronunciationTargets.innerHTML = `
                <h4 class="feedback-label">今回の注目音</h4>
                <div class="targets-grid">
                    ${targets.map(t => `<div class="target-item"><span class="target-sound">${t.sound}</span><span class="target-desc">${t.label}</span></div>`).join('')}
                </div>
            `;
        }
    }
    
    // Setup buttons
    btnModalPlayModel.onclick = () => playModelAudio();
    btnModalPlayUser.onclick = () => {
        if (userAudioUrl) {
            const audio = new Audio(userAudioUrl);
            audio.play();
        } else {
            alert("No recording available.");
        }
    };
    
    // Render Feedback Lists
    modalFeedback.innerHTML = createList(feedback.strengths);
    modalAdvice.innerHTML = createList(feedback.improvements);
}

function analyzeCategory(category, sentenceData) {
    const data = FEEDBACK_DATA[category];
    const result = {
        score: 20,
        feedback: {
            strengths: [],
            improvements: []
        }
    };
    
    // Determine issues pool (default or specific)
    let issuesPool = (data && Array.isArray(data.issues)) ? data.issues : [];
    if (category === 'Pronunciation' && sentenceData && sentenceData.pronunciation && sentenceData.pronunciation.issues) {
        issuesPool = sentenceData.pronunciation.issues;
    }

    // Setup replacement targets
    let stressTarget = "重要な語";
    let weakTarget = "弱い語";
    if (sentenceData && sentenceData.stress) {
        stressTarget = `重要な語（${sentenceData.stress.target}）`;
        weakTarget = `あまり強くしなくてよい語（${sentenceData.stress.weak}）`;
    }

    // Determine number of issues (0 to 3) based on probability
    // 0 issues (10%), 1 issue (40%), 2 issues (40%), 3 issues (10%)
    const rand = Math.random();
    let numIssues = 0;
    if (rand < 0.1) numIssues = 0;
    else if (rand < 0.5) numIssues = 1;
    else if (rand < 0.9) numIssues = 2;
    else numIssues = 3;

    // Pick unique issues
    const shuffledIssues = [...issuesPool].sort(() => 0.5 - Math.random());
    const selectedIssues = shuffledIssues.slice(0, numIssues);

    // Calculate score based on penalties
    let totalPenalty = 0;
    selectedIssues.forEach(issue => {
        totalPenalty += issue.penalty;
        // Inject specific words into templates
        let text = issue.text;
        if (text) {
            text = text.replace("重要な語", stressTarget);
            text = text.replace("あまり強くしなくてよい語", weakTarget);
        }
        result.feedback.improvements.push(text);
    });

    result.score = Math.max(10, 20 - totalPenalty);

    // Select strengths
    if (result.score === 20) {
        const intonationType = (sentenceData && sentenceData.intonationType) ? sentenceData.intonationType : 'generic';
        const strengthsPool = (category === 'Intonation' && data && data[intonationType] && Array.isArray(data[intonationType].strengths)) ? data[intonationType].strengths : (data && Array.isArray(data.strengths) ? data.strengths : []);
        result.feedback.strengths = [...strengthsPool];
        result.feedback.strengths.push("素晴らしい出来です！");
    } else {
        // For intonation, pick relevant strength
        if (category === 'Intonation') {
             const intonationType = (sentenceData && sentenceData.intonationType) ? sentenceData.intonationType : 'generic';
             const strengthsPool = (data && data[intonationType] && Array.isArray(data[intonationType].strengths)) ? data[intonationType].strengths : (data && data.generic && Array.isArray(data.generic.strengths) ? data.generic.strengths : []);
             if (strengthsPool.length > 0) result.feedback.strengths.push(getRandomItem(strengthsPool));
        } else {
             if (data && Array.isArray(data.strengths) && data.strengths.length > 0) result.feedback.strengths.push(getRandomItem(data.strengths));
        }
    }
    
    return result;
}

function createList(items) {
    if (!items || items.length === 0) return "特になし";
    return `<ul style="margin: 0; padding-left: 20px;">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function goToNext() {
    const allPassed = SENTENCES.filter(s => s.passed).length === SENTENCES.length;

    if (isFullRunChallenge) {
        // Reset everything after clearing the full run
        currentSentenceIndex = 0;
        isFullRunChallenge = false;
        SENTENCES.forEach(s => s.passed = false);
    } else if (allPassed) {
        // Show the unlock screen and wait for user action
        showLevelClearOverlay();
        return; // IMPORTANT: Stop execution here
    } else {
        // Go to the next un-passed sentence
        let nextIndex = currentSentenceIndex + 1;
        while(nextIndex < SENTENCES.length && SENTENCES[nextIndex].passed) {
            nextIndex++;
        }
        if (nextIndex < SENTENCES.length) {
            currentSentenceIndex = nextIndex;
        } else {
            // This case should ideally not be hit if btnNext is hidden correctly, but as a fallback:
            console.log("All remaining sentences are passed, but not all are complete. Staying put.");
        }
    }
    resetUI();
}

function showLevelClearOverlay() {
    levelClearTitle.innerHTML = "5問クリア！<br>通し読みチャレンジ解放！<br><span style='font-size:0.9rem; font-weight:normal;'>5つのセリフを続けて言ってみよう</span>";
    btnLevelClearNext.textContent = "通し読みへ";
    btnLevelClearNext.onclick = startFullRun; // Ensure correct handler
    levelClearOverlay.classList.remove('hidden');
}

function startFullRun() {
    levelClearOverlay.classList.add('hidden');
    isFullRunChallenge = true;
    console.log("Starting Full Run Challenge");
    resetUI();
}

function resetUI() {
    resultScreen.classList.add('hidden');
    practiceScreen.classList.remove('hidden');
    statusText.innerText = "Ready";
    statusText.style.color = "#b0b0b0";

    // Update target sentence display
    if (isFullRunChallenge) {
        targetSentenceHeader.textContent = "通し読みチャレンジ";
        fullRunList.classList.remove('hidden');
        fullRunList.innerHTML = SENTENCES.map((s, i) => 
            `<div class="full-run-item"><span class="full-run-num">${i+1}.</span> ${s.text}</div>`
        ).join('');
    } else {
        targetSentenceHeader.textContent = `"${SENTENCES[currentSentenceIndex] ? SENTENCES[currentSentenceIndex].text : ''}"`;
        fullRunList.classList.add('hidden');
    }
    
    clearDiffPreview();
    // Reset buttons
    btnRecord.classList.remove('hidden');
    btnStop.classList.add('hidden');
    btnStop.disabled = true;
    
    // Blind Text for Battle Mode
    if (isBattleMode) {
        targetSentenceHeader.classList.add('blind-text');
    } else {
        targetSentenceHeader.classList.remove('blind-text');
    }
}

function initVoiceSelection() {
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) return;

        selectedVoice = voices.find(v => v.name.includes('Samantha')) || 
                        voices.find(v => v.name.includes('Google US English')) ||
                        voices.find(v => v.lang === 'en-US');

        if (selectedVoice) {
            console.log(`[TTS] Init selected: ${selectedVoice.name}`);
            if (modelVoiceLabel) {
                modelVoiceLabel.innerText = `TTS: ${selectedVoice.name}`;
                modelVoiceLabel.style.color = "#00E676";
            }
        } else {
            if (modelVoiceLabel) {
                modelVoiceLabel.innerText = "TTS: Default";
                modelVoiceLabel.style.color = "#FF1744";
            }
        }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
}

function playSuccessSound(type) {
    // Fanfare-like sound using multiple oscillators
    if (!audioCtx) return;

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

    if (type === 'platinum' || type === 'gold' || type === 'silver') {
        // Fanfare: Do-Mi-So-Do!
        playNote(523.25, now, 0.2, 'triangle'); // C5
        playNote(659.25, now + 0.1, 0.2, 'triangle'); // E5
        playNote(783.99, now + 0.2, 0.2, 'triangle'); // G5
        playNote(1046.50, now + 0.3, 0.8, 'triangle'); // C6
        
        // Add a lower harmony for richness
        playNote(261.63, now, 0.6, 'sine'); // C4
    } else if (type === 'clear') {
        // Simple success: Do-So!
        playNote(523.25, now, 0.2, 'sine'); // C5
        playNote(783.99, now + 0.1, 0.4, 'sine'); // G5
    } else {
        // Fail: Low tone
        playNote(196.00, now, 0.3, 'sawtooth'); // G3
    }
}

function getTierInfo(score) {
    if (score >= 95) {
        return {
            name: 'PLATINUM',
            celebrationText: 'プラチナ達成！',
            soundType: 'platinum',
            glowClass: 'glow-platinum',
            badgeClass: 'badge-platinum',
            background: 'linear-gradient(45deg, #e5e5e5, #b8b8b8)',
            color: '#333'
        };
    } else if (score >= 90) {
        return {
            name: 'GOLD',
            celebrationText: '金バッジ獲得！',
            soundType: 'gold',
            glowClass: 'glow-gold',
            badgeClass: 'badge-gold',
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            color: '#333'
        };
    } else if (score >= 85) {
        return {
            name: 'SILVER',
            celebrationText: '銀バッジ獲得！',
            soundType: 'silver',
            glowClass: 'glow-silver',
            badgeClass: 'badge-silver',
            background: 'linear-gradient(45deg, #C0C0C0, #A9A9A9)',
            color: '#333'
        };
    }
    return { name: 'CLEAR', celebrationText: 'クリア！', soundType: 'clear', glowClass: 'glow-clear', badgeClass: '', background: 'rgba(0, 230, 118, 0.2)', color: '#00E676' };
}

// --- Helpers ---

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
// --- Diff Engine (MVP) ---

function renderDiffPreview(correctText, userText) {
    if (!diffPreviewContainer || !diffDisplay) return;
    
    diffPreviewContainer.classList.remove('hidden');
    if (recognizedTextDisplay) {
        recognizedTextDisplay.textContent = userText ? `Recognized: "${userText}"` : "Recognized: (No speech detected)";
    }

    const diffData = calculateDiff(correctText, userText);
    diffDisplay.innerHTML = '';

    diffData.forEach(token => {
        const span = document.createElement('span');
        span.className = `diff-token diff-${token.status}`;
        
        if (token.status === 'missing') {
            span.innerHTML = '&nbsp;'; 
        } else {
            span.textContent = token.word;
        }
        diffDisplay.appendChild(span);
    });
}

function clearDiffPreview() {
    if (diffPreviewContainer) {
        diffPreviewContainer.classList.add('hidden');
    }
    if (diffDisplay) {
        diffDisplay.innerHTML = '';
    }
    if (recognizedTextDisplay) {
        recognizedTextDisplay.textContent = '';
    }
}

function normalizeToken(word) {
    if (!word) return "";
    // Remove punctuation and lowercase
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
}

function tokenize(text) {
    return text.trim().split(/\s+/);
}

function calculateDiff(correctText, userText) {
    if (!correctText) return [];
    const correctTokens = tokenize(correctText);
    
    // Fix: Handle empty/no speech
    // If input is empty, blank, or "(No speech detected)", mark all missing.
    if (!userText || userText.trim() === "" || userText === "(No speech detected)") {
        return correctTokens.map(word => ({ word, status: 'missing', input: null }));
    }
    
    const userTokens = tokenize(userText);
    
    let userIdx = 0;
    const result = [];

    for (let i = 0; i < correctTokens.length; i++) {
        const cWord = correctTokens[i];
        const cToken = normalizeToken(cWord);
        
        // Get current user token (if available)
        const uOriginal = userTokens[userIdx];
        const uToken = normalizeToken(uOriginal);

        // 1. Direct Match
        if (cToken === uToken) {
            result.push({ word: cWord, status: 'correct', input: uOriginal });
            userIdx++;
        } 
        // 2. Mismatch handling
        else {
            // Lookahead: Does the current user token match the NEXT correct token?
            // If yes, it implies the current correct token is missing in user input.
            let matchFoundLater = false;
            
            // Simple lookahead (check next word)
            // If the user's current word matches the NEXT correct word, 
            // we assume the user skipped the CURRENT correct word.
            if (i + 1 < correctTokens.length) {
                 const nextCToken = normalizeToken(correctTokens[i+1]);
                 if (uToken && uToken === nextCToken) {
                     matchFoundLater = true;
                 }
            }

            if (matchFoundLater) {
                // The user skipped this word to get to the next one
                result.push({ word: cWord, status: 'missing', input: null });
                // We do NOT increment userIdx, because uToken is still waiting to match the next cToken
            } else {
                // User said something else, or we are at end
                result.push({ word: cWord, status: 'wrong', input: uOriginal || null });
                userIdx++; // Consume the wrong word
            }
        }
    }

    return result;
}

// Expose for testing
window.testDiffEngine = function() {
    const examples = [
        { c: "I made a decision", u: "I made decision" },
        { c: "He is happy", u: "He is sad" },
        { c: "Good morning", u: "Good ah morning" } // 'ah' will be treated as 'wrong' for 'morning', and 'morning' will be 'missing' with this simple logic? 
        // Actually: 'Good'='Good'. 'ah'!='morning'. 'ah'!=next? (None). So 'morning' becomes 'wrong' (input 'ah').
        // Then 'morning' (user) is leftover.
        // Wait, "Good ah morning". 
        // 1. Good==Good. uIdx=1(ah).
        // 2. c=morning. u=ah. match? No.
        //    lookahead: next correct is null.
        //    so 'morning' is WRONG (input 'ah').
        //    uIdx=2(morning).
        // End of correct loop.
        // This is acceptable for MVP (strict slot filling).
    ];

    examples.forEach(ex => {
        console.log(`\nDiffing: "${ex.c}" vs "${ex.u}"`);
        console.table(calculateDiff(ex.c, ex.u));
    });
};

// --- Initialization ---
