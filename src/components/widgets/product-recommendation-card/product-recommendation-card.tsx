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

/**
 * Product recommendation card
 * Display recommended products card
 * @param renderingContext
 */
const ProductRecCard = ({ renderingContext }: any) => {
  const eSpotDescInternal = renderingContext.eSpotDescInternal;
  const eSpotInternal = renderingContext.eSpotInternal;
  const productInternal = renderingContext.productInternal;

  const {
    product,
    swatches,
    productPrice,
    informMarketingOfClick,
    formattedPriceDisplay,
  } = useProductRecommendationCard({
    eSpotDescInternal,
    eSpotInternal,
    productInternal,
  });
  const seoUrl = product.seo?.href;
  const thumbnail = product.thumbnail;
  const name = product.name;
  const price = productPrice;

  return (
    <ProductRecommendationCard
      {...{
        seoUrl,
        swatches,
        thumbnail,
        name,
        price,
        informMarketingOfClick,
        formattedPriceDisplay,
      }}
    />
  );
};
export default trackWindowScroll(ProductRecCard);
