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

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
//UI
import { StyledGrid, StyledPDPContainer, StyledTypography, StyledButton, StyledTabs } from "../../elements";
import { ProductAttributes } from "../../components/product-attributes";
import { ChipAd } from "../../components/ribbon-ad";
import { ProductQuantity } from "../../components/product-quantity";
import { ProductThumbnails } from "../../components/product-thumbnails";
import Hidden from "@material-ui/core/Hidden";
import { get } from "lodash-es";
import { ProductImage } from "../../components";

interface ProductDetailsWidgetProps {
  seller: any;
  productPartNumber: any;
  product: any;
  showCarousel: boolean;
  carouselImages: any;
  changeMainImage: (index: number) => void;
  index: number;
  displayFullImage: string;
  displayName: string;
  displayPartNumber: string;
  displayShortDesc: string;
  promotion: any;
  displayOfferPrice: number;
  displayListPrice: number;
  definingAttrList: any;
  skuColor: string;
  onAttributeChange: (id: string, value: string) => void;
  currentSelection: any;
  updateProductQuantity: (n: number) => void;
  availability: any;
  addToCart: () => void;
  inventoryAvailableFlag: boolean;
  buyableFlag: boolean;
  productDetailTabsChildren: any;
  translation: any;
  formattedPriceDisplayOffer: any;
  formattedPriceDisplayList: any;
  formattedPriceDisplayNull: any;
  loginStatus: boolean;
  isB2B: boolean;
  isSharedOrder: boolean;
  SIGNIN: string;
  addToRLButton: any;
}

export const ProductDetailsWidget: React.FC<ProductDetailsWidgetProps> = (props: any) => {
  const {
    seller,
    productPartNumber,
    product,
    showCarousel,
    carouselImages,
    changeMainImage,
    index,
    displayFullImage: fullImage,
    displayName,
    displayPartNumber,
    displayShortDesc,
    promotion,
    displayOfferPrice,
    displayListPrice,
    definingAttrList,
    skuColor,
    onAttributeChange,
    currentSelection,
    updateProductQuantity,
    availability,
    addToCart,
    inventoryAvailableFlag,
    buyableFlag,
    productDetailTabsChildren,
    translation,
    formattedPriceDisplayOffer,
    formattedPriceDisplayList,
    formattedPriceDisplayNull,
    loginStatus,
    isB2B,
    isSharedOrder,
    SIGNIN,
    addToRLButton,
    ribbonFinder,
  } = props;

  const ribbonAds = ribbonFinder(currentSelection.sku[currentSelection.index] ?? product);

  // for each sku, an object that represents its attributes, e.g.,
  // [
  //   sku1 --> { Color: "blue", Size: "48x48x48" },
  //   sku2 --> { Color: "red",  Size: "52x52x52" }
  // ]
  const skusAsAttrs = useMemo(() => {
    return (product?.items ?? []).map((p) => {
      const rc = {};
      p.attributes
        ?.filter(({ usage: u }) => u === "Defining")
        .forEach((a) => (rc[a.identifier] = get(a, "values[0].identifier")));
      return rc;
    });
  }, [product]);

  return (
    <>
      {productPartNumber && product && (
        <StyledPDPContainer
          itemScope
          itemType="http://schema.org/Product"
          id={`product-image-details_${productPartNumber}`}>
          <StyledGrid container>
            <StyledGrid container spacing={2} item xs={12}>
              {showCarousel ? (
                <>
                  <StyledGrid item xs={12} md={1}>
                    <ProductThumbnails {...{ imageList: carouselImages, changeMainImage, index }} />
                  </StyledGrid>
                  <Hidden smDown>
                    <StyledGrid item xs={5} className="product-image">
                      <ProductImage {...{ fullImage, alt: displayName }} />
                    </StyledGrid>
                  </Hidden>
                </>
              ) : (
                <StyledGrid item xs={12} md={6} className="product-image">
                  <ProductImage {...{ fullImage, alt: displayName }} />
                </StyledGrid>
              )}
              <StyledGrid item xs={12} md={6}>
                {displayName && (
                  <StyledTypography variant="h4" itemProp="name" className="product-name">
                    {displayName}
                  </StyledTypography>
                )}
                {displayPartNumber && (
                  <StyledTypography variant="body2" className="product-sku">
                    {translation.productDetailSKU}: {displayPartNumber}
                  </StyledTypography>
                )}
                {displayShortDesc && (
                  <StyledTypography variant="body1" itemProp="description" className="product-shortDescription">
                    {displayShortDesc}
                  </StyledTypography>
                )}
                {promotion && (
                  <StyledTypography
                    variant="body2"
                    id={`product_advertisement_${productPartNumber}`}
                    className="product-promo"
                    gutterBottom>
                    {promotion}
                  </StyledTypography>
                )}
                {ribbonAds.length ? (
                  <div className="bottom-margin-2">
                    {ribbonAds.map((ribbon, i) => (
                      <ChipAd key={i} {...ribbon} />
                    ))}
                  </div>
                ) : null}
                <div>
                  {product.type !== "bundle" && (
                    <>
                      <StyledTypography variant="h5" className="product-price-container">
                        {displayOfferPrice > 0 && <span className="product-price">{formattedPriceDisplayOffer}</span>}
                        {displayOfferPrice > 0 && displayOfferPrice < displayListPrice && (
                          <span id={`product_price_${productPartNumber}`} className="strikethrough">
                            {formattedPriceDisplayList}
                          </span>
                        )}
                        {displayOfferPrice === 0 && (
                          <span id={`product_offer_price_${productPartNumber}`}>{formattedPriceDisplayNull}</span>
                        )}
                      </StyledTypography>
                      {definingAttrList?.length > 0 && (
                        <ProductAttributes
                          skusAsAttrs={skusAsAttrs}
                          skuColor={skuColor}
                          attributeList={definingAttrList}
                          currentSelection={currentSelection}
                          onChangeHandler={onAttributeChange}
                        />
                      )}
                      <>
                        <StyledTypography variant="body2" className="product-quantity">
                          {translation.productDetailQuantity}
                        </StyledTypography>
                        <ProductQuantity
                          updateProductQuantity={updateProductQuantity}
                          value={currentSelection.quantity}
                        />
                        {availability?.length > 0 && (
                          <>
                            <StyledTypography variant="body2" className="product-availability">
                              {translation.productDetailAvailability}
                            </StyledTypography>
                            <StyledTypography variant="body1" component="div">
                              {availability.map((e: any) => (
                                <div key={`inventoryDetails_div_${e.storeId}`}>
                                  <div
                                    key={`store-name_div_${e.storeId}`}
                                    id={`product_availability_store_name_${productPartNumber}`}
                                    className="store-name">
                                    {e.storeName}
                                  </div>
                                  {e.inventoryStatus && (
                                    <div
                                      key={`inStock_div_${e.storeId}`}
                                      className="inventory-status in-stock"
                                      id={`product_availability_status_inStock_${productPartNumber}`}>
                                      {translation.CommerceEnvironmentinventoryStatusAvailable}
                                    </div>
                                  )}
                                  {!e.inventoryStatus && (
                                    <div
                                      key={`outOfStock_div_${e.storeId}`}
                                      className="store-inventory out-of-stock"
                                      id={`product_availability_status_outOfStock_${productPartNumber}`}>
                                      {translation.CommerceEnvironmentinventoryStatusOOS}
                                    </div>
                                  )}
                                  {seller ? <div>{seller}</div> : null}
                                </div>
                              ))}
                            </StyledTypography>
                          </>
                        )}
                        <StyledGrid
                          container
                          spacing={1}
                          alignItems="center"
                          className="button-combo product-add-to-cart">
                          <StyledGrid item xs={12} sm="auto">
                            <StyledButton
                              testId={`product_add_to_cart_${productPartNumber}`}
                              color="primary"
                              size="small"
                              id={`product_add_to_cart_${productPartNumber}`}
                              {...(!isB2B || loginStatus
                                ? {
                                    onClick: addToCart,
                                    disabled: !inventoryAvailableFlag || !buyableFlag || !displayOfferPrice,
                                  }
                                : { component: Link, to: SIGNIN })}>
                              {!isB2B
                                ? translation.productDetailAddToCart
                                : !loginStatus
                                ? translation.productDetailSignIn
                                : isSharedOrder
                                ? translation.productDetailaddToSharedOrder
                                : translation.productDetailaddToCurrentOrder}
                            </StyledButton>
                          </StyledGrid>
                          {loginStatus && isB2B ? (
                            <StyledGrid item xs={12} sm="auto" className="bottom-margin-1">
                              {addToRLButton}
                            </StyledGrid>
                          ) : null}
                        </StyledGrid>
                      </>
                    </>
                  )}
                </div>
              </StyledGrid>
            </StyledGrid>
            <StyledGrid item xs={12}>
              {productDetailTabsChildren?.length > 0 && (
                <StyledTabs
                  key={currentSelection.sku.partNumber}
                  // adding key here to make sure tab is full re-rendered
                  //with new local state value according to different sku
                  childrenList={productDetailTabsChildren}
                  name="productDetails"
                />
              )}
            </StyledGrid>
          </StyledGrid>
        </StyledPDPContainer>
      )}
    </>
  );
};
