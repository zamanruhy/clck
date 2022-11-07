import { createEffect, createSignal } from 'solid-js'

export default function Video(props) {
  let el
  const [loaded, setLoaded] = createSignal(false)
  const [progress, setProgress] = createSignal(0)

  createEffect(() => props.onProgress?.(progress()))
  createEffect(() => (props.playing && loaded() ? el.play() : el.pause()))

  return (
    <video
      src={props.src}
      playsinline
      onTimeUpdate={(e) => {
        if (el.duration) {
          setProgress(el.currentTime / el.duration)
        }
      }}
      onCanPlayThrough={(e) => {
        props.onLoad?.()
        setLoaded(true)
      }}
      ref={el}
    />
  )
}
