/* eslint-disable react-hooks/exhaustive-deps */
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
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { site } from "./_foundation/constants/site";
import { initAxios } from "./_foundation/axios/axiosConfig";
import { initSite, useSite } from "./_foundation/hooks/useSite";
import LoginGuard from "./_foundation/guard/LoginGuard";
import {
  storageSessionHandler,
  localStorageUtil,
} from "./_foundation/utils/storageUtil";
import { LOCALE } from "./_foundation/constants/common";
import storeService from "./_foundation/apis/transaction/store.service";
import { PRODUCTION } from "./_foundation/constants/common";
//Custom libraries
import { ROUTE_CONFIG } from "./configs/routes";
import {
  CommerceEnvironment,
  DISCOVER_FEATURE,
  EMPTY_STRING,
} from "./constants/common";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Extensions } from "./components/extensions";
import { useCSRForUser } from "./_foundation/hooks/useCSRForUser";
import SuccessMessageSnackbar from "./components/widgets/message-snackbar/SuccessMessageSnackbar";
import ErrorMessageSnackbar from "./components/widgets/message-snackbar/ErrorMessageSnackbar";
import { IFRAME_RESIZER } from "./_foundation/constants/csr";
//Redux
import { forUserIdSelector, loginStatusSelector } from "./redux/selectors/user";
import {
  INIT_STATE_FROM_STORAGE_ACTION,
  LISTEN_USER_FROM_STORAGE_ACTION,
} from "./redux/actions/user";
//UI
import {
  StyledGrid,
  StyledProgressPlaceholder,
  StyledWrapper,
} from "./components/StyledUI";
import "./App.scss";
//GA360
//UA
import GTMDLService from "./_foundation/gtm/ua/gtmDataLayer.service";
//GA4
import GA4GTMDLService from "./_foundation/gtm/ga4/gtmDataLayer.service";

const ScrollToTop = () => {
  const { mySite } = useSite();

  React.useEffect(() => {
    //scroll to top on path change.
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, []);
  return <></>;
};

const App: React.FC = (props: any) => {
  const widgetName = getDisplayName(App);
  const loggedIn = useSelector(loginStatusSelector);
  const forUserId = useSelector(forUserIdSelector);
  const dispatch = useDispatch<Dispatch<any>>();
  const { mySite, storeDisplayName } = useSite();
  const { i18n } = useTranslation();
  const { receiveParentMessage } = useCSRForUser();
  const CancelToken = Axios.CancelToken;

  let cancels: Canceler[] = [];
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const [discover, setDiscover] = React.useState<boolean>(false);

  const setTranslate = () => {
    /**
     * language preference priority
     * 1. user context, to be implemented with language toggle
     * 2. localStorage (saved for 30 days).
     * 3. store default language.
     */
    // TODO: language toggle, update user language, read language from userContext if it is registered user.
    if (mySite) {
      const locale =
        localStorageUtil.get(LOCALE)?.split("_").join("-") ||
        CommerceEnvironment.languageMap[mySite.defaultLanguageID]
          .split("_")
          .join("-");
      if (locale !== i18n.languages[0]) {
        i18n.changeLanguage(locale);
      }
    }
  };
  initAxios(dispatch);

  /**
   * Function to check Discover is enabled for store based on storeId
   *
   * @param storeID
   */
  const isDiscoverEnabled = (storeID: string) => {
    const payload = {
      storeId: storeID,
      ...payloadBase,
    };
    storeService
      .getStoreEnabledFeaturesList(payload)
      .then((res) => {
        if (res.data && res.data.resultList) {
          setDiscover(res.data.resultList.includes(DISCOVER_FEATURE));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    if (mySite) {
      dispatch(INIT_STATE_FROM_STORAGE_ACTION({ ...payloadBase }));
      storageSessionHandler.triggerUserStorageListener(() =>
        dispatch(LISTEN_USER_FROM_STORAGE_ACTION({ ...payloadBase }))
      );
      setTranslate();
      isDiscoverEnabled(mySite.storeID);
      //GA360
      if (mySite.enableGA) {
        if (mySite.enableUA) {
          GTMDLService.initializeGTM(
            mySite.gtmID,
            mySite.gtmAuth,
            mySite.gtmPreview
          );
        }
        if (mySite.enableGA4 && !mySite.enableUA) {
          GA4GTMDLService.initializeGTM(
            mySite.gtmID,
            mySite.gtmAuth,
            mySite.gtmPreview
          );
        }
      }
    } else {
      initSite(site, dispatch);
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite, dispatch]);

  React.useEffect(() => {
    if (forUserId) {
      window[IFRAME_RESIZER] = {
        onMessage: receiveParentMessage,
      };
    } else {
      window[IFRAME_RESIZER] = undefined;
    }
  }, [forUserId]);

  const baseName = process.env.REACT_APP_ROUTER_BASENAME
    ? { basename: process.env.REACT_APP_ROUTER_BASENAME }
    : {};

  // public url path for accessing discoverui.js file.
  const publicUrlPath = process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : EMPTY_STRING;

  return (
    mySite && (
      <BrowserRouter {...baseName}>
        <StyledWrapper data-testid="app-wrapper">
          <SuccessMessageSnackbar />
          <ErrorMessageSnackbar />
          <StyledGrid
            container
            direction="column"
            justify="space-evenly"
            alignItems="stretch"
            className="full-viewport-height">
            <StyledGrid item xs={false}>
              <Header loggedIn={loggedIn} />
              <LoginGuard />
              <ScrollToTop />
              <Helmet>
                <meta charSet="utf-8" />
                <title>{`${storeDisplayName}`}</title>
                {discover && (
                  <script
                    src={`${publicUrlPath}/discover/discoverui.js?q=${Date.now()}`}
                    type="text/javascript"
                    async
                  />
                )}
                {window[IFRAME_RESIZER] && (
                  <script
                    src="/iframeResizer.contentWindow.min.js"
                    type="text/javascript"
                    async
                  />
                )}
              </Helmet>
            </StyledGrid>
            <StyledGrid item xs>
              <Suspense
                fallback={
                  <StyledProgressPlaceholder className="vertical-padding-20" />
                }>
                {renderRoutes(
                  mySite.isB2B ? ROUTE_CONFIG.B2B : ROUTE_CONFIG.B2C
                )}
              </Suspense>
            </StyledGrid>
            <StyledGrid item xs={false}>
              <Footer />
            </StyledGrid>
            {process.env.NODE_ENV !== PRODUCTION && <Extensions />}
          </StyledGrid>
        </StyledWrapper>
      </BrowserRouter>
    )
  );
};

export default App;
