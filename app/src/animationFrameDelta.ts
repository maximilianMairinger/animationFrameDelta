const now = performance.now.bind(performance)

type Subscription = (delta: number, timestamp: number, absoluteDelta: number) => void
type ElapsingSubscription = (runningFor: number, delta: number, timestamp: number, absoluteDelta: number) => void

const subscriptions: Subscription[] = []
const elapsingSubscriptions: {begin: number, func: ElapsingSubscription}[] = []
const initalElapsingSubscriptions: ElapsingSubscription[] = []



function sub(func: Subscription): typeof func
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: false): typeof func
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: true, inIteration: number, begin?: number): typeof func
function sub(func: Subscription | ElapsingSubscription, elapseIn?: number, iterations?: number, iterateTimestamp?: boolean, inIteration?: number, begin?: number): typeof func {
  if (elapseIn) {
    if (iterateTimestamp || begin === undefined) initalElapsingSubscriptions.push(func)
    else elapsingSubscriptions.push({begin, func})

    setTimeout(() => {  
      let index = findIndexOfElapsingSubscriptionsFunc(func)
      if (index === -1) return
      
      let { begin } = elapsingSubscriptions[index]
      elapsingSubscriptions.splice(index, 1)

      if (stats.timestamp !== begin) {
        let elapsed = inIteration * elapseIn
        let timestamp = begin + elapsed
        let absoluteDelta = timestamp - lastTimestamp
        func(elapsed, absoluteDelta * ivertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)
      }

      if (iterations > 1) sub(func, elapseIn, iterations-1, iterateTimestamp as true, inIteration+1, begin)
    }, elapseIn - 1) // setTimout is only 1ms accurate. In an edge case it is better to drop one frame instead of execute one to many
  }
  else subscriptions.push(func as Subscription)
  
  

  return func
}


export function subscribe(func: Subscription): typeof func
export function subscribe(func: ElapsingSubscription, elapseIn: number, iterations?: number, iterateTimestamp?: boolean): typeof func
export function subscribe(func: Subscription | ElapsingSubscription, elapseIn?: number, iterations: number = 1, iterateTimestamp = false): typeof func {
  return sub(func, elapseIn, iterations, iterateTimestamp as true, 1)
}
export default subscribe



let ignore = false
export function ignoreUnsubscriptionError(to: boolean = true) {
  ignore = to
}

function findIndexOfElapsingSubscriptionsFunc(func: ElapsingSubscription) {
  let at = -1
  for (let i = 0; i < elapsingSubscriptions.length; i++) {
    if (elapsingSubscriptions[i].func === func) {
      at = i
      break
    }
  }
  return at
}

export function unsubscribe(func: Subscription | ElapsingSubscription) {
  let at = findIndexOfElapsingSubscriptionsFunc(func)
  if (at !== -1) elapsingSubscriptions.splice(at, 1)
  else {
    at = subscriptions.indexOf(func as Subscription)
    if (at !== -1) subscriptions.splice(at, 1)
    else {
      at = initalElapsingSubscriptions.indexOf(func)
      if (at !== -1) subscriptions.splice(at, 1)
      else if (!ignore) throw new Error("Invalid request to unsubscribe. Given function is not subscribed.\n\nTo ignore this error globally please call \"reqaf.ignoreUnsubscriptionError()\".\n")
    }
  }
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
let lastTimestamp: number = now()
let timestamp: number
let currentSubscriptions: Subscription[]
let currentElapsingSubscriptions: {begin: number, func: ElapsingSubscription}[]
let currentAnything: any
let currentTimestamp: number


const loop = () => {
  currentTimestamp = timestamp = now()
  stats.absoluteDelta = timestamp - lastTimestamp
  lastTimestamp = stats.timestamp = timestamp
  stats.delta = stats.absoluteDelta * ivertOfAbsoluteDeltaAt60FPS



  for (; 0 !== initalElapsingSubscriptions.length;) {
    elapsingSubscriptions.push({begin: currentTimestamp, func: initalElapsingSubscriptions[0]})
    initalElapsingSubscriptions.splice(0, 1)
  }

  //clone to ensure that no subscriptions are added during (inside) one
  currentSubscriptions = [...subscriptions]
  currentElapsingSubscriptions = [...elapsingSubscriptions]

  for (index = 0; index < currentSubscriptions.length; index++) {
    currentSubscriptions[index](stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  for (index = 0; index < currentElapsingSubscriptions.length; index++) {
    currentAnything = currentElapsingSubscriptions[index]
    currentAnything.func(currentTimestamp - currentAnything.begin, stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)