const purgecss = require('@fullhuman/postcss-purgecss');
const autoPrefixer = require('autoprefixer');

module.exports = {
    plugins: [
        // purgecss({
        //     content: ['./**/*.html']
        // }),
        autoPrefixer,
    ],
};
