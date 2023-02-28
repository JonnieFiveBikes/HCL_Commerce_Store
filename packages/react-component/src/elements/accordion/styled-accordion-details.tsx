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
import styled from "@mui/styled-engine-sc";
import AccordionDetails from "@mui/material/AccordionDetails";

const StyledAccordionDetails = styled(({ ...props }) => <AccordionDetails {...props} />)`
  ${({ theme }) => `
  &.shipment-group-details {
    padding: 0;
    background: ${theme.palette.background.default};
    border-top: 1px solid  ${theme.palette.divider};
  }

  .header-menu &.MuiAccordionDetails-root{
    display: block;
    padding-top: 0;
  }
`}
`;

export { StyledAccordionDetails };
