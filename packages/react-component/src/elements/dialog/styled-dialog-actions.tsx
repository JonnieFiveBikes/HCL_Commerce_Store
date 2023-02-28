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
import DialogActions from "@mui/material/DialogActions";

const StyledDialogActions = styled(({ ...props }) => <DialogActions {...props} />)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)} 0 0;
    justify-content: flex-start;
  `}
`;

export { StyledDialogActions };
