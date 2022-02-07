const production = !process.env.ROLLUP_WATCH;
module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
