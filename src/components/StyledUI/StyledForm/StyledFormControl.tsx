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
import FormControl from "@material-ui/core/FormControl";
import React from "react";

const StyledFormControl = styled(({ ...props }) => <FormControl {...props} />)`
  ${({ theme }) => `
    display: block;
    margin-bottom: ${theme.spacing(2)}px;

    &:last-child {
      margin-bottom: 0;
    }
  `}
`;

export default StyledFormControl;
