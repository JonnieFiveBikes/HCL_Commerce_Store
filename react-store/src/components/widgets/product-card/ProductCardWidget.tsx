/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import { useTranslation } from "react-i18next";
//UI
import { StyledGrid } from "@hcl-commerce-store-sdk/react-component";
//Custom libraries
import { ProductCardLayout } from "../../../components/widgets/product-card";

/**
 * Product Card component
 * displays catentry image, name, price, etc
 * @param props
 */
export default function useProductCardWidget(props: any) {
  const { productListTotal, productList, categoryId, selectedFacets, priceSelected, ...rest } = props;
  const { t } = useTranslation();
  return (
    <StyledGrid container spacing={2} alignItems="stretch" direction="row">
      {productListTotal > 0 ? (
        productList?.map((product) => (
          <StyledGrid item xs={6} sm={4} lg={3} key={product.id}>
            <ProductCardLayout product={product} categoryId={categoryId} {...rest} />
          </StyledGrid>
        ))
      ) : (
        <>
          {productListTotal === 0 && (Object.keys(selectedFacets)?.length > 0 || priceSelected) ? (
            <StyledGrid item xs={12}>
              {t("ProductGrid.Labels.noProductsFoundForFilter")}
            </StyledGrid>
          ) : null}
        </>
      )}
    </StyledGrid>
  );
}
