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
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import React from "react";

const StyledPopover = styled(({ ...props }) => <Popover {...props} />)`
  ${({ theme }) => `
  .MuiPopover-paper {
    padding: 0 ${theme.spacing(1.5)}px;
    border-radius: ${theme.shape.borderRadius}px;
    box-shadow: ${theme.shadows[1]};
  }
    `}
`;

export default StyledPopover;
