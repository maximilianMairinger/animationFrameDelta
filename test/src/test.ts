import * as animationFrameDelta from "../../app/src/animationFrameDelta"


const ww = animationFrameDelta.default((d) => {
  console.log(d)
})

setTimeout(() => {
  console.log("-----------------------------------")
  debugger
  console.log(ww.cancel())
  

  setTimeout(() => {
    ww.resume()

    setTimeout(() => {
      
      
      ww.cancel()
      
      setTimeout(() => {
        ww.resume()
      }, 500)
    }, 500)
  }, 500)
}, 500)


// setTimeout(() => {
//   let beginTime = performance.now()
//   let lastTime = performance.now()

//   let elem = document.querySelector("#test") as HTMLElement
//   let canc = animationFrameDelta.subscribe((e) => {
//     let now = performance.now()
//     if (e > 1000) debugger
//     console.log(elem.innerText = (e).toString(), "                 " + (now - lastTime), "                         ", now - beginTime)
//     lastTime = now
//   }, 1000, 10)

//   setTimeout(() => {
//     canc.duration(300)
//   }, 200)

// }, 500)
