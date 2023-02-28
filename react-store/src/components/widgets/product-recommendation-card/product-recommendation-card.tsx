/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020, 2021
 *
 *---------------------------------------------------
 */
//Standard libraries
import React from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
//foundation
import { useProductRecommendationCard } from "../../../_foundation/hooks/use-product-recommendation-card";
//ui
import { ProductRecommendationCard } from "@hcl-commerce-store-sdk/react-component";
import { useSite } from "../../../_foundation/hooks/useSite";
import { getDisplayName } from "@mui/utils";

/**
 * Product recommendation card
 * Display recommended products card
 * @param renderingContext
 */
const ProductRecCard = ({ renderingContext }: any) => {
  const eSpotDescInternal = renderingContext.eSpotDescInternal;
  const eSpotInternal = renderingContext.eSpotInternal;
  const productInternal = renderingContext.productInternal;
  const { mySite } = useSite();

  const { product, swatches, ribbonads, productPrice, informMarketingOfClick, formattedPriceDisplay } =
    useProductRecommendationCard({
      eSpotDescInternal,
      eSpotInternal,
      productInternal,
      widgetName: getDisplayName(ProductRecCard),
    });
  const seoUrl = product.seo?.href;
  const thumbnail = product.thumbnail;
  const name = product.name;
  const price = productPrice;
  const isB2B = mySite.isB2B;

  return (
    <ProductRecommendationCard
      {...{
        seoUrl,
        swatches,
        thumbnail,
        name,
        ribbonads,
        price,
        informMarketingOfClick,
        formattedPriceDisplay,
        isB2B,
      }}
    />
  );
};
export default trackWindowScroll(ProductRecCard);
