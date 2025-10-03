// 取得元素
const startBtn = document.getElementById("start-btn");
const storyDiv = document.getElementById("story");
const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const quizDiv = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const lawEl = document.getElementById("law");
const endingDiv = document.getElementById("ending");

// 劇情設定
let storyIndex = 0;
const storyLines = [
  "你穿越到了古代，眼前是一座神秘的古蹟……",
  "在探索的過程中，你發現了一些奇怪的符號。",
  "這些符號似乎和某些法規有關……",
  "要解開這個謎題，你必須回答問題！"
];

// 題目設定（每題都有對應的法規說明）
let currentQuestion = 0;
const quizData = [
  {
    question: "問題 1：下列哪一項是古蹟保護的主要目的？",
    options: ["娛樂觀光", "歷史文化保存", "商業開發"],
    answer: "歷史文化保存",
    law: "📜《文化資產保存法》第1條：文化資產應予保存，以延續歷史文化。"
  },
  {
    question: "問題 2：如果要修繕古蹟，應該怎麼做？",
    options: ["自行施工", "報請主管機關核准", "直接拆除"],
    answer: "報請主管機關核准",
    law: "📜《文化資產保存法》第27條：古蹟之修復須經主管機關同意。"
  },
  {
    question: "問題 3：考古出土文物應該？",
    options: ["私下收藏", "立即申報", "隨意丟棄"],
    answer: "立即申報",
    law: "📜《文化資產保存法》第50條：出土文物應立即申報，歸國家所有。"
  }
];

// 開始遊戲
startBtn.onclick = () => {
  startBtn.style.display = "none";
  storyDiv.style.display = "block";
  showStory();
};

// 顯示劇情
function showStory() {
  storyText.textContent = storyLines[storyIndex];
  nextBtn.style.display = "block";
}


// 劇情進度
nextBtn.onclick = () => {
  storyIndex++;
  if (storyIndex < storyLines.length) {
    showStory();
  } else {
    storyDiv.style.display = "none";
    startQuiz();
  }
};

// 顯示題目
function startQuiz() {
  quizDiv.style.display = "block";
  loadQuestion();
}

// 載入題目
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  lawEl.style.display = "none"; // 先隱藏法規，答對才顯示

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}

// 檢查答案
function checkAnswer(answer) {
  const q = quizData[currentQuestion];
  if (answer === q.answer) {
    // 答對 → 顯示法規
    lawEl.textContent = q.law;
    lawEl.style.display = "block";

    // 下一題
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(loadQuestion, 2000); // 2 秒後自動跳下一題
    } else {
      setTimeout(showEnding, 2000); // 所有題目完成 → 顯示結局
    }
  } else {
    alert("答錯了！再想想看！");
  }
}

// 結局
function showEnding() {
  quizDiv.style.display = "none";
  endingDiv.style.display = "block";
}
