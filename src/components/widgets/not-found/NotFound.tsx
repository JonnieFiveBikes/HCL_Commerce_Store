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
import { ProductRecommendationLayout } from "../product-recommendation";
//UI
import { StyledContainer, StyledTypography } from "../../StyledUI";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const errorMessage = t("notFound.notFound");
  return (
    <StyledContainer>
      <StyledTypography variant="subtitle2">
        {HTMLReactParser(errorMessage)}
      </StyledTypography>
      <ProductRecommendationLayout
        cid={`notfound-produtRec`}
        eSpotName="Home_ProductRec"
        page={{ pageName: "notfound" }}
      />
    </StyledContainer>
  );
};
export default NotFound;
