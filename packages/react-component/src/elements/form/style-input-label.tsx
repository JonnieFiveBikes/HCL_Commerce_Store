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
import InputLabel from "@mui/material/InputLabel";

const StyledInputLabel = styled(({ ...props }) => <InputLabel {...props} />)`
  ${({ theme }) => `
  font-weight: 500;
  line-height: 1;

  &.MuiInputLabel-outlined {
    &.MuiInputLabel-shrink{
      transform: none;
    }
    &.Mui-disabled {
      color: ${theme.palette.text.disabled};
    }
    position: relative;
    margin-bottom: ${theme.spacing(1)};
    font-weight: 500;
    color: ${theme.palette.text.secondary};
    z-index: unset;
    pointer-events: unset;

    &.Mui-focused {
      color: ${theme.palette.text.primary};
    }
  }
`}
`;

export { StyledInputLabel };
