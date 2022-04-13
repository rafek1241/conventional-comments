module.exports = {
  content: ["./src/**/*.{svelte,html,js,jsx,ts,tsx,json}"],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
