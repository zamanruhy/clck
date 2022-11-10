import { onCleanup } from 'solid-js'
import Dialog from './Dialog'
import './Form.css'

export default function Form(props) {
  function onInsert(node) {
    const requestEl = document.querySelector('.request')
    const parentEl = requestEl.parentElement
    node.appendChild(requestEl)

    onCleanup(() => {
      parentEl.appendChild(requestEl)
    })
  }

  return (
    <Dialog variant="form" {...props}>
      <div class="form" ref={onInsert} />
    </Dialog>
  )
}
