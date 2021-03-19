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
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
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
        <StyledAccordion
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
          <StyledAccordionSummary
            expandIcon={isMobile ? <ExpandMoreIcon /> : null}
            key={attr.identifier}>
            <StyledTypography variant="body2" key={attr.identifier}>
              <strong key={attr.identifier}>{attr.name}</strong>
            </StyledTypography>
          </StyledAccordionSummary>
          <StyledAccordionDetails key={"AccordDetail_" + attr.identifier}>
            <StyledSwatchRadioGroup
              values={attr.values}
              name={attr.name}
              id={attr.identifier}
              onChangeHandler={onChangeHandler}
              useSwatches={false}
              //currently, swatch is not supported for B2B
              key={"RadioGrp_" + attr.identifier}
              isB2B={true}
              attributeState={attributeState}
            />
          </StyledAccordionDetails>
        </StyledAccordion>
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
