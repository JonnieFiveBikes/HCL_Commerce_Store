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
import MenuItem from "@mui/material/MenuItem";

const CustomMenuItem = React.forwardRef((props: any, ref: any) => <MenuItem {...props} ref={ref} />);
/**
 * Styled component on @material-ui
 * @see https://material-ui.com/api/menu-item/
 */
const StyledMenuItem = styled(CustomMenuItem)`
  ${({ theme }) => `
  &.MuiMenuItem-root {
    color: ${theme.palette.text.primary};

    &:hover {
      color: ${theme.palette.primary.main};
      a, span {
        color: ${theme.palette.primary.main};
      }
    }

    &:visited {
      color: ${theme.palette.text.primary};
    }

    &.bordered:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.grey[300]};
    }
  }

  .MuiTouchRipple-root {
    color: ${theme.palette.primary.main};
  }
  `}
`;

export { StyledMenuItem };
