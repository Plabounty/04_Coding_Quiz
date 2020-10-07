let startGame = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");
let mixedQuestions, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
let timeEl = document.getElementById("timeEl");
let secondsLeft = 101;
startGame.addEventListener("click", function () {
  setTimer();
});

function setTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

startGame.addEventListener("click", function () {
  startQuiz();
  setTimer();
});

function startQuiz() {
  startGame.classList.add("hide");
  mixedQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  viewQuestion(mixedQuestions[currentQuestionsIndex]);
}

function viewQuestion(question) {
  questionElement.innerText = question.question;
}

function selectAnswer() {
    
}

const questions = [
  {
    quesiton: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "12", correct: false },
      { text: "8", correct: false },
      { text: "3", correct: false },
    ],
  },
];
