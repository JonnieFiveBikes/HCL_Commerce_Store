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
import { createMuiTheme } from "@material-ui/core/styles";
import { sharedOverrides, merge, responsiveFontSizes } from "./shared-theme";
import { palette } from "./color-palette";

const { main, light, dark } = palette.emerald;

export const emeraldOverrides = {
  name: "Emerald",
  palette: {
    primary: {
      light: light,
      main: main,
      dark: dark,
      contrastText: "#fff",
    },
    secondary: {
      light: light,
      main: main,
      dark: dark,
      contrastText: "#fff",
    },
  },
  button: {
    backgroundColor: main,
    "&:hover": {
      backgroundColor: main,
    },
  },
  child: {
    backgroundColor: main,
  },
  rippleVisible: {
    opacity: 0.5,
  },
};

const combinedOverides = merge(sharedOverrides, emeraldOverrides);
const theme = responsiveFontSizes(createMuiTheme(combinedOverides));

export default theme;
