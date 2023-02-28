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
import * as React from "react";

import { storiesOf } from "@storybook/react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

storiesOf("Components/Inputs/Radio", module).add("Basic example", () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">What's for lunch?</FormLabel>
    <RadioGroup aria-label="food" name="food">
      <FormControlLabel value="sushi" control={<Radio />} label="Sushi" />
      <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
      <FormControlLabel value="disabled" disabled control={<Radio />} label="(Veggies)" />
    </RadioGroup>
  </FormControl>
));
