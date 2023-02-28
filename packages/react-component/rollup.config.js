/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 ***************************************************
 */
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";
import svgr from "@svgr/rollup";
import pkg from "./package.json";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";

const env = process.env.NODE_ENV;
const extensions = [".js", "jsx", ".ts", "tsx"];
const input = "src/index.ts";
const external = Object.keys(pkg.peerDependencies || {}).concat("@babel/runtime");
const outputs = [
  {
    file: pkg.main,
    format: "cjs",
    sourcemap: env === "production" ? true : "inline",
    interop: "auto",
  },
  {
    dir: "dist/es",
    format: "es",
    sourcemap: env === "production" ? true : "inline",
    interop: "auto",
  },
];
const plugins = [
  alias({
    entries: [{ find: "@mui/styled-engine", replacement: "@mui/styled-engine-sc" }],
  }),
  nodeResolve({ extensions }),
  babel({
    extensions,
    include: ["src/**/*"],
    babelHelpers: "runtime",
    exclude: ["**/node_modules/**", "*.stories.tsx", "src/stories/**"],
  }),
  json({
    compact: true,
  }),
  svgr(),
  styles(),
  commonjs(),
  typescript({
    sourceRoot: "/react-component",
    outputToFilesystem: true,
  }),
];
const configs = outputs.map((output) => {
  const plgs = plugins;
  if (env === "production") {
    plgs.push(
      terser({
        compress: {
          pure_getters: true,
        },
      })
    );
  }
  return {
    external,
    input,
    output,
    plugins: plgs,
  };
});

export default configs;
