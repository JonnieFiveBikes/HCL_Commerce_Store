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
import CardActions from "@material-ui/core/CardActions";

const StyledCardActions = styled(({ ...props }) => <CardActions {...props} />)`
  ${({ theme }) => `
      &.MuiCardActions-spacing > :not(:first-child) {
        margin-left: ${theme.spacing(2.5)}px
      }
  `}
`;

export default StyledCardActions;
