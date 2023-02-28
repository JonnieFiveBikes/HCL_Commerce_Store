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
import CardContent from "@mui/material/CardContent";

const StyledCardContent = styled(({ ...props }) => <CardContent {...props} />)`
  ${({ theme }) => `
    padding: 0;

    &:last-child {
      padding-bottom: 0;
    }
  `}
`;

export { StyledCardContent };
