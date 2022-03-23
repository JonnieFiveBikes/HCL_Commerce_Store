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
import { Suspense } from "react";
import HTMLReactParser from "html-react-parser";
//UI
import { StyledTypography, StyledProgressPlaceholder } from "../../elements";

export function FeaturedProductRecommendationWidget(props: any) {
  const { recommendedProductTitle, recommendedProductContext } = props;
  const featuredCard = recommendedProductContext?.featuredCard ? recommendedProductContext?.featuredCard : "";

  return (
    <>
      {recommendedProductTitle ? (
        <StyledTypography variant="h4" className="vertical-margin-4">
          {HTMLReactParser(recommendedProductTitle)}
        </StyledTypography>
      ) : null}
      {recommendedProductContext?.productDesc?.data?.total ? (
        <Suspense fallback={<StyledProgressPlaceholder className="vertical-padding-20" />}>{featuredCard}</Suspense>
      ) : null}
    </>
  );
}
