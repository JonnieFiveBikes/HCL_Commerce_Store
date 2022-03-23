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
import { render, screen } from "../../../testing/utils/test-utils";
import MiniCart from "../MiniCart";
import MiniCartPopperContent from "../MiniCartPopperContent";
import { initStatesEmptyCart, initStatesOneItem, ORDERITEM_1 } from "../mocks/data";

describe("MiniCart in header", () => {
  test("renders mini cart icon", () => {
    const { queryByTestId, queryByText } = render(
      <MiniCart id="HEADER_MINI_CART_Popper" open={false} handleClick={() => {}} handleClose={() => {}} />,
      {
        initialState: initStatesEmptyCart as any,
      }
    );
    const miniCartButton = queryByTestId("header-mini-cart-button");
    expect(miniCartButton).toBeInTheDocument();
    expect(queryByText("MiniCart.Items")).toBeInTheDocument();
  });
});

describe("MiniCart Popper", () => {
  test("renders empty mini cart", () => {
    const { queryByTestId, queryByText } = render(<MiniCartPopperContent handleClose={() => {}} />, {
      initialState: initStatesEmptyCart as any,
    });
    const miniCartPopper = queryByTestId("mini-cart-popper");
    expect(miniCartPopper).toBeInTheDocument();

    expect(queryByText("MiniCart.Empty")).toBeInTheDocument();
    expect(queryByText("MiniCart.Subtotal")).not.toBeInTheDocument();
  });

  test("renders one item in mini cart", () => {
    const { queryByTestId, queryByText } = render(<MiniCartPopperContent handleClose={() => {}} />, {
      initialState: initStatesOneItem as any,
    });
    const miniCartPopper = queryByTestId("mini-cart-popper");
    expect(miniCartPopper).toBeInTheDocument();

    expect(queryByText("MiniCart.Empty")).not.toBeInTheDocument();
    expect(queryByText("MiniCart.Subtotal")).toBeInTheDocument();

    expect(screen.getByRole("img", { name: ORDERITEM_1.name }));
    expect(queryByText(ORDERITEM_1.name)).toBeInTheDocument();
    expect(queryByText(ORDERITEM_1.partNumber)).toBeInTheDocument();
    expect(queryByText(parseInt(ORDERITEM_1.quantity).toString())).toBeInTheDocument();
  });
});
