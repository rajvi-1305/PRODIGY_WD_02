let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
    showButton('PAUSE');
}

function pauseTimer() {
    clearInterval(timerInterval);
    showButton('START');
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00:00';
    elapsedTime = 0;
    laps.innerHTML = '';
    showButton('START');
}

function recordLap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    laps.appendChild(lapTime);
}

function showButton(buttonKey) {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    if (buttonKey === 'START') {
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    } else {
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);