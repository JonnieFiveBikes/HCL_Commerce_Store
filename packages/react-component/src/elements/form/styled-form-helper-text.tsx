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
import styled from "@mui/styled-engine-sc";
import FormHelperText from "@mui/material/FormHelperText";
import { StyledTypography } from "../typography";

const StyledFormHelperText = styled(({ ...props }) => (
  <FormHelperText {...props} component={props.component || StyledTypography} />
))`
  ${({ theme }) => {
    return `
      padding: 0;
      margin: 0;
      margin-bottom: ${theme.spacing(0.5)};
    `;
  }}
`;

export { StyledFormHelperText };
