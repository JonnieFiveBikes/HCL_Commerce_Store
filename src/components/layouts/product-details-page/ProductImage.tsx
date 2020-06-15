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
import PropTypes from "prop-types";
//UI
import { StyledProductImage } from "../../StyledUI";

/**
 *Product image component
 * @param product
 * @param partNumber
 * @param props
 */
function ProductImage({ product, partNumber, ...props }: any) {
  if (product && !product.isAngleImage && product.partNumber.fullImage) {
    return (
      <StyledProductImage
        itemProp="image"
        id={`product_img_full_${partNumber}`}
        src={product.partNumber.fullImage}
      />
    );
  } else {
    return null;
  }
}

ProductImage.propTypes = {
  product: PropTypes.object,
  partNumber: PropTypes.string,
};

export default ProductImage;
