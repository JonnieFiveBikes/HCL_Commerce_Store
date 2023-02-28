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
import CircularProgress from "@mui/material/CircularProgress";

const CircularProgressWrapper = () => <CircularProgress />;

/**
 * see `CircularProgress` @mui/material/CircularProgress
 */
const StyledCircularProgress = styled(({ ...props }) => <CircularProgressWrapper {...props} />)`
  ${({ theme }) => `
  `}
`;
export { StyledCircularProgress };
