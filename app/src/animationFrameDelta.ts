import clone from "clone"
const now = performance.now.bind(performance)

type Subscription = (delta: number, timestamp: number, absoluteDelta: number) => void
type EndingSubscription = (runningFor: number, delta: number, timestamp: number, absoluteDelta: number) => void

const subscriptions: Subscription[] = []
const endingSubscriptions: {begin: number, func: EndingSubscription}[] = []
const initalEndingSubscriptions: EndingSubscription[] = []


export function subscribe(func: Subscription)
export function subscribe(func: EndingSubscription, forHowLong: number)
export function subscribe(func: Subscription | EndingSubscription, forHowLong?: number) {
  
  if (forHowLong) {
    initalEndingSubscriptions.push(func)

    requestAnimationFrame(() => {
      setTimeout(() => {    
       try {
         unsubscribe(func)
       }
       catch(e) {}
       let timestamp = now()
       let absoluteDelta = timestamp - lastTimestamp
       
       func(forHowLong, absoluteDelta * ivertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)
     }, forHowLong)
   })
  }
  //@ts-ignore
  else subscriptions.push(func)
  
  

  return func
}
export default subscribe



let ignore = false
export function ignoreUnsubscriptionError(to: boolean = true) {
  ignore = to
}

export function unsubscribe(func: Subscription | EndingSubscription) {
  let at = -1
  for (let i = 0; i < endingSubscriptions.length; i++) {
    if (endingSubscriptions[i].func === func) {
      at = i
      break
    }
  }

  if (at !== -1) endingSubscriptions.splice(at, 1)
  else {
    //@ts-ignore
    at = subscriptions.indexOf(func)
    if (at !== -1) subscriptions.splice(at, 1)
    else {
      at = initalEndingSubscriptions.indexOf(func)
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
let currentEndingSubscriptions: {begin: number, func: EndingSubscription}[]
let currentAnything: any
let currentTimestamp: number


const loop = () => {
  currentTimestamp = timestamp = now()
  stats.absoluteDelta = timestamp - lastTimestamp
  lastTimestamp = stats.timestamp = timestamp
  stats.delta = stats.absoluteDelta * ivertOfAbsoluteDeltaAt60FPS



  for (; 0 !== initalEndingSubscriptions.length;) {
    endingSubscriptions.push({begin: currentTimestamp, func: initalEndingSubscriptions[0]})
    initalEndingSubscriptions.splice(0, 1)
  }

  //clone to ensure that no subscriptions are added during (inside) one
  currentSubscriptions = [...subscriptions]
  currentEndingSubscriptions = [...endingSubscriptions]

  for (index = 0; index < currentSubscriptions.length; index++) {
    currentSubscriptions[index](stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  for (index = 0; index < currentEndingSubscriptions.length; index++) {
    currentAnything = currentEndingSubscriptions[index]
    currentAnything.func(currentTimestamp - currentAnything.begin, stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)