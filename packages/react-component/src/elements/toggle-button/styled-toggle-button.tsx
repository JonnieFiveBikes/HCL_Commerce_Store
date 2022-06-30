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
import styled from "styled-components";
import { ToggleButton } from "@material-ui/lab";
import React from "react";

const ComponentWrapper = (props: any) => <ToggleButton {...props} />;

const StyledToggleButton = styled(ComponentWrapper)`
  ${({ theme }) => `
    width:${theme.spacing(32.25)}px;
    height:${theme.spacing(10)}px;
    background-color:white;

    &.Mui-selected {
      color: ${theme.palette.primary.main};
      background: rgba(0, 152, 116, 0.15);
    }

    &.MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
      padding:${theme.spacing(1.25)}px ${theme.spacing(6)}px ${theme.spacing(1.25)}px ${theme.spacing(6)}px;
      border: ${theme.spacing(0.125)}px solid black;
      border-top-right-radius:${theme.spacing(0.625)}px;
      border-bottom-right-radius:${theme.spacing(0.625)}px;
    }

    &.MuiToggleButtonGroup-groupedHorizontal:not(:last-child) {
      padding:${theme.spacing(1.25)}px ${theme.spacing(6)}px ${theme.spacing(1.25)}px ${theme.spacing(6)}px;
      border: ${theme.spacing(0.125)}px solid black;
      border-top-left-radius:${theme.spacing(0.625)}px;
      border-bottom-left-radius:${theme.spacing(0.625)}px;
    }
    &.MuiToggleButton-root.Mui-disabled {
      color: rgba(0, 0, 0, 0.12);
    }
  `}
`;

export { StyledToggleButton };
