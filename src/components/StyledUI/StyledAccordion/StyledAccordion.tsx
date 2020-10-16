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
import Accordion from "@material-ui/core/Accordion";

const StyledAccordion = styled((props: any) => <Accordion {...props} />)`
  ${({ theme }) => `
    &.MuiAccordion-root.Mui-expanded {
      margin: 0;

      &:before {
        opacity: 1;
      }
      &.shipment-group {
        margin: ${theme.spacing(2)}px 0;
        border-radius: ${theme.shape.borderRadius}px;
        border: 1px solid  ${theme.palette.divider};
      }
    }
    &.shipment-group {
      margin: ${theme.spacing(2)}px 0;
      border-radius: ${theme.shape.borderRadius}px;
      border: 1px solid  ${theme.palette.divider};
    }
  `}
`;

export default StyledAccordion;
