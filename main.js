const music =[
    {
        id:1,
        name:"Dusk Till Dawn (ft.Sia)",
        artist:"Zayn, Sia",
        thumbnail:"https://images.pexels.com/photos/5982829/pexels-photo-5982829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        audio:"dusk till dawn.mp3"
    },
    {
        id:2,
        name:"Closer (ft. Hasley)",
        artist:"Chainsmokers, Hasley",
        thumbnail:"https://images.pexels.com/photos/2224424/pexels-photo-2224424.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        audio:"Closer.mp3"
    },
    {
        id:3,
        name:"Mad World (Feat. Michael Andrews)",
        artist:"Gary Jules",
        thumbnail:"https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        audio:"Mad World.mp3"
    },
    {
        id:4,
        name:"Something Just Like This",
        artist:"Chainsmokers, Coldplay",
        thumbnail:"https://images.pexels.com/photos/3059274/pexels-photo-3059274.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        audio:"Something Just Like This.mp3"
    },
]
var playlistIndex=0;
// music details init
const musicName =document.getElementById('musicName')
const musicArtist =document.getElementById('musicArtist')
const thumbnail =document.getElementById('musicThumbnail')
const audiotrack = document.getElementById('audioTag')
var currentTime= document.getElementById('currTime');
var totalTime=document.getElementById('totalTime');
// controls init

const prev= document.getElementById('prev');
const playpause= document.getElementById('playpause');
const next =document.getElementById('next')
const loop= document.getElementById('repeat');
const slider = document.getElementById('songseek');
const mute =document.getElementById('mute')
const repeatIcon=document.getElementById('repeatIcon')
const shuffle =document.getElementById('shuffle');
function fetchdetails(index)
{
    musicName.innerHTML=music[index].name;
    musicArtist.innerHTML=music[index].artist;
    thumbnail.src=music[index].thumbnail;
    audiotrack.src=music[index].audio;
    // totalTime.innerHTML=audiotrack.duration;
  
    audiotrack.play();
    setInterval(() => {
        let currentMinutes = Math.floor(audiotrack.currentTime / 60); 
        let currentSeconds = Math.floor(audiotrack.currentTime - currentMinutes * 60);
       
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
        
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
     
        currentTime.innerHTML=`${currentMinutes}:${currentSeconds}`
        
    }, 990);
    // totalTime.innerHTML=`${durationMinutes}:${durationSeconds}`
    
}
document.addEventListener('load',fetchdetails(playlistIndex))

prev.addEventListener('click',()=>{
    if(playlistIndex==0)
    playlistIndex=music.length-1;
    else
    playlistIndex--;
    console.log(playlistIndex)
    fetchdetails(playlistIndex)
})

next.addEventListener('click',()=>{
    if(playlistIndex==music.length-1)
    playlistIndex=0;
    else
    playlistIndex++;
    console.log(playlistIndex)
    fetchdetails(playlistIndex)
})
playpause.addEventListener('click',()=>{
    if (audiotrack.paused)
    {
      playpause.innerHTML=`<i class="fa fa-pause-circle" aria-hidden="true"></i>`

   audiotrack.play()
    }
    else
    {
        playpause.innerHTML=`<i class="fa fa-play-circle" aria-hidden="true"></i>`
     
        audiotrack.pause()
    }
})
slider.addEventListener('mousedown',function(event){seeking=true; seek(event)});
slider.addEventListener("mousemove", function(event){seek(event)})
slider.addEventListener("mouseup", function(){seeking=false})

audiotrack.addEventListener('ended',()=>{
    
    if(audiotrack.loop==false)
    {
        if(playlistIndex==music.length-1)
        playlistIndex=0;
        else
        playlistIndex++;
        console.log(playlistIndex)
        fetchdetails(playlistIndex)
    }
    
    slider.value=0;
})
loop.addEventListener('click',()=>{
    if(audiotrack.loop==true)
    {
    audiotrack.loop=false;
   repeatIcon.src="repeat.svg"
   
    }
    else
    {
        audiotrack.loop=true;
        repeatIcon.src="repeat-green.svg"
        console.log('looping')
    
    }
    
})

function seek(event)
{
    if(audiotrack.duration ==0)
    {
        null
    }
    else
    {
        if(seeking)
        {
            slider.value= event.clientX - slider.offsetLeft;
            seekto= audiotrack.duration*(slider.value/100);
            audiotrack.currentTime= seekto;
        }
    }
}

function seekTo()
{
    var seekto = audiotrack.duration * (slider.value / 100); 
audiotrack.currentTime= seekto;
}

mute.addEventListener('click',()=>{
    if(audiotrack.muted==true)
    
    {
       audiotrack.muted=false
       mute.innerHTML=`<i class="fa fa-volume-down" aria-hidden="true"></i>`
    }
    else

    {
       audiotrack.muted=true
       mute.innerHTML=`<i class="fa fa-volume-off" aria-hidden="true"></i>`
    }
})


shuffle.addEventListener('click',()=>{
    let rand = Math.floor(Math.random() * music.length) ; 
    fetchdetails(rand)
    // audiotrack.addEventListener('ended',()=>{
    //     fetchdetails(rand)
    // })
})