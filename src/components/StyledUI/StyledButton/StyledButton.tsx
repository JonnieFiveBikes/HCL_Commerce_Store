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
import MatButton from "@material-ui/core/Button";

const CustomMatButton = React.forwardRef((props: any, ref: any) => {
  return (
    <MatButton {...props} ref={ref} variant={props.variant || "contained"} />
  );
});

const StyledButton = styled(CustomMatButton)`
  ${({ theme }) => `
  &.MuiButtonBase-root {
    border-radius: ${theme.shape.borderRadius}px;
    padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
    letter-spacing: 0.02rem;
    box-shadow: none;
  }

  &.MuiButton-containedSecondary {
    background: white;
    border: 1px solid ${theme.palette.grey[400]};
    color: ${theme.palette.text.secondary};
    font-weight: 500;

    &:hover {
      border-color: ${theme.palette.primary.dark};
      color: ${theme.palette.primary.dark};
    }
  }

  &.MuiButton-text {
    padding: 0;
    font-size: 0.9rem;
    font-weight: 600;
    min-width: unset;
    color: ${theme.palette.primary.main};
    background: none;
  }

  &.left-border-solid  {
  &.MuiButton-outlinedSizeSmall {
    font-weight: bold;
    float: left;
    border: 1.35px solid;
  }
  }

  &.confirm-action-button,
  &.cancel-action-button {
    background-color: ${theme.palette.background.paper};
    font-weight: 600;   
  }

  &.confirm-action-button {
    border: ${theme.spacing(0.25)}px solid ${theme.palette.border.alert};
    color: ${theme.palette.text.alert};
  }

  &.cancel-action-button {
    border: ${theme.spacing(0.25)}px solid;
  }

  `}
`;

export default StyledButton;
