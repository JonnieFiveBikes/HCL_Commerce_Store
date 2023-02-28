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
import Chip from "@mui/material/Chip";

export const StyledChip = styled(({ ...props }) => <Chip {...props} />)`
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
