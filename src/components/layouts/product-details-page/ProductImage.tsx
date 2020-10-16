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
 * @param fullImage
 * @param isAngleImage
 * @param alt
 * @param props
 */
function ProductImage({ fullImage, isAngleImage, alt }: any) {
  if (fullImage && !isAngleImage) {
    return <StyledProductImage itemProp="image" src={fullImage} alt={alt} />;
  } else {
    return null;
  }
}

ProductImage.propTypes = {
  fullImage: PropTypes.string,
  isAngleImage: PropTypes.bool,
  alt: PropTypes.string,
};

export default ProductImage;
