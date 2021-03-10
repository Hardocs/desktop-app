module.exports = {
  module: {},
  transpile: ['vuetify', /@koumoul/]
};

/**
 * 
 * rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('tailwindcss'), require('autoprefixer')]
            }
          }
        ]
      }
    ]
 */
