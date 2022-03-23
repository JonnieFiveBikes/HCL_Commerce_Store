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

import React from "react";
import { StyledProductImage } from "../../elements/product-image";

interface ProductImageProps {
  fullImage: string;
  isAngleImage?: boolean;
  alt: string;
  isThumbnail?: boolean;
  isSelected?: boolean;
  onClick?: any;
}

/**
 * Product image component
 * @param fullImage
 * @param isAngleImage
 * @param alt
 * @param props
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  fullImage,
  isAngleImage,
  alt,
  isSelected,
  isThumbnail,
  ...props
}) => {
  const className = `${isThumbnail ? "thumbnail" : ""} ${isSelected ? "selected" : ""}`;

  if (fullImage && !isAngleImage) {
    return <StyledProductImage itemProp="image" src={fullImage} alt={alt} className={className} />;
  } else {
    return null;
  }
};
