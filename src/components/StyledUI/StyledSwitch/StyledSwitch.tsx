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
import Switch from "@material-ui/core/Switch";
import { StyledFormGroup, StyledFormControlLabel } from "../index";

interface CustomSwitchProps {
  checked: boolean;
  setChecked: Function;
  label?: string;
  [key: string]: any;
}

const CustomSwitch = React.forwardRef<any, CustomSwitchProps>(
  (props: any, ref: any) => {
    const { checked, setChecked, label } = props;

    return label ? (
      <StyledFormGroup>
        <StyledFormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={setChecked}
              {...props}
              ref={ref}
            />
          }
          label={label}
        />
      </StyledFormGroup>
    ) : (
      <Switch checked={checked} onChange={setChecked} {...props} ref={ref} />
    );
  }
);

const StyledSwitch = styled(CustomSwitch)`
  ${({ theme }) => `
     .MuiSwitch-thumb {
        background-color: ${theme.palette.grey[300]};
     }
    `}
`;

export default StyledSwitch;
