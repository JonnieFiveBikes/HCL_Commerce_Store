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
import React, { useState } from "react";

import { storiesOf } from "@storybook/react";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { StyledCheckbox } from "./styled-checkbox";

const FormControlExample = () => {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (name: any) => (event: any) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<StyledCheckbox checked={gilad} onChange={handleChange("gilad")} value="gilad" />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<StyledCheckbox checked={jason} onChange={handleChange("jason")} value="jason" />}
          label="Jason Killian"
        />
        <FormControlLabel
          control={<StyledCheckbox checked={antoine} onChange={handleChange("antoine")} value="antoine" />}
          label="Antoine Llorca"
        />
      </FormGroup>
      <FormHelperText>Be careful</FormHelperText>
    </FormControl>
  );
};

storiesOf("Components/Inputs/Checkbox", module).add("Basic example", () => <FormControlExample />);
