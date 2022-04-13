// @ts-check

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

/**
 * @param {string} filename
 * @param {boolean} useSvelte
 */
function createConfig(filename, useSvelte = false) {
  return {
    input: `src/${filename}.ts`,
    output: {
      format: "iife",
      file: `public/build/${filename}.js`,
      sourcemap: !production ? "inline" : false,
    },
    plugins: [
      useSvelte &&
        svelte({
          compilerOptions: {
            // enable run-time checks when not in production
            dev: !production,
          },
          preprocess: sveltePreprocess({
            sourceMap: !production,
            postcss: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          }),
        }),

      // we'll extract any component CSS out into
      // a separate file - better for performance
      json(),
      css({ output: `${filename}.css` }),
      copy({
        targets: [
          {
            src: "node_modules/remixicon/fonts/*",
            dest: "public/fonts",
            ignore: ["**/remixicon.css"],
          },
        ],
        copyOnce: true,
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript({
        sourceMap: !production,
        inlineSources: !production,
      }),
      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
  };
}

export default [
  createConfig("options", true),
  createConfig("popup", true),
  createConfig("background"),
  createConfig("content_script", true),
];
