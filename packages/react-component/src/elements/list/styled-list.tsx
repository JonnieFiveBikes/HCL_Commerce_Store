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
import List from "@mui/material/List";
import React from "react";

/**
 * Styled component over @material-ui
 * @see https://material-ui.com/api/list/
 */
const StyledList = styled(({ ...props }) => <List {...props} />)`
  ${({ theme }) => `
  `}
`;

export { StyledList };
