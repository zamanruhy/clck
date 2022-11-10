import { createEffect, createSignal, on } from 'solid-js'
import useVideoProgress from '@/hooks/use-video-progress'

export default function Video(props) {
  let el
  // const [loaded, setLoaded] = createSignal(false)
  const [setRef, progress] = useVideoProgress()

  createEffect(() => props.onProgress?.(progress()))
  createEffect(
    on(
      () => props.playing,
      () => (props.playing ? el.play() : el.pause()),
      { defer: true }
    )
  )

  function onLoad() {
    props.onLoad?.()
    // el.play() //.then(() => el.pause()) // grants full access to the video
    // el.muted = false
    // setTimeout(() => el.play().catch(console.error), 1000)
    // setLoaded(true)
    // el.play()
    // setTimeout(() => {
    // console.log('some')
    // el.muted = false
    // }, 1000)
  }

  return (
    <video
      src={props.src}
      muted
      autoplay
      preload
      playsinline
      disablepictureinpicture
      // controls
      onLoadedData={onLoad}
      onCanPlay={onLoad}
      onCanPlayThrough={onLoad}
      // onLoadedData={() => console.log('onLoadedData')}
      // onCanPlay={() => console.log('onCanPlay')}
      // onCanPlayThrough={() => console.log('onCanPlayThrough')}
      ref={(node) => {
        el = node
        setRef(node)
      }}
    />
  )
}
