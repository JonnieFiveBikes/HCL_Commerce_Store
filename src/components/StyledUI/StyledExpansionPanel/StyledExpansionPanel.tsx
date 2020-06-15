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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";

const StyledExpansionPanel = styled((props: any) => (
  <ExpansionPanel {...props} />
))`
  ${({ theme }) => `
    &.MuiExpansionPanel-root.Mui-expanded {
      margin: 0;

      &:before {
        opacity: 1;
      }
    }
  `}
`;

export default StyledExpansionPanel;
