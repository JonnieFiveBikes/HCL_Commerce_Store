// test-utils.js
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
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
//custom library
import reducerInitialState from "../../redux/reducers/initStates";
import reducer from "../../redux/reducers";
import { CurrentTheme } from "../../themes";
import i18n from "../i18n";

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    currentTheme = CurrentTheme,
    ...renderOptions
  } = {}
) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <StyledThemeProvider theme={currentTheme}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={currentTheme}>
              <BrowserRouter>{children} </BrowserRouter>
            </ThemeProvider>
          </StyledEngineProvider>
          </StyledThemeProvider >
        </I18nextProvider>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
