const rainSwitch = document.getElementById("toggleRainSwitch");
const purringSwitch = document.getElementById("toggleCatSwitch");
const birdsSwitch = document.getElementById("toggleBirdsSwitch");
let body;
//Track container
let playButton;
let trackTitle;
let trackAuthor;

//audios
const rainSFX = new Audio("./soundtracks/rain.wav");
const purringSFX = new Audio("./soundtracks/purring.mp3");
const birdsSFX = new Audio("./soundtracks/birds.wav");
let currentTrack;
let currentID;
let currentBackgroundID;

//volumes
let mainVolume = 5;
const audioTracks = [
    {
        id: 0,
        path: "./soundtracks/deep-lofi-vibes-205062.mp3",
        title: "Deep LoFi vibes",
        author: "xethrocc"
    },
    {
        id: 1,
        path: "./soundtracks/lofi-orchestra-162306.mp3",
        title: "LoFi Orchestra",
        author: "xethrocc"
    },
    {
        id: 2,
        path: "./soundtracks/summer-rain-lofi-vibes-216043.mp3",
        title: "Summer rain LoFi vibes",
        author: "xethrocc"
    },
    {
        id: 3,
        path: "./soundtracks/avenue-lofi-154343.mp3",
        title: "Avenue",
        author: "xethrocc"
    },
    {
        id: 4,
        path: "./soundtracks/for-a-dream-lofi-vibes-216038.mp3",
        title: "For a dream",
        author: "xethrocc"
    },
    {
        id: 5,
        path: "./soundtracks/garden-vibes-lofi-160144.mp3",
        title: "Garden vibes",
        author: "xethrocc"
    },
    {
        id: 6,
        path: "./soundtracks/lofi-girl-dreams-113883.mp3",
        title: "Lofi Girl Dreams",
        author: "chillmore"
    },
    {
        id: 7,
        path: "./soundtracks/lofi-relax-chillhood-by-lofium-123327.mp3",
        title: "Childhood",
        author: "Lofium"
    }    
];
const backgrounds = [
    {
        id: 0,
        path: "./sprites/background.jpg"
    },
    {
        id:1,
        path: "./sprites/background2.jpg"
    },
    {
        id:2,
        path: "./sprites/1335808.png"
    },
    {
        id:3,
        path: "./sprites/1335809.png"
    },
    {
        id:4,
        path: "./sprites/cat-lofi-looking-outside-xx.jpg"
    },
    {
        id:5,
        path: "./sprites/Cat-Looking-Out-of-Window-Lofi-Background.jpg"
    },
    {
        id:6,
        path: "./sprites/Cats-in-Apartment-Lofi-Background.jpg"
    },
    {
        id:7,
        path: "./sprites/lofi.jfif"
    },
    {
        id:8,
        path: "./sprites/lofi-3840x2160-20994.jpeg"
    },
    {
        id:9,
        path: "./sprites/cafe-asian.jpg"
    },
    {
        id:10,
        path: "./sprites/lofi-girl-hd-wallpaper-2592x1824-21003.jpg"
    },
    {
        id:11,
        path: "./sprites/lofi-japanese-3840x2160-14884.jpg"
    },
    {
        id:12,
        path: "./sprites/wallpaper.jfif"
    }
]
function updateClock(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,0);
    const minutes = now.getMinutes().toString().padStart(2,0);
    const seconds = now.getSeconds().toString().padStart(2,0);
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000);
window.onload = function(){
    //handle sfx on start
    if(rainSwitch.checked)rainSFX.play();
    else rainSFX.load();
    if(purringSwitch.checked) purringSFX.play();
    else purringSFX.load();
    if(birdsSwitch.checked) birdsSFX.play();
    else birdsSFX.load();
    
    //play random track
    trackTitle = document.getElementById("title");
    trackAuthor = document.getElementById("author");  
    playButton = document.getElementById("play");

    //get body
    body = document.body;

    currentID = Math.floor(Math.random()*audioTracks.length);
    currentBackgroundID = Math.floor(Math.random()*backgrounds.length);
    playTrack(currentID);
    changeBackground();
    changeVolume(rainSFX, document.getElementById("rainVolume").value);
    changeVolume(purringSFX, document.getElementById("purringVolume").value);
    changeVolume(birdsSFX, document.getElementById("birdsVolume").value);
    changeVolume(currentTrack, document.getElementById("mainVolume").value);

};
//rainSFX events
rainSwitch.addEventListener("change", (event)=>{
    console.log(rainSwitch.checked);
    if(rainSwitch.checked) rainSFX.play();
    else rainSFX.load();
})

rainSFX.addEventListener("ended", function(){
    this.currentTime = 0;
    this.play();
}, false);
//catSFX events
purringSwitch.addEventListener("change", (event)=>{
    console.log(purringSwitch.checked);
    if(purringSwitch.checked) purringSFX.play();
    else purringSFX.load();
})

purringSFX.addEventListener("ended", function(){
    this.currentTime = 0;
    this.play();
}, false);
//birdsSFX event
birdsSwitch.addEventListener("change", (event)=>{
    console.log(birdsSwitch.checked);
    if(birdsSwitch.checked) birdsSFX.play();
    else birdsSFX.load();
})

birdsSFX.addEventListener("ended", function(){
    this.currentTime = 0;
    this.play();
}, false);

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("rainVolume").addEventListener("input", (event)=>{
    
        changeVolume(rainSFX, event.target.value);
        
    })
    document.getElementById("purringVolume").addEventListener("input", (event)=>{
        
        changeVolume(purringSFX, event.target.value);
        
    })
    document.getElementById("birdsVolume").addEventListener("input", (event)=>{
        
        changeVolume(birdsSFX, event.target.value);
        
    })
    document.getElementById("mainVolume").addEventListener("input", (event)=>{
        
        changeVolume(currentTrack, event.target.value);
        console.log("why not working");
    
    })
})

function playTrack(id){
    trackTitle.textContent = `Title: ${audioTracks[id].title}`;
    trackAuthor.textContent = `Author: ${audioTracks[id].author}`
    currentTrack = new Audio(audioTracks[id].path);
    currentTrack.play();

    //!
    currentTrack.addEventListener("ended", function(){
        nextTrack();
    }, false);
}

function nextTrack(){
    let tracksCount = audioTracks.length;
    currentTrack.load();
    currentID += 1;
    currentID %= tracksCount;
    playTrack(currentID);
    console.log(currentID);
    changeBackground();
}
function changeBackground(){
    body.classList.add('fade-out');
    oldBackgroundID = currentBackgroundID;
    currentBackgroundID = Math.floor(Math.random()*backgrounds.length);
    if(oldBackgroundID === currentBackgroundID) currentBackgroundID+=1;
    body.style.backgroundImage = `url(${backgrounds[currentBackgroundID].path})`;
}
function prevTrack(){
    let tracksCount = audioTracks.length;
    currentTrack.load();
    currentID = (currentID) == 0 ? tracksCount-1 : currentID - 1;
    playTrack(currentID);
    console.log(currentID); 
}
function pausePlay(){
    if(currentTrack.paused) {
        currentTrack.play();
        playButton.textContent = "pause";
    }
    else {
        currentTrack.pause();
        playButton.textContent = "play";
    }  
    console.log("pause or play");
   
}
function changeVolume(audio, value){
    audio.volume = value/10.0;
}