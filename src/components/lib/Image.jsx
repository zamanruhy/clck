import { createEffect, createMemo, createSignal } from 'solid-js'
import useProgress from '@/hooks/use-progress'

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
