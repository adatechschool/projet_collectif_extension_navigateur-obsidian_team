// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

// Timer code
class Timer {
  constructor(callback) {
    this.callback = callback
    this.remainingTime
    this.state = "isStopped" 
    this.startTime
    this.timerId
  }

  pause() {
    this.state = "isPaused"
    clearTimeout(this.timerId)
    this.remainingTime -= new Date() - this.startTime
  }

  resume() {
    this.state = "isActive"
    this.startTime = new Date()
    clearTimeout(this.timerId)
    this.timerId = setTimeout(this.callback, this.remainingTime)
  }

  start(delay) {
    this.remainingTime = delay
    this.startTime = new Date()
    this.state = "isActive"
    this.timerId = setTimeout(this.callback, this.remainingTime)
  }

  stop(){
    this.remainingTime = null
    this.state = "isStopped"
    this.startTime = null
    clearTimeout(this.timerId)
  }
}

const timer = new Timer(() => {
  console.log("countdown is over!");
})
