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
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";

const StyledFormHelperText = styled(({ ...props }) => (
  <FormHelperText {...props} />
))`
  ${({ theme }) => `
  `}
`;

export default StyledFormHelperText;
