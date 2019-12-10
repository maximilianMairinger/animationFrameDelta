import * as animationFrameDelta from "../../app/src/animationFrameDelta"


let f = (...e) => {
  console.log(e);
  
}
animationFrameDelta.default(f, 1000)


//reqaf.ignoreUnsubscriptionError()

declare let global: any

global.w = animationFrameDelta.stats