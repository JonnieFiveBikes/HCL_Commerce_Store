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

const StyledMiniCart = styled.div`
  ${({ theme }) => `
    color: ${theme.palette.text.secondary};
    border: 1px solid ${theme.palette.action.active};
    border-radius: 20px;
    padding: 10px;
    display: inline;
    margin-right: ${theme.spacing(2)}px;

    ${theme.breakpoints.down("sm")} {
      margin-right: ${theme.spacing(1)}px;
      padding: 8px;
    }

    .MuiSvgIcon-root {
      color: ${theme.palette.text.secondary};
      vertical-align: middle;
      font-size: 1rem;
      margin-right: 4px;
    }

    &:hover {
      color: ${theme.palette.primary.main};
      border-color: ${theme.palette.primary.main};

      .MuiSvgIcon-root {
        color: ${theme.palette.primary.main};
      }
    }
  `}
`;

export default StyledMiniCart;
