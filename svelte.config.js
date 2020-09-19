const sveltePreprocess = require('svelte-preprocess');
const easyImport = require('postcss-easy-import');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const nestedProps = require('postcss-nested-props');
const presetEnv = require('postcss-preset-env');
const sugarss = require('sugarss');
const { postcss } = require('postcss');

function getSP(isDev = false) {

  let postcssPlugins = [
    easyImport(),
    mixins(),
    nestedProps(),
    nested(),
    presetEnv({
      browsers: "last 2 versions",
      stage: 0,
      features: {
        "nesting-rules": true,
      },
    }),
  ];

  if(!isDev) {
    postcssPlugins.push(
      require('postcss-easing-gradients')({
        precision: 0.1,
        alphaDecimals: 5,
      }),
      require('cssnano')({
        convertValues: { length: false },
        zindex: false,
      })
    )
  };

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

