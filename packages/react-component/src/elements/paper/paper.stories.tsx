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

import { StyledPaper } from "./styled-paper";

storiesOf("Components/Paper", module)
  .add("Basic example", () => <StyledPaper />)
  .add("With elevation", () => <StyledPaper elevation={2} />)
  .add("Outlined", () => <StyledPaper variant="outlined" />)
  .add("Square", () => <StyledPaper square />);
