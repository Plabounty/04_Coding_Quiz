let startButton = document.getElementById("start-btn");
let nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
let mixedQuestions, currentQuestionIndex;
let questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let timeEl = document.getElementById("timeEl");
let secondsLeft = 101;
startButton.addEventListener("click", function () {
  setTimer();
});

function setTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startButton.addEventListener("click", function () {
  startQuiz();
  setTimer();
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});

function startQuiz() {
  startButton.classList.add("hide");
  mixedQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  resetState();
  viewQuestion(mixedQuestions[currentQuestionIndex]);
}

function viewQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (mixedQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "alert box('Hello World');", correct: false },
      { text: "msgBox('Hello World');", correct: false },
      { text: "alert('Hello World');", correct: true },
      { text: "msg('Hello World');", correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction{}", correct: false },
      { text: "fucntion = myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
    ],
  },
  {
    question: "What syntax is used to call a function?",
    answers: [
      { text: "call function myFunction", correct: false },
      { text: "myFunction()", correct: true },
      { text: "call myFunction()", correct: false },
      { text: "myFunction{}", correct: false },
    ],
  },
  {
    question: "How does a FOR loop start?",
    answers: [
      { text: "for(i<=5; i++)", correct: false },
      { text: "for(i=0; i<=5)", correct: false },
      { text: "for i=1 to 5", correct: false },
      { text: "for(i=0; i<=5; i++)", correct: true },
    ],
  },
];
