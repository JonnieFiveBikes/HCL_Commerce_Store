/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *==================================================
 */
import { useLocation, matchRoutes } from "react-router";
import { ROUTE_CONFIG } from "../../../configs/routes";
import { useSite } from "../../hooks/useSite";
import { useEffect } from "react";
import { postMessageIfInPreview } from "../../utils/preview";
import { CHECKOUT } from "../../../constants/routes";

export const PreviewNonManagedLayout = () => {
  const { mySite } = useSite();
  const location: any = useLocation();
  const routes = mySite.isB2B ? ROUTE_CONFIG.B2B : ROUTE_CONFIG.B2C;
  const branch = matchRoutes(routes, location.pathname);

  useEffect(() => {
    if (!branch?.some(({ route }) => route["key"] === "other" || (route["key"] ?? "").startsWith(CHECKOUT))) {
      // postMessage empty data if not a managed page. both checkout and other are using/managed by SEO component
      postMessageIfInPreview({
        layout: {
          action: "PREVIEW_LAYOUT_INITIALIZED",
        },
      });
    }
  }, [branch]);
  return null;
};
