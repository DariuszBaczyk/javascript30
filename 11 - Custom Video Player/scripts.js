"use strict";
/* Get elements */
const video = document.querySelector('.viewer');
const play = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const ranges = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');

/* Functions */
function playVideo() {
    if(play.innerHTML === '►') {
        video.play();  
        changeButton();
    } else {
        video.pause();
        changeButton();
    }
}

function changeButton() {
    play.innerHTML === '►' ? play.innerHTML = '❚ ❚' : play.innerHTML = '►';  
}

function updateProgressBar() {
    const percentage = Math.floor((100 / video.duration) * video.currentTime);
    progressBar.style.flexBasis = `${percentage}%`;
}

function updateRange() {
    video[this.name] = this.value;
}

function updateSkip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateProgress(e) {
    const mouse = e.pageX - progress.offsetWidth;
    const newTime = mouse * video.duration / progress.offsetWidth;

    video.currentTime = newTime;
}

/* Listeners */
video.addEventListener('click', playVideo);

video.addEventListener('timeupdate', updateProgressBar);

ranges.forEach(range => range.addEventListener('click', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

skipButtons.forEach(skipButton => skipButton.addEventListener('click', updateSkip));

progress.addEventListener('click', updateProgress);
