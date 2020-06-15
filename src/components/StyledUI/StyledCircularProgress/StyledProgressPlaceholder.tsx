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
import StyledCircularProgress from ".";

const StyledPlaceholder = styled.div`
  ${({ theme }) => `
    background: ${theme.palette.action.disabledBackground};
    text-align: center;
  `}
`;

const StyledProgressPlaceholder = props => {
  return (
    <StyledPlaceholder {...props}>
      <StyledCircularProgress />
    </StyledPlaceholder>
  );
};

export default StyledProgressPlaceholder;
