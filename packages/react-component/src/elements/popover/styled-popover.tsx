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
import styled from "@mui/styled-engine-sc";
import Popover from "@mui/material/Popover";
import React from "react";

export const StyledPopover = styled(({ ...props }) => <Popover {...props} />)`
  ${({ theme }) => `
  .MuiPopover-paper {
    padding: 0 ${theme.spacing(1.5)};
    border-radius: ${theme.shape.borderRadius}px;
    box-shadow: ${theme.shadows[1]};
  }
    `}
`;
