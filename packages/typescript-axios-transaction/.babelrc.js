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
const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === "test" || BABEL_ENV === "commonjs";
const loose = true;

module.exports = {
  presets: ["@babel/env", "@babel/typescript"],
  plugins: [
    ["@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }],
    ["@babel/plugin-transform-destructuring", { loose: true, useBuiltIns: true }],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    "@babel/plugin-proposal-class-properties",
    cjs && ["@babel/transform-modules-commonjs", { loose }],
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules: !cjs,
        version: require("./package.json").dependencies["@babel/runtime"].replace(/^[^0-9]*/, ""),
      },
    ],
  ].filter(Boolean),
};
