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
import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
//Redux
import { GET_SEO_CONFIG_ACTION } from "../../redux/actions/seo";
import { seoSelector } from "../../redux/selectors/seo";
//UI
import { StyledProgressPlaceholder } from "../../components/StyledUI";
//GA360
import GADataService from "../gtm/gaData.service";

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

  React.useEffect(() => {
    if (site !== null && url) {
      dispatch(
        GET_SEO_CONFIG_ACTION({ identifier: url.substr(1), ...payloadBase })
      );
    }
  }, [site, url, dispatch]);

  const ActiveComponent = () => {
    if (seoConfig && seoConfig[url.substr(1)]) {
      const c = seoConfig[url.substr(1)];
      const ActiveC = c.component;
      //GA360
      if (site.enableGA && seoConfig[url.substr(1)].page)
        GADataService.setPageTitle(seoConfig[url.substr(1)].page.title);

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
            <ActiveC page={c.page} {...props} />
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
