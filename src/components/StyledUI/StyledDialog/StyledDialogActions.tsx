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
import DialogActions from "@material-ui/core/DialogActions";

const StyledDialogActions = styled(({ ...props }) => (
  <DialogActions {...props} />
))`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px 0 0;
    justify-content: flex-start;
  `}
`;

export default StyledDialogActions;
