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
//UI
import { ProductAttribute } from "./product-attribute";
import { StyledSwatchRadioGroup } from "../../elements/swatch-radio-group";
import { get } from "lodash-es";

interface ProductAttributesProps {
  attributeList: any[];
  skusAsAttrs: any[];
  onChangeHandler: any;
  currentSelection?: any;
  skuColor?: string;
}

export const ProductAttributes: React.FC<ProductAttributesProps> = ({
  attributeList,
  onChangeHandler,
  currentSelection,
  skusAsAttrs,
  skuColor,
}) => {
  return (
    <>
      {attributeList.map((attr) => {
        const useSwatches = get(attr, "values[0].image1path") ? true : false;
        const productAttributeTabContent = (
          <StyledSwatchRadioGroup
            values={attr.values}
            name={attr.name}
            id={attr.identifier}
            onChangeHandler={onChangeHandler}
            useSwatches={useSwatches}
            key={attr.identifier}
            currentSelection={currentSelection}
            skusAsAttrs={skusAsAttrs}
          />
        );

        return (
          <ProductAttribute
            skuColor={skuColor}
            key={attr.identifier}
            attributeType={attr.identifier}
            title={attr.name}
            element={productAttributeTabContent}
          />
        );
      })}
    </>
  );
};
