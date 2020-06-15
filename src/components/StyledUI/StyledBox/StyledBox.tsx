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

const ComponentWrapper = (props: any) => <Box {...props} />;

const StyledBox = styled(ComponentWrapper)`
  ${({ theme }) => `
    &.basic-border {
      border-radius: ${theme.shape.borderRadius}px;
      border: 2px solid ${theme.palette.grey[400]};
    }

    &.address-display{
      border-radius: ${theme.shape.borderRadius}px;
      border: 2px solid ${theme.palette.grey[400]};
      background: ${theme.palette.grey[50]};
      height: 100%;

      &:hover {
        border-color: ${theme.palette.primary.dark};
        color: ${theme.palette.primary.dark};
      }  

      &.selected {
        border: 2px solid ${theme.palette.primary.main};
        background: white;
      }
    }
  `}
`;

export default StyledBox;
