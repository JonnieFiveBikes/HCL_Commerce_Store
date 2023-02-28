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
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { dimensions } from "../../themes/variables";

const headerHeight = dimensions.header.height.desktop;
const mobileHeaderHeight = dimensions.header.height.mobile;

const StyledSwipeableDrawer = styled(({ ...props }) => <SwipeableDrawer {...props} />)`
  ${({ theme }) => `
  .MuiBackdrop-root {

    ${theme.breakpoints.up("sm")} {
      background: none;
    }
  }

  .MuiDrawer-paperAnchorTop {
    margin-top: ${headerHeight}px;
    border-top: 1px solid ${theme.palette.action.disabledBackground};
    box-shadow: 0px 3px 4px 0px ${theme.palette.text.disabled};
    padding: ${theme.spacing(3)} 0 ${theme.spacing(2)};

    ${theme.breakpoints.down("md")} {
      margin-top: ${mobileHeaderHeight}px;
    }
  }

  .MuiDrawer-paperAnchorLeft {
    width: 75%;
    max-width: 300px;
    padding-top: ${theme.spacing(3)};
  }

  .MuiExpansionPanel-root:before {
    content: none;
  }

  .MuiExpansionPanelSummary-root {
    padding: 0;

    &:not(.level-1) {
      min-height: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
    }
  }

  .MuiExpansionPanelSummary-content {
    margin: 0;

    ${theme.breakpoints.up("sm")} {
      display: block;
    }
  }

  .MuiExpansionPanelDetails-root {
    display: block;
    padding: 0;
  }


  .level-1 {
    ${theme.breakpoints.up("sm")} {
    .MuiExpansionPanelSummary-content {
        border-bottom: 1px solid ${theme.palette.action.disabled};
      }
      .MuiExpansionPanelSummary-expandIcon {
        display: none;
      }
    }
  }

  ${theme.breakpoints.down("md")} {
    .MuiMenuItem-root {
      padding: 0 ${theme.spacing(1)};
      min-height: ${theme.spacing(4)};

      &:hover {
        background: $${theme.palette.action.disabled};
        color: ${theme.palette.primary.dark};
      }
    }

    .MuiGrid-item {
      padding: 0;
    }

    .MuiIconButton-edgeEnd {
      margin-right: 0;
    }

    .MuiIconButton-root {
      padding: ${theme.spacing(1)};
    }
  }
  `}
`;

export { StyledSwipeableDrawer };
