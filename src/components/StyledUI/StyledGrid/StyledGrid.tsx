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
import Grid from "@material-ui/core/Grid";

const ComponentWrapper = (props: any) => <Grid {...props} />;

const StyledGrid = styled(ComponentWrapper)`
  ${({ theme }) => `
    &.sidebar {
      ${theme.breakpoints.down("sm")} {
        padding: 0;
      }
    }

    ${theme.breakpoints.down("xs")} {
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

export default StyledGrid;
