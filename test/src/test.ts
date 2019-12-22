import * as animationFrameDelta from "../../app/src/animationFrameDelta"



animationFrameDelta.subscribe((e) => {
  console.log(e)
  if (e > 1000) debugger
}, 1000, 2)
