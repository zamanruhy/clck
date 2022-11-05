import { onMount } from 'solid-js'
import './Form.css'
// import IMask from 'imask'
import IMask from 'imask/esm/imask'
import PhoneIcon from '@/icons/phone.svg?component'
import SendIcon from '@/icons/send.svg?component'
import ThumbUpIcon from '@/icons/thumb-up.svg?component'

function script() {
  const el = document.querySelector('.form')
  if (!el) return

  const contentEl = el.querySelector('.form__content')
  const inputEl = el.querySelector('.form__input')

  if (inputEl.type === 'tel') {
    const phoneMask = IMask(inputEl, {
      mask: '+{7} 000 000 00-00'
    })
    contentEl.addEventListener('submit', (e) => {
      if (!phoneMask.masked.isComplete) {
        e.preventDefault()
        inputEl.focus()
      }
    })
    // inputEl.addEventListener('blur', (e) => {
    //   if (!phoneMask.masked.isComplete) {
    //     inputEl.value = ''
    //     phoneMask.updateValue()
    //   }
    // })
    // console.log('phoneMask', phoneMask)
  }
}

if (import.meta.env.PROD && !import.meta.env.SSR) {
  script()
}

export default function Form() {
  onMount(script)
  return (
    <div
      class="form"
      style="background: linear-gradient(251.25deg, #bfff1d -15.56%, #93fff2 81.84%)"
    >
      <form class="form__content" autocomplete="off">
        <h2 class="form__title">Оставьте заявку</h2>
        <div class="form__desc">
          <p>Я пришлю вам прайс и свои работы в мессенджер</p>
        </div>
        <div class="form__field">
          <input
            type="tel"
            id="form-input"
            name="phone"
            class="form__input"
            required
            // pattern="\\+7 \\d{3} \\d{3} \\d{2}-\\d{2}"
            placeholder="Ваш номер телефона"
            aria-describedby="form-note"
          />
          <label htmlFor="form-input" class="form__label">
            Ваш номер телефона
          </label>
          <span class="form__addon">
            <PhoneIcon class="form__addon-icon" aria-hidden="true" />
          </span>
          <button type="submit" class="form__button" aria-label="Отправить">
            <SendIcon class="form__button-icon" aria-hidden="true" />
          </button>
        </div>
        <p id="form-note" class="form__note">
          Нажимая на кнопку «Отправить», вы соглашаетесь с правилами
          конфиденциальности
        </p>
      </form>

      <div class="form__spinner">
        <div className="form__spinner-circle" />
      </div>

      <div class="form__success">
        <div class="form__success-badge">
          <ThumbUpIcon class="form__success-icon" aria-hidden="true" />
        </div>
        <p className="form__success-text">
          Спасибо.
          <br />
          Заявка отправлена
        </p>
      </div>
    </div>
  )
}
