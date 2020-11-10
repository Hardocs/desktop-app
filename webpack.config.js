module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: 'umd'
  }
}
