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
import React, { useState } from "react";
import PropTypes from "prop-types";
//UI
import {
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
function ProductB2BAttributes({
  isMobile,
  attributeList,
  onChangeHandler,
  attributeState,
}: any) {
  const [isActiveAttrId, setIsActiveAttrId] = useState<string>("");

  return (
    <>
      {attributeList.map((attr: any, index: number) => (
        <StyledExpansionPanel
          defaultExpanded={!isMobile}
          key={attr.identifier}
          expanded={!isMobile || isActiveAttrId === attr.identifier}
          onClick={() => {
            if (isMobile) {
              if (isActiveAttrId === attr.identifier) {
                setIsActiveAttrId("");
              } else {
                setIsActiveAttrId(attr.identifier);
              }
            }
          }}>
          <StyledExpansionPanelSummary
            expandIcon={isMobile ? <ExpandMoreIcon /> : null}
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
              useSwatches={attr.values[0].image1path ? true : false}
              key={index}
              isB2B={true}
              attributeState={attributeState}
            />
          </StyledExpansionPanelDetails>
        </StyledExpansionPanel>
      ))}
    </>
  );
}

ProductB2BAttributes.propTypes = {
  attributeList: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.any.isRequired,
  isMobile: PropTypes.bool.isRequired,
  attributeState: PropTypes.instanceOf(Map).isRequired,
};

export default ProductB2BAttributes;
