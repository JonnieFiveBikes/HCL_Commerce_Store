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
import { withA11y } from "@storybook/addon-a11y";

import SignIn from "./SignIn";

storiesOf("Pages. Sign In", module)
  .addDecorator(withA11y as any)
  .add("Sign In", () => <SignIn />);
