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
import CardContent from "@material-ui/core/CardContent";

const StyledCardContent = styled(({ ...props }) => <CardContent {...props} />)`
  padding: 0;
`;

export default StyledCardContent;
