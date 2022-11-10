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
import useSwipe from '@/hooks/use-swipe'
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
  let timer = null
  // let maybeSwipe = false

  const setRef = useSwipe({
    onSwiped({ dir }) {
      // console.log(dir)
    },
    // onSwipeStart() {
    //   setMaybeSwipe(true)
    // },
    onSwipedRight: prev,
    onSwipedLeft: next,
    onSwipedDown() {
      props.onRequestClose?.()
    }
  })

  function next() {
    setIndex((index() + 1) % props.stories.length)
  }

  function prev() {
    // if (index() !== 0) {
    setIndex((index() - 1 + props.stories.length) % props.stories.length)
    // }
  }

  function onStoryProgress(value) {
    setProgress(value)
    if (value === 1) {
      next()
    }
  }

  function onPointerDown(e) {
    if (e.pointerType === 'touch' || e.button !== 0) return
    // e.target.setPointerCapture(e.pointerId)
    if (playing()) {
      timer = setTimeout(() => {
        setPlaying(false)
        timer = null
      }, 150)
    }
    // e.preventDefault()
  }

  function onPointerUp(e) {
    if (e.pointerType === 'touch' || e.button !== 0) return
    if (timer) {
      clearTimeout(timer)
      timer = null
      onClick(e)
    }
    setPlaying(true)
    // e.preventDefault()
  }

  function onClick(e) {
    console.log('onClick')
    const rect = e.currentTarget.getBoundingClientRect()
    if (e.clientX - rect.left < rect.width / 2) {
      prev()
    } else {
      next()
    }
    e.preventDefault()
  }

  function onTouchClick(e) {
    if (e.pointerType !== 'touch') return
    onClick(e)
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

  // function onInsert(node) {
  //   setEl(node)
  // }

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
            // onPointerDown={onPointerDown}
            // onPointerUp={onPointerUp}
            // onClick={onTouchClick}
            onTouchEnd={onClick}
            // ref={setRef}
          >
            {/* <div class="stories__left" onClick={prev} />
            <div class="stories__right" onClick={next} /> */}
          </div>

          <Show when={opened() && props.stories[index()]} keyed>
            {(story) => (
              <Story
                {...story}
                playing={playing()}
                onProgress={onStoryProgress}
                onRequestForm={() => setFormOpen(true)}
              />
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
