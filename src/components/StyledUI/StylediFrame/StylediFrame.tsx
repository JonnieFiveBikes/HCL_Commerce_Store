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

const StylediFrame = styled(
  React.forwardRef<HTMLIFrameElement, any>((props: any, ref: any) => (
    <iframe {...props} ref={ref} />
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
