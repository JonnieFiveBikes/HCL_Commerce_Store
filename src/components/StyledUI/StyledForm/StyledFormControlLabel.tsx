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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";

const StyledFormControlLabel = styled(({ ...props }) => (
  <FormControlLabel {...props} />
))`
  ${({ theme }) => `
    .MuiCheckbox-root {
      padding: 5px 8px;
    }

    &.MuiFormControlLabel-root.address-display{
      display: inline-block;
      margin: 0;
      width: 100%;
      height: 100%;
    }

    &.MuiFormControlLabel-root.pay-option {
      margin-left: 0px;
      margin-right: 0.5px;
    }

    &.MuiFormControlLabel-root.pay-option:nth-child(odd) {
      background-color: ${theme.palette.grey[100]};
      border-top-left-radius: ${theme.shape.borderRadius}px;
      border-top-right-radius: ${theme.shape.borderRadius}px;
    }    
  `}
`;

export default StyledFormControlLabel;
