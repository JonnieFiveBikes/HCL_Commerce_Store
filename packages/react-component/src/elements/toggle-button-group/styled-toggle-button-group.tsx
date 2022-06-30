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
import styled from "styled-components";
import { ToggleButtonGroup } from "@material-ui/lab";
import React from "react";

const ComponentWrapper = (props: any) => <ToggleButtonGroup {...props} />;

const StyledToggleButtonGroup = styled(ComponentWrapper)`
  ${({ theme }) => `
   `}
`;

export { StyledToggleButtonGroup };
