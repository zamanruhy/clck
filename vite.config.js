import { defineConfig, splitVendorChunkPlugin } from 'vite'
import path from 'node:path'
import eslint from 'vite-plugin-eslint'
import solid from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
import legacy from '@vitejs/plugin-legacy'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  // base: './',
  plugins: [
    imagetools({
      defaultDirectives: (url) => {
        return new URLSearchParams({ metadata: 'src;width;height;format' })
      }
    }),
    splitVendorChunkPlugin(),
    legacy({
      modernPolyfills: false,
      renderLegacyChunks: false
    }),
    eslint(),
    solid({ ssr: true, solid: { hydratable: false } }),

    solidSvg({
      defaultExport: 'url',
      svgo: {
        enabled: true,
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // customize options for plugins included in preset
                  convertPathData: { floatPrecision: 2 },
                  // or disable plugins
                  removeViewBox: false
                }
              }
            },
            // enable builtin plugin not included in default preset
            'removeDimensions',
            'prefixIds',
            'removeXMLNS',
            // enable and configure builtin plugin not included in preset
            {
              name: 'removeAttributesBySelector',
              params: {
                selector: 'svg',
                attributes: ['class', 'style', 'xml:space']
              }
            }
          ]
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    // watch: {},
    // target: 'es2015',
    // manifest: true,
    assetsInlineLimit: 0,
    minify: true,
    polyfillModulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      // experimentalTopLevelAwait: true,
      output: {
        // entryFileNames: 'js/app.js',
        entryFileNames({ name }) {
          return name === 'index' ? 'static/js/app.js' : 'static/js/[name].js'
        },
        chunkFileNames: 'static/js/[name].js',
        // assetFileNames: `assets/[name].[ext]`,
        assetFileNames({ name }) {
          // console.log('===NAME===', name)
          if (name.match(/\.css$/)) {
            return name === 'style.css'
              ? 'static/css/app.css'
              : 'static/css/[name].css'
          }
          if (name.match(/\.(png|jpe?g|gif|svg|webp|avif)$/)) {
            return 'static/img/[name].[hash].[ext]'
          }
          if (name.match(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/)) {
            return 'static/media/[name].[ext]'
          }
          return 'static/[name].[ext]'
        }
        // manualChunks(id) {
        //   if (id.includes('node_modules')) return 'vendor'
        // }
      }
    }
  },
  ssr: {
    // Vite attempts to load this as a Commonjs dependency
    noExternal: ['solid-meta', '@solidjs/router', 'imask']
  },
  // assetsInclude: [/\/static\/.*$/],
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
  experimental: {
    renderBuiltUrl(filename, { hostType, ...rest }) {
      // console.log('=====', filename, hostType, rest)
      if (hostType === 'css') return { relative: true }
      return filename
    }
  }
})
