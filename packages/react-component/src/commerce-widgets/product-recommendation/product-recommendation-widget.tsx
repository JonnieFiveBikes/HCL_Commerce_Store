/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import HTMLReactParser from "html-react-parser";
import styled from "@mui/styled-engine-sc";
//UI
import { StyledProductRecommendationSlider, StyledTypography } from "../../elements";
import { EMarketingSpotWidgetProps } from "../../types";

const StyledProductRecommendationLayout = styled("div")`
  ${({ theme }) => `
    margin: ${theme.spacing(4)} 0;
  `}
`;

/**
 * product recommendation widget.
 * For props definition, @see {@link EMarketingSpotWidgetProps}.
 * @param props The props for `ProductRecommendationWidget`, which contains an eSpot object.
 */
const ProductRecommendationWidget: React.FC<EMarketingSpotWidgetProps> = ({ eSpot, ...props }) => {
  const slides = eSpot.catEntry.slides;
  const recommendedProductTitle = eSpot.catEntry.title;
  return (
    <StyledProductRecommendationLayout>
      {slides && slides.length > 0 ? (
        <>
          {recommendedProductTitle && (
            <StyledTypography variant="h4">{HTMLReactParser(recommendedProductTitle)}</StyledTypography>
          )}
          <StyledProductRecommendationSlider slidesList={slides} />
        </>
      ) : null}
    </StyledProductRecommendationLayout>
  );
};

export { ProductRecommendationWidget };
