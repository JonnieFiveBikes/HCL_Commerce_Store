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
import { StyledGrid } from "@hcl-commerce-store-sdk/react-component";

interface AddressListProps {
  cid: string;
  addressList: any[];
  setSelectedAddressId?: Function; //selected address setter
  selectedAddressId?: string;
  actions?: any[];
  type?: boolean;
  page?: string;
}

/**
 * Address list display component
 * displays list of addresses
 * @param props
 */
const AddressList: React.FC<AddressListProps> = (props: any) => {
  const addressList = props.addressList;
  const setSelectedAddressId = props.setSelectedAddressId;
  const selectedAddressId = props.selectedAddressId;
  const actions = props.actions ? props.actions : false;
  const type = props.type ? props.type : false;

  return (
    <StyledGrid container spacing={2} alignItems="stretch" direction="row">
      {addressList &&
        addressList.map((address: any) => (
          <StyledGrid item xs={12} sm={6} md={4} key={address.nickName}>
            <AddressCard
              addressId={address.addressId}
              nickName={address.nickName}
              actions={actions}
              type={type}
              setSelectedAddressId={setSelectedAddressId}
              selectedAddressId={selectedAddressId}
            />
          </StyledGrid>
        ))}
    </StyledGrid>
  );
};

export { AddressList };
