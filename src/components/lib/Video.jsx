import { createEffect, createSignal, on, onCleanup } from 'solid-js'
import useVideoProgress from '@/hooks/use-video-progress'

export default function Video(props) {
  const el = window.videoEl
  // const [loaded, setLoaded] = createSignal(false)
  const [setRef, progress] = useVideoProgress()

  createEffect(() => props.onProgress?.(progress()))
  createEffect(() => (props.playing ? el.play() : el.pause()))

  function onLoad() {
    props.onLoad?.()
  }

  if (!el.paused) {
    el.currentTime = 0
    onLoad()
  }

  setRef(el)

  onCleanup(() => {
    el.pause()
    Object.assign(el, {
      src: el._src,
      currentTime: 0,
      onloadeddata: null,
      oncanplay: null,
      oncanplaythrough: null
    })
    window.avaPicture.appendChild(el)
  })

  return (
    <>
      {Object.assign(el, {
        src: props.src,
        onloadeddata: onLoad,
        oncanplay: onLoad,
        oncanplaythrough: onLoad
      })}
    </>
  )
}
