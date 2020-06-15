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
import Radio from "@material-ui/core/Radio";
import React from "react";

const StyledRadio = styled(({ ...props }) => <Radio {...props} />)`
  ${({ theme }) => `
  &.hidden {
    display: none;
  }
  `}
`;

export default StyledRadio;
