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
    .MuiChip-root,
    .clear-all {
      margin-left: ${theme.spacing(1.5)}px;
    }

    .clear-all {
      color: ${theme.palette.primary.main};
    }
  `}
`;

export default StyledFilterChipSection;
