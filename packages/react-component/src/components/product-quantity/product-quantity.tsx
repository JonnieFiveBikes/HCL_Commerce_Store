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

// Standard libraries
import React from "react";
// UI
import { StyledNumberInput } from "../../elements/number-input";

interface ProductQuantityProps {
  value: number;
  updateProductQuantity: (v: number) => void;
}

/**
 * Product quantity component
 * @param updateProductQuantity
 * @param quantity
 * @param errors
 */
export const ProductQuantity: React.FC<ProductQuantityProps> = ({ updateProductQuantity, value }) => {
  return (
    <StyledNumberInput
      mobile
      min={1}
      onChange={(_new: any) => updateProductQuantity(_new)}
      value={value ? value : 1}
      strict
    />
  );
};
