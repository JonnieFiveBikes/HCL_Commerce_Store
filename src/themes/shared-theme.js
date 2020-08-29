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
import { palette } from "./color-palette";
const fontSize = 14;
const htmlFontSize = 16;
const coef = fontSize / 14;

export const sharedOverrides = {
  MuiInput: {
    underline: {
      "&:hover:not($disabled):not($focused):not($error):before": {
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        borderBottomColor: "#ffffff",
      },
    },
  },
  typography: {
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: 72,
      fontWeight: 700,
    },
    h2: {
      fontSize: 52,
      fontWeight: 300,
    },
    h3: {
      fontSize: 32,
      fontWeight: 300,
    },
    h4: {
      fontSize: 26,
      fontWeight: 300,
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
    },
    h6: {
      fontSize: 18,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 400,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
    },
    button: {
      fontSize: 15,
      fontWeight: 400,
      textTransform: "none",
    },
    caption: {
      fontSize: 13,
      fontWeight: 400,
    },
    overline: {
      fontSize: 13,
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: 1,
    },
  },
  palette: {
    text: {
      primary: palette.text.primary,
      secondary: palette.text.secondary,
      disabled: palette.text.disabled,
      highlight: palette.text.highlight,
      alert: palette.text.alert,
      expandedMenu: palette.text.expandedMenu,
    },
    action: {
      active: palette.border.main,
      hover: palette.border.hover,
      disabled: palette.text.disabled,
      disabledBackground: palette.disabled.background,
    },
    background: {
      default: palette.background.default,
      paper: palette.background.paper,
      transparency: palette.background.transparency,
    },
    divider: palette.text.disabled,
    border: {
      dark: palette.divider.dark,
      alert: palette.border.alert,
    },
  },
  shape: {
    borderRadius: 6,
  },
  shadows: [
    "none",
    "0px 1px 4px 2px rgba(0,0,0,0.05), 0px 2px 1px 0px rgba(0,0,0,0.03)",
    "0px 1px 4px 2px rgba(0,0,0,0.15), 0px 2px 1px 0px rgba(0,0,0,0.13)",
    "0px 1px 2px 2px rgba(0,0,0,0.1), 0px 2px 1px 0px rgba(0,0,0,0.1)",
    "inset 0px 1px 2px 2px rgba(0,0,0,0.1), inset 0px 2px 1px 0px rgba(0,0,0,0.1)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
};

export const merge = (...args) => {
  let target = {};
  // Merge the object into the target object
  let merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
          // If we're doing a deep merge
          // and the property is an object
          target[prop] = merge(target[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop];
        }
      }
    }
  };
  //Loop through each object and conduct a merge
  for (let i = 0; i < args.length; i++) {
    merger(args[i]);
  }
  return target;
};
