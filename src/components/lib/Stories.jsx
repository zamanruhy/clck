import { createSignal, For, Show, splitProps } from 'solid-js'
import Dialog from './Dialog'
import './Stories.css'
import CloseIcon from '@/icons/close.svg?component'
import Story from './Story'

export default function Stories(props) {
  const [, rest] = splitProps(props, [
    'ava',
    'username',
    'time',
    'stories',
    'onOpen',
    'onOpened',
    'onClose',
    'onClosed'
  ])

  const [index, setIndex] = createSignal(0)
  const [playing, setPlaying] = createSignal(true)
  const [progress, setProgress] = createSignal(0)
  const [opened, setOpened] = createSignal(false)
  let timer = null

  function next() {
    setIndex((index() + 1) % props.stories.length)
  }

  function prev() {
    if (index() !== 0) {
      setIndex((index() - 1) % props.stories.length)
    }
  }

  function onStoryProgress(value) {
    setProgress(value)
    if (value === 1) {
      setTimeout(next, 50)
    }
  }

  function onPointerDown(e) {
    if (playing()) {
      timer = setTimeout(() => {
        setPlaying(false)
        timer = null
      }, 150)
    }
  }

  function onPointerUp(e) {
    if (timer) {
      clearTimeout(timer)
      timer = null

      const rect = e.currentTarget.getBoundingClientRect()

      if (e.clientX - rect.left < rect.width / 2) {
        prev()
      } else {
        next()
      }
    }
    setPlaying(true)
  }

  return (
    <>
      <Dialog
        {...rest}
        variant="stories"
        closeOnBackdrop={false}
        onOpen={() => {
          props.onOpen?.()
        }}
        onOpened={() => {
          setOpened(true)
          props.onOpened?.()
        }}
        onClose={() => {
          setPlaying(false)
          props.onClose?.()
        }}
        onClosed={() => {
          setIndex(0)
          setOpened(false)
          setProgress(0)
          setPlaying(true)
          props.onClosed?.()
        }}
      >
        <div class="stories">
          <div class="stories__header">
            <div class="stories__bars">
              <For each={props.stories}>
                {(_, i) => (
                  <div
                    class="stories__bar"
                    style={{
                      '--progress':
                        i() < index() ? 1 : i() === index() ? progress() : 0
                    }}
                  />
                )}
              </For>
            </div>
            <div class="stories__row">
              <div class="stories__user">
                <img src={props.ava} alt="" class="stories__ava" />
                <h3 class="stories__username">{props.username}</h3>
                <time class="stories__time">{props.time}</time>
              </div>
              <button
                type="button"
                class="stories__close"
                aria-label="Закрыть сторис"
                onClick={() => props.onRequestClose?.()}
              >
                <CloseIcon aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            class="stories__overlay"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          ></div>

          <Show when={opened() && props.stories[index()]} keyed>
            {(story) => (
              <Story
                {...story}
                playing={playing()}
                onProgress={onStoryProgress}
              />
            )}
          </Show>
        </div>
      </Dialog>
    </>
  )
}

/* <For each={stories}>
  {(story, i) => (
    <Show when={i() === index()}>
      <Story {...story} onProgress={onStoryProgress} />
    </Show>
  )}
</For> */
