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
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";

//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
import * as successActions from "../../../redux/actions/success";

//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personContactService from "../../../_foundation/apis/transaction/personContact.service";

//UI
import {
  StyledButton,
  StyledPaper,
  StyledGrid,
  StyledContainer,
  StyledLink,
  StyledBreadcrumbs,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";

//Custom libraries
import {
  ADDRESS_BOOK,
  ADDRESS_LINE,
  ADDRESS_SHIPPING,
  ADDRESSLINE1,
  ADDRESSLINE2,
  EMPTY_STRING,
  PHONE1,
} from "../../../constants/common";
import { AddressForm } from "../../widgets/address-form";
import addressUtil from "../../../utils/addressUtil";
import { ADDRESS_BOOK as ADDRESS_BOOK_ROUTE } from "../../../constants/routes";

/**
 * Edit Address Component
 *
 * @param props/addressId
 */
const EditAddress = (props) => {
  const widgetName = getDisplayName(EditAddress);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mySite } = useSite();
  const controller = useMemo(() => new AbortController(), []);
  let editAddressDetails: any;
  const params = useParams();
  const editAddressId = params.addressId;
  const navigate = useNavigate();
  const addressDetails = useSelector(addressDetailsSelector);
  const payloadBase: any = {
    widget: widgetName,
  };
  const payload = {
    ...payloadBase,
    signal: controller.signal,
  };
  const addressFormDataInit = {
    firstName: EMPTY_STRING,
    lastName: EMPTY_STRING,
    addressLine1: EMPTY_STRING,
    addressLine2: EMPTY_STRING,
    city: EMPTY_STRING,
    country: EMPTY_STRING,
    state: EMPTY_STRING,
    zipCode: EMPTY_STRING,
    phone1: EMPTY_STRING,
    nickName: EMPTY_STRING,
    email1: EMPTY_STRING,
    addressType: ADDRESS_SHIPPING,
  };
  const EDIT_SUCCESS_MSG = "success-message.EDIT_ADDRESS_SUCCESS";
  const [editAddressFormData, setEditddressFormData] = useState<any>(addressFormDataInit);

  /**
   * Get the person edit address details based on the request parameter addressId
   * if we get the edit address details, then set it to Address Form data
   */
  const getAndSetEditAddressData = () => {
    let filteredAddressDetails;
    if (editAddressId && addressDetails) {
      if (addressDetails.contactList && addressDetails.contactList.length !== 0) {
        filteredAddressDetails = addressDetails.contactList.filter((contact) => contact.addressId === editAddressId)[0];
      }
      if (addressDetails.addressLine && addressDetails.addressId === editAddressId) {
        filteredAddressDetails = addressUtil.getRegisteredInitialAddress(addressDetails);
      }
      if (filteredAddressDetails) {
        editAddressDetails = { ...filteredAddressDetails };
        setAndRemoveAddressLine(filteredAddressDetails);
        if (!filteredAddressDetails.phone1) {
          editAddressDetails[PHONE1] = EMPTY_STRING;
        }
        setEditddressFormData(editAddressDetails);
      }
    }
  };

  /**
   * Get Address line 1 and Address line 2 from addressLine array
   * Remove addressId and addressLine from editAddressDetails, since it is
   * not used in AddressForm
   */
  const setAndRemoveAddressLine = (filteredAddressDetails: any) => {
    if (filteredAddressDetails.addressLine && filteredAddressDetails.addressLine.length > 2) {
      editAddressDetails[ADDRESSLINE1] = filteredAddressDetails.addressLine[0];
      editAddressDetails[ADDRESSLINE2] = filteredAddressDetails.addressLine[1];
      editAddressDetails = addressUtil.removeIgnorableAddressFormFields(editAddressDetails);
    }
  };

  /**
   * Form validation function
   * Return true when all mandatory field has been entered
   * else false
   */
  const canSaveChanges = (): boolean => {
    return addressUtil.validateAddressForm(editAddressFormData, true);
  };

  /**
   * It will save and update the address by calling updatePersonContact method of
   * personContactService. If update is successfull, GET_ADDRESS_DETAIL_ACTION redux action
   * and HANDLE_SUCCESS_MESSAGE_ACTION redux action will be dispatched and redirect to
   * AddressList view.
   */
  const saveChanges = () => {
    // remove leading and trailing white space from all form input fields.
    const updatedAddressData = addressUtil.removeLeadingTrailingWhiteSpace(editAddressFormData);
    updatedAddressData[ADDRESS_LINE] = [updatedAddressData[ADDRESSLINE1], updatedAddressData[ADDRESSLINE2]];
    const requestParams = {
      nickName: updatedAddressData.nickName,
      body: updatedAddressData,
      ...payload,
    };
    personContactService
      .updatePersonContact(requestParams)
      .then((res) => res.data)
      .then((addressData) => {
        if (addressData.addressId) {
          dispatch(GET_ADDRESS_DETAIL_ACTION(payloadBase));
        }
      })
      .then(() => {
        navigate(ADDRESS_BOOK_ROUTE);
        const successMessage = {
          key: EDIT_SUCCESS_MSG,
          messageParameters: {
            "0": updatedAddressData.nickName,
          },
        };
        dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
      })
      .catch((e) => {
        console.log("Could not update the address", e);
      });
  };

  useEffect(() => {
    if (mySite && addressDetails === null) {
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
    }
    if (addressDetails !== null) {
      getAndSetEditAddressData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, addressDetails]);

  React.useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer cid="edit-address">
      <StyledBreadcrumbs className="top-padding-6 vertical-padding-3">
        <StyledLink to={ADDRESS_BOOK_ROUTE}>
          <StyledTypography variant="h4">{t("AddressBook.Title")}</StyledTypography>
        </StyledLink>
        <span>
          <StyledTypography variant="h4">{t("AddressBook.EditAddress")}</StyledTypography>
        </span>
      </StyledBreadcrumbs>
      <StyledGrid container spacing={3}>
        <StyledPaper className="horizontal-padding-3 vertical-padding-3">
          <StyledGrid item xs={12} md={6}>
            <AddressForm
              cid="editAddress"
              setAddressFormData={setEditddressFormData}
              addressFormData={editAddressFormData}
              page={ADDRESS_BOOK}
              edit={true}
            />
          </StyledGrid>
          <Divider className="top-margin-2 bottom-margin-2" />
          <StyledGrid item xs={12}>
            <StyledLink to={ADDRESS_BOOK_ROUTE}>
              <StyledButton testId="address-book-edit-address-cancel" size="small" color="secondary">
                {t("AddressBook.Cancel")}
              </StyledButton>
            </StyledLink>
            <StyledButton
              testId="address-book-edit-address-save"
              color="primary"
              size="small"
              style={{ float: "right" }}
              disabled={!canSaveChanges()}
              onClick={saveChanges}>
              {t("AddressBook.SaveChanges")}
            </StyledButton>
          </StyledGrid>
        </StyledPaper>
      </StyledGrid>
    </StyledContainer>
  );
};

export default EditAddress;
