import { onMount } from 'solid-js'
import './Request.css'
import IMask from 'imask/esm/imask'
import PhoneIcon from '@/icons/phone.svg?component'
import SendIcon from '@/icons/send.svg?component'
import ThumbUpIcon from '@/icons/thumb-up.svg?component'

function script() {
  const el = document.querySelector('.request')
  if (!el) return

  const formEl = el.querySelector('.request__form')
  const inputEl = el.querySelector('.request__input')

  if (inputEl.type === 'tel') {
    const phoneMask = IMask(inputEl, {
      mask: '+{7} 000 000 00-00'
    })

    // formEl.addEventListener('submit', (e) => {
    //   if (!phoneMask.masked.isComplete) {
    //     e.preventDefault()
    //     inputEl.focus()
    //   }
    // })
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

export default function Request() {
  onMount(script)
  return (
    <div
      class="request"
      style="background-image: linear-gradient(251deg, #bfff1d -16%, #93fff2 82%)"
    >
      <form class="request__form" autocomplete="off">
        <h2 class="request__title">Оставьте заявку</h2>
        <div class="request__desc">
          <p>Я пришлю вам прайс и свои работы в мессенджер</p>
        </div>
        <div class="request__field">
          <input
            type="tel"
            id="form-input"
            name="phone"
            class="request__input"
            required
            pattern="[+]7 [0-9]{3} [0-9]{3} [0-9]{2}-[0-9]{2}"
            placeholder="Ваш номер телефона"
            aria-describedby="form-note"
          />
          <label htmlFor="form-input" class="request__label">
            Ваш номер телефона
          </label>
          <span class="request__addon">
            <PhoneIcon class="request__addon-icon" aria-hidden="true" />
          </span>
          <button type="submit" class="request__button" aria-label="Отправить">
            <SendIcon class="request__button-icon" aria-hidden="true" />
          </button>
        </div>
        <p id="form-note" class="request__note">
          Нажимая на кнопку «Отправить», вы соглашаетесь с правилами
          конфиденциальности
        </p>
      </form>

      <div class="request__spinner">
        <div className="request__spinner-circle" />
      </div>

      <div class="request__success">
        <div class="request__success-badge">
          <ThumbUpIcon class="request__success-icon" aria-hidden="true" />
        </div>
        <p className="request__success-text">
          Спасибо.
          <br />
          Заявка отправлена
        </p>
      </div>
    </div>
  )
}
