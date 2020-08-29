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
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";

const StyledInputLabel = styled(({ ...props }) => <InputLabel {...props} />)`
  ${({ theme }) => `
  &.MuiInputLabel-outlined {
    &.MuiInputLabel-shrink{
      transform: none;
    }
    &.Mui-disabled {
      color: ${theme.palette.text.disabled};
    }
    position: relative;
    margin-bottom: ${theme.spacing(1)}px;
    font-weight: 500;
    color: ${theme.palette.text.secondary};
    z-index: unset;
    pointer-events: unset;

    &.Mui-focused {
      color: ${theme.palette.text.primary};
    }
  }
`}
`;

export default StyledInputLabel;
