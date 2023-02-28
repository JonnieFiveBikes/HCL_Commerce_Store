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
import AppBar from "@mui/material/AppBar";

const AppBarWrapper = (props: any) => <AppBar {...props} />;

const StyledSidebarAppBar = styled(AppBarWrapper)`
  ${({ theme }) => `
    top: auto;
    bottom: 0;
    height: ${theme.spacing(6)};
    line-height: ${theme.spacing(6)};
    padding: 0 ${theme.spacing(2)};
    box-shadow: 0px 0px 6px rgba(0,0,0,0.25);

    a {
      color: white;
      line-height: ${theme.spacing(6)};
      cursor: pointer;

      svg {
        vertical-align: middle;
        margin-right: ${theme.spacing(0.5)};
      }
    }
  `}
`;

export { StyledSidebarAppBar };
