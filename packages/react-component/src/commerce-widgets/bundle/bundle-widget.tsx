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

import { StyledGrid, StyledPDPContainer, StyledTypography, StyledTabs, ITabs } from "../../elements";
import { ProductImage, ChipAd, CustomTable } from "../../components";

interface BundleWidgetProps {
  productPartNumber: string;
  displayName: string;
  displayPartNumber: string;
  translation: any;
  displayShortDesc: string;
  displayOfferPrice: number;
  displayListPrice: number;
  productDetailTabsChildren: ITabs[];
  definingAttrs: any;
  attrStates: any;
  displayFullImage: string;
  FormattedPriceDisplay: any;
  tableData: any;
  addBundleButton: any;
  seller?: any;
}

export const BundleWidget: React.FC<BundleWidgetProps> = (props: any) => {
  const {
    productPartNumber,
    displayName,
    displayPartNumber,
    translation,
    displayShortDesc,
    displayOfferPrice,
    displayListPrice,
    productDetailTabsChildren,
    displayFullImage,
    FormattedPriceDisplay,
    tableData,
    addBundleButton,
    bundle,
    ribbonFinder,
    seller,
  } = props;
  const ribbonAds = ribbonFinder(bundle);
  return (
    <>
      {productPartNumber && (
        <StyledGrid spacing={2} container>
          <StyledGrid item xs={12}>
            <StyledPDPContainer id={`product-image-details_${productPartNumber}`}>
              <StyledGrid container spacing={2} item xs={12}>
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
                  {ribbonAds.length ? (
                    <div className="bottom-margin-2">
                      {ribbonAds.map((ribbon, i) => (
                        <ChipAd key={i} {...ribbon} />
                      ))}
                    </div>
                  ) : null}
                  <StyledTypography variant="h5" className="product-price-container">
                    {displayOfferPrice > 0 ? (
                      <span className="product-price">
                        <FormattedPriceDisplay min={displayOfferPrice} />
                      </span>
                    ) : null}
                    {displayOfferPrice > 0 && displayOfferPrice < displayListPrice ? (
                      <span id={`product_price_${productPartNumber}`} className="strikethrough">
                        <FormattedPriceDisplay min={displayListPrice} />
                      </span>
                    ) : null}
                    {displayOfferPrice === 0 && displayListPrice === 0 ? (
                      <span id={`product_offer_price_${productPartNumber}`}>
                        {<FormattedPriceDisplay min={null} />}
                      </span>
                    ) : null}
                  </StyledTypography>
                  {seller ? <div>{seller}</div> : null}
                  {tableData?.data?.length > 0 && <>{addBundleButton}</>}
                  <StyledGrid item xs={12}>
                    {productDetailTabsChildren?.length > 0 && (
                      <StyledTabs childrenList={productDetailTabsChildren} name="productDetails" />
                    )}
                  </StyledGrid>
                </StyledGrid>
                <StyledGrid item xs={12} md={6} className="product-image">
                  <ProductImage {...{ fullImage: displayFullImage, alt: displayName }} />
                </StyledGrid>
              </StyledGrid>
            </StyledPDPContainer>
          </StyledGrid>
          {tableData?.data?.length > 0 && (
            <>
              <StyledGrid item xs={12}>
                <CustomTable {...tableData} />
              </StyledGrid>
              <StyledGrid item xs={12}>
                <>{addBundleButton}</>
              </StyledGrid>
            </>
          )}
        </StyledGrid>
      )}
    </>
  );
};
