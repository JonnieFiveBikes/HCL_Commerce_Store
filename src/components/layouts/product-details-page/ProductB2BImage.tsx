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
 * B2B Product image component
 * @param product
 * @param partNumber
 * @param props
 */
function ProductB2BImage({ product, partNumber, ...props }: any) {
  if (product && !product.isAngleImage && product.partNumber.thumbnail) {
    return (
      <StyledProductImage
        itemProp="image"
        id={`product_img_full_${partNumber}`}
        src={product.partNumber.thumbnail}
      />
    );
  } else {
    return null;
  }
}

ProductB2BImage.propTypes = {
  product: PropTypes.object,
  partNumber: PropTypes.string,
};

export default ProductB2BImage;
