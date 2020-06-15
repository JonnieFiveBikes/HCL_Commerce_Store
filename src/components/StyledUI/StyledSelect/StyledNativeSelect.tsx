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
import NativeSelect from "@material-ui/core/NativeSelect";

const StyledNativeSelect = styled(({ ...props }) => (
  <NativeSelect {...props} />
))`
  && {
  }
`;

export default StyledNativeSelect;
