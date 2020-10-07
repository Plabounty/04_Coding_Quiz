let startGame = document.getElementById("start-btn");
let timeEl = document.getElementById("timeEl");
let secondsLeft = 101
startGame.addEventListener("click", function(){
    setTimer()
});

function setTimer(){
let timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}


