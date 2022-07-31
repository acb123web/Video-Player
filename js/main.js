var playBtn = document.getElementById("play");
var stopBtn = document.getElementById("stop");
var video = document.getElementById("video");
var progressbar = document.getElementById("progressbar");
var timestamp = document.getElementById("timestamp");
var timestamp1 = document.getElementById("timestamp1");

var i = setInterval(function(){
    if(video.readyState > 0){
        var minutes = parseInt(video.duration / 60, 10);
        var seconds = Math.floor(video.duration % 60);
        if(minutes < 10){
            minutes = "0" + String(minutes);
        }
        if(seconds < 10){
            seconds = "0" + String(seconds);
        }
        /*displaying duration on display*/
        timestamp1.innerHTML = `${minutes}:${seconds}`;
        clearInterval(i);
    }
},200);

function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}
function updatePlayIcon(){
   if(video.paused){
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
   }else{
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
   }
}
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

function updateProgressbar(){
    progressbar.value = (video.currentTime * 100) / video.duration;

    let min = Math.floor(video.currentTime / 60);
    let sec =  Math.floor(video.currentTime - min * 60);
    if(min < 10){
        min = "0" + String(min); 
    }
    if(sec < 10){
        sec = "0" + String(sec); 
    }
    timestamp.innerText = `${min}:${sec}`;
}

function dragProgressbar(){
    video.currentTime = (+progressbar.value * video.duration) / 100;
}

playBtn.addEventListener("click", toggleVideoStatus);
video.addEventListener("click",toggleVideoStatus);

video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play",updatePlayIcon);

stopBtn.addEventListener("click", stopVideo);

video.addEventListener('timeupdate', updateProgressbar);
progressbar.addEventListener("change", dragProgressbar);
