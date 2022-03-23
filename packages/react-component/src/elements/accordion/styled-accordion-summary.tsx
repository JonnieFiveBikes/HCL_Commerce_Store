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

const StyledAccordionSummary = styled(({ ...props }) => <AccordionSummary {...props} />)`
  ${({ theme }) => `
    min-height: initial;

    &.Mui-expanded {
      min-height: initial;
    }

    .MuiAccordionSummary-content {
      margin: 0;

      &.Mui-expanded {
        min-height: initial;
      }
    }

    &.shipment-group-summary {
      align-items: flex-start;
      .MuiAccordionSummary-expandIcon {
        margin-top: ${theme.spacing(2)}px;
        transition: none;
      }
    }
`}
`;

export { StyledAccordionSummary };
