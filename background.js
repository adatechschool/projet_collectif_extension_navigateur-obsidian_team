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

//Create timer instance
const timer = new Timer(() => {
  console.log("countdown is over!");
})

//Receive events from popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(`request : ${request.event}`)
    sendResponse({status: `background received request for ${request.event}`})
  }
);