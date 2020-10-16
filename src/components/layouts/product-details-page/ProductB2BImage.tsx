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
function ProductB2BImage({ thumbnail, isAngleImage, alt }: any) {
  if (!isAngleImage && thumbnail) {
    return <StyledProductImage itemProp="image" src={thumbnail} alt={alt} />;
  } else {
    return null;
  }
}

ProductB2BImage.propTypes = {
  thumbnail: PropTypes.string,
  isAngleImage: PropTypes.bool,
  alt: PropTypes.string,
};

export default ProductB2BImage;
