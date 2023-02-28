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
import { StyledIconLabel } from "../icon-label";
import { StyledPaper } from "../paper";
import { StyledButton } from "../button/styled-button";
import { StyledGrid } from "../grid";

const StyledButtonBoxWrapper = styled(({ ...props }) => <StyledPaper {...props} />)`
  ${({ theme }) => `
   display: flex;
   padding: ${theme.spacing(2)};

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
  testId: string;
}

export function StyledButtonBox({ msg, icon, button, disabled, buttonAction, testId }: ButtonBoxProps) {
  return (
    <StyledButtonBoxWrapper className={disabled ? "disabled" : ""}>
      <StyledGrid container direction="row" justifyContent="space-between" alignItems="center">
        <StyledIconLabel icon={icon} label={msg} variant="h4" />

        {buttonAction && (
          <StyledGrid item xs={2} sm={3}>
            <StyledButton color="primary" size="small" fullWidth onClick={buttonAction} testId={testId}>
              {button}
            </StyledButton>
          </StyledGrid>
        )}
      </StyledGrid>
    </StyledButtonBoxWrapper>
  );
}
