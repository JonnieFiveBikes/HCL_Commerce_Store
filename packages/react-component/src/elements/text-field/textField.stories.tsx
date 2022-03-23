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

import { storiesOf } from "@storybook/react";
import { StyledTextField } from "./styled-text-field";

storiesOf("Components/Text Fields", module)
  .add("Basic Text Field", () => <StyledTextField defaultValue="" label="Text Field" />)
  .add("Required Text Field", () => (
    <StyledTextField required id="standard-required" label="Required" defaultValue="Hello World" />
  ))
  .add("Disabled Text Field", () => (
    <StyledTextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
  ))
  .add("Password Text Field", () => (
    <StyledTextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" />
  ))
  .add("Email Text Field with Validation", () => (
    <StyledTextField
      label="Email"
      type="text"
      onChange={(e: any) => {
        console.log("Text Field value", e.target.value);
      }}
      onBlur={(e: any) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
          return true;
        }

        alert("You have entered an invalid email address!");
        return false;
      }}
    />
  ))
  .add("Number", () => (
    <StyledTextField
      id="filled-number"
      label="Number"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
  ))
  .add("Text Field with Helper Text", () => (
    <StyledTextField
      id="standard-helperText"
      label="Helper text"
      defaultValue="Default Value"
      helperText="Some important text"
    />
  ))
  .add("Text Field with Error Styling", () => (
    <StyledTextField error id="filled-error-helper-text" label="Error" defaultValue="" helperText="Incorrect entry." />
  ));
