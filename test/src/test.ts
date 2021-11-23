import * as animationFrameDelta from "../../app/src/animationFrameDelta"

import { List, Item } from "linked-list"


class Token<T> extends Item {
  constructor(public value: T) {
    super()
  }
  remove() {
    if (this.list) {
      this.detach()
      return true
    }
    else return false
  }
}

const l = new List()

const i1 = new Token(1)
const i2 = new Token(2)

debugger
l.append(i1)
l.append(i2)
l.append(i1)

for (let w of l) {
  console.log(w)
}

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
