import { mergeProps, splitProps } from 'solid-js'
import './Spinner.css'

export default function Spinner(props) {
  props = mergeProps({ size: 40, thickness: 4 }, props)
  const [, rest] = splitProps(props, [
    'size',
    'thickness',
    'class',
    'classList',
    'style'
  ])

  return (
    <div
      class="spinner"
      classList={{ [props.class]: Boolean(props.class), ...props.classList }}
      style={{
        ...props.style,
        width: `${props.size}px`,
        height: `${props.size}px`
      }}
      role="progressbar"
      {...rest}
    >
      <svg class="spinner__svg" fill="transparent">
        <circle
          class="spinner__circle"
          cx="50%"
          cy="50%"
          r={`${(props.size - props.thickness) / 2}px`}
          stroke="currentColor"
          stroke-width={`${props.thickness}px`}
        />
        <circle
          class="spinner__circle "
          cx="50%"
          cy="50%"
          r={`${(props.size - props.thickness) / 2}px`}
          stroke="currentColor"
          stroke-width={`${props.thickness}px`}
          pathLength="1"
          stroke-dasharray="0.4 0.6"
        />
      </svg>
    </div>
  )
}
