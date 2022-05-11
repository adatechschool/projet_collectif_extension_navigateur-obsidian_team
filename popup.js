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

// From Storage API, get current timer status
let frontTimer
chrome.storage.sync.get("timer", ({ timer }) =>{
  frontTimer = timer
  console.log(`Success import for timer with values ${timer.state} ${timer.remainingTime}`);
});

//Global update depending on timer status
function starter(){
 if (frontTimer.status=="isActive"){
   let rTime = frontTimer.remainingTime - (new Date() - frontTimer.startTime)
   popUpStartTimer(rTime)
 } else if (frontTimer.status=="isPaused"){
   initializeTimer(frontTimer.remainingTime)
 }
}

// Countdown logic
let countdownNumberEl = document.getElementById('countdown-number');

function initializeTimer(countdown){
  countdownNumberEl.style.display="block"
  countdownNumberEl.textContent=timeFormatting(countdown)
}

function popUpStartTimer(countdown){
  initializeTimer(countdown)
  setInterval(function () {
    if (countdown > 0){
      countdown = --countdown
      countdownNumberEl.textContent = timeFormatting(countdown);
    } else {
      countdownNumberEl.style.display="None";
    }
  }, 1000)
}

//countdown utility functions
function timeFormatting(d){
    let h= Math.floor(d/3600);
    let m= Math.floor(d%3600/60);
    let s= d%60;
  if(h>0){
    return h + " : "+ m + " : "+ s
  } else if(m>0) {
    return m + " : "+ s
  } else{
    return s
  }
}


// Event functions
function playEvent() {
  console.log ("play pressed");
  /*Check current status of timer 
    Event triggers if timer on pause or stopped
    Event triggers only if textInput value is a valid format (int)*/
  let timerValue = parseInt(textInput.value);
  if (frontTimer.state=="isStopped"){
    if (!isNaN(timerValue)){
      chrome.runtime.sendMessage({event: "play", timer: timerValue}, function(response){
        console.log(response.status);
      });
      popUpStartTimer(parseInt(textInput.value)*60);
    } else {
      console.log("incorrect input, please enter a valid number")  
    }
  } else if (frontTimer.status=="isPaused"){
    chrome.runtime.sendMessage({event: "play", timer: timerValue}, function(response){
      console.log(response.status);
    });
  }
}


function pauseEvent(){
  if (frontTimer.state == "isActive"){
    chrome.runtime.sendMessage(
      {event: "pause"}, function(response){
        console.log(response.status)
      }
    )
    /*Check current status of timer 
    Event triggers if timer playing*/
    console.log ("pause pressed")
  }
}


function stopEvent(){
  if (state == "isActive" || state == "isPaused"){
    chrome.runtime.sendMessage(
      {event: "stop"}, function(response){
        console.log(response.status)
      }
    )
  }
  /*Check current status of timer 
    Event does not trigger if timer already stopped
  */
  console.log ("stop pressed")
}

//tentative pour valider le chiffre ajouté dans l'input
/*textInput.addEventListener("keydown", editText);
function editText() {
  switch (event.keyCode()) {
    case "enter":
      break;
}
}*/


