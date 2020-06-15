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
//Custom libraries
import { AddressCard } from "../address-card";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledBox,
  StyledRadio,
  StyledRadioGroup,
  StyledFormControlLabel,
} from "../../StyledUI";

interface AddressListProps {
  cid: string;
  addressList: any[];
  setSelectedAddressId: any; //selected address setter
  selectedAddressId: string;
}

/**
 * Address list display component
 * displays list of addresses
 * @param props
 */
const AddressList: React.FC<AddressListProps> = (props: any) => {
  const cid = props.cid;
  const addressList = props.addressList;
  const setSelectedAddressId = props.setSelectedAddressId;
  const selectedAddressId = props.selectedAddressId;
  return (
    <StyledRadioGroup
      name={`${cid}-address-list`}
      value={selectedAddressId}
      onChange={(event) => setSelectedAddressId(event.target.value)}>
      <StyledGrid container spacing={2} alignItems="stretch" direction="row">
        {addressList &&
          addressList.map((address: any, index: number) => (
            <StyledGrid item xs={12} md={6} key={address.addressId}>
              <StyledBox
                border={1}
                className={
                  selectedAddressId === address.addressId
                    ? "selected address-display"
                    : "address-display"
                }>
                <StyledFormControlLabel
                  value={address.addressId}
                  control={<StyledRadio className="hidden" />}
                  className="address-display"
                  label={<AddressCard addressId={address.addressId} />}
                />
              </StyledBox>
            </StyledGrid>
          ))}
      </StyledGrid>
    </StyledRadioGroup>
  );
};

export { AddressList };
