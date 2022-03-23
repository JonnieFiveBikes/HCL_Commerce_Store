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
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useSelector, useDispatch } from "react-redux";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
//Redux
import { addressDetailsSelector } from "../../../../redux/selectors/account";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../../redux/actions/account";
//UI
import { StyledTextField, StyledTypography } from "@hcl-commerce-store-sdk/react-component";

function PersonalInformationSection() {
  const widgetName = getDisplayName(PersonalInformationSection);
  const addressDetails = useSelector(addressDetailsSelector);
  let completeAddress: string = "";

  if (addressDetails?.addressLine !== undefined && addressDetails?.addressLine !== "") {
    completeAddress = addressDetails?.addressLine?.toString().split(",").join(" ");
  }

  if (addressDetails?.city !== undefined && addressDetails?.city !== "") {
    completeAddress = completeAddress + ", " + addressDetails?.city;
  }

  if (addressDetails?.state !== undefined && addressDetails?.state !== "") {
    completeAddress = completeAddress + ", " + addressDetails?.state;
  }

  if (addressDetails?.country !== undefined && addressDetails?.country !== "") {
    completeAddress = completeAddress + ", " + addressDetails?.country;
  }

  if (addressDetails?.zipCode !== undefined && addressDetails?.zipCode !== "") {
    completeAddress = completeAddress + " - " + addressDetails?.zipCode;
  }

  const disableTextField: boolean = true;
  const { t } = useTranslation();
  const title = t("PersonalInformationSection.Title");
  const Name = t("PersonalInformationSection.Name");
  const Emailaddress = t("PersonalInformationSection.EmailAddress");
  const PhoneNumber = t("PersonalInformationSection.PhoneNumber");
  const Address = t("PersonalInformationSection.Address");

  const { mySite } = useSite();
  const dispatch = useDispatch();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const nameInputProps = {
    value:
      (addressDetails?.firstName ? addressDetails.firstName : "") +
      (addressDetails?.lastName ? " " + addressDetails.lastName : ""),
  };
  const emailInputProps = {
    value: addressDetails?.email1 ? addressDetails.email1 : "",
  };
  const phoneInputProps = {
    value: addressDetails?.phone1 ? addressDetails.phone1 : "",
  };

  const addressInputProps = {
    value: completeAddress,
  };

  useEffect(() => {
    if (mySite) {
      const payload = {
        ...payloadBase,
      };
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <StyledTypography variant="body2" className="bottom-margin-2">
          {title}
        </StyledTypography>
        <StyledTextField
          margin="normal"
          fullWidth
          disabled={disableTextField}
          label={Name}
          inputProps={nameInputProps}
          placeholder=""
          name="Name"
        />
        <StyledTextField
          margin="normal"
          fullWidth
          disabled={disableTextField}
          label={Emailaddress}
          inputProps={emailInputProps}
          placeholder=""
          name="EmailAddress"
        />
        <StyledTextField
          margin="normal"
          fullWidth
          disabled={disableTextField}
          label={PhoneNumber}
          inputProps={phoneInputProps}
          placeholder=""
          name="PhoneNumber"
        />
        <StyledTextField
          margin="normal"
          fullWidth
          disabled={disableTextField}
          label={Address}
          inputProps={addressInputProps}
          placeholder=""
          name="Address"
        />
      </>
    </>
  );
}

export { PersonalInformationSection };
