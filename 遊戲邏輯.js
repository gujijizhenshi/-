// === 🎮 取得畫面元素 ===
const startBtn = document.getElementById("start-btn"); // 「開始穿越」按鈕
const introDiv = document.getElementById("intro");      // 開始畫面區
const storyDiv = document.getElementById("story");      // 劇情區塊
const storyText = document.getElementById("story-text");// 劇情文字
const nextBtn = document.getElementById("next-btn");    // 「下一步」按鈕
const quizDiv = document.getElementById("quiz");        // 題目區塊
const questionEl = document.getElementById("question"); // 題目文字
const optionsEl = document.getElementById("options");   // 選項按鈕容器
const lawEl = document.getElementById("law");           // 法規說明
const endingDiv = document.getElementById("ending");    // 結局畫面

// === 📜 劇情設定 ===
let storyIndex = 0; // 劇情進度
const storyLines = [
  "你穿越到了古代，眼前是一座神秘的古蹟……",
  "在探索的過程中，你發現了一些奇怪的符號。",
  "這些符號似乎和某些法規有關……",
  "要解開這個謎題，你必須回答問題！"
];

// === ❓ 題目設定 ===
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

// === 🚀 開始遊戲 ===
startBtn.onclick = () => {
  introDiv.style.display = "none";  // 隱藏開始畫面
  storyDiv.style.display = "block"; // 顯示劇情畫面
  showStory();                      // 顯示第一段劇情
};

// === 🗣 顯示劇情文字 ===
function showStory() {
  storyText.textContent = storyLines[storyIndex]; // 顯示當前劇情
  nextBtn.style.display = "block";                // 顯示「下一步」按鈕
}

// === ⏭ 劇情進度控制 ===
nextBtn.onclick = () => {
  storyIndex++;
  if (storyIndex < storyLines.length) {
    showStory(); // 顯示下一段劇情
  } else {
    storyDiv.style.display = "none"; // 劇情結束 → 隱藏劇情畫面
    startQuiz();                     // 進入題目階段
  }
};

// === 🧠 顯示題目 ===
function startQuiz() {
  quizDiv.style.display = "block"; // 顯示題目區
  loadQuestion();                  // 載入第一題
}

// === 📖 載入題目內容 ===
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";          // 清空上次選項
  lawEl.style.display = "none";      // 答對前先隱藏法規

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt); // 點擊選項 → 檢查答案
    optionsEl.appendChild(btn);
  });
}

// === ✅ 檢查答案 ===
function checkAnswer(answer) {
  const q = quizData[currentQuestion];
  if (answer === q.answer) {
    // 答對 → 顯示法規說明
    lawEl.textContent = q.law;
    lawEl.style.display = "block";

    // 下一題（延遲 2 秒）
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(loadQuestion, 2000);
    } else {
      setTimeout(showEnding, 2000);
    }
  } else {
    alert("答錯了！再想想看！");
  }
}

// === 🏁 顯示結局 ===
function showEnding() {
  quizDiv.style.display = "none";
  endingDiv.style.display = "block";
}
