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
import { StyledTypography } from "../../StyledUI";

function ProductAttribute({ title, element, ...props }: any) {
  return (
    <>
      <StyledTypography variant="body2">{title}</StyledTypography>
      <StyledTypography variant="body1" component="div">
        {element}
      </StyledTypography>
    </>
  );
}

ProductAttribute.propTypes = {
  title: PropTypes.string.isRequired,
  element: PropTypes.any.isRequired,
};

export default ProductAttribute;
