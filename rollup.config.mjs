import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "main.ts",
  output: {
    file: "dist/bundle.js",
  },
  external: ["google-apps-script"],
  plugins: [typescript(), nodeResolve(), commonjs()],
};
