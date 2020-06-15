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
import MenuItem from "@material-ui/core/MenuItem";

const CustomMenuItem = React.forwardRef((props: any, ref: any) => (
  <MenuItem {...props} ref={ref} />
));

const StyledMenuItem = styled(CustomMenuItem)`
  ${({ theme }) => `
  .MuiMenuItem-root {
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
  }

  .MuiTouchRipple-root {
    color: ${theme.palette.primary.main};
  }
  `}
`;

export default StyledMenuItem;
