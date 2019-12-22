import * as animationFrameDelta from "../../app/src/animationFrameDelta"


setTimeout(() => {
  animationFrameDelta.subscribe((e) => {
    console.log(e)
  }, 1000, 2, )  
}, 200)