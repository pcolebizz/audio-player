

var audioCtx;
var audioElement;
var analyser;
var audioSrc;


window.addEventListener('load', init, false);


function init() 
{
    try 
    {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    console.log("READING TEXT FILE");

    //Get <audio> element
    audioElement = document.getElementById('player'); //creates a HTML5 Audio Element
    //var audio = new Audio();
    audioElement.src = 'audio/Bust Your Move.mp3';
    audioElement.controls = true;
    audioElement.autoplay = false;

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
                        console.log("load here: " + typeof allText);
                        callback(JSON.parse(allText));
                    }
                }
            }
            rawFile.send(null);
        }

        //usage:
        readTextFile("playlist.json", function(jsonData)
        {

          var playlistUL = document.getElementById("plList");

          console.log(jsonData);
          //JSON.parse(text);
          console.log("after me: " + typeof jsonData);
          //console.log(jsonData[0]["name"]);

          for (var key in jsonData)
            {
              if (jsonData.hasOwnProperty(key))
              {
                // here you have access to
                var trackNumber = jsonData[key].track;
                var trackName = jsonData[key].name;
                var artist = jsonData[key].artist;
                console.log(name);

                var nextSong = document.createElement("li");
                nextSong.innerHTML = '<div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + artist + '</div></div>';

                console.log("Next Song: " + nextSong);

                playlistUL.appendChild(nextSong);
              }
            }

        });


    }, false);
    





