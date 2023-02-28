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

const StylediFrame = styled(
  React.forwardRef<HTMLIFrameElement, any>(({ title, ...props }: any, ref: any) => (
    <iframe title={title} {...props} ref={ref} />
  ))
)`
  ${({ theme }) => `
  &.no-border {
    border: none
  }
  min-height: 850px;
`}
`;

export { StylediFrame };
