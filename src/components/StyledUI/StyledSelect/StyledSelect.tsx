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
import Select from "@material-ui/core/Select";
import React from "react";
import { dimensions } from "../../../themes/variables";

const StyledSelect = styled(({ ...props }) => <Select {...props} />)`
  ${({ theme }) => `
    .MuiOutlinedInput-input {
      padding: 0 ${theme.spacing(2)}px;
      padding-right: ${theme.spacing(4)}px;
      height: ${dimensions.inputFields.height}px;
      line-height: ${dimensions.inputFields.height}px;
      color: ${theme.palette.text.primary};
      &.Mui-disabled {
        color: ${theme.palette.action.disabled};
        background:  ${theme.palette.action.disabledBackground};;
      }
    }

    .MuiSelect-icon {
      top: 50%;
      transform: translateY(-50%);
      color: ${theme.palette.text.secondary};
      width: 20px;
    }

    .MuiOutlinedInput-notchedOutline {
      border-width: 2px;
      border-color: ${theme.palette.text.disabled};
    }

    .MuiInputLabel-animated {
      transition: none;
    }
  `}
`;

export default StyledSelect;
