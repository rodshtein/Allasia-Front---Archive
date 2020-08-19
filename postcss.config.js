module.exports = () => ({
  map: process.env.NODE_ENV === "dev" ? true : false,
  plugins: {
    "postcss-easy-import": {
      extensions: [".css", ".pcss", ".sass"],
    },
    "postcss-nested": {},
    "postcss-image-set-polyfill": {},
    "postcss-easing-gradients": {
      precision: 0.1,
      alphaDecimals: 5,
    },
    "postcss-preset-env": {
      browsers: "last 2 versions",
      stage: 0,
      features: {
        "nesting-rules": true,
      },
    },
    "postcss-inline-svg": {
      removeFill: "true",
    },
    cssnano:
      process.env.NODE_ENV === "prod"
        ? {
            convertValues: { length: false },
            zindex: false,
          }
        : false,
  },
});
