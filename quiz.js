const questions = [
  {
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "def", "dim"],
    answer: 1,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Syntax",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Styling System",
    ],
    answer: 2,
  },
  {
    question: "Which HTML tag is used to link an external stylesheet?",
    options: ["<style>", "<script>", "<link>", "<css>"],
    answer: 2,
  },
  {
    question: "What does the '===' operator check in JavaScript?",
    options: [
      "Value only",
      "Type only",
      "Value and type",
      "Reference equality",
    ],
    answer: 2,
  },
  {
    question: "Which method adds an element to the END of a JavaScript array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question:
      "What is the correct way to write a single-line comment in JavaScript?",
    options: ["# comment", "<!-- comment -->", "/* comment */", "// comment"],
    answer: 3,
  },
  {
    question:
      "Which CSS property controls the space INSIDE an element's border?",
    options: ["margin", "padding", "border-spacing", "spacing"],
    answer: 1,
  },
  {
    question: "What does DOM stand for in web development?",
    options: [
      "Document Object Model",
      "Data Output Method",
      "Dynamic Object Manager",
      "Document Order Map",
    ],
    answer: 0,
  },
  {
    question:
      "Which array method creates a NEW array by transforming each element?",
    options: ["forEach()", "filter()", "map()", "reduce()"],
    answer: 2,
  },
  {
    question: "In HTML, which attribute makes an &lt;input&gt; field required?",
    options: ["mandatory", "validate", "required", "must"],
    answer: 2,
  },
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");

const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");

const scoreNum = document.getElementById("scoreNum");
const scoreDenom = document.getElementById("scoreDenom");
const correctCount = document.getElementById("correctCount");
const wrongCount = document.getElementById("wrongCount");
const resultTitle = document.getElementById("resultTitle");
const resultSub = document.getElementById("resultSub");

function show(el) {
  el.style.display = "block";
}
function hide(el) {
  el.style.display = "none";
}

let currentIndex = 0;
let score = 0;
let answered = false;
let total = questions.length;

/* Start Quiz */
function startQuiz() {
  hide(startScreen);
  show(quizScreen);
  loadQuestion();
}

function loadQuestion() {
  answered = false;

  let current = questions[currentIndex];

  progressLabel.textContent = `${currentIndex + 1} / ${total}`;
  progressFill.style.width = `${((currentIndex + 1) / total) * 100}%`;
  questionNumber.textContent = `Question ${String(currentIndex + 1).padStart(2, "0")}`;

  questionText.innerHTML = current.question;

  /* Clear old options */
  optionsContainer.innerHTML = "";

  /* Build option buttons */
  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.style.animationDelay = index * 0.07 + "s";
    btn.setAttribute("data-index", index);
    btn.disabled = false;

    let textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = current.options[index];

    let badgeSpan = document.createElement("span");
    badgeSpan.className = "option-badge";
    badgeSpan.id = "badge-" + index;

    btn.appendChild(textSpan);
    btn.appendChild(badgeSpan);

    btn.addEventListener("click", handleAnswer);
    optionsContainer.appendChild(btn);
  });

  nextBtn.textContent =
    currentIndex === total - 1 ? "See Results →" : "Next Question →";
  nextBtn.classList.remove("visible");
}

/* Handle Answer Selection */
function handleAnswer(event) {
  if (answered) {
    return;
  }

  answered = true;

  let selectedIndex = Number(event.currentTarget.getAttribute("data-index"));
  let correctIndex = questions[currentIndex].answer;

  /* Disable all buttons */
  var allButtons = optionsContainer.querySelectorAll(".option");
  for (var btn of allButtons) {
    btn.disabled = true;
  }

  /* Mark selected */
  if (selectedIndex === correctIndex) {
    score++;
    allButtons[selectedIndex].classList.add("correct");
    document.getElementById(`badge-${selectedIndex}`).textContent = "✓";
  } else {
    allButtons[selectedIndex].classList.add("wrong");
    document.getElementById(`badge-${selectedIndex}`).textContent = "✕";
    /* Reveals correct */
    allButtons[correctIndex].classList.add("correct");
    document.getElementById(`badge-${correctIndex}`).textContent = "✓";
  }

  nextBtn.classList.add("visible");
}

/* Next Question / Finish */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < total) {
    loadQuestion();
  } else {
    showResults();
  }
}

/* show Results */
function showResults() {
  hide(quizScreen);
  show(resultsScreen);

  let wrong = total - score;

  scoreNum.textContent = score;
  scoreDenom.textContent = "/ " + total;
  correctCount.textContent = score;
  wrongCount.textContent = wrong;

  let title, sub;
  switch (true) {
    case score === 10:
      title = "Perfect Score!";
      sub = "You got every single one right. That's not luck, that's mastery.";
      break;
    case score >= 8:
      title = "So Close!";
      sub =
        "8 or 9 out of 10 — you clearly know this stuff. One or two slipped through.";
      break;
    case score >= 6:
      title = "Decent Run";
      sub = "More right than wrong, which counts. A few gaps worth revisiting.";
      break;
    case score >= 4:
      title = "Needs Work";
      sub = "You got some, missed more. Nothing studying won't fix — go again.";
      break;
    default:
      title = "Early Days";
      sub = "Rough start, but that's what first attempts are for. Try again.";
      break;
  }

  resultTitle.textContent = title;
  resultSub.textContent = sub;
}

/* Restart */
function restart() {
  currentIndex = 0;
  score = 0;
  answered = false;

  hide(resultsScreen);
  show(startScreen);
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restart);
