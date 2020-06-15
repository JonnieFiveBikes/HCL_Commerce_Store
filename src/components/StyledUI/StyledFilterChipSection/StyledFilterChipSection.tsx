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

const StyledFilterChipSection = styled.div`
  ${({ theme }) => `
    margin: ${theme.spacing(2)}px 0 ${theme.spacing(4)}px;

    .facet-title {
      margin-right: ${theme.spacing(8)};
    }

    .MuiChip-root {
      margin-right: ${theme.spacing(8)};
    }

    .clear-all {
      color: ${theme.palette.primary.main};
    }
  `}
`;

export default StyledFilterChipSection;
