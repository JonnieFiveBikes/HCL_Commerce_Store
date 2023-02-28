/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import styled from "@mui/styled-engine-sc";
import { StyledButton } from "../button";

export const StyledTextLink = styled(({ ...props }) => (
  <StyledButton {...props} variant="text">
    {props.label}
  </StyledButton>
))`
  ${({ theme }) => `
    color: ${theme.palette.primary.main};
    &.MuiButtonBase-root {
      font-weight: 400;
    }
  `}
`;
