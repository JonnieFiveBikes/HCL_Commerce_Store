/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
module.exports = {
  stories: ["../src/**/*.stories.js|mdx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "storybook-addon-styled-component-theme/dist/register",
    "storybook-addon-paddings",
    "@storybook/addon-a11y/register"
  ]
};
