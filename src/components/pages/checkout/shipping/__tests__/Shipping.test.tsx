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
import {
  render,
  waitForElement,
  fireEvent,
} from "../../../../../testing/utils/test-utils";
import Shipping from "../Shipping";
import { initStatesNoAddresses, inistatesWithAddress } from "../mocks/data";

describe("Checkout shipping", () => {
  test("renders shipping without addresses", async () => {
    const { queryByTestId, queryByText } = render(<Shipping />, {
      initialState: initStatesNoAddresses as any,
    });
    expect(queryByTestId("checkout-new-address-button")).toBeInTheDocument();
    expect(
      queryByText("Shipping.Msgs.UseSavedAddress")
    ).not.toBeInTheDocument();
    const shipmethodSelect = await waitForElement(() =>
      queryByTestId("shipping-method-select")
    ).catch((e) => null);
    expect(shipmethodSelect).toBeInTheDocument();
    //continue button disabled, since no address.
    const continueButton = await waitForElement(() =>
      queryByTestId("shipping-can-continue")
    ).catch((e) => null);
    expect(continueButton).toBeDisabled();
  });

  test("click create new address", async () => {
    const { queryByTestId } = render(<Shipping />, {
      initialState: initStatesNoAddresses as any,
    });
    const newAddressButton = queryByTestId("checkout-new-address-button");
    expect(newAddressButton).toBeInTheDocument();
    fireEvent.click(newAddressButton as HTMLButtonElement);
    //address form show up
    const newAddressForm = await waitForElement(() =>
      queryByTestId("checkout-address-form")
    ).catch((e) => null);
    expect(newAddressForm).toBeInTheDocument();

    //wait to make sure that element disappear.
    const newAddressButton2 = await waitForElement(() => {
      queryByTestId("checkout-new-address-button");
    }).catch((e) => null);
    expect(newAddressButton2).not.toBeInTheDocument();
  });

  test("renders shipping with list of addresses", async () => {
    const { queryByTestId } = render(<Shipping />, {
      initialState: inistatesWithAddress as any,
    });
    //continue button enabled, since address is preselected.
    const continueButton = await waitForElement(() =>
      queryByTestId("shipping-can-continue")
    ).catch((e) => null);
    expect(continueButton).toBeEnabled();
  });
});
