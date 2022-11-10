const useRem = false

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')({ url: 'rebase' }),
    require('postcss-mixins')({
      mixins: {
        dark(_) {
          return {
            '@media (prefers-color-scheme: dark)': {
              '@mixin-content': {}
            }
          }
        }
      }
    }),
    require('postcss-simple-vars')({ variables: { 'height-bp': '450px' } }),
    require('postcss-nested'),
    useRem
      ? require('postcss-pxtorem')({
          propList: ['*'],
          selectorBlackList: [/^html$/]
        })
      : require('postcss-rem-to-pixel')({ propList: ['*'] }),
    require('autoprefixer')
  ]
}
