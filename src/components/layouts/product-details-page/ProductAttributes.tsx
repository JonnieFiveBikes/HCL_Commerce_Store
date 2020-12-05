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
  skuColor,
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
            skuColor={skuColor}
            key={index}
            attributeType={attr.identifier}
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
  skuColor: PropTypes.string,
};

export default ProductAttributes;

function ProductAttribute({
  title,
  element,
  skuColor,
  attributeType,
  ...props
}: any) {
  let showSkuColor = attributeType === "Color" ? true : false;

  return (
    <>
      <StyledTypography variant="body2" className="product-color">
        {title}
        {showSkuColor && ": " + skuColor}
      </StyledTypography>
      <>{element}</>
    </>
  );
}

ProductAttribute.propTypes = {
  title: PropTypes.string.isRequired,
  element: PropTypes.any.isRequired,
  skuColor: PropTypes.string,
  attributeType: PropTypes.string,
};
