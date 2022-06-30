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
import React from "react";
import { useTranslation } from "react-i18next";

//Foundation libraries
import { useProductValue } from "../../../../_foundation/context/product-context";

//Redux
import { ProductCardLayout } from "../../../widgets/product-card";
import { WidgetProps } from "../../../../_foundation/constants/seo-config";
import { useMemo } from "react";

/**
 * MerchandisingAssociation Widget cannot be exist alone without product, if without product
 * then nothing to display.
 * @param props
 * @returns
 */
export const useMerchandisingAssociation = (props: any) => {
  const { associatedProductList: productList } = useProductValue();
  const slides = useMemo(
    () =>
      productList?.map((p: any, i: number) => {
        return <ProductCardLayout product={p} key={`${p.id}_${i}`} />;
      }),
    [productList]
  );
  const { t } = useTranslation();
  const recommendedProdTitle = t("productDetail.recommendedProdTitle");

  return {
    recommendedProdTitle,
    productList,
    slides,
  };
};

/**
 * A high order component that wraps a component with merchandising association information.
 * @param Component the wrapping component.
 * @returns A component that has ability to return marchandising association data.
 */
export const withMerchandisingAssociationWidget =
  (WrapComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    const { recommendedProdTitle, productList, slides } = useMerchandisingAssociation({ page });
    return (
      <>
        {productList && productList.length > 0 && <WrapComponent {...{ slides, recommendedProdTitle }}></WrapComponent>}
      </>
    );
  };
