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
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import LazyLoadComponent from "react-intersection-observer-lazy-load";
import { useTranslation } from "react-i18next";
//Custom libraries
import { DISPLAY, DEFINING, OFFER } from "../../../constants/common";
import FormattedPriceDisplay from "../../widgets/formatted-price-display";
//Redux
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../../redux/actions/marketingEvent";
//UI
import {
  StyledGrid,
  StyledButton,
  StyledTypography,
  StyledPaper,
  StyledSwatch,
  StyledProgressPlaceholder,
} from "../../StyledUI";

function FeatureCardLayout({ renderingContext }: any) {
  const { t } = useTranslation();
  let productInfo = renderingContext?.productDesc?.data?.contents
    ? renderingContext.productDesc.data.contents[0]
    : {};
  const colorList: object[] = [];
  const {
    eSpotDescInternal: eSpotDesc,
    eSpotInternal: eSpotRoot,
  } = renderingContext;

  const [displayPrice, setDisplayPrice] = React.useState<number>(0);
  const [offerPrice, setOfferPrice] = React.useState<number>(0);
  const [attributeList, setAttributeList] = React.useState<Array<object>>();
  const dispatch = useDispatch();

  const informMarketingOfClick = (event) => {
    if (eSpotDesc && !isEmpty(eSpotDesc)) {
      dispatch(CLICK_EVENT_TRIGGERED_ACTION({ eSpotRoot, eSpotDesc }));
    }
  };

  React.useEffect(() => {
    if (productInfo.price) {
      for (const price of productInfo.price) {
        if (price.usage === DISPLAY && price.value !== "") {
          setDisplayPrice(parseFloat(price.value));
        } else if (price.usage === OFFER && price.value !== "") {
          setOfferPrice(parseFloat(price.value));
        }
      }
    }
    if (productInfo.attributes) {
      for (const attribute of productInfo.attributes) {
        if (attribute.usage === DEFINING && attribute.values[0].image1path) {
          for (const attributeColor of attribute.values) {
            colorList.push(attributeColor);
          }
        }
      }
    }
    setAttributeList(colorList);
  }, []);

  return (
    <>
      {productInfo && (
        <StyledPaper
          id={`featureCard_${productInfo.id}`}
          className="horizontal-padding-2 vertical-padding-4">
          <StyledGrid container alignItems="center" spacing={3}>
            <LazyLoadComponent
              placeholder={
                <StyledProgressPlaceholder className="vertical-padding-20" />
              }>
              <StyledGrid
                item
                xs={12}
                sm={6}
                lg={5}
                id={`featureCard_imageContainer_${productInfo.id}`}
                className="product-full-image">
                <Link
                  onClick={informMarketingOfClick}
                  id={`featureCard_imageRouter_${productInfo.id}`}
                  to={productInfo.seo?.href}>
                  <img
                    id={`featureCard_fullImage_${productInfo.id}`}
                    src={productInfo.fullImage}
                    alt={productInfo.name}
                  />
                </Link>
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
                <StyledTypography variant="overline">
                  {productInfo.manufacturer}
                </StyledTypography>
              )}
              <StyledTypography
                variant="h2"
                id={`featureCard_describer_${productInfo.id}`}>
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
                {displayPrice > 0 && (
                  <span className={offerPrice > 0 ? "strikethrough" : ""}>
                    <FormattedPriceDisplay min={displayPrice} />
                  </span>
                )}
                {offerPrice > 0 && (
                  <span>
                    <FormattedPriceDisplay min={offerPrice} />
                  </span>
                )}
                {offerPrice === 0 && displayPrice === 0 && (
                  <span>
                    <FormattedPriceDisplay min={null} />
                  </span>
                )}
              </StyledTypography>
              <Link
                onClick={informMarketingOfClick}
                id={`featureCard_textRouter_${productInfo.id}`}
                to={productInfo.seo?.href}>
                <StyledButton color="secondary">
                  {t("FeaturedCard.ShopNow")}
                </StyledButton>
              </Link>
            </StyledGrid>
          </StyledGrid>
        </StyledPaper>
      )}
    </>
  );
}

export default FeatureCardLayout;
