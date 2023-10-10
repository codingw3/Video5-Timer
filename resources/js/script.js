const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
const alarm = document.getElementById("alarm");

let intervalId;
let totalTime;
let currentTime;

function updateTimerDisplay() {
  const displayHours = Math.floor(currentTime / 3600);
  const displayMinutes = Math.floor((currentTime % 3600) / 60);
  const displaySeconds = currentTime % 60;
  const formattedHours = displayHours < 10 ? "0" + displayHours : displayHours;
  const formattedMinutes =
    displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;
  const formattedSeconds =
    displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;
  timerDisplay.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTime = hours * 3600 + minutes * 60 + seconds;
    if (totalTime > 0) {
      startTimer();
    }
  }
});

pauseButton.addEventListener("click", function () {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
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
  hoursInput.value = "0";
  minutesInput.value = "0";
  secondsInput.value = "0";
});
