/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import styled from "@mui/styled-engine-sc";
import { ToggleButton } from "@mui/material";
import React from "react";

const ComponentWrapper = (props: any) => <ToggleButton {...props} />;

const StyledToggleButton = styled(ComponentWrapper)`
  ${({ theme }) => `
    width:${theme.spacing(32.25)};
    height:${theme.spacing(10)};
    background-color:white;

    &.Mui-selected {
      color: ${theme.palette.primary.main};
      background: rgba(0, 152, 116, 0.15);
    }

    &.MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
      padding:${theme.spacing(1.25)} ${theme.spacing(6)} ${theme.spacing(1.25)} ${theme.spacing(6)};
      border: ${theme.spacing(0.125)} solid black;
      border-top-right-radius:${theme.spacing(0.625)};
      border-bottom-right-radius:${theme.spacing(0.625)};
    }

    &.MuiToggleButtonGroup-groupedHorizontal:not(:last-child) {
      padding:${theme.spacing(1.25)} ${theme.spacing(6)} ${theme.spacing(1.25)} ${theme.spacing(6)};
      border: ${theme.spacing(0.125)} solid black;
      border-top-left-radius:${theme.spacing(0.625)};
      border-bottom-left-radius:${theme.spacing(0.625)};
    }
    &.MuiToggleButton-root.Mui-disabled {
      color: rgba(0, 0, 0, 0.12);
    }
  `}
`;

export { StyledToggleButton };
