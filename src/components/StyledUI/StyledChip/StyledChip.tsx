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
import Chip from "@material-ui/core/Chip";

const StyledChip = styled(({ ...props }) => <Chip {...props} />)`
  ${({ theme }) => `
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.15);
  background: ${theme.palette.primary.contrastText};
  
  .MuiChip-deleteIcon {
    color:  ${theme.palette.action.disabled};
  }

  &:hover {
    .MuiChip-deleteIcon {
      color: ${theme.palette.primary.main};
    }
  }
`}
`;

export default StyledChip;
