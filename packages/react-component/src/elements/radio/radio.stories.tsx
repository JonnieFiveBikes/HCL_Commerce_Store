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
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";

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
