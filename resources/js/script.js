const timer = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const alarm = document.getElementById("alarm");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

let intervalId;
let totalTime;
let currentTime;
let isPaused = false; // Variável para controlar o estado de pausa

function updateTimerDisplay() {
  const displayMinutes = Math.floor(currentTime / 60);
  const displaySeconds = currentTime % 60;
  const formattedMinutes =
    displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;
  const formattedSeconds =
    displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;
  timer.innerText = formattedMinutes + ":" + formattedSeconds;
}

function startTimer() {
  currentTime = totalTime;
  updateTimerDisplay();
  intervalId = setInterval(function () {
    currentTime--;
    updateTimerDisplay();
    if (currentTime === 0) {
      clearInterval(intervalId);
      alarm.play();
    }
  }, 1000);
}

startButton.addEventListener("click", function () {
  if (!intervalId) {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTime = minutes * 60 + seconds;
    if (totalTime > 0) {
      startTimer();
    }
  }
});

pauseButton.addEventListener("click", function () {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    isPaused = true; // Define o estado como pausado
    alarm.pause();
  }
});

resetButton.addEventListener("click", function () {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  totalTime = 0;
  currentTime = 0;
  updateTimerDisplay();
  alarm.pause();
  alarm.currentTime = 0;
  minutesInput.value = "0";
  secondsInput.value = "0";
  isPaused = false; // Define o estado como não pausado ao reiniciar
});
