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
import Paper from "@material-ui/core/Paper";

const PaperWrapper = function(props: any) {
  const { classes, elevation, ...other } = props;
  return <Paper {...other} elevation={0} />;
};

const StyledPaper = styled(({ ...props }) => <PaperWrapper {...props} />)`
  ${({ theme }) => `
    border-radius: ${theme.shape.borderRadius}px;
    box-shadow: ${theme.shadows[1]};
    overflow: hidden;
  `}
`;

export default StyledPaper;
