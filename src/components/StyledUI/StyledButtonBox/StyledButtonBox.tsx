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
import { StyledIconLabel, StyledPaper, StyledButton, StyledGrid } from "..";

const StyledButtonBoxWrapper = styled(({ ...props }) => (
  <StyledPaper {...props} />
))`
  ${({ theme }) => `
  display: flex;
  padding: ${theme.spacing(2)}px;
 
  &.disabled {
    h6, p {
      color: ${theme.palette.text.disabled};
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.disabled};
    }
  }
  `}
`;

interface ButtonBoxProps {
  msg: string;
  icon: any;
  button: string;
  disabled?: boolean;
  buttonAction?: any;
}

export default function StyledButtonBox({
  msg,
  icon,
  button,
  disabled,
  buttonAction,
}: ButtonBoxProps) {
  return (
    <StyledButtonBoxWrapper className={disabled ? "disabled" : ""}>
      <StyledGrid
        container
        direction="row"
        justify="space-between"
        alignItems="center">
        <StyledIconLabel icon={icon} label={msg} variant="h4" />

        {buttonAction && (
          <StyledGrid item xs={2} sm={3}>
            <StyledButton
              color="primary"
              size="small"
              fullWidth
              onClick={buttonAction}>
              {button}
            </StyledButton>
          </StyledGrid>
        )}
      </StyledGrid>
    </StyledButtonBoxWrapper>
  );
}
