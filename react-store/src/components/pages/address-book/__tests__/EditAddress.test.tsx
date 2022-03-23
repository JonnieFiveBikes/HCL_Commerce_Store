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
//Test setup libraries
import { render, screen, fireEvent } from "../../../../testing/utils/test-utils";
//UT component
import EditAddress from "../EditAddress";
//Test Data - redux state
import { inistatesWithAddress } from "../mocks/data";
//Foundation libraries
import personContactService from "../../../../_foundation/apis/transaction/personContact.service";

describe("EditAddress UT", () => {
  test("Check EditAddress component is rendered normally", () => {
    // Render Edit Address component by passing intial redux state and addressId
    const { container } = render(<EditAddress match={{ params: { addressId: "3074457354534345997" } }} />, {
      initialState: inistatesWithAddress as any,
    });
    // Check the breadcrums
    // AddressBook - hyperlink
    screen.getByText("AddressBook.Title");
    expect(screen.getByText("AddressBook.Title").closest("a")).toHaveAttribute("href", "/address-book");
    // StyledIcon check -  ">"
    const svgIcon = container.querySelector(".MuiSvgIcon-root");
    expect(svgIcon).toBeInTheDocument();
    // Edit Address text check
    screen.getByText("AddressBook.EditAddress");

    // Address Name
    const addressName = screen.getByLabelText(/AddressForm.Labels.NickName/i);
    // Selected address nick name
    expect(addressName).toHaveAttribute("value", "billing-joe");
    // Address Name is in disabled state
    expect(addressName).toBeDisabled();
    // Address Type - Billing
    const billing = screen.getByLabelText(/AddressForm.Labels.Billing/i);
    expect(billing).toBeChecked();
    // First Name
    const firstName = screen.getByLabelText(/AddressForm.Labels.FirstName/i);
    expect(firstName).toHaveAttribute("value", "John");
    // Last Name
    const lastName = screen.getByLabelText(/AddressForm.Labels.LastName/i);
    expect(lastName).toHaveAttribute("value", "Doe");
    // Address Line 1
    const address1 = screen.getByLabelText(/AddressForm.Labels.Address1/i);
    expect(address1).toHaveAttribute("value", "1 Sesame Street");
    // Address Line 2
    const address2 = screen.getByLabelText(/AddressForm.Labels.Address2/i);
    expect(address2).toHaveAttribute("value", "");
    // City
    const city = screen.getByLabelText(/AddressForm.Labels.City/i);
    expect(city).toHaveAttribute("value", "Schenectady");
    // Country
    const country = screen.getByLabelText(/AddressForm.Labels.Country/i);
    expect(country).toHaveAttribute("value", "US");
    // State
    const state = screen.getByLabelText(/AddressForm.Labels.State/i);
    expect(state).toHaveAttribute("value", "NY");
    // ZipCode
    const zipCode = screen.getByLabelText(/AddressForm.Labels.ZipCode/i);
    expect(zipCode).toHaveAttribute("value", "12345");
    // Phone
    const phone = screen.getByLabelText(/AddressForm.Labels.Phone/i);
    expect(phone).toHaveAttribute("value", "");
    // Email
    const email = screen.getByLabelText(/AddressForm.Labels.Email/i);
    expect(email).toHaveAttribute("value", "billing@mailinator.com");
    // Save Changes button - Enabled state
    const saveChangesButton = screen.getByRole("button", {
      name: "AddressBook.SaveChanges",
    });
    expect(saveChangesButton).toBeEnabled();
    // Cancel button - hyperlink check & Enabled state
    screen.getByRole("button", { name: "AddressBook.Cancel" });
    expect(screen.getByRole("button", { name: "AddressBook.Cancel" })).toBeEnabled();
    expect(screen.getByText("AddressBook.Cancel").closest("a")).toHaveAttribute("href", "/address-book");
  });

  test("Edit Address by clicking Save Changes button", () => {
    // Spy on the updatePersonContact method of personContactService
    const getSpy = jest.spyOn(personContactService, "updatePersonContact");
    // Render Edit Address component by passing intial redux state and addressId
    render(<EditAddress match={{ params: { addressId: "3074457354534345997" } }} />, {
      initialState: inistatesWithAddress as any,
    });
    // Click the Save Changes button
    const saveChangesButton = screen.getByRole("button", {
      name: "AddressBook.SaveChanges",
    });
    fireEvent.click(saveChangesButton);
    // check updatePersonContact method of personContactService have been called for 1 time
    expect(getSpy).toHaveBeenCalledTimes(1);
    // remove Spy on
    getSpy.mockClear();
    getSpy.mockReset();
    getSpy.mockRestore();
  });
});
