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
import Paper from "@material-ui/core/Paper";

const PaperWrapper = React.forwardRef((props: any, ref: any) => {
  const { classes, elevation, ...other } = props;
  return <Paper {...other} ref={ref} elevation={0} />;
});

const StyledPaper = styled(PaperWrapper)`
  ${({ theme }) => `
    border-radius: ${theme.shape.borderRadius}px;
    box-shadow: ${theme.shadows[1]};
    overflow: hidden;

    &.expanded-menu-paper {
      border-radius: 0px 0px ${theme.shape.borderRadius}px ${
    theme.shape.borderRadius
  }px;
    }

    &.expanded-menu-two-tier-submenu{
      border-radius: 0px 0px ${theme.shape.borderRadius}px ${
    theme.shape.borderRadius
  }px;
      padding:${theme.spacing(2.5)}px ${theme.spacing(1.25)}px;
      width:inherit;
      height:inherit;
      line-height:0%;
      text-align:left;
      line-spacing:${theme.spacing(1.25)}px;
    }

    &.expanded-menu-three-tier-submenu{
      border-radius: 0px 0px ${theme.shape.borderRadius}px ${
    theme.shape.borderRadius
  }px;
    }

    ul {
      display:grid;
    }

    &.mini-cart-container {
        overflow-y: auto;
        max-height: ${window.innerHeight - theme.spacing(12)}px;
    }

    &.scrollable {
      overflow-y: auto;
    }
  }
  `}
`;

export default StyledPaper;
