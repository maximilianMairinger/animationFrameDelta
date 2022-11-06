import { Data, DataSubscription } from "josm"
import { CancelAblePromise, now } from "tiny-delay"

type SuccessfullyRemoved = boolean


export function ignoreUnsubscriptionError() {
  console.warn("animationFrameDelta.ignoreUnsubscriptionError is deprecated.")
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

export class CancelAbleNextFramePromise extends CancelAblePromise {

}

export { now } from "tiny-delay"
