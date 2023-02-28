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
import Alert from "@mui/material/Alert";

export const StyledAlert = styled(Alert)`
  border-radius: 0;
   {
    &.MuiAlert-filledError {
      color: #0a0a0a;
      font-weight: 400;
      background-color: #f7e4e1;
      .MuiAlert-icon {
        color: #f44336;
      }
    }
    &.MuiAlert-filledSuccess {
      color: rgb(48, 48, 48);
      font-weight: 400;
      background-color: #ecfaeb;
      border: 1px solid #1a930f;
      .MuiAlert-icon {
        color: rgb(26, 147, 15);
      }
    }
  }
`;
