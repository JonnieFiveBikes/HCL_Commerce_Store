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
import IconButton from "@material-ui/core/IconButton";

const StyledIconButton = styled(({ ...props }) => <IconButton {...props} />)`
  ${({ theme }) => `
    & {
    }
    `}
`;

export default StyledIconButton;
