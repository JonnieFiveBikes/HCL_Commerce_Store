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
import React, { Dispatch, Suspense, useCallback } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { site } from "./_foundation/constants/site";
import { initAxios } from "./_foundation/axios/axiosConfig";
import { initSite, useSite } from "./_foundation/hooks/useSite";
import LoginGuard from "./_foundation/guard/LoginGuard";
import { storageSessionHandler } from "./_foundation/utils/storageUtil";
import storeService from "./_foundation/apis/transaction/store.service";
import { PRODUCTION } from "./_foundation/constants/common";
import shippingInfoService from "./_foundation/apis/transaction/shippingInfo.service";
//Custom libraries
import { ROUTE_CONFIG } from "./configs/routes";
import { DISCOVER_FEATURE, EMPTY_STRING } from "./constants/common";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Extensions } from "./components/extensions";
import { useCSRForUser } from "./_foundation/hooks/useCSRForUser";
import SuccessMessageSnackbar from "./components/widgets/message-snackbar/SuccessMessageSnackbar";
import ErrorMessageSnackbar from "./components/widgets/message-snackbar/ErrorMessageSnackbar";
import { IFRAME_RESIZER } from "./_foundation/constants/csr";
//Redux and context
import { forUserIdSelector, loginStatusSelector } from "./redux/selectors/user";
import { INIT_STATE_FROM_STORAGE_ACTION, LISTEN_USER_FROM_STORAGE_ACTION } from "./redux/actions/user";
import { GET_COUNTRY_STATE_LIST_ACTION } from "./redux/actions/country";
import { useStoreShippingModeValue } from "./_foundation/context/store-shipping-mode-context";
//UI
import { StyledWrapper } from "./components/StyledUI";
import { StyledGrid, StyledProgressPlaceholder } from "@hcl-commerce-store-sdk/react-component";
import "./App.scss";
//GA360
//UA
import GTMDLService from "./_foundation/gtm/ua/gtmDataLayer.service";
//GA4
import GA4GTMDLService from "./_foundation/gtm/ga4/gtmDataLayer.service";
import { PreviewNonManagedLayout } from "./_foundation/preview/layout/preview-non-managed-layout";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    //scroll to top on path change.
    setTimeout(() => {
      window["topOrSelf"] && window["topOrSelf"].scrollTo(0, 0);
    });
  }, [pathname]);
  return null;
};

const RouteRenderer = () => {
  const { mySite } = useSite();
  const e = useRoutes(mySite.isB2B ? ROUTE_CONFIG.B2B : ROUTE_CONFIG.B2C);
  return e;
};

const App: React.FC = (props: any) => {
  const widgetName = getDisplayName(App);
  const loggedIn = useSelector(loginStatusSelector);
  const forUserId = useSelector(forUserIdSelector);
  const dispatch = useDispatch<Dispatch<any>>();
  const { mySite, storeDisplayName } = useSite();
  const { receiveParentMessage } = useCSRForUser();
  const CancelToken = Axios.CancelToken;
  const MemRouteRenderer = useCallback(RouteRenderer, []);
  const { setStoreShippingMode } = useStoreShippingModeValue();

  const cancels: Canceler[] = [];
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const [discover, setDiscover] = React.useState<boolean>(false);

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
      dispatch(GET_COUNTRY_STATE_LIST_ACTION({ ...payloadBase }));
      storageSessionHandler.triggerUserStorageListener(() =>
        dispatch(LISTEN_USER_FROM_STORAGE_ACTION({ ...payloadBase }))
      );
      isDiscoverEnabled(mySite.storeID);
      shippingInfoService
        .getAllowableShippingModes(mySite.storeID, undefined, undefined, undefined, { widget: widgetName })
        .then((res) => {
          setStoreShippingMode(res.data?.usableShippingMode ?? []);
        })
        .catch((e) => console.log("fail to get store shipping mode", e));
      //GA360
      if (mySite.enableGA) {
        if (mySite.enableUA) {
          GTMDLService.initializeGTM(mySite.gtmID, mySite.gtmAuth, mySite.gtmPreview);
        }
        if (mySite.enableGA4 && !mySite.enableUA) {
          GA4GTMDLService.initializeGTM(mySite.gtmID, mySite.gtmAuth, mySite.gtmPreview);
        }
      }
    } else {
      initSite(site, dispatch);
    }
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
  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, []);

  const baseName = process.env.REACT_APP_ROUTER_BASENAME ? { basename: process.env.REACT_APP_ROUTER_BASENAME } : {};

  // public url path for accessing discoverui.js file.
  const publicUrlPath = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : EMPTY_STRING;

  return mySite ? (
    <BrowserRouter {...baseName}>
      <StyledWrapper data-testid="app-wrapper">
        <SuccessMessageSnackbar />
        <ErrorMessageSnackbar />
        <StyledGrid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          className="full-viewport-height">
          <StyledGrid item xs={false}>
            <Header loggedIn={loggedIn} />
            <LoginGuard />
            <PreviewNonManagedLayout />
            <ScrollToTop />
            <Helmet>
              <meta charSet="utf-8" />
              <title>{`${storeDisplayName}`}</title>
              {discover && (
                <script src={`${publicUrlPath}/discover/discoverui.js?q=${Date.now()}`} type="text/javascript" async />
              )}
              {window[IFRAME_RESIZER] && (
                <script src="/iframeResizer.contentWindow.min.js" type="text/javascript" async />
              )}
            </Helmet>
          </StyledGrid>
          <StyledGrid item xs className="full-width">
            <Suspense fallback={<StyledProgressPlaceholder className="vertical-padding-20" />}>
              <MemRouteRenderer />
            </Suspense>
          </StyledGrid>
          <StyledGrid item xs={false}>
            <Footer />
          </StyledGrid>
          {process.env.NODE_ENV !== PRODUCTION && <Extensions />}
        </StyledGrid>
      </StyledWrapper>
    </BrowserRouter>
  ) : null;
};

export default App;
