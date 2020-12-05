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

const StyledProductImage = styled.img`
  ${({ theme }) => `
  position: relative;

  &.thumbnail {
    padding: ${theme.spacing(0.5)}px;
    border: solid 1px ${theme.palette.grey[300]};
    border-radius: ${theme.spacing(0.25)}px;

    &:hover {
      cursor: pointer;
    }
  
    &.selected {
      border: solid 1px ${theme.palette.primary.main};
    }
  }
  `}
`;

export default StyledProductImage;
