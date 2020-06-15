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
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

const StyledCheckbox = styled(({ ...props }) => <Checkbox {...props} />)`
  ${({ theme }) => `
  `}
`;

export default StyledCheckbox;
