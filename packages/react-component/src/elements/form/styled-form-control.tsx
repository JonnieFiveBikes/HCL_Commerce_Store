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
import styled from "@mui/styled-engine-sc";
import FormControl from "@mui/material/FormControl";
import React from "react";

const StyledFormControl = styled(({ ...props }) => <FormControl {...props} />)`
  ${({ theme }) => `
    &:not(.flex) {
      display: block;
      margin-bottom: ${theme.spacing(2)};

      &:last-child {
        margin-bottom: 0;
      }
    }
    &.flex {
      display: flex;
      width: 100%;
    }
  `}
`;

export { StyledFormControl };
