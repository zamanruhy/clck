import { createEffect, createSignal, onCleanup } from 'solid-js'

export default function useSwipe(options = {}) {
  const [ref, setRef] = createSignal(null)

  createEffect(() => {
    if (!ref()) return

    var el = ref(),
      startX,
      startY,
      startTime,
      threshold = 50, //required min distance traveled to be considered swipe
      // restraint = threshold * 0.7, // maximum distance allowed at the same time in perpendicular direction
      allowedTime = 250 // maximum time allowed to travel that distance
    // minDist = 50,
    // started = false

    function onPointerDown(e) {
      // if (e.pointerType !== 'touch') return
      const obj = e.changedTouches[0]

      // el.setPointerCapture(e.pointerId)
      startX = obj.clientX
      startY = obj.clientY
      startTime = Date.now() // record time when finger first makes contact with surface
      // started = false
      e.preventDefault()
    }

    function onPointerMove(e) {
      // if (e.pointerType !== 'touch') return
      // const deltaX = Math.abs(e.clientX - startX)
      // const deltaY = Math.abs(e.clientY - startY)
      // const elapsedTime = Date.now() - startTime
      // if (
      //   ((deltaX >= minDist &&
      //     deltaX / elapsedTime >= threshold / allowedTime) ||
      //     (deltaY >= minDist &&
      //       deltaY / elapsedTime >= threshold / allowedTime)) &&
      //   !started
      // ) {
      //   started = true
      //   console.log('started')
      //   options.onSwipeStart?.()
      // }
      //
      e.preventDefault() // prevent scrolling when inside DIV
    }

    function onPointerUp(e) {
      // if (e.pointerType !== 'touch') return
      const obj = e.changedTouches[0]

      // if (!started) return
      // started = false
      // console.log('onPointerUp')

      const deltaX = obj.clientX - startX // get horizontal dist traveled by finger while in contact with surface
      const deltaY = obj.clientY - startY // get vertical dist traveled by finger while in contact with surface
      const elapsedTime = Date.now() - startTime // get time elapsed
      let dir = 'none'
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        // if (Math.abs(deltaX) >= threshold && Math.abs(deltaY) <= restraint) {
        if (
          Math.abs(deltaX) >= threshold &&
          Math.abs(deltaX) > Math.abs(deltaY)
        ) {
          // 2nd condition for horizontal swipe met
          dir = deltaX < 0 ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(deltaY) >= threshold &&
          Math.abs(deltaY) > Math.abs(deltaX)
          // Math.abs(deltaX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          dir = deltaY < 0 ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
        }
      }
      if (dir === 'left') options.onSwipedLeft?.()
      else if (dir === 'right') options.onSwipedRight?.()
      else if (dir === 'up') options.onSwipedUp?.()
      else if (dir === 'down') options.onSwipedDown?.()
      if (dir !== 'none') options.onSwiped?.({ dir })

      e.preventDefault()
    }

    el.addEventListener('touchstart', onPointerDown)
    el.addEventListener('touchmove', onPointerMove)
    el.addEventListener('touchend', onPointerUp)

    onCleanup(() => {
      el.removeEventListener('touchstart', onPointerDown)
      el.removeEventListener('touchmove', onPointerMove)
      el.removeEventListener('touchend', onPointerUp)
    })
  })

  return setRef
}
