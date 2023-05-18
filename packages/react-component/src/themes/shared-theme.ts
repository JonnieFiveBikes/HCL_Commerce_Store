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
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { palette } from "./color-palette";

export const sharedOverrides = {
  MuiInput: {
    underline: {
      "&:hover:not($disabled):not($focused):not($error):before": {
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        borderBottomColor: "#ffffff",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: 56,
      fontWeight: 700,
    },
    h2: {
      fontSize: 48,
      fontWeight: 400,
    },
    h3: {
      fontSize: 32,
      fontWeight: 400,
    },
    h4: {
      fontSize: 26,
      fontWeight: 400,
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
      fontSize: 12,
      fontWeight: 400,
    },
    overline: {
      fontSize: 12,
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: 1,
    },
  } as TypographyOptions,
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
    info: palette.info,
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

export const merge = (...args: any[]) => {
  const target: any = {};
  // Merge the object into the target object
  const merger = (obj: any) => {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
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

export const textOverrides = {
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
};

export const responsiveFontSizes = (theme: any) => {
  const coef = theme.typography.htmlFontSize / 16;

  const modifyRem = (value: string, coef: number) => {
    return `${(parseFloat(value) / theme.typography.htmlFontSize) * coef}rem`;
  };

  for (const [variantName, variant] of Object.entries(theme.typography)) {
    if (typeof variant === "object" && variant !== null) {
      const _variant: any = variant;
      theme.typography[variantName] = {
        ..._variant,
        fontSize: modifyRem(_variant.fontSize, coef - 0.05),
        [theme.breakpoints.up("sm")]: {
          fontSize: modifyRem(_variant.fontSize, coef),
        },
        [theme.breakpoints.up("md")]: {
          fontSize: modifyRem(_variant.fontSize, coef + 0.05),
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: modifyRem(_variant.fontSize, coef + 0.1),
        },
        [theme.breakpoints.up("xl")]: {
          fontSize: modifyRem(_variant.fontSize, coef + 0.15),
        },
      };
    }
  }

  return theme;
};
