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
import Step from "@material-ui/core/Step";
import React from "react";

const StyledStep = styled(({ ...props }) => <Step {...props} />)`
  ${({ theme }) => `
  `}
`;

export default StyledStep;
