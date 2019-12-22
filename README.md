# Animation frame delta



## Example

Register a animation loop like so

```js
import animFrame, { unsubscribe } from "animation-frame-delta"

animFrame((delta, timestamp, absoluteDelta) => {
  console.log(delta)          // 1 at 60fps
  console.log(timestamp)      // progressing timestamp
  console.log(absoluteDelta)  // 16.6666 at 60fps
})
```

When given a duration, the progress is beeing passed to the individual function.

```js
let subscription = (progress, delta, timestamp, absoluteDelta) => {
  console.log(progress)       // 0..1000
}
let duration = 1000

animFrame(subscription, duration)
```

To unsubscribe simply call

```js
unsubscribe(subscription)
```

TODO: iterations

## Conribute

All feedback is appreciated. Create an pull request or write an issue.

