const buttons = document.querySelectorAll('button');
const ownValue = document.querySelector('[name="customForm"]');
const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
let countdown;

function getTime() {
    let seconds = parseInt(this.dataset.time);
    countStart(seconds);
}

function getMinutes(e) {
    e.preventDefault();
    let minutes = this.minutes.value;
    let seconds = minutes * 60;
    countStart(seconds);
    this.reset();
}

function countStart(seconds) {
    clearInterval(countdown);
    
    displayTimer(seconds);
    displayBackTime(seconds);
    
    countdown = setInterval(() => {
        seconds -= 1;
        displayTimer(seconds);
        if(seconds < 1) {
            clearInterval(countdown)
            return;
        };
    }, 1000);
}

function displayTimer(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    timeLeft.innerHTML = `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
}

function displayBackTime(seconds) {
    let timeNow = Date.now() + seconds * 1000;
    let hours = Math.floor((timeNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((timeNow % (1000 * 60 * 60)) / (1000 * 60));
    timeEnd.innerHTML = `Be back at ${hours}:${minutes >= 10 ? minutes : '0' + minutes}`;
}

buttons.forEach(button => button.addEventListener('click', getTime));
ownValue.addEventListener('submit', getMinutes);