// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

function updateTextInput(val) {
    document.getElementById("text-input").value=val; 
  }

  function updateInputText(val){
    document.getElementById("text-input")
  }

  // evenement de click  play + fonction
  let play = document.getElementById("play");
  play.addEventListener("click", Event => {
    //event
  });

  // evenement de click  pause + fonction
  let pause = document.getElementById("pause");
  pause.addEventListener("click", Event => {
    //event
  });
  
// evenement de click  stop + fonction
//stoop avec deux O car stop steul est un élement spécifique
let stoop = document.getElementById("stoop");
stoop.addEventListener("click", Event => {
  //event
});
