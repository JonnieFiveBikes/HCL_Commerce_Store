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
import React, { Dispatch, Suspense } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { site } from "./_foundation/constants/site";
import { initAxios } from "./_foundation/axios/axiosConfig";
import { initSite, useSite } from "./_foundation/hooks/useSite";
import LoginGuard from "./_foundation/guard/LoginGuard";
//Custom libraries
import { ROUTE_CONFIG } from "./configs/routes";
import { CommerceEnvironment } from "./constants/common";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
//Redux
import { loginStatusSelector } from "./redux/selectors/user";
import { FETCH_CONTRACT_REQUESTED_ACTION } from "./redux/actions/contract";
import { INIT_STATE_FROM_STORAGE_ACTION } from "./redux/actions/user";
import { USER_CONTEXT_REQUEST_ACTION } from "./redux/actions/context";
import { ENTITLED_ORG_ACTION } from "./redux/actions/organization";
//UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  StyledProgressPlaceholder,
  StyledWrapper,
} from "./components/StyledUI";
import "./App.scss";
import { CurrentTheme } from "./themes";

const ScrollToTop = () => {
  const location = useLocation();
  React.useEffect(() => {
    //scroll to top on path change.
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, [location.pathname]);
  return <></>;
};

const App: React.FC = (props: any) => {
  const loggedIn = useSelector(loginStatusSelector);
  const dispatch = useDispatch<Dispatch<any>>();
  const mySite: any = useSite();
  const { i18n } = useTranslation();

  const setTranslate = () => {
    if (mySite) {
      const locale = CommerceEnvironment.languageMap[mySite.defaultLanguageID]
        .split("_")
        .join("-");
      if (locale !== i18n.languages[0]) {
        i18n.changeLanguage(locale);
      }
    }
  };

  initAxios(dispatch);
  React.useEffect(() => {
    if (mySite) {
      dispatch(USER_CONTEXT_REQUEST_ACTION());
      dispatch(ENTITLED_ORG_ACTION({}));
      dispatch(FETCH_CONTRACT_REQUESTED_ACTION());
      dispatch(INIT_STATE_FROM_STORAGE_ACTION({}));
      setTranslate();
    } else {
      initSite(site, dispatch);
    }
  }, [mySite, dispatch]);
  const baseName = process.env.REACT_APP_ROUTER_BASENAME
    ? { basename: process.env.REACT_APP_ROUTER_BASENAME }
    : {};

  return (
    mySite && (
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={CurrentTheme}>
          <MuiThemeProvider theme={CurrentTheme}>
            <CssBaseline />
            <BrowserRouter {...baseName}>
              <StyledWrapper>
                <Header loggedIn={loggedIn} />
                <LoginGuard />
                <ScrollToTop />
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>
                    {mySite.storeCfg.description[0]?.displayName ||
                      mySite.storeName}
                  </title>
                </Helmet>
                <Suspense
                  fallback={
                    <StyledProgressPlaceholder className="vertical-padding-20" />
                  }>
                  {renderRoutes(
                    mySite.isB2B ? ROUTE_CONFIG.B2B : ROUTE_CONFIG.B2C
                  )}
                </Suspense>
                <Footer />
              </StyledWrapper>
            </BrowserRouter>
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    )
  );
};

export default App;
