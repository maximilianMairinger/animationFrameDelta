import { Data, DataSubscription } from "josm"
import { LinkedList, Token } from 'fast-linked-list'

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
    let b: {begin: number, func: ElapsingSubscription, end?: number, resolve?: () => void} = {begin, func};
    const elem = (begin !== undefined ? elapsingSubscriptions : initialElapsingSubscriptions).push(b)
    

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
        endElapsingSubscriptions.pushToken(elem.rm() as any as Token<{begin: number, end?: number, func: ElapsingSubscription, resolve: () => void}>)
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
    const elem = new Token(func as InfiniteSubscription)
    const appendFunc = () => {subscriptions.pushToken(elem)}
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


function removeFromIndexWhenFound<Find extends {[key in string]: any}>(ar: LinkedList<Find>, find: Find): SuccessfullyRemoved
function removeFromIndexWhenFound<Key extends string, Ar extends {[key in string]: any}>(ar: LinkedList<Ar>, find: Ar[Key], key: Key): SuccessfullyRemoved
function removeFromIndexWhenFound<Key extends string, Find extends {[key in string]: any}>(ar: LinkedList<Find>, find: Find[Key], key?: Key) {
  try {
    if (key === undefined) ar.forEach((val, tok) => {
      if (val === find) {
        tok.remove()
        throw new Error()
      }
    })
    else ar.forEach((val, tok) => {
      if (val[key] === find) {
        tok.remove()
        throw new Error()
      }
    })
  }
  catch {
    return true
  }
  return false
}

export function unsubscribe(subscription: CancelAbleSubscriptionPromise | AnySubscriptionFunction) {
  if (subscription instanceof CancelAbleSubscriptionPromise) subscription.cancel()
  else {
    console.warn("unsubscribe(subscription) is deprecated and will be removed in animationFrameDelta@3.0.0, use subscription.cancel() instead")
    if (removeFromIndexWhenFound(subscriptions, subscription)) return
    if (removeFromIndexWhenFound(elapsingSubscriptions, subscription, "func")) return
    if (removeFromIndexWhenFound(initialElapsingSubscriptions, subscription, "func")) return
    if (removeFromIndexWhenFound(endElapsingSubscriptions, subscription, "func")) return
  }
}





let lastTimestamp: number = now()
let timestamp: number


let absoluteDelta: number
let delta: number

const loop = () => {
  timestamp = now()
  absoluteDelta = stats.absoluteDelta = timestamp - lastTimestamp
  lastTimestamp = stats.timestamp = timestamp
  delta = stats.delta = absoluteDelta * invertOfAbsoluteDeltaAt60FPS

  const currentNextFrames = nextFrameCbs
  nextFrameCbs = new LinkedList()
  for (const cb of currentNextFrames) {
    cb(timestamp)
  }

  initialElapsingSubscriptions.forEach((val, token) => {
    elapsingSubscriptions.pushToken(token)
    val.begin = timestamp
  })

  for (const sub of subscriptions) {
    sub(delta, timestamp, absoluteDelta)
  }


  for (const {func, begin} of elapsingSubscriptions) {
    func(timestamp - begin, delta, timestamp, absoluteDelta)
  }
  
  for (const elem of endElapsingSubscriptions) {
    if (elem.end > timestamp) elem.func(timestamp - elem.begin, stats.delta, stats.timestamp, stats.absoluteDelta)
    else elem.resolve()
  }

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)


export class CancelAbleNextFramePromise extends CancelAblePromise {

}

let nextFrameCbs = new LinkedList<(timestamp: number) => void>()
/**
 * Call back when next frame hits. Can be used to add subscriptions for this timestamp last minute (or rather millisecond)
 * The callback is intentionally not promiseified. Native promises are *not* synchronous which is probably not intended here.
 * @param cb Called when next frame hits. Similar to requestAnimationFrame, but does use performance.now() as the rest of animation-frame-delta
 */
export function nextFrame(cb?: (timestamp: number) => void | Promise<void>) {
  let tok: Token<(timestamp: number) => void>
  return new CancelAbleNextFramePromise((res) => {
    tok = nextFrameCbs.push(async (timestamp: number) => {
      if (cb) await cb(timestamp)
      res()
    })
  }, () => {
    return tok.remove()
  })
}
