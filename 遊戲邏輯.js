// 取得 HTML 元素，方便後面操作
const startBtn = document.getElementById("start-btn"); // 開始按鈕
const storyDiv = document.getElementById("story"); // 劇情區塊
const storyText = document.getElementById("story-text"); // 劇情文字
const nextBtn = document.getElementById("next-btn"); // 下一步按鈕
const quizDiv = document.getElementById("quiz"); // 答題區塊
const questionEl = document.getElementById("question"); // 題目文字
const optionsEl = document.getElementById("options"); // 選項按鈕的容器
const endingDiv = document.getElementById("ending"); // 結局區塊

// 劇情目前的進度
let storyIndex = 0;

// 劇情文字（可以繼續增加）
const storyLines = [
  "你穿越到了古代，眼前是一座神秘的古蹟……",
  "在探索的過程中，你發現了一些奇怪的符號。",
  "這些符號似乎和某些法規有關……",
  "要解開這個謎題，你必須回答問題！"
];

// 當玩家按下「開始穿越」按鈕
startBtn.onclick = () => {
  startBtn.style.display = "none"; // 隱藏開始按鈕
  storyDiv.style.display = "block"; // 顯示劇情區塊
  showStory(); // 顯示第一段劇情
};

// 顯示劇情文字
function showStory() {
  storyText.textContent = storyLines[storyIndex]; // 顯示目前的劇情內容
  nextBtn.style.display = "block"; // 顯示「下一步」按鈕
}

// 當玩家按下「下一步」按鈕
nextBtn.onclick = () => {
  storyIndex++; // 劇情往下一段
  if (storyIndex < storyLines.length) {
    showStory(); // 還有劇情就繼續顯示
  } else {
    storyDiv.style.display = "none"; // 劇情結束 → 隱藏劇情區
    startQuiz(); // 進入答題階段
  }
};

// 啟動答題功能
function startQuiz() {
  quizDiv.style.display = "block"; // 顯示答題區
  questionEl.textContent = "問題 1: 下列哪一項是古蹟保護的主要目的？"; // 題目
  const options = ["娛樂觀光", "歷史文化保存", "商業開發"]; // 選項
  optionsEl.innerHTML = ""; // 清空舊選項（避免重複）
  
  // 建立按鈕選項
  options.forEach(opt => {
    const btn = document.createElement("button"); // 建立一個按鈕
    btn.textContent = opt; // 設定按鈕文字
    btn.onclick = () => checkAnswer(opt); // 點擊按鈕 → 檢查答案
    optionsEl.appendChild(btn); // 把按鈕放進畫面
  });
}

// 檢查答案是否正確
function checkAnswer(answer) {
  if (answer === "歷史文化保存") {
    // 如果答對
    quizDiv.style.display = "none"; // 隱藏題目區
    endingDiv.style.display = "block"; // 顯示結局
  } else {
    // 如果答錯
    alert("答錯了！再想想看！"); // 提示玩家
  }
}
