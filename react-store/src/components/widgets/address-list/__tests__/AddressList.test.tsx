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
import { render, screen } from "../../../../testing/utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { AddressList } from "../";
import { cidIValue, addressList } from "../mocks/data";

describe("Address List", () => {
  test("renders empty address list when no addresses", () => {
    // render the address list  component, and get it as a container. no address list data
    const { container } = render(<AddressList cid={cidIValue} addressList={[]} />);

    //check if the base elements are created, grid container in line 41 of AddressList.tsx
    const grid = container.querySelector(".MuiGrid-container");

    //it has to exist
    expect(grid).toBeInTheDocument();

    //check for a grid item. line 44 in AddressList.tsx. catch the null because its not going to show up.
    const item = container.querySelector(".MuiGrid-item");

    //it should definitely not exist
    expect(item).not.toBeInTheDocument();
  });

  test("renders filled address list", () => {
    // render address list component with two addresses in the list. get it back as a container
    const { container } = render(<AddressList cid={cidIValue} addressList={addressList} />);

    //check that the grid container line 41 in address list tsx exists
    const grid = container.querySelector(".MuiGrid-container");
    expect(grid).toBeInTheDocument();

    //check that grid item line 44 in address list tsx exists. it will this time.
    const item = container.querySelector(".MuiGrid-item");
    expect(item).toBeInTheDocument();

    //the screen value is able to read the rendered component and query text from it. there should be
    //two address cards with the address names billing joe and shipping jane.
    expect(screen.queryByText("billing-joe")).toBeDefined();
    expect(screen.queryByText("shipping-jane")).toBeDefined();
  });
});
