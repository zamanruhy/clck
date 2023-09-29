import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import './Ava.css'
import Stories from './lib/Stories'
import ShareIcon from '../icons/share.svg?component'
// import Form from './lib/Form'

export function ava() {
  const el = document.querySelector('.ava')
  if (!el) return

  const stories = window.data?.stories || []

  if (!stories.length) {
    el.classList.add('ava_empty')
  }

  const vidEl = el.querySelector('video.ava__media')
  const firstVideo = stories.find((v) => v.type === 'video')

  if (vidEl && firstVideo) {
    vidEl.src = firstVideo.src
    vidEl.addEventListener('canplaythrough', () => {
      el.classList.add('ava_loaded')
    })
    window.videoEl.src = window.videoEl._src = firstVideo.src
  }

  const [storiesOpen, setStoriesOpen] = createSignal(false)
  const storiesEl = el.querySelector('.ava__stories')
  const pictureEl = el.querySelector('.ava__picture')

  pictureEl.addEventListener('click', (e) => {
    e.preventDefault()
    setStoriesOpen(true)
    window.videoEl.play()
  })

  // window.addEventListener(
  //   'click',
  //   () => {
  //     // console.log('windowclick')
  //     window.videoEl.play() //.then(() => window.videoEl.pause())
  //   },
  //   { once: true }
  // )

  // // https://stackoverflow.com/questions/46483001/programmatically-play-video-with-sound-on-safari-and-mobile-chrome
  // btn.onclick = (e) => {
  //   vid.play().then(() => vid.pause()) // grants full access to the video
  //   setTimeout(() => vid.play().catch(console.error), 5000)
  // }

  const shareEl = el.querySelector('.ava__share')
  shareEl.addEventListener('click', async () => {
    try {
      await navigator.share(window.data?.share)
    } catch (err) {
      console.log(err)
    }
  })

  render(
    () => (
      <Stories
        {...window.data?.summary}
        stories={stories}
        open={storiesOpen()}
        onRequestClose={() => setStoriesOpen(false)}
        onOpen={() => vidEl?.pause()}
        onClose={() => vidEl?.play()}
      />
    ),
    storiesEl
  )
}

export default function Ava() {
  return (
    <div class="ava">
      <div class="ava__content">
        <div
          class="ava__ring"
          style="background-image: conic-gradient(#33f7f7 5%, #b7ff01, #33f7f7 95%)"
        />
        <button
          type="button"
          id="avaPicture"
          class="ava__picture"
          aria-label="Открыть сторис"
        >
          <img
            src="static/img/ava.avif"
            alt=""
            class="ava__media"
            aria-hidden="true"
            fetchpriority="high"
          />
          <video
            class="ava__media"
            autoplay
            muted
            loop
            playsinline
            disablepictureinpicture
            aria-hidden="true"
            ref={(el) => {
              el.muted = true
            }}
          />
          <video
            id="videoEl"
            muted
            preload
            playsinline
            disablepictureinpicture
            // controls
          />
        </button>
      </div>
      <button type="button" class="ava__share" aria-label="Поделиться">
        <ShareIcon class="ava__share-icon" aria-hidden="true" />
      </button>
      <div class="ava__stories" />
    </div>
  )
}
