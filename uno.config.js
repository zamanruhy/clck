import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  include: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  preflights: [],
  // blocklist: ['container'],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno(), presetRemToPx()],
  theme: {}
})
