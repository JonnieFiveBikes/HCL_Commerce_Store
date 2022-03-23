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
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
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
