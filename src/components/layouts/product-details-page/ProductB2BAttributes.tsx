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
import {
  StyledGrid,
  StyledTypography,
  StyledSwatchRadioGroup,
  StyledExpansionPanel,
  StyledExpansionPanelDetails,
  StyledExpansionPanelSummary,
} from "../../StyledUI";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * B2B Product defining attrubutes display component
 *
 * @param attributeList
 * @param onChangeHandler
 * @returns any
 */
function ProductB2BAttributes({ attributeList, onChangeHandler }: any) {
  return (
    <>
      {attributeList.map(function (attr: any, index: number) {
        const useSwatches = attr.values[0].image1path ? true : false;

        const productAttributeTabContent = (
          <StyledExpansionPanel defaultExpanded={true} key={index}>
            <StyledExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              key={index}>
              <StyledTypography variant="body2" key={index}>
                <strong key={index}>{attr.name}</strong>
              </StyledTypography>
            </StyledExpansionPanelSummary>
            <StyledExpansionPanelDetails key={index}>
              <StyledSwatchRadioGroup
                values={attr.values}
                name={attr.name}
                id={attr.identifier}
                onChangeHandler={onChangeHandler}
                useSwatches={useSwatches}
                key={index}
                isB2B={true}
              />
            </StyledExpansionPanelDetails>
          </StyledExpansionPanel>
        );

        return (
          <StyledGrid item xs={12} key={index}>
            <ProductB2BAttribute
              key={index}
              title={attr.name}
              element={productAttributeTabContent}
            />
          </StyledGrid>
        );
      })}
    </>
  );
}

ProductB2BAttributes.propTypes = {
  attributeList: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.any.isRequired,
};

export default ProductB2BAttributes;

function ProductB2BAttribute({ title, element, ...props }: any) {
  return <>{element}</>;
}

ProductB2BAttribute.propTypes = {
  title: PropTypes.string.isRequired,
  element: PropTypes.any.isRequired,
};
