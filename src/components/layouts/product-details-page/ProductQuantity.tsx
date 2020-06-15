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
import { StyledNumberInput } from "../../StyledUI";

/**
 *Product quantity component

 * @param updateProductQuantity
 * @param quantity
 * @param errors
 */
function ProductQuantity({ updateProductQuantity }: any) {
  return (
    <StyledNumberInput
      mobile
      min={1}
      onChange={(value) => updateProductQuantity(value)}
      value={1}
      strict
    />
  );
}

ProductQuantity.propTypes = {
  updateProductQuantity: PropTypes.any,
};

export default ProductQuantity;
