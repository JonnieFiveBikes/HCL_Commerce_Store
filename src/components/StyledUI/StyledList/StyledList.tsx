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
import List from "@material-ui/core/List";
import React from "react";

const StyledList = styled(({ ...props }) => <List {...props} />)`
  ${({ theme }) => `
  `}
`;

export default StyledList;
