/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */

import HTMLReactParser from "html-react-parser";
import {
  StyledGrid,
  StyledPDPContainer,
  StyledTypography,
  StyledTabs,
  ITabs,
  StyledNumberInput,
  StyledProductImage,
} from "../../elements";
import { ProductImage, ChipAd, CustomTable } from "../../components";

interface BundleWidgetProps {
  productPartNumber: string;
  displayName: string;
  translation: any;
  displayShortDesc: string;
  displayOfferPrice: number;
  displayListPrice: number;
  productDetailTabsChildren: ITabs[];
  definingAttrs: any;
  displayFullImage: string;
  FormattedPriceDisplay: any;
  tableData: any;
  addKitButton: any;
  productQuantity: number;
  updateProductQuantity: any;
  availabilityImageText: any;
  addRequisitionListButton: any;
  kit?: any;
  ribbonFinder?: any;
  seller?: any;
  physicalAvailabilityImageText?: any;
}

export const KitWidget: React.FC<BundleWidgetProps> = (props: any) => {
  const {
    productPartNumber,
    displayName,
    translation,
    displayShortDesc,
    displayOfferPrice,
    displayListPrice,
    productDetailTabsChildren,
    displayFullImage,
    FormattedPriceDisplay,
    tableData,
    addKitButton,
    productQuantity,
    updateProductQuantity,
    availabilityImageText,
    kit,
    ribbonFinder,
    seller,
    physicalAvailabilityImageText,
  } = props;
  const ribbonAds = ribbonFinder(kit);
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
                  {productPartNumber && (
                    <StyledGrid container alignItems="center" spacing={1} className="top-margin-2">
                      <StyledGrid item>
                        <StyledTypography variant="body2" style={{ fontWeight: "bold" }}>
                          {translation.productDetailSKU}: {productPartNumber}
                        </StyledTypography>
                      </StyledGrid>
                      <StyledGrid item container spacing={1}>
                        <StyledGrid item>
                          <StyledProductImage
                            src={availabilityImageText.src}
                            style={{ verticalAlign: "text-bottom" }}
                          />
                        </StyledGrid>
                        <StyledGrid item>
                          <StyledTypography variant="body2">
                            {HTMLReactParser(availabilityImageText.text)}
                          </StyledTypography>
                        </StyledGrid>
                      </StyledGrid>
                      {physicalAvailabilityImageText ? (
                        <StyledGrid item container spacing={1}>
                          <StyledGrid item>
                            <StyledProductImage
                              src={physicalAvailabilityImageText.src}
                              style={{ verticalAlign: "text-bottom" }}
                            />
                          </StyledGrid>
                          <StyledGrid item>
                            <StyledTypography variant="body2">
                              {HTMLReactParser(physicalAvailabilityImageText.text)}
                            </StyledTypography>
                          </StyledGrid>
                        </StyledGrid>
                      ) : null}
                    </StyledGrid>
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
                    {displayOfferPrice === 0 ? (
                      <span id={`product_offer_price_${productPartNumber}`}>
                        {<FormattedPriceDisplay min={null} />}
                      </span>
                    ) : null}
                  </StyledTypography>
                  <StyledNumberInput
                    value={productQuantity ? productQuantity : 1}
                    min={1}
                    debounceTiming={100}
                    strict={true}
                    onChange={(q) => updateProductQuantity(q)}
                  />
                  {seller ? <div>{seller}</div> : null}
                  {tableData?.data?.length > 0 && <>{addKitButton}</>}
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
                <>{addKitButton}</>
              </StyledGrid>
            </>
          )}
        </StyledGrid>
      )}
    </>
  );
};
