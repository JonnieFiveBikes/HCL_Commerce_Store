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
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
//UI
import { StyledBox, StyledTypography } from "../../StyledUI";

interface AddressCardProps {
  addressId: any;
}

/**
 * Address card display component
 * displays the details of a single address
 * @param props
 */
const AddressCard: React.FC<AddressCardProps> = (props: any) => {
  const addressId = props.addressId ? props.addressId : "";

  const addressDetails = useSelector(addressDetailsSelector);
  const addressData = getAddress();

  const dispatch = useDispatch();
  const mySite: any = useSite();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite && addressDetails == null) {
      let payload = {
        ...payloadBase,
      };
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
    }
  }, [mySite]);

  function getAddress() {
    let finalAddressData: any = {};
    if (addressDetails && addressId !== "") {
      if (addressDetails.addressId === addressId) {
        finalAddressData = addressDetails;
      } else {
        const contactMap = addressDetails.contactMap;
        if (contactMap && contactMap[addressId]) {
          finalAddressData = contactMap[addressId];
        }
      }

      let fullNameString: string = "";
      if (
        finalAddressData.firstName !== undefined &&
        finalAddressData.firstName !== ""
      ) {
        fullNameString = finalAddressData.firstName;
      }
      if (
        finalAddressData.lastName !== undefined &&
        finalAddressData.lastName !== ""
      ) {
        if (fullNameString !== "") {
          fullNameString += " ";
        }
        fullNameString += finalAddressData.lastName;
        finalAddressData = {
          ...finalAddressData,
          fullNameString: fullNameString,
        };
      }

      let cityStateZipList: string[] = [];
      if (finalAddressData.city !== undefined && finalAddressData.city !== "") {
        cityStateZipList.push(finalAddressData.city);
      }
      if (
        finalAddressData.state !== undefined &&
        finalAddressData.state !== ""
      ) {
        cityStateZipList.push(finalAddressData.state);
      }
      if (
        finalAddressData.zipCode !== undefined &&
        finalAddressData.zipCode !== ""
      ) {
        cityStateZipList.push(finalAddressData.zipCode);
      }
      if (cityStateZipList.length > 0) {
        const cityStateZipString = cityStateZipList.join(", ");
        finalAddressData = {
          ...finalAddressData,
          cityStateZipString: cityStateZipString,
        };
      }
    }
    return finalAddressData;
  }

  return (
    <>
      {addressData.nickName && (
        <StyledTypography variant="subtitle2" component="div" gutterBottom>
          {addressData.nickName}
        </StyledTypography>
      )}

      {addressData.fullNameString && (
        <StyledTypography variant="body2">
          {addressData.fullNameString}
        </StyledTypography>
      )}

      {addressData.addressLine &&
        addressData.addressLine.map((line: string, index: number) => (
          <Fragment key={index}>
            {line && (
              <StyledTypography variant="body1">{line}</StyledTypography>
            )}
          </Fragment>
        ))}

      {addressData.cityStateZipString && (
        <StyledTypography variant="body1">
          {addressData.cityStateZipString}
        </StyledTypography>
      )}

      {addressData.country && (
        <StyledTypography variant="body1">
          {addressData.country}
        </StyledTypography>
      )}

      {addressData.phone1 && (
        <StyledTypography variant="body1">
          {addressData.phone1}
        </StyledTypography>
      )}

      {addressData.email1 && (
        <StyledTypography variant="body1">
          {addressData.email1}
        </StyledTypography>
      )}
    </>
  );
};

export { AddressCard };
