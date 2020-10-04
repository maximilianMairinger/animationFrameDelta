function delay(timeout: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, timeout)
  })
}


const now = performance.now.bind(performance)

export type InfiniteSubscription = (delta: number, timestamp: number, absoluteDelta: number) => void
export type ElapsingSubscription = (runningFor: number, delta: number, timestamp: number, absoluteDelta: number) => void

type RemoveIndexLink<T = unknown> = {
  remove(): boolean, 
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
        that.a.splice(index, len)
        delete that.ls[index]
        that.linkIndex.splice(index, 1)
        let keys = Object.keys(that.ls)
        let from: number
        for (let i = 0; i < keys.length; i++) {
          if (+keys[i] > index) {
            from = i
            break
          }
        }
        for (let i = from; i < keys.length; i++) {
          that.ls[keys[i]](-len)
        }
        


        this.remove = () => false
        return true
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
}

const subscriptions: RemoveIndexedArray<InfiniteSubscription> = new RemoveIndexedArray()
const elapsingSubscriptions: RemoveIndexedArray<{begin: number, func: ElapsingSubscription}> = new RemoveIndexedArray()
const initialElapsingSubscriptions: RemoveIndexedArray<{begin: number, func: ElapsingSubscription}> = new RemoveIndexedArray()
const endElapsingSubscriptions: RemoveIndexedArray<{begin: number, end?: number, func: ElapsingSubscription, resolve: () => void}> = new RemoveIndexedArray()




function sub(func: InfiniteSubscription): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: false): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: true, inIteration: number, begin?: number): CancelAbleSubscriptionPromise
function sub(func: Subscription, elapseIn?: number, iterations?: number, iterateTimestamp?: boolean, inIteration?: number, begin?: number): CancelAbleSubscriptionPromise {
  if (elapseIn) {
    let b: {begin: number, func: ElapsingSubscription, end?: number, resolve?: () => void} = {begin, func}
    let elem = begin !== undefined ? elapsingSubscriptions.add(b) : initialElapsingSubscriptions.add(b)

    const removeElem = (clean: boolean) => {
      if (elem.remove()) {
        let elapsed: number
        if (clean) {
          elapsed = inIteration * elapseIn
          timestamp = b.begin + elapsed
          if (iterateTimestamp) elapsed = elapsed / inIteration
        }
        else {
          elapsed = timestamp - b.begin
        }
        let absoluteDelta = timestamp - lastTimestamp
  
        func(elapsed, absoluteDelta * invertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)
  
        iterations--
        inIteration++
      }
    }

    let res: Function
    let ret = new CancelAbleSubscriptionPromise((r) => {
      res = r
    }, () => {
      clearTimeout(timeoutID)
      if (nestedRet) nestedRet.cancel()
      removeElem(false)
      res()
    })

    let nestedRet: CancelAbleSubscriptionPromise
    let start = now()
    let timeoutID = setTimeout(async () => {
      console.log(now() - start)
      
      let prom = new Promise((resolve) => {
        b.resolve = resolve
        b.end = b.begin + elapseIn
        elem.swapIndex(endElapsingSubscriptions, b)
      })
      

      await Promise.race([delay(absoluteDeltaAt60FPS), prom])

      removeElem(true)

      if (iterations > 0) {
        
        await nextFrame(async () => {
          await nextFrame(async (timestamp) => {
            console.log(count++)
            await (nestedRet = sub(func, elapseIn, iterations, iterateTimestamp as true, inIteration, iterateTimestamp ? timestamp : b.begin))
          })
        })
        
        
      }

      res()

    }, elapseIn - absoluteDeltaAt60FPS - 1)

    return ret
  }
  else {
    let { remove: removeElem } = subscriptions.add(func as InfiniteSubscription)
    return new CancelAbleSubscriptionPromise(() => {}, () => {
      removeElem()
    })
  }
}

export class CancelAbleSubscriptionPromise extends Promise<void> {
  public unsubscribe: Function
  constructor(f: (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => void, unsubscribe: Function) {
    super(f)
    this.unsubscribe = unsubscribe
  }
  cancel() {
    this.unsubscribe()
  }
}
let count = 0

export function subscribe(func: InfiniteSubscription): CancelAbleSubscriptionPromise
export function subscribe(func: ElapsingSubscription, elapseIn: number, iterations?: number, iterateTimestamp?: boolean): CancelAbleSubscriptionPromise
export function subscribe(func: Subscription, elapseIn?: number, iterations: number = 1, iterateTimestamp = true): CancelAbleSubscriptionPromise {
  return sub(func, elapseIn, iterations, iterateTimestamp as true, 1)
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
  // console.log("------------------------------", nextFrameCbs.length)
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
      console.log("another")
      elem.func(currentTimestamp - elem.begin, stats.delta, stats.timestamp, stats.absoluteDelta)
    }
    else {
      console.log("resolve")
      elem.resolve()
    }
  }

  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)


const nextFrameCbs = []
/**
 * The Callback is intentionally not promiseified. Native promises are *not* synchronous which is probably not intended here.
 * @param cb Called when next frame hits. Similar to requestAnimationFrame, but does use performance.now() as the rest of animation-frame-delta
 */
export function nextFrame(cb: (timestamp: number) => void | Promise<void>): Promise<void> {
  return new Promise((res) => {
    nextFrameCbs.push(async (timestamp: number) => {
      await cb(timestamp)
      res()
    })
  })
  
}
