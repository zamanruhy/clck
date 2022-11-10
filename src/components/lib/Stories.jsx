import {
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  splitProps
} from 'solid-js'
import Dialog from './Dialog'
import './Stories.css'
import CloseIcon from '@/icons/close.svg?component'
import Story from './Story'
// import useSwipe from '@/hooks/use-swipe'
import Form from './Form'

export default function Stories(props) {
  // let [el, setEl] = createSignal(null)
  // const [overlayEl, setOverlayEl] = createSignal(null)
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
  const [formOpen, setFormOpen] = createSignal(false)
  // const [maybeSwipe, setMaybeSwipe] = createSignal(false)
  const [counter, setCounter] = createSignal(1)
  let timer = null
  // let maybeSwipe = false

  // const setRef = useSwipe({
  //   onSwiped({ dir }) {
  //     // console.log(dir)
  //   },
  //   // onSwipeStart() {
  //   //   setMaybeSwipe(true)
  //   // },
  //   onSwipedRight: prev,
  //   onSwipedLeft: next,
  //   onSwipedDown() {
  //     props.onRequestClose?.()
  //   }
  // })

  function next() {
    if (index() < props.stories.length - 1) {
      setIndex((index() + 1) % props.stories.length)
    } else {
      props.onRequestClose?.()
    }
  }

  function prev() {
    if (index() !== 0) {
      setIndex((index() - 1 + props.stories.length) % props.stories.length)
    } else {
      setCounter(counter() + 1)
    }
  }

  function onStoryProgress(value) {
    setProgress(value)
    if (value === 1) {
      next()
    }
  }

  const [height, setHeigth] = createSignal(0)
  onMount(() => {
    function onResize() {
      setHeigth(document.documentElement.clientHeight)
    }
    onResize()
    window.addEventListener('resize', onResize)

    onCleanup(() => {
      window.removeEventListener('resize', onResize)
    })
  })

  var startX,
    startY,
    startTime,
    threshold = 50,
    allowedTime = 250

  function onPointerDown(e) {
    e.target.setPointerCapture(e.pointerId)
    startX = e.clientX
    startY = e.clientY
    startTime = Date.now()
    e.preventDefault()
  }

  function onPointerMove(e) {
    e.preventDefault()
  }

  function onPointerUp(e) {
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    const elapsedTime = Date.now() - startTime
    let dir = 'none'
    if (elapsedTime <= allowedTime) {
      if (
        Math.abs(deltaX) >= threshold &&
        Math.abs(deltaX) > Math.abs(deltaY)
      ) {
        dir = deltaX < 0 ? 'left' : 'right'
      } else if (
        Math.abs(deltaY) >= threshold &&
        Math.abs(deltaY) > Math.abs(deltaX)
      ) {
        dir = deltaY < 0 ? 'up' : 'down'
      }
    }
    if (dir === 'left') next()
    else if (dir === 'right') prev()
    else if (dir === 'down') props.onRequestClose?.()
    else onClick(e)

    e.preventDefault()
  }

  function onClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    if (e.clientX - rect.left < rect.width / 2) {
      prev()
    } else {
      next()
    }
    e.preventDefault()
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
        <div class="stories" style={{ '--height': height() }}>
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
                <div class="stories__info">
                  <h3 class="stories__username">{props.username}</h3>
                  <time class="stories__time">{props.time}</time>
                </div>
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
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          />

          <Show when={counter()} keyed>
            {(c) => (
              <>
                <Show
                  when={counter() && opened() && props.stories[index()]}
                  keyed
                >
                  {(story) => (
                    <Story
                      {...story}
                      playing={playing()}
                      onProgress={onStoryProgress}
                      onRequestForm={() => setFormOpen(true)}
                    />
                  )}
                </Show>
              </>
            )}
          </Show>
        </div>
      </Dialog>

      <Form
        open={formOpen()}
        onRequestClose={() => setFormOpen(false)}
        onOpen={() => setPlaying(false)}
        onClose={() => setPlaying(true)}
      />
    </>
  )
}
