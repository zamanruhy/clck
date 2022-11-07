import About from '@/components/About'
import Ava from '@/components/Ava'
import Request from '@/components/Request'
import Social from '@/components/Social'
import LogoIcon from '@/icons/logo.svg?component'

export default function Home() {
  return (
    <>
      <main class="app__main">
        <Ava />
        <About />
        <Social />
      </main>
      <footer class="footer">
        <Request />
        <a href="#" class="footer__copyright" aria-label="Сайт кликбар">
          <LogoIcon class="footer__logo" aria-hidden="true" />
        </a>
      </footer>
    </>
  )
}
