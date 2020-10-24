import { Data, DataSubscription } from "josm"

function delay(timeout: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, timeout)
  })
}

export function ignoreUnsubscriptionError() {
  console.warn("animationFrameDelta.ignoreUnsubscriptionError is deprecated.")
}


const now = performance.now.bind(performance)

export type InfiniteSubscription = (delta: number, timestamp: number, absoluteDelta: number) => void
export type ElapsingSubscription = (runningFor: number, delta: number, timestamp: number, absoluteDelta: number) => void
export type AnySubscriptionFunction = InfiniteSubscription | ElapsingSubscription
type SuccessfullyRemoved = boolean


type RemoveIndexLink<T = unknown> = {
  remove(): SuccessfullyRemoved, 
  swapIndex<E extends T>(Ind: RemoveIndexedArray<E>, add?: E): void
  swapIndex<E>(Ind: RemoveIndexedArray<E>, add: E): void
}

class RemoveIndexedArray<T> {
  public readonly a: T[] = []
  constructor() {
    
  }
  public readonly linkIndex: RemoveIndexLink[] = []
  private ls: {[index in number]: ((addCount: number) => void)} = {}
  add(a: T): RemoveIndexLink<T> {
    let index = this.a.length
    let len = 1
    
    let f = this.ls[index] = (addCount: number) => {
      delete this.ls[index]
      index += addCount
      this.ls[index] = f
    }
    this.a.push(a)
    let that = this
    let q = {
      remove() {
        this.remove = () => false
        return that.remove(index, len)
      },
      swapIndex<E>(Ind: RemoveIndexedArray<E>, add: E = a as any) {
        let n = Ind.add(add)
        this.remove()
        this.remove = n.remove
        this.swapIndex = n.swapIndex
      }
    }
    this.linkIndex.push(q)
    return q
  }

  remove(index: number, len = 1) {
    this.a.splice(index, len)
    delete this.ls[index]
    this.linkIndex.splice(index, 1)
    let keys = Object.keys(this.ls)
    let from: number
    for (let i = 0; i < keys.length; i++) {
      if (+keys[i] > index) {
        from = i
        break
      }
    }
    for (let i = from; i < keys.length; i++) {
      this.ls[keys[i]](-len)
    }

    return true
  }
}

const subscriptions: RemoveIndexedArray<InfiniteSubscription> = new RemoveIndexedArray()
const elapsingSubscriptions: RemoveIndexedArray<{begin: number, func: ElapsingSubscription}> = new RemoveIndexedArray()
const initialElapsingSubscriptions: RemoveIndexedArray<{begin: number, func: ElapsingSubscription}> = new RemoveIndexedArray()
const endElapsingSubscriptions: RemoveIndexedArray<{begin: number, end?: number, func: ElapsingSubscription, resolve: () => void}> = new RemoveIndexedArray()




function sub(func: InfiniteSubscription): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, duration: number | Data<number>, iterations: number): CancelAbleElapsingSubscriptionPromise
function sub(func: ElapsingSubscription, duration: number | Data<number>, iterations: number, inIteration: number, begin?: number, beginDelta?: number): CancelAbleElapsingSubscriptionPromise
function sub(func: Subscription, duration_durationData?: number | Data<number>, iterations?: number, inIteration?: number, begin?: number, beginDelta?: number): CancelAbleSubscriptionPromise {
  if (duration_durationData) {
    let duration = duration_durationData instanceof Data ? duration_durationData.get() : duration_durationData
    let b: {begin: number, func: ElapsingSubscription, end?: number, resolve?: () => void} = {begin, func}
    let elem = begin !== undefined ? elapsingSubscriptions.add(b) : initialElapsingSubscriptions.add(b)

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
      res()
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

    let nestedRet: CancelAbleSubscriptionPromise
    let startTimeoutTime = now()

    const timeoutFunc = async () => {
      
      let prom = new Promise((resolve) => {
        b.resolve = resolve
        b.end = b.begin + duration
        elem.swapIndex(endElapsingSubscriptions, b)
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
    let { remove: removeElem } = subscriptions.add(func as InfiniteSubscription)
    return new CancelAbleSubscriptionPromise(() => {}, () => {
      return removeElem()
    })
  }
}

export class CancelAblePromise extends Promise<void> {
  constructor(f: (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => void, public cancel: () => SuccessfullyRemoved) {
    super(f)
  }
}

export class CancelAbleSubscriptionPromise extends CancelAblePromise {

}

export class CancelAbleElapsingSubscriptionPromise extends CancelAbleSubscriptionPromise {
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
export function subscribe(func: Subscription, duration?: number | Data<number>, iterations: number = 1): CancelAbleSubscriptionPromise {
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

function removeFromIndexWhenFound<Find extends {[key in string]: any}>(ar: RemoveIndexedArray<Find>, find: Find): SuccessfullyRemoved
function removeFromIndexWhenFound<Key extends string, Ar extends {[key in string]: any}>(ar: RemoveIndexedArray<Ar>, find: Ar[Key], key: Key): SuccessfullyRemoved
function removeFromIndexWhenFound<Key extends string, Find extends {[key in string]: any}>(ar: RemoveIndexedArray<Find>, find: Find[Key], key?: Key) {
  let a = ar.a
  let found: number
  if (key !== undefined) {
    for (let index = 0; index < a.length; index++) {
      if (a[index][key] === find) found = found
    }
  }
  else {
    let ind = a.indexOf(find)
    if (ind !== -1) found = ind
  }

  if (found === undefined) return false
  
  return ar.remove(found)
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
