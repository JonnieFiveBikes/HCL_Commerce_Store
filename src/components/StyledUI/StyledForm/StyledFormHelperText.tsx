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
import { StyledTypography } from "..";

const StyledFormHelperText = styled(({ ...props }) => (
  <FormHelperText {...props} component={props.component || StyledTypography} />
))`
  ${({ theme }) => {
    return `
      padding: 0;
      margin: 0;
      margin-bottom: ${theme.spacing(0.5)}px;
    `;
  }}
`;

export default StyledFormHelperText;
