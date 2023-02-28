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
import { StyledButton } from "../button/styled-button";

export const StyledB2BLandingPageButton = styled(({ ...props }) => <StyledButton {...props} />)`
  ${({ theme }) => `
    &:hover {
      background: rgba(0, 145, 255, 0.1);

      .MuiTypography-root {
        color: ${theme.palette.text.primary};
      }

      .StyledIcon-root {
        pointer-events: none;
        background-color: ${theme.palette.primary.main};

        .MuiSvgIcon-root {
          color: white;
        }
      }

    }
    &.MuiButton-containedSecondary {
      &:hover {
        background: rgba(0, 145, 255, 0.1);;
      }
    }
  `}
`;
