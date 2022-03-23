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
import userEvent from "@testing-library/user-event";
//Test setup libraries
import { render, screen, fireEvent } from "../../../../testing/utils/test-utils";
// UT component
import AddAddress from "../AddAddress";
//Foundation libraries
import personContactService from "../../../../_foundation/apis/transaction/personContact.service";

describe("AddAddress UT", () => {
  test("Check AddAddress component is rendered normally", () => {
    // Render Add Address component
    const { container } = render(<AddAddress />);

    // Check the breadcrums
    // AddressBook - hyperlink
    screen.getByText("AddressBook.Title");
    expect(screen.getByText("AddressBook.Title").closest("a")).toHaveAttribute("href", "/address-book");
    // StyledIcon check -  ">"
    const svgIcon = container.querySelector(".MuiSvgIcon-root");
    expect(svgIcon).toBeInTheDocument();
    // Add a new adress text check
    screen.getByText("AddressBook.AddrMsg");
    // Cancel button
    screen.getByRole("button", { name: "AddressBook.Cancel" });
    expect(screen.getByText("AddressBook.Cancel").closest("a")).toHaveAttribute("href", "/address-book");
    expect(screen.getByRole("button", { name: "AddressBook.Cancel" })).toBeEnabled;
    // Create Address button - disabled state
    screen.getByRole("button", { name: "AddressBook.CreateAddress" });
    expect(screen.getByRole("button", { name: "AddressBook.CreateAddress" })).toBeDisabled();
  });

  test("Addresss name validation check", () => {
    // Render Add Address component
    render(<AddAddress />);
    // Address Name - Invalid address name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    userEvent.type(addressName, "Tokyo?Address");
    // First Name
    const firstName = screen.getByLabelText(/AddressForm.Labels.FirstName/i);
    userEvent.type(firstName, "John");
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    userEvent.type(lastName, "Matsumoto");
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    userEvent.type(address1, "Motosumiyoshi");
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    userEvent.type(address2, "Ida");
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    userEvent.type(city, "Kawasaki");
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    userEvent.type(country, "Japan");
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    userEvent.type(state, "Kanagawa");
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    userEvent.type(zipCode, "211015");
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    userEvent.type(phone, "123-456-7894");
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    userEvent.type(email, "john@mail.com");
    // Address Type - Billing type
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    fireEvent.click(billing);
    // Create Address button - disabled state
    const createAddress = screen.getByRole("button", {
      name: "AddressBook.CreateAddress",
    });
    expect(createAddress).toBeDisabled();
  });

  test("Mandatory input fields validation - not entering firstName", () => {
    // Render Add Address component
    render(<AddAddress />);
    // Address Name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    userEvent.type(addressName, "Tokyo Address");
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    userEvent.type(lastName, "Matsumoto");
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    userEvent.type(address1, "Motosumiyoshi");
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    userEvent.type(address2, "Ida");
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    userEvent.type(city, "Kawasaki");
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    userEvent.type(country, "Japan");
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    userEvent.type(state, "Kanagawa");
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    userEvent.type(zipCode, "211015");
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    userEvent.type(phone, "123-456-7894");
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    userEvent.type(email, "john@mail.com");
    // Address Type - Billing type
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    fireEvent.click(billing);
    // Create Address button - disabled state
    const createAddress = screen.getByRole("button", {
      name: "AddressBook.CreateAddress",
    });
    expect(createAddress).toBeDisabled();
  });

  test("Add a new Address by entering valid address details", () => {
    // Spy on the addPersonContact method of personContactService
    const getSpy = jest.spyOn(personContactService, "addPersonContact");
    // Render Add Address component
    render(<AddAddress />);
    // Address Name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    userEvent.type(addressName, "Tokyo Address");
    // First Name
    const firstName = screen.getByLabelText(/AddressForm.Labels.FirstName/i);
    userEvent.type(firstName, "John");
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    userEvent.type(lastName, "Matsumoto");
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    userEvent.type(address1, "Motosumiyoshi");
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    userEvent.type(address2, "Ida");
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    userEvent.type(city, "Kawasaki");
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    userEvent.type(country, "Japan");
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    userEvent.type(state, "Kanagawa");
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    userEvent.type(zipCode, "211015");
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    userEvent.type(phone, "123-456-7894");
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    userEvent.type(email, "john@mail.com");
    // Address Type - Billing type
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    fireEvent.click(billing);
    // Create Address button - Enabled state
    const createAddress = screen.getByRole("button", {
      name: "AddressBook.CreateAddress",
    });
    expect(createAddress).toBeEnabled();
    // Click the Create Address button
    fireEvent.click(createAddress);
    // check addPersonContact method of personContactService have been called for 1 time
    expect(getSpy).toHaveBeenCalledTimes(1);
    // remove Spy on
    getSpy.mockClear();
    getSpy.mockReset();
    getSpy.mockRestore();
  });
});
