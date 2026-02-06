const audio = document.getElementById("audio");
const audioTitle = document.getElementById("audioTitle");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("f10");
const backwardBtn = document.getElementById("b10");
const speedSelect = document.getElementById("speed");
const progress = document.getElementById("slider");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const topImg = document.getElementById("topImage");

audioTitle.textContent = String(audio.src).split("/").pop().split(".")[0];

//handler funcs
function formatTime(time) {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    return (
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0")
    );
}

function togglePlay(){
    if(audio.paused){
        audio.play();
        playBtn.src = "pause.png";
        topImg.style.animationPlayState = "running";
    }else{
        audio.pause();
        playBtn.src = "play.png";
        topImg.style.animationPlayState = "paused";
    }
}


function timeUpdate(){
if (!isNaN(audio.duration)&& !isNaN(audio.currentTime)) {
    
duration.textContent = formatTime(audio.duration);

currentTime.textContent = formatTime(audio.currentTime);

 progress.value = (audio.currentTime / audio.duration) * 100;

updateSliderFill((audio.currentTime / audio.duration) * 100);

if(audio.currentTime === audio.duration){
    playBtn.src = "play.png";
    topImg.style.animationPlayState = "paused";
    audio.pause();
}
}
    
}



function updateSliderFill(value) {
    progress.style.background = `
         linear-gradient(
            to right,
            #0e542634 0%,
            #05c605 ${value}%,
            #0e542622 ${value}%,
            #0e542622 100%
        )
    `;
}


function movingSlider(){
    audio.currentTime = (progress.value / 100) * audio.duration;
}


function changeSpeed(){
    audio.playbackRate = speedSelect.value;
}

function forward10(){
    audio.currentTime += 10;
}

function backward10(){
    audio.currentTime -= 10;
}



//event listeners

audio.addEventListener("loadedmetadata", timeUpdate);

playBtn.addEventListener("click", togglePlay);

audio.addEventListener("timeupdate", timeUpdate);

progress.addEventListener("input",movingSlider);

speedSelect.addEventListener("change", changeSpeed);

forwardBtn.addEventListener("click", forward10);

backwardBtn.addEventListener("click", backward10);



