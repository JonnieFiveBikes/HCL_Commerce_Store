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

import FormLabel from "@mui/material/FormLabel";

storiesOf("Components/Inputs/FormLabel", module).add("Basic example", () => (
  <FormLabel component="legend">What's for lunch?</FormLabel>
));
