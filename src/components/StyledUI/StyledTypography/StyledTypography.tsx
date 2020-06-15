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
import Typography from "@material-ui/core/Typography";
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
      margin: ${theme.spacing(3)}px 0 ${theme.spacing(2)}px;
    }
    &.MuiTypography-gutterBottom {
      margin-bottom: ${theme.spacing(1)}px;
    }
    &.total-discount {
      color: ${theme.palette.text.highlight};
    }
    .strikethrough {
      text-decoration: line-through;
      font-size: 0.9em;
      opacity: 0.8;
      margin-right: ${theme.spacing(1)}px;
    }
  `}
`;

export default StyledTypography;

export const StyledMenuTypography = styled(({ ...props }) => (
  <StyledTypography {...props} />
))`
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
    padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
    
    &.MuiTypography-body2 {
      display: block;
    }

    &:hover {
      color: ${theme.palette.text.secondary};
    }
    
    &:not(:first-child) {
      border-top: 1px solid ${theme.palette.text.disabled};
      padding-top: ${theme.spacing(2)}px;
    }
  }
  `}
`;
