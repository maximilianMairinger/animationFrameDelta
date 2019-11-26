import * as reqaf from "./../../app/src/reqaf"


let f = () => {
  console.log(reqaf.stats);
  
}
reqaf.default(f)

setTimeout(() => {
  reqaf.unsubscribe(f)

  setTimeout(() => {
    reqaf.unsubscribe(f)
  }, 1000)
}, 1000)
