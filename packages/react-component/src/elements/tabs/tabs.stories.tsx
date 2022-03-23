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
import React from "react";

import { storiesOf } from "@storybook/react";

import { StyledTabs, ITabs } from "./styled-tabs";

let tabElements: ITabs[] = [
  {
    title: "Tab 1",
    tabContent: <div>Tab 1 Content</div>,
  },
  {
    title: "Tab 2",
    tabContent: <div>Second Tab Content</div>,
  },
  {
    title: "Tab 3",
    tabContent: <h1>Last Tab!</h1>,
  },
];

storiesOf("Components/Tabs", module).add("basic example", function () {
  return <StyledTabs childrenList={tabElements} name="SampleTabs" />;
});
