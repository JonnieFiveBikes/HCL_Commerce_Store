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
import styled from "@mui/styled-engine-sc";
import { StyledCircularProgress } from "./styled-circular-progress";

const StyledPlaceholder = styled("div")`
  ${({ theme }) => `
    background: ${theme.palette.action.disabledBackground};
    text-align: center;
  `}
`;
/**
 * A @mui/material/CircularProgress within a wrapper
 * @param props
 * @returns
 */
const StyledProgressPlaceholder = (props: any) => {
  return (
    <StyledPlaceholder {...props}>
      <StyledCircularProgress />
    </StyledPlaceholder>
  );
};

export { StyledProgressPlaceholder };
