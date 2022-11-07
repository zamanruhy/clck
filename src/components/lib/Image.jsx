import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'

export default function Image(props) {
  const [loaded, setLoaded] = createSignal(false)
  const animate = createMemo(() => props.playing && loaded())
  const progress = useProgress(animate, 5000)

  createEffect(() => props.onProgress?.(progress()))

  return (
    <img
      src={props.src}
      alt="#"
      onLoad={() => {
        props.onLoad?.()
        setLoaded(true)
      }}
    />
  )
}

function useProgress(animate, duration) {
  const [progress, setProgress] = createSignal(0)
  const getPlaying = () => (typeof animate === 'function' ? animate() : animate)
  const getDuration = () =>
    typeof duration === 'function' ? duration() : duration

  let prevElapsed = 0

  createEffect(() => {
    if (getPlaying()) {
      const dur = getDuration()
      let rafId = null
      let start = null
      let elapsed = 0
      function step(timestamp) {
        if (!start) start = timestamp
        elapsed = timestamp - start
        setProgress(Math.min((elapsed + prevElapsed) / dur, 1))
        if (elapsed + prevElapsed < dur) {
          rafId = requestAnimationFrame(step)
        }
      }
      rafId = requestAnimationFrame(step)
      onCleanup(() => {
        cancelAnimationFrame(rafId)
        prevElapsed += elapsed
      })
    }
  })

  return progress
}
