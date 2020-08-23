const sveltePreprocess = require('svelte-preprocess');
const easyImport = require('postcss-easy-import');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const imageSetPolyfill = require('postcss-image-set-polyfill');
const easingGradients = require('postcss-easing-gradients');
const presetEnv = require('postcss-preset-env');
const inlineSvg = require('postcss-inline-svg');
const cssnano = require('cssnano');
const sugarss = require('sugarss');



function getSP(isDev = false) {

  let postcssPlugins = [
    easyImport(),
    mixins(),
    nested(),
    imageSetPolyfill(),
    easingGradients({
      precision: 0.1,
      alphaDecimals: 5,
    }),
    presetEnv({
      browsers: "last 2 versions",
      stage: 0,
      features: {
        "nesting-rules": true,
      },
    }),
    inlineSvg({
      removeFill: "true",
    }),
  ];

  if(!isDev) postcssPlugins.push(
    cssnano({
      convertValues: { length: false },
      zindex: false,
    })
  );

  return sveltePreprocess({
    sourceMap: isDev,
    pug: true,
    postcss: {
      map: isDev,
      parser: sugarss,
      plugins: postcssPlugins
    },
  });
}

module.exports = {
    preprocess: getSP(true),
    getSP,
};

