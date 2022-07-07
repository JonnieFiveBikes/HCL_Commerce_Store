/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020, 2021
 *
 *==================================================
 */
//Standard libraries
import React, { lazy, useMemo } from "react";
import { Navigate, useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import { CHILD_ROUTE_SEPARATOR, HOME, LOCALE, URL_LANG_REJECTED } from "../constants/common";
//Redux
import { GET_SEO_CONFIG_ACTION } from "../../redux/actions/seo";
import { seoSelector } from "../../redux/selectors/seo";
//UI
import { StyledProgressPlaceholder } from "@hcl-commerce-store-sdk/react-component";
//GA360
//UA
import UADataService from "../gtm/ua/uaData.service";
//GA4
import GA4DataService from "../gtm/ga4/ga4Data.service";
import { localStorageUtil } from "../utils/storageUtil";
import { PRODUCT_TOKEN } from "../constants/common";
import { CommerceEnvironment } from "../../constants/common";
import * as lsActions from "../../redux/actions/local-storage";
import { OPEN_CONFIRMATION_ACTION } from "../../redux/actions/confirmation";
import { withProductContext } from "../context/product-context";

const SEO: React.FC = (props: any) => {
  const widgetName = getDisplayName(SEO);
  const { mySite: site } = useSite();
  const dispatch = useDispatch();
  const seoConfig = useSelector(seoSelector);
  const location = useLocation();
  const { pathname } = location;
  const { t, i18n } = useTranslation();
  const identifier = useMemo(() => {
    const _i = pathname.substring(1) || HOME;
    //Rest client is using URLSearchParams to encode the query parameters.
    return decodeURI(_i.split(CHILD_ROUTE_SEPARATOR)[0]);
  }, [pathname]);
  const [first, setFirst] = React.useState(true);

  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const handleClose = useMemo(
    () => (langName) => {
      const rejected = localStorageUtil.get(URL_LANG_REJECTED) ?? {};

      // user rejected language suggestion -- save the rejection in local-storage
      rejected[langName] = true;
      localStorageUtil.set(URL_LANG_REJECTED, rejected);
    },
    []
  );

  const handleChangeLanguage = useMemo(
    () => (langName) => {
      const newLangId = CommerceEnvironment.reverseLanguageMap[langName];
      // update local-storage and state
      i18n.changeLanguage(langName.split("_").join("-"));
      dispatch(lsActions.LS_LANG_CHANGE_ACTION({ newLangId }));
    },
    [dispatch, i18n]
  );

  const handleOpen = useMemo(
    () => (langName) => {
      const langId = CommerceEnvironment.reverseLanguageMap[langName];
      const language = t(`CommerceEnvironment.language.${langId}`);
      const message = {
        title: "CommerceEnvironment.languagePopUp.Title",
        key: "CommerceEnvironment.languagePopUp.Message",
        messageParameters: { language },
        labels: {
          submit: "CommerceEnvironment.languagePopUp.Yes",
          cancel: "CommerceEnvironment.languagePopUp.No",
        },
        cancelAction: handleClose.bind(null, langName),
        okAction: handleChangeLanguage.bind(null, langName),
      };
      dispatch(OPEN_CONFIRMATION_ACTION(message));
    },
    [t, handleClose, handleChangeLanguage, dispatch]
  );

  React.useEffect(() => {
    if (site !== null && identifier) {
      dispatch(
        GET_SEO_CONFIG_ACTION({
          identifier,
          ...payloadBase,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site, identifier]);

  React.useEffect(
    () => () => {
      cancels.forEach((cancel) => cancel());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    if (first && identifier && seoConfig && seoConfig[identifier]) {
      const seoLang = seoConfig[identifier].language;
      const rejected = localStorageUtil.get(URL_LANG_REJECTED) ?? {};
      const old = localStorageUtil.get(LOCALE);

      if (first && seoLang && seoLang !== old && !rejected[seoLang]) {
        handleOpen(seoLang);
      }
      setFirst(false);
    }
  }, [first, handleOpen, identifier, seoConfig]);

  const ActiveC = useMemo(() => {
    if (seoConfig && seoConfig[identifier]) {
      const c = seoConfig[identifier];
      const token = c.tokenName;
      return token === PRODUCT_TOKEN
        ? withProductContext(lazy(() => import(`../../components/commerce-layouts/${c.layout.containerName}`)))
        : lazy(() => import(`../../components/commerce-layouts/${c.layout.containerName}`));
    } else {
      return () => <></>;
    }
  }, [seoConfig, identifier]);

  const ActiveComponent = useMemo(
    () => {
      if (seoConfig && seoConfig[identifier]) {
        const c = seoConfig[identifier];
        const slots = c.layout.slots;

        //GA360
        if (site.enableGA && seoConfig[identifier].page) {
          if (site.enableUA) {
            UADataService.setPageTitle(seoConfig[identifier].page.title);
          }
          if (site.enableGA4) {
            GA4DataService.setPageTitle(seoConfig[identifier].page.title);
          }
        }

        return () =>
          c.redirect && c.redirect.trim() !== "" ? (
            <Navigate replace to={c.redirect} />
          ) : (
            <div className="page">
              <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={c.page.metaDescription}></meta>
                <meta name="keywords" content={c.page.metaKeyword}></meta>
                <title>{c.page.title}</title>
              </Helmet>
              <ActiveC page={c.page} slots={slots} {...props} />
            </div>
          );
      } else {
        return () => <StyledProgressPlaceholder className="vertical-padding-20" />;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seoConfig, identifier, site, ActiveC]
  );

  return <>{!first ? <ActiveComponent /> : <StyledProgressPlaceholder className="vertical-padding-20" />}</>;
};

export default SEO;
