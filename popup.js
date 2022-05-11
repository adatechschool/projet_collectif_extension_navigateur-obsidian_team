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

//Input range
let range = document.getElementById("time");
range.setAttribute("onchange", updateTextInput(range.value))


// Countdown logic
let countdownNumberEl = document.getElementById('countdown-number');

function popUpStartTimer(){
  countdownNumberEl.style.display="block"
  let countdown= parseInt(textInput.value)*60;
  countdownNumberEl.textContent= timeFormatting(countdown)
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
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s
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
  console.log ("play pressed")
  /*Check current status of timer 
    Event triggers if timer on pause or stopped
    Event triggers only if textInput value is a valid format (int)
  */

  let timerValue = parseInt(textInput.value)
  if (!isNaN(timerValue)){
    chrome.runtime.sendMessage({event: "play", timer: timerValue}, function(response){
      console.log(response.status);
    popUpStartTimer();
    })  
  } else {
    //Message indicating the input value is not correct
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

//tentative pour valider le chiffre ajouté dans l'input
/*textInput.addEventListener("keydown", editText);
function editText() {
  switch (event.keyCode()) {
    case "enter":
      break;
}
}*/


