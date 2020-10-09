let startButton = document.getElementById("start-btn");
let nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
let mixedQuestions, currentQuestionIndex;
let questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let timeEl = document.getElementById("timeEl");
let secondsLeft = 101;

let timerInterval;
function setTimer() {
  timerInterval = setInterval(function () {
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
  secondsLeft = 101;
  if (timerInterval) {
    clearInterval(timerInterval);
  }
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
let lastScore;
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct !== "true") {
    secondsLeft -= 10;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (mixedQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    // Game Over
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
    lastScore = secondsLeft;
  }
}
document.getElementById("score-btn").addEventListener("click", viewScores);

function viewScores() {
  document.getElementById("quiz").classList.add("hide");
  document.getElementById("scores").classList.remove("hide");
  document.getElementById("thisscore").innerHTML = lastScore;
}
// document.getElementById("initailsubmit").addEventListener("click", saveUserScore);

function saveUserScore() {
  const initials = document.getElementById("initials").value;
  if (initials === "" || lastScore === undefined) {
    return;
  }
  document.getElementById("initialAndButton").classList.add("hide");
  let currentScores = localStorage.getItem("quizScores");
  if (currentScores === null) {
    currentScores = "";
  } else {
    let scores = currentScores.split(",");
    let scores2 = [];
    for (let s = 0; s < scores.length; s += 2) {
      if (initials !== scores[s]) {
        scores2.push(initials, scores[s + 1]);
      }
    }
    currentScores = scores2.join(",");
    // replace value for this user if necessary
  }
  if (currentScores !== "") {
    currentScores += ",";
  }
  currentScores += `${initials},${lastScore}`;
  localStorage.setItem("quizScores", currentScores);

  // display all scores
  let dl = document.createElement("dl");
  let scores = currentScores.split(",");
  for (let s = 0; s < scores.length; s += 2) {
    let dt = document.createElement("dt");
    dt.innerHTML = scores[s] + ": " + scores[s + 1];
    dl.appendChild(dt);
  }
  let thisScore = document.getElementById("thisscore");
  thisScore.innerHTML = "";
  thisScore.appendChild(dl);
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
