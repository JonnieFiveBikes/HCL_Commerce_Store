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

export const StyledHeaderActions = styled("div")`
  ${({ theme }) => `
    color: ${theme.palette.text.secondary};
    height: 100%;

    ${theme.breakpoints.down("md")} {
      .MuiSvgIcon-root {
        color: ${theme.palette.text.secondary};
        vertical-align: middle;
        font-size: ${theme.spacing(1)};
      }
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.secondary};
      vertical-align: middle;
      font-size: ${theme.spacing(3)};
    }

    &:hover {
      color: ${theme.palette.primary.main};
      .MuiSvgIcon-root {
        color: ${theme.palette.primary.main};
      }
    }
  `}
`;
