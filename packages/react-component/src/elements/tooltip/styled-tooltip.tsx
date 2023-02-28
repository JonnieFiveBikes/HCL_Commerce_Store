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
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";

const StyledTooltip = styled((props) => <Tooltip {...props} />)`
  ${({ theme }) => `
  `}
`;

export { StyledTooltip };
