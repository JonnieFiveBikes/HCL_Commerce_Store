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
import CardActions from "@mui/material/CardActions";

const StyledCardActions = styled(({ ...props }) => <CardActions {...props} />)`
  ${({ theme }) => `
      &.MuiCardActions-spacing > :not(:first-child) {
        margin-left: ${theme.spacing(2.5)};
      }
  `}
`;

export { StyledCardActions };
