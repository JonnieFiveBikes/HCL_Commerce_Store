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
import Typography from "@mui/material/Typography";

const divStyle = {
  padding: "15px 20px",
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}

storiesOf("Style Guide/Typography", module).add("Basic example", () => (
  <div>
    <div style={divStyle}>
      <Typography variant="h1">h1: Roboto Black 72</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="h2">h2: Roboto Light 52/58</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="h3">h3: Roboto Light 32/38</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="h4">h4: Roboto Light 26/34</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="h5">h5: Roboto Regular 16/25</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="subtitle1">subtitle1: Roboto Medium 18/35</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="subtitle2">subtitle2: Roboto Regular 18/35</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="body1">body1: Roboto Regular 14/21</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="body2">body2: Roboto Medium 14/21</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="button">button: Roboto Medium 16</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="caption">caption: Roboto Regular 12</Typography>
    </div>
    <div style={divStyle}>
      <Typography variant="overline">overline: Roboto Medium All Caps 12</Typography>
    </div>
  </div>
));
