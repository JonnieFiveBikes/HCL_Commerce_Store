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

const StyledHeaderActions = styled.div`
  ${({ theme }) => `
    color: ${theme.palette.text.secondary};
    height: 100%;

    ${theme.breakpoints.down("sm")} {
      .MuiSvgIcon-root {
        color: ${theme.palette.text.secondary};
        vertical-align: middle;
        font-size: ${theme.spacing(1)}px;
      }
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.secondary};
      vertical-align: middle;
      font-size: ${theme.spacing(3)}px;
    }

    &:hover {
      color: ${theme.palette.primary.main};

      .MuiSvgIcon-root {
        color: ${theme.palette.primary.main};
      }
    }
  `}
`;

export default StyledHeaderActions;
