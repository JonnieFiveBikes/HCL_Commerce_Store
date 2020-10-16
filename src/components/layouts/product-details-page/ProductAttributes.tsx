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
import { StyledTypography, StyledSwatchRadioGroup } from "../../StyledUI";

function ProductAttributes({
  attributeList,
  onChangeHandler,
  currentSelection,
}: any) {
  return (
    <>
      {attributeList.map(function (attr: any, index: number) {
        const useSwatches = attr.values[0].image1path ? true : false;

        const productAttributeTabContent = (
          <StyledSwatchRadioGroup
            values={attr.values}
            name={attr.name}
            id={attr.identifier}
            onChangeHandler={onChangeHandler}
            useSwatches={useSwatches}
            key={attr.identifier}
            currentSelection={currentSelection}
          />
        );

        return (
          <ProductAttribute
            key={index}
            title={attr.name}
            element={productAttributeTabContent}
          />
        );
      })}
    </>
  );
}

ProductAttributes.propTypes = {
  attributeList: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.any.isRequired,
  currentSelection: PropTypes.any,
};

export default ProductAttributes;

function ProductAttribute({ title, element, ...props }: any) {
  return (
    <>
      <StyledTypography variant="body2">{title}</StyledTypography>
      <>{element}</>
    </>
  );
}

ProductAttribute.propTypes = {
  title: PropTypes.string.isRequired,
  element: PropTypes.any.isRequired,
};
