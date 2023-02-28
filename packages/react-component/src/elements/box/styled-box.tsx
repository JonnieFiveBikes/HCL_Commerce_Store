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
import Box from "@mui/material/Box";

const ComponentWrapper = React.forwardRef((props: any, ref: any) => {
  return <Box {...props} ref={ref} />;
});

export const StyledBox = styled(ComponentWrapper)`
  ${({ theme }) => `
    &.basic-border {
      border-radius: ${theme.shape.borderRadius}px;
      border: 2px solid ${theme.palette.grey[400]};
    }
    &.expanded-menu-hover{
      background-color: ${theme.palette.primary.dark};
      cursor: pointer;
    }
    &.accordion-show-expanded {
      display: none;
    }
    &.accordion-show-summary {
      display: block;
    }
    .Mui-expanded > &{
      .accordion-show-expanded {
        display: block;
      }
      .accordion-show-summary {
        display: none;
      }
    }

    &.horizontal-scroll {
      overflow-x: auto;
      max-width: calc(${window.innerWidth}px -${theme.spacing(3)});
    }
  `}
`;
