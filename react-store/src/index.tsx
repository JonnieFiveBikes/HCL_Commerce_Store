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
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { StyleSheetManager, ThemeProvider as StyledThemeProvider } from "styled-components";
import { StyledCircularProgress } from "@hcl-commerce-store-sdk/react-component";
import { CurrentTheme } from "./themes";
import "./index.scss";
import { StoreLocatorProvider } from "./_foundation/context/store-locator-context";
import { StoreShippingModeProvider } from "./_foundation/context/store-shipping-mode-context";
import { PreviewInfoProvider } from "./_foundation/preview/context/preview-info-context";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Suspense fallback={<StyledCircularProgress className="horizontal-padding-5" />}>
      <StyleSheetManager disableCSSOMInjection={(window as any).__isPrerender__ === true}>
        <StylesProvider injectFirst>
          <StyledThemeProvider theme={CurrentTheme}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={CurrentTheme}>
                <CssBaseline />
                <PreviewInfoProvider>
                  <StoreLocatorProvider>
                    <StoreShippingModeProvider>
                      <App />
                    </StoreShippingModeProvider>
                  </StoreLocatorProvider>
                </PreviewInfoProvider>
              </ThemeProvider>
            </StyledEngineProvider>
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
