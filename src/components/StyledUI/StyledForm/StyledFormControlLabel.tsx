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
      padding: ${theme.spacing(2)}px;
      margin: 0;
      width: 100%;
    }
  `}
`;

export default StyledFormControlLabel;
