import * as animationFrameDelta from "../../app/src/animationFrameDelta"



animationFrameDelta.default((...e) => {
  console.log(...e);
  
}, 1000)


//reqaf.ignoreUnsubscriptionError()

declare let global: any

global.w = animationFrameDelta.stats