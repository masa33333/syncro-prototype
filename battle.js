console.log("USING battle.js 2026-03-11 test");
// --- Mock Data: Sentences & their specific transcripts ---
const BATTLE_ROUNDS = [
  {
    "id": "rb_0001",
    "text": "I honestly don't know what to say.",
    "meaningJa": "正直、なんて言ったらいいかわかりません。",
    "chunks": [
      { "text": "I honestly don't know", "roleJa": "正直わかりません" },
      { "text": "what to say", "roleJa": "何と言うべきか" }
    ],
    "functionTag": "expression_of_state",
    "patternTag": "S + V + O (Wh-clause)",
    "wordCount": 7,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 31,
    "level": 3
  },
  {
    "id": "rb_0002",
    "text": "It turned out to be better than I expected.",
    "meaningJa": "思っていたより良い結果になりました。",
    "chunks": [
      { "text": "It turned out to be", "roleJa": "結果的に〜だった" },
      { "text": "better than I expected", "roleJa": "予想していたより良く" }
    ],
    "functionTag": "explanation",
    "patternTag": "It + turned out + C",
    "wordCount": 9,
    "speechRateWpm": 140,
    "chunkCount": 2,
    "linkingCount": 3,
    "reductionCount": 1,
    "weakFormCount": 3,
    "difficultyScore": 36,
    "level": 4
  },
  {
    "id": "rb_0003",
    "text": "I should have told you about this earlier.",
    "meaningJa": "もっと早くこのことをあなたに言うべきでした。",
    "chunks": [
      { "text": "I should have told you", "roleJa": "あなたに言うべきだった" },
      { "text": "about this earlier", "roleJa": "このことについてもっと早く" }
    ],
    "functionTag": "regret",
    "patternTag": "S + should have + p.p.",
    "wordCount": 8,
    "speechRateWpm": 145,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 2,
    "weakFormCount": 2,
    "difficultyScore": 38,
    "level": 4
  },
  {
    "id": "rb_0004",
    "text": "We ended up staying there for three hours.",
    "meaningJa": "結局そこに3時間も滞在することになりました。",
    "chunks": [
      { "text": "We ended up", "roleJa": "結局〜することになった" },
      { "text": "staying there", "roleJa": "そこに滞在することを" },
      { "text": "for three hours", "roleJa": "3時間" }
    ],
    "functionTag": "narrative",
    "patternTag": "S + ended up + V-ing",
    "wordCount": 8,
    "speechRateWpm": 130,
    "chunkCount": 3,
    "linkingCount": 2,
    "reductionCount": 0,
    "weakFormCount": 1,
    "difficultyScore": 34,
    "level": 3
  },
  {
    "id": "rb_0005",
    "text": "Do you mind if I ask a personal question?",
    "meaningJa": "個人的な質問をしても構いませんか？",
    "chunks": [
      { "text": "Do you mind", "roleJa": "気にしますか" },
      { "text": "if I ask", "roleJa": "もし私が尋ねたら" },
      { "text": "a personal question", "roleJa": "個人的な質問を" }
    ],
    "functionTag": "permission",
    "patternTag": "Do you mind + if...",
    "wordCount": 9,
    "speechRateWpm": 150,
    "chunkCount": 3,
    "linkingCount": 3,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 37,
    "level": 4
  },
  {
    "id": "rb_0006",
    "text": "Is there anything else I can do for you?",
    "meaningJa": "他に何か私にできることはありますか？",
    "chunks": [
      { "text": "Is there anything else", "roleJa": "他に何かありますか" },
      { "text": "I can do for you", "roleJa": "私があなたのためにできる" }
    ],
    "functionTag": "offer",
    "patternTag": "Is there + S + (relative)",
    "wordCount": 9,
    "speechRateWpm": 145,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 3,
    "difficultyScore": 33,
    "level": 3
  },
  {
    "id": "rb_0007",
    "text": "You might want to check the schedule again.",
    "meaningJa": "もう一度スケジュールを確認したほうがいいかもしれません。",
    "chunks": [
      { "text": "You might want to", "roleJa": "〜したほうがいいかも" },
      { "text": "check the schedule again", "roleJa": "もう一度予定を確認する" }
    ],
    "functionTag": "suggestion",
    "patternTag": "S + might want to + V",
    "wordCount": 8,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 1,
    "weakFormCount": 1,
    "difficultyScore": 32,
    "level": 3
  },
  {
    "id": "rb_0008",
    "text": "It's usually better to book in advance.",
    "meaningJa": "たいていの場合、事前に予約しておいたほうが良いです。",
    "chunks": [
      { "text": "It's usually better", "roleJa": "たいてい〜の方が良い" },
      { "text": "to book in advance", "roleJa": "事前に予約するほうが" }
    ],
    "functionTag": "general_advice",
    "patternTag": "It is + adj + to V",
    "wordCount": 7,
    "speechRateWpm": 130,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 0,
    "weakFormCount": 2,
    "difficultyScore": 30,
    "level": 3
  },
  {
    "id": "rb_0009",
    "text": "I'm getting a little tired of this weather.",
    "meaningJa": "この天気には少しうんざりしてきました。",
    "chunks": [
      { "text": "I'm getting a little tired", "roleJa": "少し飽き飽きしている" },
      { "text": "of this weather", "roleJa": "この天気に" }
    ],
    "functionTag": "complaint",
    "patternTag": "S + be getting + adj",
    "wordCount": 8,
    "speechRateWpm": 130,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 35,
    "level": 4
  },
  {
    "id": "rb_0010",
    "text": "That sounds like exactly what we need right now.",
    "meaningJa": "それこそまさに今、私たちに必要なものですね。",
    "chunks": [
      { "text": "That sounds like", "roleJa": "〜のように聞こえる" },
      { "text": "exactly what we need", "roleJa": "まさに我々が必要なもの" },
      { "text": "right now", "roleJa": "今まさに" }
    ],
    "functionTag": "agreement",
    "patternTag": "That sounds like + N",
    "wordCount": 9,
    "speechRateWpm": 140,
    "chunkCount": 3,
    "linkingCount": 1,
    "reductionCount": 1,
    "weakFormCount": 1,
    "difficultyScore": 36,
    "level": 4
  },
  {
    "id": "rb_0011",
    "text": "The main reason is that I'm just curious.",
    "meaningJa": "主な理由は、ただ私が好奇心を持っているからです。",
    "chunks": [
      { "text": "The main reason is", "roleJa": "主な理由は" },
      { "text": "that I'm just curious", "roleJa": "単に好奇心があるということ" }
    ],
    "functionTag": "explanation",
    "patternTag": "The reason is that...",
    "wordCount": 9,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 0,
    "weakFormCount": 2,
    "difficultyScore": 34,
    "level": 3
  },
  {
    "id": "rb_0012",
    "text": "I didn't mean to hurt your feelings.",
    "meaningJa": "あなたの気持ちを傷つけるつもりはありませんでした。",
    "chunks": [
      { "text": "I didn't mean to", "roleJa": "〜するつもりはなかった" },
      { "text": "hurt your feelings", "roleJa": "あなたの感情を傷つける" }
    ],
    "functionTag": "apology",
    "patternTag": "S + didn't mean to + V",
    "wordCount": 7,
    "speechRateWpm": 130,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 1,
    "weakFormCount": 1,
    "difficultyScore": 30,
    "level": 3
  },
  {
    "id": "rb_0013",
    "text": "We're planning to take a few days off.",
    "meaningJa": "私たちは数日休みを取る予定です。",
    "chunks": [
      { "text": "We're planning to", "roleJa": "〜する予定だ" },
      { "text": "take a few days off", "roleJa": "数日休暇を取ることを" }
    ],
    "functionTag": "statement_of_plan",
    "patternTag": "S + be planning to + V",
    "wordCount": 8,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 33,
    "level": 3
  },
  {
    "id": "rb_0014",
    "text": "We're going to have to leave fairly soon.",
    "meaningJa": "私たちはもうすぐ出発しなければなりません。",
    "chunks": [
      { "text": "We're going to have to", "roleJa": "〜しなければならないだろう" },
      { "text": "leave fairly soon", "roleJa": "かなりすぐに発つ" }
    ],
    "functionTag": "statement_of_necessity",
    "patternTag": "S + be going to + have to V",
    "wordCount": 8,
    "speechRateWpm": 150,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 2,
    "weakFormCount": 2,
    "difficultyScore": 39,
    "level": 4
  },
  {
    "id": "rb_0015",
    "text": "Have you ever been to this place before?",
    "meaningJa": "以前にこの場所へ来たことはありますか？",
    "chunks": [
      { "text": "Have you ever been", "roleJa": "今までにいたことはあるか" },
      { "text": "to this place before", "roleJa": "以前この場所に" }
    ],
    "functionTag": "question_experience",
    "patternTag": "Have you ever + p.p.",
    "wordCount": 8,
    "speechRateWpm": 140,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 32,
    "level": 3
  },
  {
    "id": "rb_0016",
    "text": "Time flies so fast when you're having fun.",
    "meaningJa": "楽しい時間はあっという間に過ぎますね。",
    "chunks": [
      { "text": "Time flies so fast", "roleJa": "時間はとても早く飛ぶ" },
      { "text": "when you're having fun", "roleJa": "楽しんでいる時は" }
    ],
    "functionTag": "observation",
    "patternTag": "S + V + when...",
    "wordCount": 8,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 0,
    "weakFormCount": 1,
    "difficultyScore": 31,
    "level": 3
  },
  {
    "id": "rb_0017",
    "text": "Let me know if you change your mind.",
    "meaningJa": "もし気が変わったら教えてください。",
    "chunks": [
      { "text": "Let me know", "roleJa": "知らせてくれ" },
      { "text": "if you change your mind", "roleJa": "もし気が変わったら" }
    ],
    "functionTag": "instruction",
    "patternTag": "Imperative + if...",
    "wordCount": 8,
    "speechRateWpm": 140,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 1,
    "difficultyScore": 32,
    "level": 3
  },
  {
    "id": "rb_0018",
    "text": "It doesn't make any sense to me at all.",
    "meaningJa": "私には全く意味がわかりません（納得いきません）。",
    "chunks": [
      { "text": "It doesn't make any sense", "roleJa": "それは全く意味をなさない" },
      { "text": "to me at all", "roleJa": "私にとっては全然" }
    ],
    "functionTag": "opinion_negative",
    "patternTag": "It doesn't make sense",
    "wordCount": 9,
    "speechRateWpm": 145,
    "chunkCount": 2,
    "linkingCount": 3,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 37,
    "level": 4
  },
  {
    "id": "rb_0019",
    "text": "I haven't seen him in a long time.",
    "meaningJa": "彼とはずいぶん長い間会っていません。",
    "chunks": [
      { "text": "I haven't seen him", "roleJa": "彼に会っていない" },
      { "text": "in a long time", "roleJa": "長い間" }
    ],
    "functionTag": "statement_of_state",
    "patternTag": "S + haven't + p.p.",
    "wordCount": 8,
    "speechRateWpm": 130,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 3,
    "difficultyScore": 33,
    "level": 3
  },
  {
    "id": "rb_0020",
    "text": "Would it be okay if I borrowed this?",
    "meaningJa": "これをお借りしてもよろしいでしょうか？",
    "chunks": [
      { "text": "Would it be okay", "roleJa": "いいでしょうか" },
      { "text": "if I borrowed this", "roleJa": "もしこれを借りても" }
    ],
    "functionTag": "permission_polite",
    "patternTag": "Would it be okay + if...",
    "wordCount": 8,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 1,
    "difficultyScore": 34,
    "level": 3
  },
  {
    "id": "rb_0021",
    "text": "I'm not sure I can make it on time.",
    "meaningJa": "時間通りに間に合うかどうかわかりません。",
    "chunks": [
      { "text": "I'm not sure", "roleJa": "確信がない" },
      { "text": "I can make it on time", "roleJa": "時間通りに都合がつくか" }
    ],
    "functionTag": "uncertainty",
    "patternTag": "S + be not sure + (that)...",
    "wordCount": 9,
    "speechRateWpm": 140,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 0,
    "weakFormCount": 2,
    "difficultyScore": 35,
    "level": 4
  },
  {
    "id": "rb_0022",
    "text": "You should've seen the look on his face.",
    "meaningJa": "彼のあの時の顔、あなたに見せたかったですよ。",
    "chunks": [
      { "text": "You should've seen", "roleJa": "見るべきだった（見せたかった）" },
      { "text": "the look on his face", "roleJa": "彼の顔の表情を" }
    ],
    "functionTag": "narrative_emphasis",
    "patternTag": "S + should've + p.p.",
    "wordCount": 8,
    "speechRateWpm": 145,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 3,
    "difficultyScore": 38,
    "level": 4
  },
  {
    "id": "rb_0023",
    "text": "There's no point in worrying about it now.",
    "meaningJa": "今さらそのことを心配しても意味がありません。",
    "chunks": [
      { "text": "There's no point", "roleJa": "意味がない" },
      { "text": "in worrying about it", "roleJa": "それを心配することに" },
      { "text": "now", "roleJa": "今さら" }
    ],
    "functionTag": "advice_comfort",
    "patternTag": "There is no point in V-ing",
    "wordCount": 8,
    "speechRateWpm": 140,
    "chunkCount": 3,
    "linkingCount": 3,
    "reductionCount": 0,
    "weakFormCount": 1,
    "difficultyScore": 36,
    "level": 4
  },
  {
    "id": "rb_0024",
    "text": "It would be great if you could help me.",
    "meaningJa": "手伝っていただけるととても助かります。",
    "chunks": [
      { "text": "It would be great", "roleJa": "素晴らしいだろう" },
      { "text": "if you could help me", "roleJa": "もし手伝ってくれたら" }
    ],
    "functionTag": "request_indirect",
    "patternTag": "It would be adj + if...",
    "wordCount": 9,
    "speechRateWpm": 140,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 2,
    "weakFormCount": 2,
    "difficultyScore": 35,
    "level": 4
  },
  {
    "id": "rb_0025",
    "text": "It's not as difficult as it looks.",
    "meaningJa": "見た目ほど難しくはありませんよ。",
    "chunks": [
      { "text": "It's not as difficult", "roleJa": "それほど難しくない" },
      { "text": "as it looks", "roleJa": "見た目ほど" }
    ],
    "functionTag": "encouragement",
    "patternTag": "not as + adj + as...",
    "wordCount": 7,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 2,
    "reductionCount": 1,
    "weakFormCount": 2,
    "difficultyScore": 31,
    "level": 3
  },
  {
    "id": "rb_0026",
    "text": "I wonder what they are doing right now.",
    "meaningJa": "彼らは今頃何をしているのかなあ。",
    "chunks": [
      { "text": "I wonder", "roleJa": "かなあと思う" },
      { "text": "what they are doing", "roleJa": "彼らが何をしているか" },
      { "text": "right now", "roleJa": "たった今" }
    ],
    "functionTag": "curiosity",
    "patternTag": "I wonder + Wh-clause",
    "wordCount": 8,
    "speechRateWpm": 130,
    "chunkCount": 3,
    "linkingCount": 1,
    "reductionCount": 0,
    "weakFormCount": 2,
    "difficultyScore": 30,
    "level": 3
  },
  {
    "id": "rb_0027",
    "text": "Make sure you lock the door before leaving.",
    "meaningJa": "出る前に必ずドアに鍵をかけてくださいね。",
    "chunks": [
      { "text": "Make sure", "roleJa": "確実にしてください" },
      { "text": "you lock the door", "roleJa": "ドアに鍵をかけるのを" },
      { "text": "before leaving", "roleJa": "去る前に" }
    ],
    "functionTag": "instruction",
    "patternTag": "Make sure + S + V",
    "wordCount": 8,
    "speechRateWpm": 135,
    "chunkCount": 3,
    "linkingCount": 1,
    "reductionCount": 0,
    "weakFormCount": 1,
    "difficultyScore": 33,
    "level": 3
  },
  {
    "id": "rb_0028",
    "text": "I've been looking forward to meeting you.",
    "meaningJa": "お会いできるのを楽しみにしていました。",
    "chunks": [
      { "text": "I've been looking forward", "roleJa": "ずっと楽しみにしていた" },
      { "text": "to meeting you", "roleJa": "あなたに会うことを" }
    ],
    "functionTag": "greeting",
    "patternTag": "S + have been -ing",
    "wordCount": 7,
    "speechRateWpm": 135,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 0,
    "weakFormCount": 1,
    "difficultyScore": 30,
    "level": 3
  },
  {
    "id": "rb_0029",
    "text": "Does anyone know how to fix this problem?",
    "meaningJa": "誰かこの問題の直し方を知っていますか？",
    "chunks": [
      { "text": "Does anyone know", "roleJa": "誰か知っていますか" },
      { "text": "how to fix", "roleJa": "どうやって直すか" },
      { "text": "this problem", "roleJa": "この問題を" }
    ],
    "functionTag": "question_open",
    "patternTag": "Does anyone + V...",
    "wordCount": 8,
    "speechRateWpm": 140,
    "chunkCount": 3,
    "linkingCount": 1,
    "reductionCount": 0,
    "weakFormCount": 1,
    "difficultyScore": 32,
    "level": 3
  },
  {
    "id": "rb_0030",
    "text": "I promise I won't let you down.",
    "meaningJa": "約束します、あなたをがっかりさせません。",
    "chunks": [
      { "text": "I promise", "roleJa": "約束する" },
      { "text": "I won't let you down", "roleJa": "あなたを失望させないと" }
    ],
    "functionTag": "commitment",
    "patternTag": "S + V + (that) S + V",
    "wordCount": 7,
    "speechRateWpm": 130,
    "chunkCount": 2,
    "linkingCount": 1,
    "reductionCount": 1,
    "weakFormCount": 1,
    "difficultyScore": 30,
    "level": 3
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
let currentStageNumber = 1;
let currentStageQuestions = [];
let usedQuestionIds = new Set();
let currentOutcomeIndex = 0; // Cycles 0 -> 1 -> 2 on retry
let clearedCount = 0;
let stageResults = [];
let lastRecordingDurationMs = 0;
let missedQuestions = new Set();
let isStageComplete = false;
let isBusy = false; // Prevents multiple clicks
let isRecording = false; // Tracks recording state
let mediaRecorder;
let audioChunks = [];
let userAudioUrl = null;

// --- Initialization ---
generateStageQuestions();
initRound();

function generateStageQuestions() {
    // 1. Filter available questions (exclude used ones)
    let availableQuestions = BATTLE_ROUNDS.filter(q => !usedQuestionIds.has(q.id));

    // If not enough questions for a stage, reset history
    if (availableQuestions.length < 5) {
        usedQuestionIds.clear();
        availableQuestions = [...BATTLE_ROUNDS];
    }

    // 2. Sort available questions by difficultyScore
    const sorted = availableQuestions.sort((a, b) => (a.difficultyScore || 0) - (b.difficultyScore || 0));
    
    // 3. Select 5 questions (1 from each quintile for progressive difficulty)
    const stageSize = 5;
    currentStageQuestions = [];
    const bucketSize = Math.floor(sorted.length / stageSize);
    
    for (let i = 0; i < stageSize; i++) {
        let start = i * bucketSize;
        let end = (i === stageSize - 1) ? sorted.length : (i + 1) * bucketSize;
        const bucket = sorted.slice(start, end);
        if (bucket.length > 0) {
            const randomItem = bucket[Math.floor(Math.random() * bucket.length)];
            usedQuestionIds.add(randomItem.id);
            currentStageQuestions.push(randomItem);
        }
    }
}

// Warm up TTS on load to prevent first-time lag/failure
if (window.speechSynthesis) {
    const warmUp = new SpeechSynthesisUtterance("");
    warmUp.volume = 0;
    window.speechSynthesis.speak(warmUp);
}

function initRound() {
    isBusy = false;

    if (!currentStageQuestions || currentStageQuestions.length === 0) {
        generateStageQuestions();
    }

    const roundData = currentStageQuestions[currentRoundIndex];
    targetText.innerText = roundData.text;
    youSaidText.innerText = "";
    isRecording = false;
btnRecord.classList.remove('hidden');
btnRecord.disabled = false;
btnRecord.innerText = "Start Battle";
btnStop.classList.add('hidden');
scoreBadge.classList.remove('stage-total-badge');
feedbackText.classList.remove('stage-score-list');
scoreBadge.style.display = '';
if (currentRoundIndex === 0) {
    stageResults = Array(currentStageQuestions.length).fill(null);
}
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

    // Update Stage Info
    document.querySelector('.stage-info').innerText = `Stage ${currentStageNumber} - Round ${currentRoundIndex + 1}/${currentStageQuestions.length}`;

btnRetry.classList.remove('hidden');
btnNext.style.marginTop = "";
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
    statusText.innerText = `${currentRoundIndex + 1}/${currentStageQuestions.length}`;

    setTimeout(() => {
        countdownOverlay.classList.add('hidden');
        countdownNum.textContent = "";
        statusText.innerText = "Listening...";
        autoStartCurrentRound();
    }, 900);
}

btnNext.onclick = () => {
    // Check if we are starting a completely new stage (from "Stage Complete" screen)
    if (currentRoundIndex === -1) {
        generateStageQuestions();
        currentRoundIndex = 0;
        stageResults = Array(currentStageQuestions.length).fill(null);
        initRound();
        showRoundCueAndStart();
        return;
    }

    if (currentRoundIndex < currentStageQuestions.length - 1) {
        currentRoundIndex++;
        initRound();
        showRoundCueAndStart();
    } else {
        transitionToStageComplete();
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
    const text = currentStageQuestions[currentRoundIndex].text;
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
        const recordingStartedAt = Date.now();

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
            lastRecordingDurationMs = Date.now() - recordingStartedAt;
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
function calculatePronunciationScore(correctText, userText) {
    const wordCount = tokenize(correctText).length;
    if (!wordCount) return 0;

    const targetMs = wordCount * 550;
    const actualMs = Math.max(lastRecordingDurationMs || 300, 300);

    const ratio = Math.min(actualMs, targetMs) / Math.max(actualMs, targetMs);

    const score = 8 + Math.round(ratio * 12);
    return Math.max(0, Math.min(20, score));
}

function finishRound(userText) {
    battleScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const correctText = currentStageQuestions[currentRoundIndex].text;
    const diff = calculateDiff(correctText, userText);
    const retentionScore = calculateScore(diff);
// Pass/fail is based on perfect retention only
const passed = diff.every(token => token.status === 'correct');

const pronunciationScore = passed
    ? calculatePronunciationScore(correctText, userText)
    : null;

    renderDiff(diff);

    const spokenText = (userText || "").trim();

if (spokenText) {
    youSaidText.innerText = `You said: ${spokenText}`;
} else {
    youSaidText.innerText = "You said: (could not catch your answer)";
}

    scoreBadge.innerText = passed
    ? `Pronunciation Score: ${pronunciationScore}/20`
    : `Pronunciation Score: -`;

stageResults[currentRoundIndex] = {
    text: correctText,
    passed,
    pronunciationScore
};

    if (passed) {
        // Always play "Perfect!" first for consistency
        const successMsg = getRandomSuccessMessage();
        playSuccessSound();
        showSuccessAnimation(successMsg, () => {
            renderResultScreenContent();

            if (currentRoundIndex >= currentStageQuestions.length - 1) {
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
    youSaidText.style.display = 'none';

    if (diffContainer && diffContainer.parentElement) {
        diffContainer.parentElement.style.display = 'none';
    }

    const totalScore = stageResults.reduce((sum, item) => {
        return sum + (item && item.pronunciationScore ? item.pronunciationScore : 0);
    }, 0);

    const lines = stageResults.map((item, index) => {
        const text = item && item.text ? item.text : currentStageQuestions[index].text;
        const scoreText = (item && item.pronunciationScore != null)
            ? `${item.pronunciationScore}/20`
            : '-';
        return `${index + 1}. ${text} — ${scoreText}`;
    });

    resultTitle.innerText = "Stage Complete!";
    resultTitle.style.color = "var(--primary)";

    // 合計点を上に大きく出す
    scoreBadge.style.display = '';
    scoreBadge.classList.add('stage-total-badge');
    scoreBadge.innerText = `Total Pronunciation Score: ${totalScore}/${currentStageQuestions.length * 20}`;

    // 各問の一覧は下に左揃え
    feedbackText.classList.add('stage-score-list');
    feedbackText.innerHTML = lines.join('<br>');

    btnRetry.classList.add('hidden');
    btnNext.classList.remove('hidden');
    btnNext.innerText = "New Stage";
btnNext.style.marginTop = "28px";
    currentRoundIndex = -1;
    currentStageNumber++;
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

function getRandomSuccessMessage() {
    const messages = ["Perfect!", "Excellent!", "Amazing!", "Great Job!", "Fantastic!", "Brilliant!"];
    return messages[Math.floor(Math.random() * messages.length)];
}

// --- Diff Engine & Rendering ---

function calculateDiff(correctText, userText) {
    const expandedCorrect = expandContractions(correctText);
    const expandedUser = expandContractions(userText || "");
    
    const c_tokens = tokenize(expandedCorrect);
    const u_tokens = tokenize(expandedUser);
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
function normalize(text) { return text ? text.replace(/['’"?,.\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() : ""; }

function expandContractions(text) {
    if (!text) return "";
    // Normalize apostrophes to ASCII single quote
    let t = text.replace(/[’‘`]/g, "'");
    
    // Handle specific irregular contractions (case-insensitive)
    t = t.replace(/\bwon't\b/gi, "will not");
    t = t.replace(/\bcan't\b/gi, "can not");
    t = t.replace(/\bcannot\b/gi, "can not");
    t = t.replace(/\bshan't\b/gi, "shall not");
    t = t.replace(/\blet's\b/gi, "let us");
    
    // Handle general suffixes
    // Note: Using a space before replacement to ensure tokenization splits them
    t = t.replace(/n't\b/gi, " not");
    t = t.replace(/'re\b/gi, " are");
    t = t.replace(/'m\b/gi, " am");
    t = t.replace(/'ll\b/gi, " will");
    t = t.replace(/'ve\b/gi, " have");
    t = t.replace(/'d\b/gi, " would"); 
    t = t.replace(/'s\b/gi, " is");
    
    return t;
}
