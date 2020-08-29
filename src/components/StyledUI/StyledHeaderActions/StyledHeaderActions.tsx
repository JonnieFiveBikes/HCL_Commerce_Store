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
    padding-right: ${theme.spacing(1.25)}px;

    ${theme.breakpoints.down("sm")} {
      padding: ${theme.spacing(0.5)}px;

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
      margin-right: ${theme.spacing(0.5)}px;
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
