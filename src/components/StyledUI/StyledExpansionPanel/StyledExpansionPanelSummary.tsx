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
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

const StyledExpansionPanelSummary = styled(({ ...props }) => (
  <ExpansionPanelSummary {...props} />
))`
  && {
  }
`;

export default StyledExpansionPanelSummary;
