let length = 0
let ls: Subscription[] = []
export function subscribe(func: Subscription, forHowLong?: number) {
  ls.push(func)
  length++
  
  requestAnimationFrame(() => {
    if (forHowLong) setTimeout(() => {    
      try {
        unsubscribe(func)
      }
      catch(e) {}
      let timestamp = performance.now()
      let absoluteDelta = timestamp - lastTimestamp
      
      func(absoluteDelta * ivertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)
    }, forHowLong)
  })

  return func
}
export default subscribe

type Subscription = (delta: number, timestamp: number, absoluteDelta: number) => void

let ignore = false
export function ignoreUnsubscriptionError(to: boolean = true) {
  ignore = to
}

export function unsubscribe(func: Subscription) {
  let at = ls.indexOf(func)
  if (at !== -1) {
    ls.splice(at, 1)
    length--
  }
  else if (!ignore) throw new Error("Invalid request to unsubscribe. Given function is not subscribed.\n\nTo ignore this error globally please call \"reqaf.ignoreUnsubscriptionError()\".\n")
}

const ivertOfAbsoluteDeltaAt60FPS = 60 / 1000


export const stats: {
  delta: number,            // relative delta  (1 at 60fps)
  absoluteDelta: number,    // absolute delta  (1000 / 60 = 16.6666ms at 60fps)
  timestamp: number         // time since application start in ms (updates on frame drawn)
} = {
  delta: 1,
  absoluteDelta: 1 / ivertOfAbsoluteDeltaAt60FPS,
  timestamp: 0
}







let index: number       // to prevent GC
let lastTimestamp: number = performance.now()
let timestamp: number
let currentLs: Subscription[]

const loop = () => {
  timestamp = performance.now()
  stats.absoluteDelta = timestamp - lastTimestamp
  lastTimestamp = stats.timestamp = timestamp
  stats.delta = stats.absoluteDelta * ivertOfAbsoluteDeltaAt60FPS
  currentLs = JSON.parse(JSON.stringify(ls))

  for (index = 0; index < length; index++) {
    currentLs[index](stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)