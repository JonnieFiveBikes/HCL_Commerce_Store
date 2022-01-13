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
//Standard libraries
import React, { Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
//Custom libraries
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import "./i18n";
//Redux
import store from "./redux/store/index";
//UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import {
  StyleSheetManager,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { StyledCircularProgress } from "@hcl-commerce-store-sdk/react-component";
import { CurrentTheme } from "./themes";
import "./index.scss";

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Suspense
      fallback={<StyledCircularProgress className="horizontal-padding-5" />}>
      <StyleSheetManager
        disableCSSOMInjection={(window as any).__isPrerender__ === true}>
        <StylesProvider injectFirst>
          <StyledThemeProvider theme={CurrentTheme}>
            <MuiThemeProvider theme={CurrentTheme}>
              <CssBaseline />
              <App />
            </MuiThemeProvider>
          </StyledThemeProvider>
        </StylesProvider>
      </StyleSheetManager>
    </Suspense>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
