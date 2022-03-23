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
import CircularProgress from "@material-ui/core/CircularProgress";

const CircularProgressWrapper = () => <CircularProgress />;

/**
 * see `CircularProgress` @material-ui/core/CircularProgress
 */
const StyledCircularProgress = styled(({ ...props }) => <CircularProgressWrapper {...props} />)`
  ${({ theme }) => `
  `}
`;
export { StyledCircularProgress };
