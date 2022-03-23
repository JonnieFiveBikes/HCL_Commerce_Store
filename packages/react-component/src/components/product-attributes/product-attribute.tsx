/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 ***************************************************
 */
import React from "react";
import { StyledTypography } from "../../elements/typography";

interface ProductAttributeProps {
  title: string;
  element: any;
  skuColor?: string;
  attributeType?: string;
}

export const ProductAttribute: React.FC<ProductAttributeProps> = ({
  title,
  element,
  skuColor,
  attributeType,
  ...props
}: any) => {
  const showSkuColor = attributeType === "Color" ? true : false;

  return (
    <>
      <StyledTypography variant="body2" className="product-color">
        {title}
        {showSkuColor && ": " + skuColor}
      </StyledTypography>
      <>{element}</>
    </>
  );
};
