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
import Switch from "@mui/material/Switch";
import { StyledFormGroup, StyledFormControlLabel } from "../form";
interface CustomSwitchProps {
  checked: boolean;
  setChecked: (event: any) => void;
  label?: string;
  [key: string]: any;
}

const CustomSwitch = React.forwardRef<any, CustomSwitchProps>((props: any, ref: any) => {
  const { checked, setChecked, label, ...other } = props;

  return label ? (
    <StyledFormGroup>
      <StyledFormControlLabel
        control={<Switch checked={checked} onChange={setChecked} {...other} ref={ref} />}
        label={label}
      />
    </StyledFormGroup>
  ) : (
    <Switch checked={checked} onChange={setChecked} {...other} ref={ref} />
  );
});

const StyledSwitch = styled(CustomSwitch)`
  ${({ theme }) => `
     .MuiSwitch-thumb {
        background-color: ${theme.palette.grey[300]};
     }
    `}
`;

export { StyledSwitch };
