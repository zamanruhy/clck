import About from '@/components/About'
import Ava from '@/components/Ava'
import Form from '@/components/Form'
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
        <Form />
        <a href="#" class="footer__copyright" aria-label="Сайт кликбар">
          <LogoIcon class="footer__logo" aria-hidden="true" />
        </a>
      </footer>
    </>
  )
}
