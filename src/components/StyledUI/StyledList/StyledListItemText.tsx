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
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

const StyledListItemText = styled(({ ...props }) => (
  <ListItemText {...props} />
))`
  ${({ theme }) => `
  `}
`;

export default StyledListItemText;
