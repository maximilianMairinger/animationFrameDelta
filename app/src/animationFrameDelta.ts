const now = performance.now.bind(performance)

export type InfiniteSubscription = (delta: number, timestamp: number, absoluteDelta: number) => void
export type ElapsingSubscription = (runningFor: number, delta: number, timestamp: number, absoluteDelta: number) => void

type RemoveIndex = {remove: () => boolean}

class RemoveIndexedArray<T> extends Array<T> {
  constructor(...a: T[]) {
    super(...a)
  }
  indexedAdd(...a: T[]): RemoveIndex {
    let index = this.length
    let len = a.length
    this.push(...a)
    let q = {
      remove: () => {
        this.splice(index, len)
        q.remove = () => false
        return true
      }
    }
    return q
  }
}

const subscriptions: RemoveIndexedArray<InfiniteSubscription> = new RemoveIndexedArray()
const elapsingSubscriptions: RemoveIndexedArray<{begin: number, func: ElapsingSubscription}> = new RemoveIndexedArray()
const initialElapsingSubscriptions: RemoveIndexedArray<ElapsingSubscription> = new RemoveIndexedArray()




function sub(func: InfiniteSubscription): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: false): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: true, inIteration: number, begin?: number): CancelAbleSubscriptionPromise
function sub(func: Subscription, elapseIn?: number, iterations?: number, iterateTimestamp?: boolean, inIteration?: number, begin?: number): CancelAbleSubscriptionPromise {
  if (elapseIn) {
    let elem: RemoveIndex
    if (iterateTimestamp || begin === undefined) elem = initialElapsingSubscriptions.indexedAdd(func)
    else elem = elapsingSubscriptions.indexedAdd({begin, func})

    let ret = new CancelAbleSubscriptionPromise(() => {
      if (nestedRet) nestedRet.cancel()
      clearTimeout(timeoutID)
      elem.remove()
    })

    let nestedRet: CancelAbleSubscriptionPromise

    let timeoutID = setTimeout(() => { 
      let proms = [] 
      if (iterations > 1) requestAnimationFrame(() => {
        proms.push(nestedRet = sub(func, elapseIn, iterations, iterateTimestamp as true, inIteration, begin))
      })

      let index = findIndexOfElapsingSubscriptionsFunc(func)
      if (index === -1) return
      
      let { begin } = elapsingSubscriptions[index]
      elapsingSubscriptions.splice(index, 1)

      let elapsed = inIteration * elapseIn
      let timestamp = begin + elapsed
      let absoluteDelta = timestamp - lastTimestamp

      func(elapsed, absoluteDelta * invertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)

      iterations--
      inIteration++

      Promise.all(proms).then(() => {(ret as any).resolve()})
    }, elapseIn - 1) // setTimeout is only 1ms accurate. In an edge case it is better to drop one frame instead of execute one too many

    return ret
  }
  else {
    let { remove: removeElem } = subscriptions.indexedAdd(func as InfiniteSubscription)
    return (new CancelAbleSubscriptionPromise(() => {
      removeElem()
    }) as any).resolve()
  }
}

export class CancelAbleSubscriptionPromise extends Promise<void> {
  private res: Function
  public unsubscribe: Function
  constructor(unsubscribe: Function) {
    let res: Function
    super((r) => {
      res = r
    })
    this.unsubscribe = unsubscribe
    this.res = res
  }
  private resolve() {
    this.res()
    return this
  }
  

  cancel() {
    this.unsubscribe()
  }
}

export function subscribe(func: InfiniteSubscription): CancelAbleSubscriptionPromise
export function subscribe(func: ElapsingSubscription, elapseIn: number, iterations?: number, iterateTimestamp?: boolean): CancelAbleSubscriptionPromise
export function subscribe(func: Subscription, elapseIn?: number, iterations: number = 1, iterateTimestamp = true): CancelAbleSubscriptionPromise {
  return sub(func, elapseIn, iterations, iterateTimestamp as true, 1)
}
export default subscribe




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

export type Subscription = InfiniteSubscription | ElapsingSubscription

function unsubscribe(func: Subscription) {
  let at = findIndexOfElapsingSubscriptionsFunc(func)
  if (at !== -1) elapsingSubscriptions.splice(at, 1)
  else {
    at = subscriptions.indexOf(func as InfiniteSubscription)
    if (at !== -1) subscriptions.splice(at, 1)
    else {
      at = initialElapsingSubscriptions.indexOf(func)
      if (at !== -1) subscriptions.splice(at, 1)
      // subscription might have already elapsed
    }
  }
}

const invertOfAbsoluteDeltaAt60FPS = 60 / 1000


export const stats: {
  delta: number,            // relative delta  (1 at 60fps)
  absoluteDelta: number,    // absolute delta  (1000 / 60 = 16.6666ms at 60fps)
  timestamp: number         // time since application start in ms (updates on frame drawn)
} = {
  delta: 1,
  absoluteDelta: 1 / invertOfAbsoluteDeltaAt60FPS,
  timestamp: 0
}







let index: number       // to prevent GC
let lastTimestamp: number = now()
let timestamp: number
let currentSubscriptions: InfiniteSubscription[]
let currentElapsingSubscriptions: {begin: number, func: ElapsingSubscription}[]
let currentAnything: any
let currentTimestamp: number


const loop = () => {
  currentTimestamp = timestamp = now()
  stats.absoluteDelta = timestamp - lastTimestamp
  lastTimestamp = stats.timestamp = timestamp
  stats.delta = stats.absoluteDelta * invertOfAbsoluteDeltaAt60FPS



  for (; 0 !== initialElapsingSubscriptions.length;) {
    elapsingSubscriptions.push({begin: currentTimestamp, func: initialElapsingSubscriptions[0]})
    initialElapsingSubscriptions.splice(0, 1)
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
