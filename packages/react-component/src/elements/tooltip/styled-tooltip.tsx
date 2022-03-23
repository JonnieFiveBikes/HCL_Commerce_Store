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
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import * as React from "react";

const StyledTooltip = styled((props) => <Tooltip {...props} />)`
  ${({ theme }) => `
  `}
`;

export { StyledTooltip };
