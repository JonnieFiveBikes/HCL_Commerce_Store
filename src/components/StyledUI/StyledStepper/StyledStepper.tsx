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
import Stepper from "@material-ui/core/Stepper";
import React from "react";

const StyledStepper = styled(({ ...props }) => <Stepper {...props} />)`
  ${({ theme }) => `
    ${theme.breakpoints.down("sm")} {
      padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
      display: block;

      .MuiStepLabel-root {
        padding: ${theme.spacing(1)}px 0;
      }
    }
  `}
`;

export default StyledStepper;
