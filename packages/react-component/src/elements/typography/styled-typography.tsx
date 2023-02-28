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
import Typography from "@mui/material/Typography";
import React from "react";

const StyledTypography = styled(({ ...rest }) => <Typography {...rest} />)`
  ${({ theme }) => `

  li, a {
      text-decoration: none;
    }
    a {
      color: ${theme.palette.primary.main};

      &:hover {
        color: ${theme.palette.primary.dark};
        font-weight: 500;
      }

      &:visited {
        color: ${theme.palette.primary.main};
      }
    }
    &.accounts-links-title {
      margin: ${theme.spacing(3)} 0 ${theme.spacing(2)};
    }
    &.MuiTypography-gutterBottom {
      margin-bottom: ${theme.spacing(1)};
    }
    &.total-discount {
      color: ${theme.palette.text.highlight};
    }
    &.selected {
      color: ${theme.palette.primary.main};
    }
    .strikethrough {
      text-decoration: line-through;
      font-size: 0.9em;
      opacity: 0.8;
      margin-right: ${theme.spacing(1)};
    }

    &.expanded-menu-bold {
      font-size: 1.15em;
      font-weight: bold;
      margin-bottom: ${theme.spacing(1)};
    }

    &.expanded-menu-sub-links {
      margin-bottom: ${theme.spacing(0.75)};
      margin-top: ${theme.spacing(0.75)};
    }

    &.expanded-menu-text {
      color: ${theme.palette.text.expandedMenu};
      font-size: 1.15em;
      &.MuiTypography-body2 {
        font-size: 12px;
      }
    }
    &.wrapText {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
    }

    &.address-card-width {
      width: ${theme.spacing(30)};
      padding-right: ${theme.spacing(1)};
    }

    &.error {
      color: ${theme.palette.text.alert};
    }

    // checkout review shipment group summary heading
    &.shipment-group-heading{
      font-weight: bold
    }
  `}
`;

export { StyledTypography };

export const StyledMenuTypography = styled(({ ...props }) => <StyledTypography {...props} />)`
  ${({ theme }) => `
  color: ${theme.palette.text.primary};
  text-decoration: none;

  &:hover {
    color: ${theme.palette.primary.main};
  }

  li {
    color: ${theme.palette.text.primary};

    &:hover {
      color: ${theme.palette.primary.main};

      a, span {
        color: ${theme.palette.primary.main};
      }
    }
  }

  a {
    color: ${theme.palette.text.primary};

    &:hover {
      color: ${theme.palette.primary.main};
    }

    &:visited {
      color: ${theme.palette.text.primary};
    }
  }

  &.searchBar-resultsCategory {
    color: ${theme.palette.text.secondary};
    padding: ${theme.spacing(1)} ${theme.spacing(2)};

    &.MuiTypography-body2 {
      display: block;
    }

    &:hover {
      color: ${theme.palette.text.secondary};
    }

    &:not(:first-child) {
      border-top: 1px solid ${theme.palette.text.disabled};
      padding-top: ${theme.spacing(2)};
    }
  }
  `}
`;
