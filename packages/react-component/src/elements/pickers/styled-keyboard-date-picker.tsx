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
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

/**
 * see `KeyboardDatePicker` @material-ui/pickers
 */
const StyledKeyboardDatePicker = styled(({ ...props }) => <KeyboardDatePicker {...props} />)`
  ${({ theme }) => `
  `}
`;

export { StyledKeyboardDatePicker };
