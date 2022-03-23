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
//Standard libraries
import { EMarketingSpotWidgetProps } from "../../types";
import { CategoryRecommendationWidget } from "../category-recommendation";
import { ContentRecommendationWidget } from "../content-recommendation";
import { ProductRecommendationWidget } from "../product-recommendation";

/**
 * E-Marketing Spot wrapper widget.
 * For props definition, @see {@link EMarketingSpotWidgetProps}.
 * @param props The props for `EMarketingSpotWidgetProps`, which contains an eSpot object.
 */
export const EMarketingSpotWidget: React.FC<EMarketingSpotWidgetProps> = ({ eSpot, ...props }) => {
  if (eSpot.catEntry && eSpot.content.title) {
    delete eSpot.catEntry.title;
  }
  if (eSpot.category) {
    delete eSpot.category.title;
  }

  return (
    <>
      <ContentRecommendationWidget eSpot={eSpot} />
      <CategoryRecommendationWidget eSpot={eSpot} />
      <ProductRecommendationWidget eSpot={eSpot} />
    </>
  );
};
