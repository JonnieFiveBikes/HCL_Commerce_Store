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
import IconButton from "@mui/material/IconButton";

const StyledIconButton = styled(({ ...props }) => <IconButton {...{ size: "large", ...props }} />)`
  ${({ theme }) => `
    & {
    }
    `}
`;

export { StyledIconButton };
