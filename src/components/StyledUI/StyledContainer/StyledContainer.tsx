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
import Container from "@material-ui/core/Container";

const CustomContainer = (props: any) => <Container maxWidth="lg" {...props} />;

const StyledContainer = styled(CustomContainer)`
  ${({ theme }) => `

    &.expanded-menu {
      width:inherit;
      height:${theme.spacing(5)}px;
      text-align: center;

      &.MuiContainer-root {
        width:inherit;
        margin:0;
        padding:0;
      }
    }

  `}
`;

export default StyledContainer;
