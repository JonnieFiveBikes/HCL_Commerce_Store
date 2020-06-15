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
import "./i18n";
//Redux
import store from "./redux/store/index";
//UI
import { StyledCircularProgress } from "./components/StyledUI";
import "./index.scss";

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Suspense
      fallback={<StyledCircularProgress className="horizontal-padding-5" />}>
      <App />
    </Suspense>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
