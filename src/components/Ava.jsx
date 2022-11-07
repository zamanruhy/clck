import { createSignal, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import './Ava.css'
import Stories from './lib/Stories'
import ShareIcon from '../icons/share.svg?component'

async function script() {
  const el = document.querySelector('.ava')
  if (!el) return

  const stories = window?.data?.stories || []

  if (!stories.length) {
    el.classList.add('ava_empty')
  }

  const videoEl = el.querySelector('video.ava__media')
  const firstVideo = stories.find((v) => v.type === 'video')

  if (videoEl && firstVideo) {
    videoEl.src = firstVideo.src
    videoEl.addEventListener('canplaythrough', () => {
      el.classList.add('ava_loaded')
    })
  }

  const [open, setOpen] = createSignal(false)
  const storiesEl = el.querySelector('.ava__stories')
  const pictureEl = el.querySelector('.ava__picture')
  pictureEl.addEventListener('click', () => setOpen(true))

  if (!import.meta.env.SSR) {
    render(
      () => (
        <Stories
          {...window?.data?.meta}
          stories={stories}
          open={open()}
          onRequestClose={() => setOpen(false)}
        />
      ),
      storiesEl
    )
  }
}

if (import.meta.env.PROD && !import.meta.env.SSR) {
  script()
}

export default function Ava() {
  onMount(script)

  return (
    <div class="ava">
      <div class="ava__content">
        <div
          class="ava__ring"
          style="background-image: conic-gradient(#33f7f7 5%, #b7ff01, #33f7f7 95%)"
        />
        <button type="button" class="ava__picture" aria-label="Открыть сторис">
          <img
            src="/static/img/ava.avif"
            alt="Avatar"
            class="ava__media"
            fetchpriority="high"
          />
          <video class="ava__media" autoplay muted loop></video>
        </button>
      </div>
      <button type="button" class="ava__share" aria-label="Поделиться">
        <ShareIcon class="ava__share-icon" aria-hidden="true" />
      </button>
      <div class="ava__stories" />
    </div>
  )
}

// import { createEffect, createSignal, onMount } from 'solid-js'
// import customElement from '@/utils/custom-element'
// import './Ava.css'
// import Stories from './lib/Stories'
// import ShareIcon from '../icons/share.svg?component'

// function script() {
//   const el = document.querySelector('.ava')
//   if (!el) return

//   const [open, setOpen] = createSignal(false)
//   const stories = window.stories || []

//   if (!stories.length) {
//     el.classList.add('ava_empty')
//   }

//   const videoEl = el.querySelector('video.ava__media')
//   const firstVideo = stories.find((v) => v.type === 'video')

//   if (videoEl && firstVideo) {
//     videoEl.src = firstVideo.src
//     videoEl.addEventListener('canplaythrough', () => {
//       el.classList.add('ava_loaded')
//     })
//   }

//   const storiesEl = el.querySelector('app-stories')
//   customElement('app-stories', Stories)
//   storiesEl.solidProps.stories = window.stories || []
//   storiesEl.solidProps.onRequestClose = () => setOpen(false)
//   storiesEl.solidProps.onOpen = () => videoEl?.pause()
//   storiesEl.solidProps.onClosed = () => videoEl?.play()
//   createEffect(() => (storiesEl.solidProps.open = open()))

//   const pictureEl = el.querySelector('.ava__picture')
//   pictureEl.addEventListener('click', () => setOpen(true))
// }

// if (import.meta.env.PROD && !import.meta.env.SSR) {
//   // script()
// }

// export default function Ava() {
//   onMount(script)

//   return (
//     <div class="ava">
//       <div class="ava__content">
//         <div
//           class="ava__ring"
//           style="background-image: conic-gradient(#33f7f7 5%, #b7ff01, #33f7f7 95%)"
//         />
//         <button type="button" class="ava__picture" aria-label="Открыть сторис">
//           <img
//             src="/static/img/ava.avif"
//             alt="Avatar"
//             class="ava__media"
//             fetchpriority="high"
//           />
//           <video class="ava__media" autoplay muted loop></video>
//         </button>
//       </div>
//       <button type="button" class="ava__share" aria-label="Поделиться">
//         <ShareIcon class="ava__share-icon" aria-hidden="true" />
//       </button>
//       <app-stories
//         ava="/static/img/ava.avif"
//         username="a-petrova"
//         time="4 ч."
//       />
//     </div>
//   )
// }
