import {
  mergeProps,
  splitProps,
  onMount,
  onCleanup,
  createSignal,
  createMemo
} from 'solid-js'
import { Transition, TransitionChild } from './Transition'
import useModal from '@/hooks/use-modal'
// import { Portal } from 'solid-js/web'
import './Dialog.css'

export default function Dialog(props) {
  props = mergeProps(
    {
      open: false,
      closeOnBackdrop: true,
      closeOnEscape: true
    },
    props
  )
  const [, rest] = splitProps(props, [
    'class',
    'classList',
    'open',
    'closeOnBackdrop',
    'closeOnEscape',
    'children',
    'variant',
    'onOpen',
    'onOpened',
    'onClose',
    'onClosed',
    'onRequestClose'
  ])
  const [mounted, setMounted] = createSignal(false)
  const open = createMemo(() => props.open && mounted())
  const { registerModal, unregisterModal, trapFocus } = useModal()
  let el
  let contentEl
  let returnFocusEl = null
  const dialog = {}

  async function onBeforeEnter() {
    props.onOpen?.()
    queueMicrotask(() => {
      returnFocusEl = returnFocusEl || document.activeElement
      registerModal(dialog)
    })
    setTimeout(() => {
      props.onOpened?.()
      setFocus()
    }, 100)
  }
  // function onAfterEnter() {
  //   props.onOpened?.()
  //   setFocus()
  // }
  function onBeforeLeave() {
    props.onClose?.()

    setTimeout(() => {
      props.onClosed?.()
      returnFocusEl.focus?.({ preventScroll: true })
      returnFocusEl = null
      unregisterModal(dialog)
    }, 100)
  }
  // async function onAfterLeave() {
  //   props.onClosed?.()
  //   returnFocusEl.focus?.({ preventScroll: true })
  //   returnFocusEl = null
  //   unregisterModal(dialog)
  // }
  function onClickOut(e) {
    if (props.closeOnBackdrop && !contentEl.contains(e.target)) {
      props.onRequestClose?.()
    }
  }
  function onEscape(e) {
    if (props.closeOnEscape && e.key === 'Escape') {
      props.onRequestClose?.()
    }
  }
  function setFocus() {
    if (!el.contains(document.activeElement)) {
      el.focus()
    }
  }

  onMount(() => {
    setMounted(true)

    onCleanup(() => {
      unregisterModal(dialog)
    })
  })

  return (
    <>
      <Transition show={open()} as="span">
        <TransitionChild
          class="dialog-backdrop"
          classList={{
            [`dialog-backdrop_${props.variant}`]: Boolean(props.variant)
          }}
          enter="dialog-backdrop_enter"
          enterFrom="dialog-backdrop_out"
          enterTo="dialog-backdrop_in"
          leave="dialog-backdrop_leave"
          leaveFrom="dialog-backdrop_in"
          leaveTo="dialog-backdrop_out"
        />

        <div
          class="dialog"
          classList={{
            [`dialog_${props.variant}`]: Boolean(props.variant),
            [props.class]: Boolean(props.class),
            ...props.classList
          }}
          role="dialog"
          aria-modal="true"
          {...rest}
          tabindex="-1"
          ref={el}
          onClick={onClickOut}
          onKeydown={(e) => {
            onEscape(e)
            trapFocus(e)
          }}
        >
          <TransitionChild
            class="dialog__wrapper"
            enter="dialog__wrapper_enter"
            enterFrom="dialog__wrapper_out"
            enterTo="dialog__wrapper_in"
            leave="dialog__wrapper_leave"
            leaveFrom="dialog__wrapper_in"
            leaveTo="dialog__wrapper_out"
            beforeEnter={onBeforeEnter}
            // afterEnter={onAfterEnter}
            beforeLeave={onBeforeLeave}
            // afterLeave={onAfterLeave}
          >
            <div class="dialog__content" ref={contentEl}>
              {props.children}
            </div>
          </TransitionChild>
        </div>
      </Transition>
    </>
  )
}
