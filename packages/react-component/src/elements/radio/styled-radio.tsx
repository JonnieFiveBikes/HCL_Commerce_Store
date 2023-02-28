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
import Radio from "@mui/material/Radio";
import React from "react";

const StyledRadio = styled(({ ...props }) => <Radio {...props} />)`
  ${({ theme }) => `
    padding: 0;

    &.hidden {
      display: none;
    }
  `}
`;

export { StyledRadio };
