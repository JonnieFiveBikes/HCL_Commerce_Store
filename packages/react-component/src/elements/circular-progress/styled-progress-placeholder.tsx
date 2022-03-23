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
import styled from "styled-components";
import { StyledCircularProgress } from "./styled-circular-progress";

const StyledPlaceholder = styled.div`
  ${({ theme }) => `
    background: ${theme.palette.action.disabledBackground};
    text-align: center;
  `}
`;
/**
 * A @material-ui/core/CircularProgress within a wrapper
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
