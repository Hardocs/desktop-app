// postcss.config.js

const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
    // eslint-disable-next-line prettier/prettier
    plugins: [
        tailwindcss,
        autoprefixer,
    ],
};