/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */
//Standard libraries
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { StyledProductCard, StyledProgressPlaceholder } from "../../elements";

interface ProductRecommendationCardProps {
  seoUrl?: string;
  swatches: any[];
  thumbnail: string;
  name: string;
  ribbonads: any[];
  price: any;
  informMarketingOfClick: any;
  formattedPriceDisplay: any;
  isB2B: boolean;
}

/**
 * Display recommended product card
 * `@prop { any } props` Have following properties:
 * ` @property { string } seoUrl`: The product seo href.
 * ` @property { any[] } swatches`: The product styled swatches.
 * ` @property { string } thumbnail`: The product image path.
 * ` @property { string } name`: The product name.
 * ` @property { any } price`: The product price.
 * ` @property { any } informMarketingOfClick`: The onclick event for product marketing information.
 * ` @property { any } formattedPriceDisplay`: The display product formatted price.
 */

export const ProductRecommendationCard: React.FC<ProductRecommendationCardProps> = (props: any) => {
  const seoUrl = props.seoUrl;
  const swatches = props.swatches;
  const thumbnail = props.thumbnail;
  const name = props.name;
  const ribbonads = props.ribbonads;
  const price = props.price;
  const onClick = props.informMarketingOfClick;
  const formattedPriceDisplay = props.formattedPriceDisplay;
  const isB2B = props.isB2B;

  return (
    <LazyLoadComponent
      visibleByDefault={(window as any).__isPrerender__ || false}
      placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
      <StyledProductCard
        {...{
          seoUrl,
          swatches,
          thumbnail,
          name,
          ribbonads,
          price,
          onClick,
          formattedPriceDisplay,
          isB2B,
        }}
      />
    </LazyLoadComponent>
  );
};
