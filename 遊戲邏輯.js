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
let storyIndex = 0;
const storyLines = [
  "你穿越到了古代，眼前是一座神秘的古蹟……",
  "在探索的過程中，你發現了一些奇怪的符號。",
  "這些符號似乎和某些法規有關……",
  "要解開這個謎題，你必須回答問題！"
];

const storyText = document.getElementById('story-text');
const nextBtn = document.getElementById('next-btn');

nextBtn.onclick = () => {
  storyText.textContent = storyLines[storyIndex];
  storyIndex++;
  if (storyIndex >= storyLines.length) {
    // 劇情結束 → 顯示分頁
    document.getElementById('story').style.display = 'none';
    showGameTabs();
  }
};


// 檢查玩家答案
function checkAnswer() {
  const input = document.getElementById("answer").value.trim();
  const feedback = document.getElementById("feedback");

  if (input === "歷史文化保存") {
    feedback.textContent = "✅ 答對了！你解鎖了新內容！";

    // 解鎖法規內容
    document.getElementById("law-content").innerHTML = `
      <p>《文化資產保存法》第1條：</p>
      <blockquote>文化資產應予保存，以延續歷史文化。</blockquote>
    `;

    // 同時可解鎖歷史內容
    document.getElementById("history-content").innerHTML = `
      <p>鳳山龍山寺建於清代，是地方信仰與文化的重要象徵。</p>
    `;

    // 顯示結局按鈕
    feedback.innerHTML += `<br><button onclick="showPage('ending')">回到未來</button>`;

  } else {
    feedback.textContent = "❌ 再想想看喔～";
  }
}

// 回首頁（假設首頁是 index.html）
function goHome() {
  window.location.href = "index.html";
}


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
// 選擇題題目
const questions = [
  {
    question: "鳳山龍山寺建於哪個時期？",
    options: ["清朝", "日治時期", "民國初年"],
    answer: "清朝"
  },
  {
    question: "龍山寺主要供奉的神祇是？",
    options: ["觀音菩薩", "媽祖", "關聖帝君"],
    answer: "觀音菩薩"
  },
  {
    question: "龍山寺現今位於哪個縣市？",
    options: ["高雄市", "台南市", "屏東縣"],
    answer: "高雄市"
  }
];

// === 🏁 顯示結局 ===
function showEnding() {
  quizDiv.style.display = "none";
  endingDiv.style.display = "block";
}
