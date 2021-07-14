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
import React, { Fragment } from "react";

//UI
import {
  StyledPaper,
  StyledContainer,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@material-ui/core";

interface OrderDetailSubSectionProps {
  /**
   * The heading eleemtns to display in heading area
   */
  heading?: any;
  /**
   * The action elements/buttons to display in action area.
   */
  actions?: any;
  /**
   * The elements to be rendered in details section.
   */
  details: any;
}

const OrderDetailSubsection: React.FC<OrderDetailSubSectionProps> = (props) => {
  const { heading, details, actions } = props;
  const detailsArray = Array.isArray(details) ? details : [details];

  return (
    <StyledPaper>
      {heading && (
        <>
          <StyledContainer className="vertical-margin-2">
            {heading}
          </StyledContainer>
          <Divider />
        </>
      )}

      {detailsArray.map((detail: any, index: number) => (
        <Fragment key={index}>
          <StyledContainer className="vertical-margin-2">
            {detail}
          </StyledContainer>
          {index + 1 !== detailsArray.length && <Divider />}
        </Fragment>
      ))}
      {actions && (
        <>
          <Divider />
          <StyledContainer className="vertical-margin-2">
            {actions}
          </StyledContainer>
        </>
      )}
    </StyledPaper>
  );
};

export default OrderDetailSubsection;
