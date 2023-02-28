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

const StyledFilterChipSection = styled("div")`
  ${({ theme }) => `
    .MuiChip-root,
    .clear-all {
      margin-left: ${theme.spacing(1.5)};
    }

    .clear-all {
      color: ${theme.palette.primary.main};
    }
  `}
`;

export { StyledFilterChipSection };
