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
import DialogContent from "@mui/material/DialogContent";

const StyledDialogContent = styled(({ ...props }) => <DialogContent {...props} />)`
  ${({ theme }) => `
    border-top: 2px solid ${theme.palette.primary.dark};
    padding: ${theme.spacing(2)};
  `}
`;

export { StyledDialogContent };
