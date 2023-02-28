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
import Grid from "@mui/material/Grid";

const ComponentWrapper = (props: any) => <Grid {...props} />;

const StyledGrid = styled(ComponentWrapper)`
  ${({ theme }) => `
    &.sidebar {
      ${theme.breakpoints.down("md")} {
        padding: 0;
      }
    }

    ${theme.breakpoints.down("sm")} {
      &.checkout-actions {
        flex-direction: column;

        .MuiGrid-item {
          .MuiButtonBase-root {
            width: 100%;
          }
        }
      }
    }
  `}
`;

export { StyledGrid };
