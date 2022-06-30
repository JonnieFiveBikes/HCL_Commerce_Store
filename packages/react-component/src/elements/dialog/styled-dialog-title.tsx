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
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { StyledIconButton } from "../icon-button";

const StyledDialogTitle = styled(({ onClickHandler, ...props }) => (
  <DialogTitle {...props}>
    {props.title}
    <StyledIconButton data-testid="close-dialog-title-icon-button" aria-label="close" onClick={onClickHandler}>
      <CloseIcon />
    </StyledIconButton>
  </DialogTitle>
))`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px ${theme.spacing(2)}px;

    .MuiButtonBase-root {
      padding: ${theme.spacing(1)}px;
      position: absolute;
      right: ${theme.spacing(1)}px;
      top: ${theme.spacing(1)}px;

      svg {
        fill: ${theme.palette.text.secondary};
      }

      &:hover {
        svg {
          fill: ${theme.palette.primary.main};
        }
      }
    }
  `}
`;

export { StyledDialogTitle };
