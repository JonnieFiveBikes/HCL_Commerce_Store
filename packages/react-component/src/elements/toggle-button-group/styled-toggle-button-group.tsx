/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import styled from "@mui/styled-engine-sc";
import { ToggleButtonGroup } from "@mui/material";
import React from "react";

const ComponentWrapper = (props: any) => <ToggleButtonGroup {...props} />;

const StyledToggleButtonGroup = styled(ComponentWrapper)`
  ${({ theme }) => `
   `}
`;

export { StyledToggleButtonGroup };
