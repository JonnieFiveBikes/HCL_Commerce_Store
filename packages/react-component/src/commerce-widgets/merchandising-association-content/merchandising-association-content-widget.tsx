/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
import React from "react";
//UI

import styled from "@mui/styled-engine-sc";
import { StyledProductRecommendationSlider, StyledProgressPlaceholder, StyledTypography } from "../../elements";

const StyledProductRecommendationLayout = styled("div")`
  ${({ theme }) => `
    margin: ${theme.spacing(4)} 0;
  `}
`;

interface MerchandisingAssociationContentProps {
  slides: any;
  recommendedProdTitle: string;
}

/**
 * Merchandising association display widget.
 *
 * ` @prop { any } props` have following properties:
 * ` @property { any } slides (required)` The list of merchandise associated products.
 * ` @property { string } recommendedProdTitle (required)' The title of merchandise associated products.
 *
 * MerchandisingAssociationContent returns all the list of merchandise associated products.
 */

const MerchandisingAssociationContent: React.FC<MerchandisingAssociationContentProps> = (props: any) => {
  const slides = props.slides;
  const recommendedProdTitle = props.recommendedProdTitle;
  return (
    <StyledProductRecommendationLayout>
      {slides && slides.length > 0 ? (
        <>
          <StyledTypography variant="h4">{recommendedProdTitle}</StyledTypography>
          <StyledProductRecommendationSlider slidesList={slides} />
        </>
      ) : (
        <StyledProgressPlaceholder className="vertical-padding-5" />
      )}
    </StyledProductRecommendationLayout>
  );
};
export { MerchandisingAssociationContent };
