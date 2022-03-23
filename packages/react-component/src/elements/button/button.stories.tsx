/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { action } from "@storybook/addon-actions";
import { StyledButton } from "./styled-button";

export default {
  title: "Components/Button",
  argTypes: {
    label: { control: "text" },
    variant: {
      options: ["text", "contained", "outlined"],
      defaultValue: "text",
      table: {
        defaultValue: { summary: "text" },
      },
      control: "select",
    },
    color: {
      options: ["primary", "secondary", ""],
      defaultValue: "primary",
      table: {
        defaultValue: { summary: "primary" },
      },
      control: "select",
    },
  },
};

export const WithText = (args) => {
  const { variant, color, label } = args;
  return (
    <StyledButton testId="storybookbutton" {...{ variant, color }} onClick={action("Default button clicked")}>
      {label}
    </StyledButton>
  );
};
WithText.args = { label: "Hello Storybook" };

export const WithSomeEmoji = (args) => {
  const { variant, color, label } = args;
  return (
    <StyledButton testId="emoji" {...{ variant, color }}>
      <span role="img" aria-label="button with emojis">
        {label}
      </span>
    </StyledButton>
  );
};
WithSomeEmoji.args = { label: "😀 😎 👍 💯" };
