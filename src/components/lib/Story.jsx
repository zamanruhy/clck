import { createSignal, Show, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import Image from './Image'
import Video from './Video'
import Spinner from './Spinner'
import SendIcon from '@/icons/send.svg?component'
import './Story.css'

export default function Story(props) {
  const [, rest] = splitProps(props, ['onRequestForm'])

  const [loaded, setLoaded] = createSignal(false)

  return (
    <div class="story">
      <Dynamic
        component={props.type === 'image' ? Image : Video}
        {...rest}
        onLoad={() => setLoaded(true)}
      />

      <Show
        when={loaded()}
        fallback={<Spinner class="story__spinner" size={36} thickness={2} />}
      >
        {props.link ? (
          <a href={props.link} target="_blank" class="story__button">
            Оставить заявку <SendIcon />
          </a>
        ) : (
          <button
            type="button"
            class="story__button"
            onClick={props.onRequestForm}
          >
            Оставить заявку <SendIcon />
          </button>
        )}
      </Show>
    </div>
  )
}
