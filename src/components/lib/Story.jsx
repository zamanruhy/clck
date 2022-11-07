import { createSignal, onMount, Show } from 'solid-js'
import Image from './Image'
import Video from './Video'
import Spinner from './Spinner'
import SendIcon from '@/icons/send.svg?component'
import './Story.css'

export default function Story(props) {
  // onMount(() => console.log('mounted'))
  const [loading, setLoading] = createSignal(true)

  return (
    <div class="story">
      {props.type === 'image' ? (
        <Image {...props} onLoad={() => setLoading(false)} />
      ) : (
        <Video {...props} onLoad={() => setLoading(false)} />
      )}

      <Show
        when={!loading()}
        fallback={<Spinner class="story__spinner" size={40} thickness={2} />}
      >
        <button type="button" class="story__button">
          Оставить заявку <SendIcon />
        </button>
      </Show>
    </div>
  )
}
