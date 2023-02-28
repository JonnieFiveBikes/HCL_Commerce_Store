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
import styled from "@mui/styled-engine-sc";
import Stepper from "@mui/material/Stepper";
import React from "react";

const StyledStepper = styled(({ ...props }) => <Stepper {...props} />)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)};
    ${theme.breakpoints.down("md")} {
      padding: ${theme.spacing(1)} ${theme.spacing(2)};
      display: block;

      .MuiStepLabel-root {
        padding: ${theme.spacing(1)} 0;
      }
    }
  `}
`;

export { StyledStepper };
