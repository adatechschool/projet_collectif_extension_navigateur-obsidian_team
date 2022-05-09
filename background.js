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
          state = timer.state 
          chrome.storage.sync.set({ state });
          timer.start(convertTimeFrontToBack(request.timer))
        }
        else if (timer.state == "isPaused"){
          state = timer.state 
          chrome.storage.sync.set({ state });
          timer.resume()
        }
      case "pause":
        timer.state = chrome.storage.sync.get({ state })
        if (timer.state == "isActive"){
          state = timer.state 
          chrome.storage.sync.set({ state , remainingTime });
          timer.pause()
        }
      case "stop":
        timer.state = chrome.storage.sync.get({ state })
        if (timer.state == "isActive" || timer.state == "isPaused"){
          timer.state = "isStopped"
          state = timer.state 
          chrome.storage.sync.set({ state });
          timer.stop()
        }
    }
  }
);