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
import StyledPopover from "./StyledPopover";

const StyledAccountPopover = styled(({ ...props }) => (
  <StyledPopover {...props} />
))`
  ${({ theme }) => `
    .MuiPopover-paper {
      min-width: 300px;
      border: 1px solid ${theme.palette.action.active};
    }

    .MuiListItem-root {
      padding: ${theme.spacing(1)}px 0;
    }

    .MuiListItemIcon-root {
      margin-right: ${theme.spacing(1)}px;
      min-width: 0;

      svg {
        color: ${theme.palette.text.secondary};
        font-size: 20px;
      }
    }

    a {
      display: block;

      &:hover {

        svg {
          color: ${theme.palette.primary.dark};
        }

        span {
          font-weight: 500;
          color: ${theme.palette.primary.dark};
        }
      }
    }
    `}
`;

export default StyledAccountPopover;
