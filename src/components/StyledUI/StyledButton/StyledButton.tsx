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
  const { variant, className, color, ...other } = props;
  return (
    <MatButton
      {...props}
      ref={ref}
      variant={variant || "contained"}
      color={color || "primary"}
    />
  );
});

const StyledButton = styled(CustomMatButton)`
  ${({ theme }) => `

  &.accordion-show-expanded {
    display: none;
  }
  .MuiAccordionSummary-expandIcon.Mui-expanded &{
    &.accordion-show-summary {
      display: none;
    }
    &.accordion-show-expanded {
      display:flex;
      transform: rotate(180deg);
    }
  }
  &.MuiButtonBase-root {
    border-radius: ${theme.shape.borderRadius}px;
    padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
    letter-spacing: 0.02rem;
    box-shadow: none;
  }

  &.MuiButton-containedSecondary {
    background: white;
    border: 2px solid ${theme.palette.grey[500]};
    padding: ${theme.spacing(1) - 2}px ${theme.spacing(2) - 2}px;
    color: ${theme.palette.text.secondary};
    font-weight: 500;

    &:hover {
      border-color: ${theme.palette.primary.dark};
      color: ${theme.palette.primary.main};
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

  &.border-solid-bold  {
    font-weight: bold;
    border: 1.35px solid;
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
