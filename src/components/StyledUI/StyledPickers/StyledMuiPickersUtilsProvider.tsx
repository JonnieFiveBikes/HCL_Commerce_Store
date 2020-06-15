/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
import styled from "styled-components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";

const StyledMuiPickersUtilsProvider = styled(({ ...props }) => (
  <MuiPickersUtilsProvider {...props} />
))`
  ${({ theme }) => `
  `}
`;

export default StyledMuiPickersUtilsProvider;
