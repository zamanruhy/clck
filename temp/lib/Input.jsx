import { splitProps } from 'solid-js'

export default function Input(props) {
  const [, rest] = splitProps(props, ['class', 'classList', 'invalid'])

  return (
    <input
      class="block min-h-10 w-full rounded border-(1 slate-300)
      bg-white px-4 py-1 placeholder-(slate-400 opacity-100) transition
        focus:(border-blue-500 outline-none ring-1 ring-blue-500)"
      classList={{
        [props.class]: Boolean(props.class),
        ...props.classList,
        'border-red-600': props.invalid
      }}
      type="text"
      {...rest}
    />
  )
}
