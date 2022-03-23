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
import { useTranslation } from "react-i18next";
import HTMLReactParser from "html-react-parser";
//Custom libraries
import CatalogEntryRecommendationWidget from "../commerce-widgets/catalog-entry-recommendation-widget";
//UI
import { StyledContainer, StyledTypography } from "@hcl-commerce-store-sdk/react-component";
//Foundation libraries
import { WidgetProps } from "../../_foundation/constants/seo-config";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const errorMessage = t("notFound.notFound");

  const widgetProps: WidgetProps = {
    widget: {
      id: "notfound-produtRec",
      widgetName: "catalog-entry-recommendation-widget",
      name: "Home_ProductRec",
      properties: {
        emsName: "Home_ProductRec",
      },
    },
    page: { pageName: "notfound" },
  };

  return (
    <StyledContainer>
      <StyledTypography variant="subtitle2">{HTMLReactParser(errorMessage)}</StyledTypography>
      <CatalogEntryRecommendationWidget
        // cid={`notfound-produtRec`}
        {...widgetProps}
      />
    </StyledContainer>
  );
};
export default NotFound;
