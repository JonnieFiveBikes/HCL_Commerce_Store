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

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { StyledSelect } from "./styled-select";
import { StyledMenuItem } from "../menu-item";

storiesOf("Components/Inputs/Select", module).add("Basic example", () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Counting in tens..</FormLabel>
    <StyledSelect value={10}>
      <StyledMenuItem value={10}>Ten</StyledMenuItem>
      <StyledMenuItem value={20}>Twenty</StyledMenuItem>
      <StyledMenuItem value={30}>Thirty</StyledMenuItem>
    </StyledSelect>
  </FormControl>
));
