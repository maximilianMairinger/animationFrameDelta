import * as animationFrameDelta from "../../app/src/animationFrameDelta"



animationFrameDelta.default((...e) => {
  console.log(...e);
  
}, 1000)


declare let global: any

global.w = animationFrameDelta.stats