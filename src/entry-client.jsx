import { render } from 'solid-js/web'
import App from './App'

if (import.meta.env.DEV) {
  render(() => <App />, document.getElementById('app'))
}
