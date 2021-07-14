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
import React, { lazy } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import { HOME } from "../constants/common";
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

function SEO(props: any): JSX.Element {
  const widgetName = getDisplayName(SEO);

  const { mySite: site } = useSite();
  const dispatch = useDispatch();
  const seoConfig = useSelector(seoSelector);
  const url = props.match.url;

  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const identifier = url.substr(1) || HOME;
  React.useEffect(() => {
    if (site !== null && url) {
      dispatch(
        GET_SEO_CONFIG_ACTION({
          identifier: identifier,
          ...payloadBase,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site, url, dispatch]);
  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ActiveComponent = () => {
    if (seoConfig && seoConfig[identifier]) {
      const c = seoConfig[identifier];
      const ActiveC = lazy(
        () =>
          import(`../../components/commerce-layouts/${c.layout.containerName}`)
      );
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

      return c.redirect && c.redirect.trim() !== "" ? (
        <Redirect to={c.redirect} />
      ) : (
        <>
          <div className="page">
            <Helmet>
              <meta charSet="utf-8" />
              <meta name="description" content={c.page.metaDescription}></meta>
              <meta name="keywords" content={c.page.metaKeyword}></meta>
              <title>{c.page.title}</title>
            </Helmet>
            <ActiveC page={c.page} slots={slots} {...props} />
          </div>
        </>
      );
    } else {
      return <StyledProgressPlaceholder className="vertical-padding-20" />;
    }
  };
  return <ActiveComponent />;
}

SEO.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default SEO;
