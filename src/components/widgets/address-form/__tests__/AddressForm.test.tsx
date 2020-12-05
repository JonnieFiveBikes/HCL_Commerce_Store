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
//Standard libraries
import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
//Test setup libraries
import {
  render,
  screen,
  fireEvent,
} from "../../../../testing/utils/test-utils";
// UT component
import { AddressForm } from "../";
// Test Data
import {
  useInitFormDataState,
  useEditAddressFormDataState,
  NEW_ADDRESS_CID,
  EDIT_ADDRESS_CID,
} from "../mocks/AddressFormTestData";
//Custom libraries
import { ADDRESS_BOOK, EMPTY_STRING } from "../../../../constants/common";

describe("AddressForm UT", () => {
  test("Check AddressForm component is rendered normally", () => {
    // Creating custom hook to pass as props to AddressForm component
    const { result } = renderHook(() => useInitFormDataState());

    // Render AddressForm component
    render(
      <AddressForm
        cid={NEW_ADDRESS_CID}
        setAddressFormData={result.current.setNewAddressFormData}
        addressFormData={result.current.newAddressFormData}
        page={ADDRESS_BOOK}
      />
    );

    // Check all the form field's label name
    screen.getByText("AddressForm.Labels.NickName");
    screen.getByText("AddressForm.Labels.AddressType");
    screen.getByText("AddressForm.Labels.FirstName");
    screen.getByText("AddressForm.Labels.LastName");
    screen.getByText("AddressForm.Labels.Address1");
    screen.getByText("AddressForm.Labels.City");
    screen.getByText("AddressForm.Labels.Country");
    screen.getByText("AddressForm.Labels.State");
    screen.getByText("AddressForm.Labels.ZipCode");
    screen.getByText("AddressForm.Labels.Email");
    screen.getByRole("textbox", { name: /AddressForm.Labels.Phone/i });
    screen.getByRole("textbox", { name: /AddressForm.Labels.Address2/i });
  });

  test("Check input form field's value for create address", () => {
    // Creating custom hook to pass as props to AddressForm component
    const { result } = renderHook(() => useInitFormDataState());
    // Render AddressForm component
    render(
      <AddressForm
        cid={NEW_ADDRESS_CID}
        setAddressFormData={result.current.setNewAddressFormData}
        addressFormData={result.current.newAddressFormData}
        page={ADDRESS_BOOK}
      />
    );

    // Check the initial value of all form fields after loading
    // Address Name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    expect(addressName).toHaveAttribute("value", EMPTY_STRING);
    // Address Type - Shipping checked
    const Shipping = screen.getByLabelText(/^AddressForm.Labels.Shipping$/i);
    expect(Shipping).toBeChecked();
    // Address Type - Billing not checked
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    expect(billing).not.toBeChecked();
    // First Name
    const firstName = screen.getByLabelText(/AddressForm.Labels.FirstName/i);
    expect(firstName).toHaveAttribute("value", EMPTY_STRING);
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    expect(lastName).toHaveAttribute("value", EMPTY_STRING);
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    expect(address1).toHaveAttribute("value", EMPTY_STRING);
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    expect(address2).toHaveAttribute("value", EMPTY_STRING);
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    expect(city).toHaveAttribute("value", EMPTY_STRING);
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    expect(country).toHaveAttribute("value", EMPTY_STRING);
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    expect(state).toHaveAttribute("value", EMPTY_STRING);
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    expect(zipCode).toHaveAttribute("value", EMPTY_STRING);
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    expect(phone).toHaveAttribute("value", EMPTY_STRING);
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    expect(email).toHaveAttribute("value", EMPTY_STRING);
  });

  test("Enter new address details and check the input form field's react hook state value", async () => {
    // Creating custom hook to pass as props to AddressForm component
    const { result } = renderHook(() => useInitFormDataState());

    // Render AddressForm component
    render(
      <AddressForm
        cid={NEW_ADDRESS_CID}
        setAddressFormData={result.current.setNewAddressFormData}
        addressFormData={result.current.newAddressFormData}
        page={ADDRESS_BOOK}
      />
    );

    // Enter new address details after page loading and check the input form field's react hook state value
    // Address Name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    await act(() => userEvent.type(addressName, "Tokyo Address"));
    expect(result.current.newAddressFormData.nickName).toBe("Tokyo Address");
    // First Name
    const firstName = screen.getByLabelText(/AddressForm.Labels.FirstName/i);
    await act(() => userEvent.type(firstName, "John"));
    expect(result.current.newAddressFormData.firstName).toBe("John");
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    await act(() => userEvent.type(lastName, "Matsumoto"));
    expect(result.current.newAddressFormData.lastName).toBe("Matsumoto");
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    await act(() => userEvent.type(address1, "Motosumiyoshi"));
    expect(result.current.newAddressFormData.addressLine1).toBe(
      "Motosumiyoshi"
    );
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    await act(() => userEvent.type(address2, "Ida"));
    expect(result.current.newAddressFormData.addressLine2).toBe("Ida");
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    await act(() => userEvent.type(city, "Kawasaki"));
    expect(result.current.newAddressFormData.city).toBe("Kawasaki");
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    await act(() => userEvent.type(country, "Japan"));
    expect(result.current.newAddressFormData.country).toBe("Japan");
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    await act(() => userEvent.type(state, "Kanagawa"));
    expect(result.current.newAddressFormData.state).toBe("Kanagawa");
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    await act(() => userEvent.type(zipCode, "211015"));
    expect(result.current.newAddressFormData.zipCode).toBe("211015");
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    await act(() => userEvent.type(phone, "123-456-7894"));
    expect(result.current.newAddressFormData.phone1).toBe("123-456-7894");
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    await act(() => userEvent.type(email, "john@mail.com"));
    expect(result.current.newAddressFormData.email1).toBe("john@mail.com");
    // AddressType - Select Billing type
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    act(() => {
      fireEvent.click(billing);
    });
    expect(result.current.newAddressFormData.addressType).toBe("Billing");
  });

  test("Check input form field's value for edit address", () => {
    // Creating custom hook to pass as props to AddressForm component
    const { result } = renderHook(() => useEditAddressFormDataState());
    // Render AddressForm component
    render(
      <AddressForm
        cid={EDIT_ADDRESS_CID}
        setAddressFormData={result.current.setEditAddressFormData}
        addressFormData={result.current.editAddressFormData}
        page={ADDRESS_BOOK}
      />
    );
    // Check the edit address value of all form fields after page loading
    // Address Name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    expect(addressName).toHaveAttribute("value", "John Tokyo Address");
    // Address Type - Shpping And Billing - checked
    const ShippingAndBilling = screen.getByLabelText(
      /AddressForm.Labels.ShippingAndBilling/i
    );
    expect(ShippingAndBilling).toBeChecked();
    // Address Type - Billing - not checked
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    expect(billing).not.toBeChecked();
    // First Name
    const firstName = screen.getByLabelText(/AddressForm.Labels.FirstName/i);
    expect(firstName).toHaveAttribute("value", "John");
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    expect(lastName).toHaveAttribute("value", "Matsumoto");
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    expect(address1).toHaveAttribute("value", "Motosumiyoshi");
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    expect(address2).toHaveAttribute("value", "Ida");
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    expect(city).toHaveAttribute("value", "Kawasaki");
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    expect(country).toHaveAttribute("value", "Japan");
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    expect(state).toHaveAttribute("value", "Kanagawa");
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    expect(zipCode).toHaveAttribute("value", "211025");
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    expect(phone).toHaveAttribute("value", "123-456-7891");
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    expect(email).toHaveAttribute("value", "john@mail.com");
  });
});
