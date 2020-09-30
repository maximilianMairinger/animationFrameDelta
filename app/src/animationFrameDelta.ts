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
        that.remove(index, len)
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
  remove(index: number, len = 1) {
    this.a.splice(index, len)
    delete this.ls[index]
    delete this.linkIndex[index]
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
    
  }
}

const subscriptions: RemoveIndexedArray<InfiniteSubscription> = new RemoveIndexedArray()
const elapsingSubscriptions: RemoveIndexedArray<{begin: number, func: ElapsingSubscription}> = new RemoveIndexedArray()
const initialElapsingSubscriptions: RemoveIndexedArray<{begin?: number, func: ElapsingSubscription}> = new RemoveIndexedArray()




function sub(func: InfiniteSubscription): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: false): CancelAbleSubscriptionPromise
function sub(func: ElapsingSubscription, elapseIn: number, iterations: number, iterateTimestamp: true, inIteration: number, begin?: number): CancelAbleSubscriptionPromise
function sub(func: Subscription, elapseIn?: number, iterations?: number, iterateTimestamp?: boolean, inIteration?: number, begin?: number): CancelAbleSubscriptionPromise {
  if (elapseIn) {
    let b = {begin, func}
    let elem = begin !== undefined ? elapsingSubscriptions.add(b) : initialElapsingSubscriptions.add(b)
    

    const removeElem = (clean: boolean) => {
      if (elem.remove()) {
        return new Promise((res) => {
          requestAnimationFrame(() => {
            let timestamp: number
            let elapsed: number
            if (clean) {
              elapsed = inIteration * elapseIn
              timestamp = b.begin + elapsed
              if (iterateTimestamp) elapsed = elapsed / inIteration
            }
            else {
              timestamp = lastTimestamp
              elapsed = timestamp - b.begin
            }
            let absoluteDelta = timestamp - lastTimestamp
      
            func(elapsed, absoluteDelta * invertOfAbsoluteDeltaAt60FPS, timestamp, absoluteDelta)
      
            iterations--
            inIteration++
            res()
          })
        })
      }
    }

    let res: Function
    let ret = new CancelAbleSubscriptionPromise((r) => {
      res = r
    }, () => {
      clearTimeout(timeoutID)
      if (nestedRet) nestedRet.cancel()
      removeElem(false).then(() => res())
    })

    let nestedRet: CancelAbleSubscriptionPromise
    let timeoutID = setTimeout(() => { 
      let proms = []
      
      if (iterations > 1) {
        proms.push(new Promise((res) => {
          requestAnimationFrame(() => {
            (nestedRet = sub(func, elapseIn, iterations, iterateTimestamp as true, inIteration, iterateTimestamp ? lastTimestamp : b.begin)).then(res)
          })
        }))
      }

      proms.push(removeElem(true))

      Promise.all(proms).then(() => res())

    }, elapseIn - 1) // setTimeout is only 1ms accurate. In an edge case it is better to drop one frame instead of execute one too many

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

export function subscribe(func: InfiniteSubscription): CancelAbleSubscriptionPromise
export function subscribe(func: ElapsingSubscription, elapseIn: number, iterations?: number, iterateTimestamp?: boolean): CancelAbleSubscriptionPromise
export function subscribe(func: Subscription, elapseIn?: number, iterations: number = 1, iterateTimestamp = true): CancelAbleSubscriptionPromise {
  return sub(func, elapseIn, iterations, iterateTimestamp as true, 1)
}
export default subscribe



export type Subscription = InfiniteSubscription | ElapsingSubscription


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



  for (; 0 !== initialElapsingSubscriptions.a.length;) {
    initialElapsingSubscriptions.linkIndex[0].swapIndex(elapsingSubscriptions, {begin: initialElapsingSubscriptions.a[0].begin = currentTimestamp, func: initialElapsingSubscriptions.a[0].func})
  }

  //clone to ensure that no subscriptions are added during the execution of one
  currentSubscriptions = [...subscriptions.a]
  currentElapsingSubscriptions = [...elapsingSubscriptions.a]

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
