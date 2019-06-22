const WORK_COUNT_START = 25 * 60;
const BREAK_COUNT_START = 5 * 60;
let workCount = WORK_COUNT_START;
let breakCount = BREAK_COUNT_START;

const cont = document.querySelector(".container");
const clock = document.querySelector("#clock");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let interval = -1;
let isBreak = false;
let isRunning = false;

function addEventListeners() {
    startBtn.addEventListener("click", start);
    pauseBtn.addEventListener("click", pause);
    resetBtn.addEventListener("click", reset);
}

function start() {
    interval = setInterval(count, 1000);
    isRunning = true;
    setDisplay();
}

function pause() {
    clearInterval(interval);
    isRunning = false;
    setDisplay();
}

function resetValues() {
    workCount = WORK_COUNT_START;
    breakCount = BREAK_COUNT_START;
    isBreak = false;
}

function reset() {
    pause();
    resetValues();
    updateClock(workCount);
}

function count() {
    if (workCount == 0 && breakCount == 0) {
        resetValues();
        setDisplay();
        return;
    }
    
    if (!isBreak) {
        if (workCount > 0) {
            workCount--;
            
            updateClock(workCount);
        } else {
            isBreak = true;
            setDisplay();
        }
    } else {
        if (breakCount > 0) {
            breakCount--;
            
            updateClock(breakCount);
        } else {
            isBreak = false;
            setDisplay();
        }
    }
}

function setDisplay() {
    if (!isRunning) {
        cont.classList.remove("work-container");
        cont.classList.remove("break-container");
        clock.classList.remove("work-clock");
        clock.classList.remove("break-clock");
    } else {
        if (!isBreak) {            
            cont.classList.add("work-container");
            cont.classList.remove("break-container");
            clock.classList.add("work-clock");
            clock.classList.remove("break-clock"); 
        } else {
            cont.classList.remove("work-container");
            cont.classList.add("break-container");
            clock.classList.remove("work-clock");
            clock.classList.add("break-clock");
        }
    }
}

function updateClock(count) {
    let min = Math.floor(count / 60);
    let sec = count % 60;

    // display a leading 0 for numbers < 10
    if (min < 10) {
        min = "0" + min;
    } 
    if (sec < 10) {
        sec = "0" + sec;
    } 

    clock.innerHTML = min + ":" + sec;
}

addEventListeners();