const audio = document.getElementById("audio");
const audioTitle = document.getElementById("audioTitle");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("f10");
const backwardBtn = document.getElementById("b10");
const speedSelect = document.getElementById("speed");
const progress = document.getElementById("slider");
const volume = document.getElementById("volumeSlider");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const topImg = document.getElementById("topImage");
const volumeIcon = document.getElementById("volumeImg");


audioTitle.textContent = String(audio.src).split("/").pop().split(".")[0];
const STORAGE_TIME_KEY = audioTitle+"_time";
const STORAGE_VOLUME_KEY = audioTitle+"_volume";
 


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

function onLoadMetadata() {
    const savedTime = localStorage.getItem(STORAGE_TIME_KEY);
    const savedVolume = localStorage.getItem(STORAGE_VOLUME_KEY);


    if (savedTime !== null) {
        const time = Number(savedTime);
        if (time < audio.duration) {
            audio.currentTime = time;
        }
    }

    duration.textContent = formatTime(audio.duration);




if (savedVolume !== null) {
    volume.value = savedVolume;
    audio.volume = savedVolume / 10;
    updateVolumeSliderFill(savedVolume);

    volumeIcon.src = Number(savedVolume) === 0
        ? "volume-mute.png"
        : "volume.png";
}
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.src = "pause.png";
        topImg.style.animationPlayState = "running";
    } else {
        audio.pause();
        playBtn.src = "play.png";
        topImg.style.animationPlayState = "paused";
    }
}


function timeUpdate() {

  if (!isNaN(audio.duration) && !isNaN(audio.currentTime)) {

        duration.textContent = formatTime(audio.duration);

        currentTime.textContent = formatTime(audio.currentTime);

        progress.value = (audio.currentTime / audio.duration) * 100;

        updateSliderFill((audio.currentTime / audio.duration) * 100);

        volumeUpdate();

        if (audio.currentTime === audio.duration) {
            playBtn.src = "play.png";
            topImg.style.animationPlayState = "paused";
            audio.pause();
        }

        localStorage.setItem(STORAGE_TIME_KEY, audio.currentTime);
    }

}


function volumeUpdate() {
    audio.volume = volume.value / 10;

    updateVolumeSliderFill(volume.value);


    if (volume.value == 0) {
        volumeIcon.src = "volume-mute.png";
    } else {
        volumeIcon.src = "volume.png";
    }
localStorage.setItem(STORAGE_VOLUME_KEY, volume.value);

}

function updateSliderFill(value) {
    progress.style.background = `
         linear-gradient(
            to right,
            #093217a0,
            #05c605 ${value}%,
            #0e542622 ${value}%,
            #0e542622 100%
        )
    `;
}

function updateVolumeSliderFill(value) {
    const percent = (value / 10) * 100;

    volume.style.background = `
        linear-gradient(
            to right,
            #05c6053f 0%,
            #05c6059f ${percent}%,
            #0e542600 ${percent}%,
            #09321778 100%
        )
    `;
}


function movingSlider() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}


function changeSpeed() {
    audio.playbackRate = speedSelect.value;
}

function forward10() {
    audio.currentTime += 10;
}

function backward10() {
    audio.currentTime -= 10;
}



//event listeners

audio.addEventListener("loadedmetadata", onLoadMetadata());

playBtn.addEventListener("click", togglePlay);

audio.addEventListener("timeupdate", timeUpdate);

progress.addEventListener("input", movingSlider);

speedSelect.addEventListener("change", changeSpeed);

forwardBtn.addEventListener("click", forward10);

backwardBtn.addEventListener("click", backward10);

volume.addEventListener("input", volumeUpdate);



