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
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  plugins: [
    ["@babel/plugin-proposal-object-rest-spread"],
    ["@babel/plugin-transform-destructuring"],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    "@babel/plugin-proposal-class-properties",
    cjs && ["@babel/transform-modules-commonjs"],
    [
      "@babel/plugin-transform-runtime",
      {
        version: require("./package.json").dependencies["@babel/runtime"].replace(/^[^0-9]*/, ""),
      },
    ],
  ].filter(Boolean),
};
