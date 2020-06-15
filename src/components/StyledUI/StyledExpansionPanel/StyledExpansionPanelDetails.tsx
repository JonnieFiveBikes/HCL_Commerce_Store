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
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const StyledExpansionPanelDetails = styled(({ ...props }) => (
  <ExpansionPanelDetails {...props} />
))`
  && {
  }
`;

export default StyledExpansionPanelDetails;
