/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import styled from "@mui/styled-engine-sc";

export const StyledB2BDetailPanel = styled("div")`
  ${({ theme }) => `
    color: white;
    background: ${theme.palette.grey[100]};
    padding: ${theme.spacing(2)};

    .MuiPaper-root.MuiPaper-rounded {
      box-shadow: none;
      background: transparent;
      padding: 0;
    }
    `}
`;
