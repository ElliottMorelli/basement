var audioCtx;

var dragSource;

var source;

async function loadBuffer(bufferURL) {
    //better to have a try/catch block here, but for simplicity...
    const response = await fetch(bufferURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    playBirdAudio();
})



async function playBirdAudio(){
    audioCtx = new AudioContext();



    dragSource = await loadBuffer('./you_dont_own_me.mp3');
    source = audioCtx.createBufferSource();
    source.buffer = dragSource;

    var lowpass = audioCtx.createBiquadFilter();

    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(900, audioCtx.currentTime);

    var globalGain = audioCtx.createGain();
    globalGain.gain.setValueAtTime(0.3, audioCtx.currentTime);


    source.connect(lowpass).connect(globalGain).connect(audioCtx.destination); 

    
    source.start();
   

}


function enterClub(){
    window.location.href = "./club.html";

}
function enterEle(){
    window.location.href = "./elevator.html";

}