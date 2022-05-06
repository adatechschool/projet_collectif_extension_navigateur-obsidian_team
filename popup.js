// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the text-input
let textInput = document.getElementById("text-input")

//Forms update each other
function updateTextInput(val) {
    document.getElementById("text-input").value=val; 
  }

function updateInputText(val){
  document.getElementById("text-input")
}


//Buttons setup
// Play
let play = document.getElementById("play");
play.addEventListener("click", playEvent);

// Pause
let pause = document.getElementById("pause");
pause.addEventListener("click", pauseEvent);
  
// Stop
//stoop avec deux O car stop steul est un élement spécifique
let stoop = document.getElementById("stoop");
stoop.addEventListener("click", stopEvent);


// Countdown logic
let countdownNumberEl = document.getElementById('countdown-number');
let countdown = 10;

countdownNumberEl.textContent = countdown;

setInterval(function () {
  countdown = --countdown < 0 ? alert("countdown over") : countdown;
  countdownNumberEl.textContent = countdown;
}, 1000);


// Event functions
function playEvent() {
  console.log ("play pressed")
  /*Check current status of timer 
    Event triggers if timer on pause or stopped
    Event triggers only if textInput value is a valid format (int)
  */

  let timerValue = parseInt(textInput.value)
  if (!isNan(timerValue)){
    chrome.runtime.sendMessage({event: "play", timer: timerValue}, function(response){
      console.log(response.status)
    })  
  }  
}

function pauseEvent() {
  /*Check current status of timer 
    Event triggers if timer playing
  */
  console.log ("pause pressed")
}

function stopEvent() {
  /*Check current status of timer 
    Event does not trigger if timer already stopped
  */
  console.log ("stop pressed")
}


