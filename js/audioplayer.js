
var audioCtx;
var audioElement;
var analyser;
var audioSrc;
var masterJSON;
var currentTrackID = 1;
var prevTrackID;
var trackCount;
var btnSelectClr = '#fff';
var btnDeSelectClr = '#555';

window.addEventListener('load', init, false);

function init() 
{
    try 
    {
      // Create audio context / Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    //console.log("READING TEXT FILE");

    //Get <audio> element
    audioElement = document.getElementById('player'); //creates a HTML5 Audio Element
    //var audio = new Audio();
    audioElement.src = 'audio/Bust Your Move.mp3';
    audioElement.controls = true;
    audioElement.autoplay = false;
    playTrack(audioElement.src);
}

//Wait for window.onload to fire. See crbug.com/112368
window.addEventListener('load', function(e) 
{
  //Our <audio> element will be the audio source.
  //turn into a MediaElementAudioSourceNode so that we can manipulate the audio from its source
  audioSrc = audioCtx.createMediaElementSource(audioElement);
  //create AnalyserNode so that we can retrieve frequency data
  analyser = audioCtx.createAnalyser();
  //Bind our analyser to the media element source.
  //connect the output of our <audio> element to the input of our analyser
  audioSrc.connect(analyser);
  //connect to the audioCtx.destination (our speakers)
  audioSrc.connect(audioCtx.destination);


    function readTextFile(file, callback) 
    {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() 
        {
          if(rawFile.readyState === 4)
          {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              var allText = rawFile.responseText;
              //console.log("load here: " + typeof allText);
              callback(JSON.parse(allText));
            }
          }
        }
      rawFile.send(null);
    }

    //read JSON, create lists of tracks
    readTextFile("playlist.json", function(jsonData)
    {
      var playlistUL = document.getElementById("plList");
      masterJSON = jsonData;
      console.log("JSON LENGTH: " + jsonData.length);
      trackCount = jsonData.length;

        for (var key in jsonData)
        {
          if (jsonData.hasOwnProperty(key))
          {
            // here you have access to
            var trackNumber = jsonData[key].track;
            var trackName = jsonData[key].name;
            var artist = jsonData[key].artist;
            //console.log(name);

            var nextSong = document.createElement("li");
            nextSong.id = trackNumber;
            nextSong.innerHTML = '<div class="plItem" id=' + trackNumber + '><div class="plNum">' + trackNumber + '.</div><div class="plTitle" id=' + trackNumber + '>' + trackName + '</div><div class="plLength">' + artist + '</div></div>';

            console.log("Next Song: " + nextSong);

            playlistUL.appendChild(nextSong);
          }
        } 
        setCurrentTrack(0); //set up first track
    });
});
//Close window.addEventListener('load');


/*****************************************************************/
//BUTTON EVENTS

  document.getElementById("plList").addEventListener("click",function(e) 
  {
    if (e.target && e.target.matches("plTitle"), true) 
    {
      prevTrackID = currentTrackID;
      currentTrackID = e.target.id
      var songID = e.target.id-1;
      playTrack(masterJSON[songID].file)
      setCurrentTrack(songID);
    }
  }, false);
    

  document.getElementById("btnNext").addEventListener("click", function(e)
  { 
    if(currentTrackID < trackCount)
    {         
      prevTrackID = currentTrackID;
      currentTrackID++;
      var songID = currentTrackID-1;
      playTrack(masterJSON[songID].file)
      setCurrentTrack(songID);
    }         
  }, false);
 

document.getElementById("btnPrev").addEventListener("click", function(e)
  {    
    if(currentTrackID > 1)
    {
      prevTrackID = currentTrackID;
      currentTrackID--;
      var songID = currentTrackID-1;
      playTrack(masterJSON[songID].file)
      setCurrentTrack(songID);
    }        
  }, false);



/*****************************************************************/
//FUNCTIONS

function playTrack(src)
{
    audioElement.src = src;
    audioElement.play();
}


function setCurrentTrack(id)
{
    var nowPlaying = document.getElementById("npTitle");
    nowPlaying.innerHTML = masterJSON[id].name + " by " +  masterJSON[id].artist;

    var currentTrackBtn = document.getElementById(currentTrackID).getElementsByClassName("plTitle")[0];
    currentTrackBtn.style.color = btnSelectClr;
    
    if(prevTrackID > 0)
    {
      var previousTrackBtn = document.getElementById(prevTrackID).getElementsByClassName("plTitle")[0];
      previousTrackBtn.style.color = btnDeSelectClr;
    }
}

















