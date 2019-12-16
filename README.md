# Animation frame delta



## Example

Register a animation loop like so

```js
import animFrame, { unsubscribe } from "animation-frame-delta"

animFrame((delta, timestamp, absoluteDelta) => {
  console.log(delta)
})
```

When given a duration, the progress is beeing passed to the individual function.

```js
let subscription = (progress, delta, timestamp, absoluteDelta) => {
  console.log(progress)
}
let duration = 1000

animFrame(subscription, duration)
```

The unsubscribe simply call

```js
unsubscribe(subscription)
```


