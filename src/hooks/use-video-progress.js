import { createEffect, createSignal, onCleanup } from 'solid-js'

export default function useVideoProgress() {
  const [ref, setRef] = createSignal(null)
  const [progress, setProgress] = createSignal(0)

  createEffect(() => {
    const el = ref()

    if (el) {
      let rafId = null

      function onTimeUpdate() {
        cancelAnimationFrame(rafId)

        if (!el.paused) {
          rafId = requestAnimationFrame(onTimeUpdate)
        }

        calcProgress()
      }

      function calcProgress() {
        if (el.duration) {
          setProgress(el.currentTime / el.duration)
        }
      }

      el.addEventListener('timeupdate', onTimeUpdate)

      onCleanup(() => {
        cancelAnimationFrame(rafId)
        el.removeEventListener('timeupdate', onTimeUpdate)
      })
    }
  })

  return [setRef, progress]
}
