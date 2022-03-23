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
import React from "react";
import Hidden from "@material-ui/core/Hidden";
//UI
import { StyledGrid, StyledTypography, StyledPDPContainer, StyledTabs, PriceDisplay } from "../../elements";
import { ProductImage } from "../../components/product-image";
import { ChipAd } from "../../components/ribbon-ad";

type ProductInformationWidgetProps = {
  productDetails: any;
  [extraProps: string]: any;
};

/**
 * B2B Product information display component
 * @description Displays product information ,prize ,image and other product details.
 * ` @prop { any } productDetails` The product details object has following properties:
 * ` @property { any } productData (required)` productData of product.
 * ` @property { object } translation (required)` A object which holds multiple string values for transation purpose.
 * ` @property { any[] } promotion (required)` A map to hold state of associated promotions.
 * ` @property { any } productPartNumber (required)` The productPartNumber of product in string.
 * ` @property { string } productType (required)` A object which holds productType.
 * ` @property { number } productOfferPrice (required)` A number holds product offer price.
 * ` @property { number } prodDisplayPrice (required)` A number holds product display price.
 * ` @property { ITabs[] } productDetailTabsChildren (required)` array of styled elements for productDetailTabsChildren.
 * ` @property { object } currentProdSelect (required)` A object holds current selected product.
 * ` @property { string } defaultCurrencyID (required)` A string holds default currency id.
 * ` @property { string } language (required)` A string holds language id.
 * ` @property { number } max (optional)` A number holds product max price.
 */
export const ProductInformationWidget: React.FC<ProductInformationWidgetProps> = ({ productDetails, ...props }) => {
  const {
    seller,
    productPartNumber,
    translation,
    productData,
    promotion,
    productType,
    productOfferPrice,
    prodDisplayPrice,
    productDetailTabsChildren,
    currentProdSelect,
    language,
    max,
    ribbonFinder,
    defaultCurrencyID: currency = "",
  } = productDetails;
  const { productDetailPriceDisplayPending: message } = translation;
  const { name, partNumber, thumbnail, shortDescription } = currentProdSelect ?? productData;
  const ribbonAds = ribbonFinder(currentProdSelect ?? productData);

  return (
    <StyledPDPContainer id={`product-image-details_${productPartNumber}`}>
      <StyledGrid container spacing={2}>
        <Hidden smUp>
          <StyledGrid item xs={1}></StyledGrid>
          <StyledGrid item xs={10} className="product-image">
            <ProductImage {...{ fullImage: thumbnail, alt: name }} />
          </StyledGrid>
        </Hidden>
        <StyledGrid item xs={12} sm={6} md={6} lg={6} xl={5}>
          <StyledTypography variant="h4" itemProp="name" className="product-name">
            {name}
          </StyledTypography>
          <StyledTypography variant="body2" className="product-sku">
            {translation.productDetailSKU}:{partNumber}
          </StyledTypography>
          {seller ? <StyledTypography variant="body2">{seller}</StyledTypography> : null}
          <StyledTypography variant="body1" itemProp="description" className="product-shortDescription">
            {shortDescription}
          </StyledTypography>
          {promotion ? (
            <StyledTypography
              variant="body2"
              id={`product_advertisement_${productPartNumber}`}
              className="product-promo"
              gutterBottom>
              {promotion}
            </StyledTypography>
          ) : null}
          {ribbonAds.length ? (
            <div className="bottom-margin-2">
              {ribbonAds.map((ribbon, i) => (
                <ChipAd key={i} {...ribbon} />
              ))}
            </div>
          ) : null}
          <div>
            {productType !== "bundle" ? (
              <StyledTypography variant="h5" className="product-price-container">
                {productOfferPrice > 0 ? (
                  <span className="product-price">
                    <PriceDisplay {...{ min: productOfferPrice, max, currency, message, language }} />
                  </span>
                ) : null}
                {productOfferPrice > 0 && productOfferPrice < prodDisplayPrice ? (
                  <span id={`product_price_${productPartNumber}`} className="strikethrough">
                    <PriceDisplay {...{ min: prodDisplayPrice, max, currency, message, language }} />
                  </span>
                ) : null}
                {productOfferPrice === 0 ? (
                  <span id={`product_offer_price_${productPartNumber}`}>
                    <PriceDisplay {...{ min: null, max, currency, message, language }} />
                  </span>
                ) : null}
              </StyledTypography>
            ) : null}
          </div>
          {productDetailTabsChildren?.length > 0 ? (
            <StyledTabs childrenList={productDetailTabsChildren} name="productDetails" />
          ) : null}
        </StyledGrid>

        <Hidden xsDown>
          <StyledGrid item xs={6} md={5} className="product-imageB2B">
            <ProductImage {...{ fullImage: thumbnail, alt: name }} />
          </StyledGrid>
        </Hidden>
      </StyledGrid>
    </StyledPDPContainer>
  );
};
