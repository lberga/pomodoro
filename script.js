let timeLeft;
let timerId = null;
let isWorkMode = true;

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

// DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workModeBtn = document.getElementById('workMode');
const breakModeBtn = document.getElementById('breakMode');

// Initialize timer
function initializeTimer() {
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Timer countdown function
function startTimer() {
    if (timerId !== null) return;
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            alert(isWorkMode ? 'Work time is over! Take a break!' : 'Break time is over! Back to work!');
            resetTimer();
        }
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

// Pause timer
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset timer
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    initializeTimer();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Switch modes
function switchMode(mode) {
    isWorkMode = mode === 'work';
    workModeBtn.classList.toggle('active', isWorkMode);
    breakModeBtn.classList.toggle('active', !isWorkMode);
    resetTimer();
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workModeBtn.addEventListener('click', () => switchMode('work'));
breakModeBtn.addEventListener('click', () => switchMode('break'));

// Initialize the timer when the page loads
initializeTimer(); 