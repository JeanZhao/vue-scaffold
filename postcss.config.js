module.exports = {
    plugins: [
      require('postcss-pxtorem-exclude')({
        remUnit: 37.5,
        exclude: /(\/|\\)(node_modules)(\/|\\)(bootstrap)(\/|\\)/i,
        rootValue: 100,
        propList: ['*'],
        minPixelValue: 2,
      }),
    ]
  }