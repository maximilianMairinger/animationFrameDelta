import * as animationFrameDelta from "../../app/src/animationFrameDelta"

let time = 0
const e = animationFrameDelta.subscribe((e, w, delta) => {
  time += delta
  console.log(time)
})

setTimeout(() => {
  e.cancel()
  setTimeout(() => {
    e.resume()
  }, 1000)
}, 1000)

