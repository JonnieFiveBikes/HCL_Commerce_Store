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
import styled from "@mui/styled-engine-sc";
import RadioGroup from "@mui/material/RadioGroup";

const StyledRadioGroup = styled(({ ...props }) => <RadioGroup {...props} />)`
  ${({ theme }) => `
    gap: ${theme.spacing(1)};
  `}
`;

export { StyledRadioGroup };
