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

    &.checkout-actions {
      ${theme.breakpoints.down("sm")} {
        .MuiGrid-item {
          width: 100%;
  
          .MuiButton-root {
            width: 100%;
          }
  
          &:last-child {
            margin-top:  ${theme.spacing(2)}px;
          }
        }
      }
    }
  `}
`;

export default StyledGrid;
