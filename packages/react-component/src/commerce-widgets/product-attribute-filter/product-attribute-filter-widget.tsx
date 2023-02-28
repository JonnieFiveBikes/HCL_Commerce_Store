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
//Standard libraries
import React, { useState } from "react";
import { kebabCase } from "lodash-es";
//UI
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  StyledSidebar,
  StyledTypography,
  StyledSwatchRadioGroup,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from "../../elements";

type ProductAttributeFilterWidgetProps = {
  productDetails: any;
  [extraProps: string]: any;
};

/**
 * B2B Product defining attrubutes display component
 * @description Displays Product defining attributes on side bar which are used for filtering sku table
 * ` @prop { any } productDetails` The product details object has following properties:
 * ` @property { object[] } definingAttributeList (required)` The defining attribute list of selected product.
 * ` @property { Function } onAttributeChange (required)` The attribute change event handler function.
 * ` @property { boolean } isMobile (required)` The flag to check whether page is viewed in mobile devices.
 * ` @property { Map<any, any> } attributeState (required)` A map to hold the attribute selected state.
 * ` @property { object } translation (required)` A object which holds multiple string values for transation purpose .
 */
export const ProductAttributeFilterWidget: React.FC<ProductAttributeFilterWidgetProps> = ({
  productDetails,
  ...props
}) => {
  const [isActiveAttrId, setIsActiveAttrId] = useState<string>("");
  const definingAttributeList = productDetails.definingAttributeList;
  const onAttributeChange = productDetails.onAttributeChange;
  const attributeState = productDetails.attributeState;
  const isMobile = productDetails.isMobile;
  const translation = productDetails.translation;

  return definingAttributeList && definingAttributeList.length > 0 ? (
    <StyledSidebar
      title={translation.productDetailattributeFilter}
      breakpoint="md"
      scrollable={true}
      sidebarContent={definingAttributeList.map((attr: any, index: number) => (
        <StyledAccordion
          testId={`product-attr-filter-${attr.identifier}`}
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
          <StyledAccordionSummary expandIcon={isMobile ? <ExpandMoreIcon /> : null} key={attr.identifier}>
            <StyledTypography variant="body2" key={attr.identifier}>
              <strong key={attr.identifier}>{attr.name}</strong>
            </StyledTypography>
          </StyledAccordionSummary>
          <StyledAccordionDetails
            key={"AccordDetail_" + attr.identifier}
            data-testid={kebabCase(`product-attribute-filter-${attr.identifier}-accordion-detail`)}>
            <StyledSwatchRadioGroup
              values={attr.values}
              name={attr.name}
              id={attr.identifier}
              onChangeHandler={onAttributeChange}
              useSwatches={false}
              //currently, swatch is not supported for B2B
              key={"RadioGrp_" + attr.identifier}
              isB2B={true}
              attributeState={attributeState}
              productDetailsAny={translation.productDetailsAny}
            />
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    />
  ) : null;
};
