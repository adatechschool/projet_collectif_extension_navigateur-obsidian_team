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

function convertTimeFrontToBack(input){return input*60*1000}

//Create timer instance
const timer = new Timer(() => {
  console.log("countdown is over!");
})

//Receive events from popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    sendResponse({status: `background received request for ${request.event}`})
    
    switch (request.event){
      case "play":
        if (timer.state == "isStopped"){
          timer.start(convertTimeFrontToBack(request.timer))
        }
        else if (timer.state == "isPaused"){
          timer.resume()
        }
      case "pause":
        if (timer.state == "isActive"){
          timer.pause()
        }
      case "stop":
        if (timer.state == "isActive" || timer.state == "isPaused"){
          timer.stop()
        }

    }
  }
);