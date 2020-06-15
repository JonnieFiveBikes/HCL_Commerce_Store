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
import TextField from "@material-ui/core/TextField";
import { dimensions } from "../../../themes/variables";

const CustomTextField = (props: any) => (
  <TextField {...props} variant="outlined" />
);

const StyledTextField = styled(CustomTextField)`
  ${({ theme }) => `
  .MuiOutlinedInput-root {
    border-radius: ${theme.shape.borderRadius}px;

    &:hover {
      &:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.palette.text.secondary};
      }
      .MuiInputLabel-outlined {
        color: ${theme.palette.primary.main};
      }
    }
    
    legend {
      width: 0px !important;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-width: 2px;
  }

  .MuiOutlinedInput-input {
    padding: 0 ${theme.spacing(2)}px;
    font-weight: 500;
    color: ${theme.palette.text.primary};
    height: ${dimensions.inputFields.height}px;
  }

  .MuiInputLabel-outlined {
    transform: none;
    position: relative;
    margin-bottom: 10px;
    font-weight: 500;
    color: ${theme.palette.text.secondary};
    z-index: unset;
    pointer-events: unset;

    &.Mui-focused {
      color: ${theme.palette.text.primary};
    }
  }

  .MuiFormHelperText-contained {
    margin: 3px 0 0;
  }

  .MuiOutlinedInput-root.Mui-disabled {
    color: ${theme.palette.text.disabled};

    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.palette.text.disabled};
      }
    }
    

    .MuiOutlinedInput-input {
      color: ${theme.palette.text.disabled};
      background: ${theme.palette.action.disabledBackground};
      border-radius: ${theme.shape.borderRadius}px;
    }
    
    .MuiOutlinedInput-notchedOutline {
      border-color: ${theme.palette.text.disabled};
    }
  }

  label.Mui-required {
    .MuiInputLabel-asterisk {
      display: none;
    }
  }
  `}
`;

export default StyledTextField;
