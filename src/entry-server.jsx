import { renderToString } from 'solid-js/web'
import App from './App'

export function render(url) {
  const body = renderToString(() => <App />)
  const head = ''
  return { head, body }
}
