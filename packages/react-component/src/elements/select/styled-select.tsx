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
import Select from "@mui/material/Select";
import React from "react";
import { dimensions } from "../../themes/variables";

const SelectWrapper = React.forwardRef((props: any, ref: any) => {
  return <Select {...props} ref={ref} />;
});

const StyledSelect = styled(SelectWrapper)`
  ${({ theme }) => `
    &.margin-top-0 {
      margin-top: 0;
    }
    .MuiOutlinedInput-input {
      padding: 0 ${theme.spacing(2)};
      padding-right: ${theme.spacing(4)};
      height: ${dimensions.searchBar.height}px;
      line-height: ${dimensions.searchBar.height}px;
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

export { StyledSelect };
