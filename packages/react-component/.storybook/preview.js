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
// .storybook/preview.js

import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import ThemeProvider from "./theme-provider";

import EmeraldTheme from "../src/themes/emerald-theme";
import SapphireTheme from "../src/themes/sapphire-theme";

const themes = [EmeraldTheme, SapphireTheme];
addDecorator(withThemesProvider(themes, ThemeProvider));
const selectedViewports = {
  phone: {
    name: "Phone (iPhone 8)",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
  tablet: {
    name: "Tablet (iPad Air)",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  desktop: {
    name: "Desktop (Chromebook Pixel)",
    styles: {
      width: "1280px",
      height: "850px",
    },
  },
};

addParameters({
  viewport: {
    //viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
    viewports: selectedViewports,
  },
  paddings: [
    { name: "Small", value: "16px" },
    { name: "Medium", value: "32px", default: true },
    { name: "Large", value: "64px" },
  ],
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
});
