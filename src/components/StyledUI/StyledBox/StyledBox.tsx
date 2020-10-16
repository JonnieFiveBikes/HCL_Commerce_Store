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
import Box from "@material-ui/core/Box";

const ComponentWrapper = React.forwardRef((props: any, ref: any) => {
  return <Box {...props} ref={ref} />;
});

const StyledBox = styled(ComponentWrapper)`
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

  `}
`;

export default StyledBox;
