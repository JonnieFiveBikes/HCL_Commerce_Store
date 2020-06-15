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
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import StyledButton from "./StyledButton";

const variantOptions = {
  text: "text",
  contained: "contained",
  outlined: "outlined"
};
const colorOptions = {
  primary: "primary",
  secondary: "secondary",
  default: ""
};
storiesOf("Components/Button", module)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <StyledButton
      variant={select("variant", variantOptions, "text")}
      color={select("color", colorOptions, "primary")}
      onClick={action("Default button clicked")}>
      {text("Label", "Hello Storybook")}
    </StyledButton>
  ))
  .add("with some emoji", () => (
    <StyledButton>
      <span role="img" aria-label="button with emojis">
        😀 😎 👍 💯
      </span>
    </StyledButton>
  ));
