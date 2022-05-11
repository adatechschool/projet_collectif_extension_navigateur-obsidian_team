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
<<<<<<< HEAD
  console.log ("play pressed");
=======
<<<<<<< HEAD
  console.log ("play pressed");
=======
  console.log ("play pressed")
  }
>>>>>>> 492ad8736bde22313403d880de4e0d21dc812bb2
>>>>>>> d4f644a7e8441cf8d1d23f5ebd562cc7d369b66f
  /*Check current status of timer 
    Event triggers if timer on pause or stopped
    Event triggers only if textInput value is a valid format (int)*/
  let timerValue = parseInt(textInput.value);
  if (!isNaN(timerValue)){
    chrome.runtime.sendMessage({event: "play", timer: timerValue}, function(response){
      console.log(response.status);
    popUpStartTimer();
    })  
  } else {
<<<<<<< HEAD
    console.log("incorrect input, please enter a valid number");
=======
<<<<<<< HEAD
    console.log("incorrect input, please enter a valid number");
=======
    console.log("incorrect input, please enter a valid number")
>>>>>>> 492ad8736bde22313403d880de4e0d21dc812bb2
>>>>>>> d4f644a7e8441cf8d1d23f5ebd562cc7d369b66f
    //Message indicating the input value is not correct
  }
}

<<<<<<< HEAD
function pauseEvent(){
=======
<<<<<<< HEAD
function pauseEvent(){
  const state = chrome.storage.sync.get({ state });
  let remainingTime = timerValue;

>>>>>>> d4f644a7e8441cf8d1d23f5ebd562cc7d369b66f
  if (state == "isActive"){
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
<<<<<<< HEAD
=======
  const state = chrome.storage.sync.get({ state });
>>>>>>> d4f644a7e8441cf8d1d23f5ebd562cc7d369b66f
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


=======
function pauseEvent() {
  const state = chrome.storage.sync.get({ state });
  let remainingTime = timerValue

  if (state == "isPaused"){
    chrome.runtime.sendMessage({event: "pause"}, {time: remainingTime}, function(response){
    console.log(response.status)
  /*Check current status of timer 
    Event triggers if timer playing
  */
  console.log ("pause pressed")
}
  }
}
function stopEvent(){
  const state = chrome.storage.sync.get({ state });
  if (state == "isActive" || state == "isPaused"){
    chrome.runtime.sendMessage({event: "stop"}, function(response){
    console.log(response.status)
  }
}
}
  /*Check current status of timer 
    Event does not trigger if timer already stopped
  */
>>>>>>> 492ad8736bde22313403d880de4e0d21dc812bb2
