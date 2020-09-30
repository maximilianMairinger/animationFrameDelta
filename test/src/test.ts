import * as animationFrameDelta from "../../app/src/animationFrameDelta"




setTimeout(() => {
  let elem = document.querySelector("#test") as HTMLElement
  let canc = animationFrameDelta.subscribe((e) => {
    
    console.log(elem.innerText = (e).toString())
  }, 1000, 2)

  setTimeout(() => {
    canc.cancel()
  }, 600)
  
  canc.then(() => {
    console.log("done")
  })
}, 200)
