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
import React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

const MyThemeProvider = ({ theme, children }) => {
  const nextTheme = Object.assign({}, theme);

  return (
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={nextTheme}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={nextTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StyledEngineProvider>
      </StyledThemeProvider>
    </StylesProvider>
  );
};

MyThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default MyThemeProvider;
