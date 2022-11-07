import './Social.css'
import VkIcon from '@/icons/vk.svg?component'
import TmIcon from '@/icons/tm.svg?component'
import YtIcon from '@/icons/yt.svg?component'

export default function Social() {
  return (
    <ul class="social">
      <li class="social__item">
        <a
          class="social__link"
          style="--color: #007cef"
          href="#"
          aria-label="VK"
        >
          <VkIcon
            class="social__icon"
            style="height: 12px; top: 1px"
            aria-hidden="true"
          />
        </a>
      </li>
      <li className="social__item">
        <a
          class="social__link"
          style="--color: #229ed9"
          href="#"
          aria-label="Telegram"
        >
          <TmIcon
            class="social__icon"
            style="height: 16px; left: -1px"
            aria-hidden="true"
          />
        </a>
      </li>
      <li className="social__item">
        <a
          class="social__link"
          style="--color: #c4302b"
          href="#"
          aria-label="YouTube"
        >
          <YtIcon
            class="social__icon"
            style="height: 14px"
            aria-hidden="true"
          />
        </a>
      </li>
    </ul>
  )
}
