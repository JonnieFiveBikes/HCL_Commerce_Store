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

import { LazyLoadComponent } from "react-lazy-load-image-component";

//UI
import {
  StyledGrid,
  StyledButton,
  StyledTypography,
  StyledPaper,
  StyledSwatch,
  StyledProgressPlaceholder,
  StyledLink,
} from "../../elements";

interface FeaturedCardProps {
  productInfo: any;
  displayPrice: number;
  offerPrice: number;
  attributeList: Array<any>;
  shopNow: string;
  informMarketingOfClick: any;
  formattedPriceDisplay: any;
}

export const FeatureCard = (props: FeaturedCardProps) => {
  const { productInfo, offerPrice, attributeList, shopNow, informMarketingOfClick, formattedPriceDisplay } = props;
  return (
    <>
      {productInfo && (
        <StyledPaper id={`featureCard_${productInfo.id}`} className="horizontal-padding-2 vertical-padding-4">
          <StyledGrid container alignItems="center" spacing={3}>
            <LazyLoadComponent placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
              <StyledGrid
                item
                xs={12}
                sm={6}
                lg={5}
                id={`featureCard_imageContainer_${productInfo.id}`}
                className="product-full-image">
                <StyledLink
                  onClick={informMarketingOfClick}
                  to={productInfo.seo?.href}
                  testId={`featureCard_imageRouter_${productInfo.id}`}>
                  <img
                    id={`featureCard_fullImage_${productInfo.id}`}
                    src={productInfo.fullImage}
                    alt={productInfo.name}
                  />
                </StyledLink>
              </StyledGrid>
            </LazyLoadComponent>
            <StyledGrid
              item
              xs={12}
              sm={6}
              md={5}
              lg={6}
              id={`featureCard_describer_${productInfo.id}`}
              className="product-description">
              {productInfo.manufacturer && (
                <StyledTypography variant="overline">{productInfo.manufacturer}</StyledTypography>
              )}
              <StyledTypography variant="h2" id={`featureCard_describer_${productInfo.id}`}>
                {productInfo.name}
              </StyledTypography>
              <div className="vertical-margin-2">
                {attributeList &&
                  attributeList.map((e: any, index: number) => (
                    <StyledSwatch
                      style={{
                        backgroundImage: `url("${e.image1path}")`,
                      }}
                      key={index}
                      className="product-swatch-medium"
                      data-testid={`feature-card-${e.identifier.toLowerCase()}-swatch`}
                    />
                  ))}
              </div>
              <StyledTypography
                variant="subtitle2"
                id={`featureCard_description_${productInfo.id}`}
                className="text-content short-description">
                {productInfo.shortDescription}
              </StyledTypography>
              <StyledTypography
                variant="h4"
                className="feature-price vertical-margin-2"
                id={`featureCard_price_${productInfo.id}`}>
                {offerPrice && offerPrice > 0 ? (
                  <span>{formattedPriceDisplay(offerPrice)}</span>
                ) : (
                  <span>{formattedPriceDisplay(null)}</span>
                )}
              </StyledTypography>
              <StyledLink
                onClick={informMarketingOfClick}
                to={productInfo.seo?.href}
                testId={`featureCard_textRouter_${productInfo.id}`}>
                <StyledButton testId={`featureCard_textRouter_${productInfo.id}_shop_now`} color="secondary">
                  {shopNow}
                </StyledButton>
              </StyledLink>
            </StyledGrid>
          </StyledGrid>
        </StyledPaper>
      )}
    </>
  );
};
