import { Data, DataSubscription } from "josm"
import { List as LinkedList, Item } from 'linked-list'

function delay(timeout: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res()
    }, timeout)
  })
}

export function ignoreUnsubscriptionError() {
  console.warn("animationFrameDelta.ignoreUnsubscriptionError is deprecated.")
}


class ValueIndexedLinkedList<T> extends LinkedList<Token<T>> {
  constructor(...init) {

  }
}

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


export const now = performance.now.bind(performance) as () => number

export type InfiniteSubscription = (delta: number, timestamp: number, absoluteDelta: number) => void
export type ElapsingSubscription = (runningFor: number, delta: number, timestamp: number, absoluteDelta: number) => void
export type AnySubscriptionFunction = InfiniteSubscription | ElapsingSubscription
type SuccessfullyRemoved = boolean


const subscriptions: LinkedList<InfiniteSubscription> = new LinkedList()
const elapsingSubscriptions: LinkedList<{begin: number, func: ElapsingSubscription}> = new LinkedList()
const initialElapsingSubscriptions: LinkedList<{begin: number, func: ElapsingSubscription}> = new LinkedList()
const endElapsingSubscriptions: LinkedList<{begin: number, end?: number, func: ElapsingSubscription, resolve: () => void}> = new LinkedList()


function sub(func: InfiniteSubscription): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, duration: number | Data<number>, iterations: number): CancelAbleElapsingSubscriptionPromise
function sub(func: ElapsingSubscription, duration: number | Data<number>, iterations: number, inIteration: number, begin?: number, beginDelta?: number): CancelAbleElapsingSubscriptionPromise
function sub(func: Subscription, duration_durationData?: number | Data<number>, iterations?: number, inIteration?: number, begin?: number, beginDelta?: number): CancelAblePromise {
  if (duration_durationData !== undefined) {
    let duration = duration_durationData instanceof Data ? duration_durationData.get() : duration_durationData
    let b: {begin: number, func: ElapsingSubscription, end?: number, resolve?: () => void} = {begin, func}
    const elem = new Token(b)
    begin !== undefined ? elapsingSubscriptions.append(elem) : initialElapsingSubscriptions.append(elem)

    const removeElem = (clean: boolean) => {
      if (elem.remove()) {
        let elapsed: number
        if (clean) {
          elapsed = inIteration * duration
          timestamp = b.begin + elapsed
          elapsed = elapsed / inIteration
        }
        else {
          elapsed = timestamp - b.begin
        }
        let absoluteDelta = timestamp - lastTimestamp
  
        func(elapsed, absoluteDelta * invertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)
  
        iterations--
        inIteration++
        return true
      }
      return false
    }

    let res: Function
    let ret = new CancelAbleElapsingSubscriptionPromise((r) => {
      res = r
    }, () => {
      clearTimeout(timeoutID)
      if (nestedRet) nestedRet.cancel()
      let e = removeElem(false)
      return e
    }, {
      set: (dur) => {
        clearTimeout(timeoutID)
        duration = dur
        let timeLeft = (startTimeoutTime + duration) - now()
        
        if (timeLeft >= 0) timeoutID = setTimeout(timeoutFunc, timeLeft)
        else {
          let iterationsSkippedNegative = Math.ceil(timeLeft / dur)
          iterations += iterationsSkippedNegative
          let remSuc = elem.remove()
          if (iterations > 0) {
            if (remSuc) {
              inIteration -= iterationsSkippedNegative
              requestNextFrame(timeLeft - iterationsSkippedNegative * dur)
            }
          }
          
        }
      }
    }, duration_durationData, {
      get() {
        return b.begin
      },
      set(to) {
        b.begin = to
      }
    })

    let nestedRet: CancelAblePromise
    let startTimeoutTime = now()

    const timeoutFunc = async () => {
      
      let prom = new Promise((resolve) => {
        b.resolve = resolve as any
        b.end = b.begin + duration
        elem.remove()
        endElapsingSubscriptions.append(elem)
      })
      

      await Promise.race([delay(-addition), prom])

      if (removeElem(true)) {
        nextFrame(() => {
          requestNextFrame(0)
        })
        
      }
    }

    const requestNextFrame = async (beginDelta: number) => {
      
      if (iterations > 0) {
        await nextFrame(async (timestamp) => {
          await (nestedRet = sub(func, duration, iterations, inIteration, timestamp, beginDelta))
        })  
      }

      res()
    }
    let addition = -absoluteDeltaAt60FPS + (beginDelta !== undefined ? beginDelta : 0)

    let timeoutID = setTimeout(timeoutFunc, duration - 1 + addition)

    return ret
  }
  else {
    const elem = new Token(func)
    const appendFunc = () => {subscriptions.append(elem)}
    return new CancelAbleSubscriptionPromise(appendFunc, () => {
      return elem.remove()
    }, appendFunc)
  }
}

export class CancelAblePromise extends Promise<void> {
  constructor(f: (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => void, public cancel: () => SuccessfullyRemoved) {
    super(f)
  }
}

export class CancelAbleSubscriptionPromise extends CancelAblePromise {
  constructor(f: (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => void, cancel: () => SuccessfullyRemoved, public resume: () => void) {
    super(f, cancel)
  }
}

export class CancelAbleElapsingSubscriptionPromise extends CancelAblePromise {
  constructor(f: (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => void, unsubscribe: () => SuccessfullyRemoved, private _duration: {set: (duration: number) => void}, duration: number | Data<number>, private begin: {get(): number, set(to: number): void}) {
    super(f, unsubscribe)
    this.duration(duration)
    this.properDurationData.get((e) => {
      this._duration.set(e)
    }, false)
  }
  private properDurationData = new Data() as Data<number>
  private durationDataSubscription = new DataSubscription(new Data(0), (e) => {
    this.properDurationData.set(e)
  }, true, false)
  duration(): number
  duration(duration: number | Data<number> | null): void
  duration(duration?: number | Data<number> | null): any {
    if (duration !== undefined) {
      if (duration instanceof Data) this.durationDataSubscription.activate(false).data(duration)
      else {
        this.durationDataSubscription.deactivate()
        if (duration !== null) this.properDurationData.set(duration)
      }
    }
    else return this.properDurationData.get()
  }
  
  progress(): number
  progress(to: number): void
  progress(to?: number): any {
    let begin = this.begin.get()
    let curProgAbs = now() - begin
    if (to !== undefined) {
      this.begin.set(begin + to * this.duration() - curProgAbs)
    }
    else return curProgAbs / this.duration()
  }
}

export function subscribe(func: InfiniteSubscription): CancelAbleSubscriptionPromise
export function subscribe(func: ElapsingSubscription, duration: number | Data<number>, iterations?: number, iterateTimestamp?: boolean): CancelAbleElapsingSubscriptionPromise
export function subscribe(func: Subscription, duration?: number | Data<number>, iterations: number = 1): CancelAblePromise {
  return sub(func, duration, iterations, 1)
}
export default subscribe



export type Subscription = InfiniteSubscription | ElapsingSubscription



export const invertOfAbsoluteDeltaAt60FPS = 60 / 1000
export const absoluteDeltaAt60FPS = 1 / invertOfAbsoluteDeltaAt60FPS


export const stats: {
  delta: number,            // relative delta  (1 at 60fps)
  absoluteDelta: number,    // absolute delta  (1000 / 60 = 16.6666ms at 60fps)
  timestamp: number         // time since application start in ms (updates on frame drawn)
} = {
  delta: 1,
  absoluteDelta: absoluteDeltaAt60FPS,
  timestamp: 0
}


function removeFromLikedListByValue<T>(linkedList: LinkedList<Token<T>>, value: T) {
  
  for (let token of linkedList) {
    if (token.value)
  }
}

export function unsubscribe(subscription: CancelAbleSubscriptionPromise | AnySubscriptionFunction) {
  if (subscription instanceof CancelAbleSubscriptionPromise) subscription.cancel()
  else {
    if (removeFromIndexWhenFound(subscriptions, subscription)) return
    if (removeFromIndexWhenFound(elapsingSubscriptions, subscription, "func")) return
    if (removeFromIndexWhenFound(initialElapsingSubscriptions, subscription, "func")) return
    if (removeFromIndexWhenFound(endElapsingSubscriptions, subscription, "func")) return
  }
}





let index: number       // to prevent GC
let lastTimestamp: number = now()
let timestamp: number
let currentSubscriptions: InfiniteSubscription[]
let currentElapsingSubscriptions: {begin: number, func: ElapsingSubscription}[]
let elem: any
let currentTimestamp: number
let currentNextFrames: any
let currentElapsingSubscriptionsEnd: {end?: number, func: ElapsingSubscription, resolve: () => void}[]
let len: number


const loop = () => {
  currentTimestamp = timestamp = now()
  stats.absoluteDelta = timestamp - lastTimestamp
  lastTimestamp = stats.timestamp = timestamp
  stats.delta = stats.absoluteDelta * invertOfAbsoluteDeltaAt60FPS


  currentNextFrames = [...nextFrameCbs]
  for (; 0 !== currentNextFrames.length;) {
    currentNextFrames[0](currentTimestamp)
    currentNextFrames.splice(0, 1)
    nextFrameCbs.splice(0, 1)
  }



  for (; 0 !== initialElapsingSubscriptions.a.length;) {
    initialElapsingSubscriptions.linkIndex[0].swapIndex(elapsingSubscriptions, {begin: initialElapsingSubscriptions.a[0].begin = currentTimestamp, func: initialElapsingSubscriptions.a[0].func})
  }

  //clone to ensure that no subscriptions are added during the execution of one
  currentSubscriptions = [...subscriptions.a]
  currentElapsingSubscriptions = [...elapsingSubscriptions.a]
  currentElapsingSubscriptionsEnd = [...endElapsingSubscriptions.a]

  len = currentSubscriptions.length
  for (index = 0; index < len; index++) {
    currentSubscriptions[index](stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  len = currentElapsingSubscriptions.length
  for (index = 0; index < len; index++) {
    elem = currentElapsingSubscriptions[index]
    elem.func(currentTimestamp - elem.begin, stats.delta, stats.timestamp, stats.absoluteDelta)
  }

  len = currentElapsingSubscriptionsEnd.length
  for (index = 0; index < len; index++) {
    elem = currentElapsingSubscriptionsEnd[index]
    if (elem.end > currentTimestamp) {
      elem.func(currentTimestamp - elem.begin, stats.delta, stats.timestamp, stats.absoluteDelta)
    }
    else {
      elem.resolve()
    }
  }

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)


export class CancelAbleNextFramePromise extends CancelAblePromise {

}

const nextFrameCbs = []
/**
 * Call back when next frame hits. Can be used to add subscriptions for this timestamp last minute (or rather millisecond)
 * The callback is intentionally not promiseified. Native promises are *not* synchronous which is probably not intended here.
 * @param cb Called when next frame hits. Similar to requestAnimationFrame, but does use performance.now() as the rest of animation-frame-delta
 */
export function nextFrame(cb: (timestamp: number) => void | Promise<void>){
  let f: Function
  return new CancelAbleNextFramePromise((res) => {
    nextFrameCbs.push(f = async (timestamp: number) => {
      await cb(timestamp)
      res()
    })
  }, () => {
    let i = nextFrameCbs.indexOf(f)
    if (i !== -1) {
      nextFrameCbs.splice(i, 1)
      return true
    }
    return false
  })
}
