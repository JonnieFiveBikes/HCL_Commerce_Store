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
import React from "react";
import styled from "styled-components";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const StyledAccordionSummary = styled(({ ...props }) => (
  <AccordionSummary {...props} />
))`
  ${({ theme }) => `
  & {
    &.shipment-group-summary {
      align-items: flex-start;
      .MuiAccordionSummary-expandIcon {
        margin-top: ${theme.spacing(2)}px;
        transition: none;
      }
    }
  }
`}
`;

export default StyledAccordionSummary;
