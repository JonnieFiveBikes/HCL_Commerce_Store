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
import { render, screen } from "../testing/utils/test-utils";
import App from "../App";
import { initStates } from "../mocks/data";

describe("App component", () => {
  test("renders App", () => {
    render(<App />, {
      initialState: initStates as any,
    });
    expect(screen.getByTestId("app-wrapper")).toBeInTheDocument;
  });
});
