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
import styled from "@mui/styled-engine-sc";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
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
    padding: ${theme.spacing(2)} ${theme.spacing(2)};

    .MuiButtonBase-root {
      padding: ${theme.spacing(1)};
      position: absolute;
      right: ${theme.spacing(1)};
      top: ${theme.spacing(1)};

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
