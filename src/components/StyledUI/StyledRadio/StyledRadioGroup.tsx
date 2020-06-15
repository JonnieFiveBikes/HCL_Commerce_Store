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
import RadioGroup from "@material-ui/core/RadioGroup";

const StyledRadioGroup = styled(({ ...props }) => <RadioGroup {...props} />)`
  ${({ theme }) => `
  `}
`;

export default StyledRadioGroup;
