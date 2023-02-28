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
import Pagination from "@mui/material/Pagination";
import { dimensions } from "../../themes/variables";

const buttonSize = dimensions.pagination.button;

/**
 * Styled component on @material-ui
 * @see https://material-ui.com/api/pagination/
 */
const StyledPagination = styled(({ ...props }) => <Pagination {...props} />)`
  ${({ theme }) => `
  margin: 20px 0;

  ul {
    li:first-child,
    li:last-child {
      button {
        border: 0;
      }
    }
  }

  .MuiMenuItem-root {
    color: ${theme.palette.text.primary};
  }

  .MuiPaginationItem-circulared {
    border: 2px solid ${theme.palette.action.disabled};
    height: ${buttonSize}px;
    width: ${buttonSize}px;

    &.Mui-selected {
      border: 0;
      background: ${theme.palette.primary.main};
      color: white;
    }
  }
  `}
`;

export { StyledPagination };
