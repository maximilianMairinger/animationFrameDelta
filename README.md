# Animation frame delta



## Example

Register a animation loop like so

```js
import animFrame from "animation-frame-delta"

animFrame((delta, timestamp, absoluteDelta) => {
  console.log(delta)          // 1 at 60fps
  console.log(timestamp)      // progressing timestamp
  console.log(absoluteDelta)  // 16.6666 at 60fps
})
```

When given a duration, the progress is beeing passed to the individual function.

```js
let duration = 1000

let subscription = animFrame((progress, delta, timestamp, absoluteDelta) => {
  console.log(progress)       // 0..1000
}, duration)
```

To cancel simply call

```js
subscription.cancel()
```

An elapsing subscription can also be iterated a number of times

```ts
let iterate = 3

let subscription = animFrame((progress) => {
  console.log(progress)       // 0..1000 ; 0..1000 ; 0..1000
}, duration, iterate)
```


## Conribute

All feedback is appreciated. Create an pull request or write an issue.

