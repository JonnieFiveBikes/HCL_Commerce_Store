/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
 *
 *==================================================
 */
//store-packages
import { FeaturedProductRecommendationWidget } from "@hcl-commerce-store-sdk/react-component";
//Foundation libraries
import { withFeatureProductRecommendationWidget } from "./hooks/use-featured-product-recommendation";

export default withFeatureProductRecommendationWidget(FeaturedProductRecommendationWidget);
