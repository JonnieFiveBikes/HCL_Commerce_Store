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
import React, { Fragment, useEffect, useContext, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";

//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personContactService from "../../../_foundation/apis/transaction/personContact.service";

//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
import * as successActions from "../../../redux/actions/success";

//Custom libraries
import {
  ADDRESS_TYPE_MAP,
  ADDRESSLINE1,
  ADDRESSLINE2,
  EMPTY_STRING,
  PHONE1,
  ORG_ADDRESS_DETAILS,
  ORG_ADDRESS,
  ADDRESS_LINE,
} from "../../../constants/common";
import { EDIT_ADDRESS } from "../../../constants/routes";
import * as ROUTES from "../../../constants/routes";
import AddressContext from "../../pages/checkout/address/AddressContext";
import addressUtil from "../../../utils/addressUtil";
//UI
import { StyledTypography, StyledCard } from "@hcl-commerce-store-sdk/react-component";

interface AddressCardProps {
  addressId: string;
  nickName?: string;
  addressData?: any;
  actions?: any[];
  type?: boolean;
  setSelectedAddressId?: (v1?: any, v2?: any) => void; //selected address setter
  selectedAddressId?: string;
  selectedNickName?: string;
  readOnly?: boolean;
  hideEdit?: boolean;
}

/**
 * Address card display component
 * displays the details of a single address
 * @param props
 */
const AddressCard: React.FC<AddressCardProps> = (props: any) => {
  const { selectedNickName } = props;
  const widgetName = getDisplayName(AddressCard);
  const addressId = props.addressId ? props.addressId : "";
  const nickName = props.nickName ? props.nickName : "";
  const actions = props.actions;
  const type = props.type ? props.type : false;
  const readOnly = props.readOnly ? props.readOnly : false;
  const hideEdit = props.hideEdit ? props.hideEdit : false;
  const selectedAddressId = props.selectedAddressId ? props.selectedAddressId : "";
  const setSelectedAddressId = props.setSelectedAddressId ? props.setSelectedAddressId : null;
  const isSelected = selectedAddressId === addressId || nickName === selectedNickName;
  const addressDetails = useSelector(addressDetailsSelector);
  const addressContext = useContext(AddressContext);
  const orgAddressDetails = addressContext[ORG_ADDRESS_DETAILS];
  const addressData = props.addressData ? buildAddressData(props.addressData) : getAddress();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let editAddressDetails: any;
  const { mySite } = useSite();
  const TOGGLE_EDIT_ADDRESS = "toggleEditAddress";
  const SET_EDIT_ADDRESS_FORM_DATA = "setEditAddressFormData";
  const controller = useMemo(() => new AbortController(), []);

  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };

  const payload = {
    ...payloadBase,
  };

  useEffect(() => {
    if (mySite && addressDetails === null) {
      const payload = {
        ...payloadBase,
      };
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function deleteAddress(nickName: string) {
    const parameters: any = {
      nickName: nickName,
      ...payloadBase,
    };
    personContactService.deletePersonContact(parameters).then((res) => {
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
      const successMessage = {
        key: "success-message.DELETE_ADDRESS_SUCCESS",
        messageParameters: {
          "0": nickName,
        },
      };
      dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
    });
  }

  function getAddress() {
    let finalAddressData: any = {};
    if (addressDetails && addressId !== "") {
      const contactMap = addressDetails.contactMap;
      if (addressDetails.addressId === addressId || addressDetails.nickName === nickName) {
        finalAddressData = addressDetails;
      } else if (contactMap && contactMap[addressId]) {
        finalAddressData = contactMap[addressId];
      } else if (nickName !== "") {
        for (const key in contactMap) {
          if (contactMap[key].nickName === nickName) {
            finalAddressData = contactMap[key];
            break;
          }
        }
      }
    }
    if (
      orgAddressDetails &&
      orgAddressDetails.contactInfo &&
      orgAddressDetails.addressBook &&
      addressId !== EMPTY_STRING
    ) {
      if (
        addressId === orgAddressDetails.contactInfo.addressId ||
        nickName === orgAddressDetails.contactInfo.nickName
      ) {
        const orgAddress: any = {};
        Object.assign(orgAddress, orgAddressDetails.contactInfo);
        orgAddress[ADDRESS_LINE] = [orgAddress.address1, orgAddress.address2, orgAddress.address3];
        orgAddress[ORG_ADDRESS] = true;
        finalAddressData = orgAddress;
      } else {
        for (const orgAddress of orgAddressDetails.addressBook) {
          if (addressId === orgAddress.addressId || nickName === orgAddress.nickName) {
            const address: any = {};
            Object.assign(address, orgAddress);
            address[ADDRESS_LINE] = [address.address1, address.address2, address.address3];
            address[ORG_ADDRESS] = true;
            finalAddressData = address;
            break;
          }
        }
      }
    }
    return buildAddressData(finalAddressData);
  }

  function buildAddressData(address: any) {
    let finalAddressData: any = { ...address };

    let fullNameString: string = "";
    if (finalAddressData.firstName !== undefined && finalAddressData.firstName !== "") {
      fullNameString = finalAddressData.firstName;
    }
    if (finalAddressData.lastName !== undefined && finalAddressData.lastName !== "") {
      if (fullNameString !== "") {
        fullNameString += " ";
      }
      fullNameString += finalAddressData.lastName;
      finalAddressData = {
        ...finalAddressData,
        fullNameString: fullNameString,
      };
    }

    const cityStateZipList: string[] = [];
    if (finalAddressData.city !== undefined && finalAddressData.city !== "") {
      cityStateZipList.push(finalAddressData.city);
    }
    if (finalAddressData.state !== undefined && finalAddressData.state !== "") {
      cityStateZipList.push(finalAddressData.state);
    }
    if (finalAddressData.zipCode !== undefined && finalAddressData.zipCode !== "") {
      cityStateZipList.push(finalAddressData.zipCode);
    }
    if (cityStateZipList.length > 0) {
      const cityStateZipString = cityStateZipList.join(", ");
      finalAddressData = {
        ...finalAddressData,
        cityStateZipString: cityStateZipString,
      };
    }
    return finalAddressData;
  }

  const handleEditButton = () => {
    addressContext[TOGGLE_EDIT_ADDRESS](true);
    editAddressDetails = { ...addressData };
    setAndCleanAddressData(addressData);
    if (!addressData.phone1) {
      editAddressDetails[PHONE1] = EMPTY_STRING;
    }
    addressContext[SET_EDIT_ADDRESS_FORM_DATA](editAddressDetails);
  };

  const setAndCleanAddressData = (filteredAddressDetails: any) => {
    if (filteredAddressDetails.addressLine && filteredAddressDetails.addressLine.length > 2) {
      editAddressDetails[ADDRESSLINE1] = filteredAddressDetails.addressLine[0];
      editAddressDetails[ADDRESSLINE2] = filteredAddressDetails.addressLine[1];
      editAddressDetails = addressUtil.removeIgnorableAddressFormFields(editAddressDetails);
    }
  };
  const headerComponent = (
    <>
      {addressData.nickName ? (
        <StyledTypography variant="subtitle2" display="block" noWrap className="address-card-width">
          {addressData.nickName}
        </StyledTypography>
      ) : null}
      {type && addressData.addressType ? (
        <StyledTypography variant="caption">{t(ADDRESS_TYPE_MAP.get(addressData.addressType))}</StyledTypography>
      ) : null}
    </>
  );

  const contentComponent = (
    <>
      {addressData.fullNameString ? (
        <StyledTypography variant="body1" display="block" noWrap className="address-card-width">
          {addressData.fullNameString}
        </StyledTypography>
      ) : null}
      {addressData.addressLine
        ? addressData.addressLine.map((line: string, index: number) => (
            <Fragment key={line + "_" + index}>
              {line ? (
                <StyledTypography variant="body1" display="block" noWrap className="address-card-width">
                  {line}
                </StyledTypography>
              ) : null}
            </Fragment>
          ))
        : null}

      {addressData.cityStateZipString ? (
        <StyledTypography variant="body1" display="block" noWrap className="address-card-width">
          {addressData.cityStateZipString}
        </StyledTypography>
      ) : null}

      {addressData.country ? (
        <StyledTypography variant="body1" display="block" noWrap className="address-card-width">
          {addressData.country}
        </StyledTypography>
      ) : null}

      {addressData.phone1 ? (
        <StyledTypography variant="body1" display="block" noWrap className="address-card-width">
          {addressData.phone1}
        </StyledTypography>
      ) : null}

      {addressData.email1 ? (
        <StyledTypography variant="body1" display="block" noWrap className="address-card-width">
          {addressData.email1}
        </StyledTypography>
      ) : null}
    </>
  );

  // Memoized function to get the address card action based on dependencies/conditons
  const cardActions = useMemo(
    () => getCardActions(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actions, setSelectedAddressId, isSelected, addressData.orgAddress, addressId]
  );

  /**
   * Get the card actions for Address Card
   */
  function getCardActions() {
    if (actions) {
      return actions;
    } else if (setSelectedAddressId) {
      return getCardActionsForCheckout();
    } else {
      return getCardActionsForAddressBook();
    }
  }

  /**
   * Returns card action for checkout flow
   */
  function getCardActionsForCheckout() {
    const action: any[] = [];
    if (!isOrgAddress() && !hideEdit) {
      action.push({
        text: t("AddressCard.EditButton"),
        handleClick: () => handleEditButton(),
      });
    }
    if (!isSelected) {
      action.push({
        text: t("AddressCard.UseAddress"),
        handleClick: () => setSelectedAddressId(addressData.addressId, addressData.nickName),
      });
    }
    return action;
  }

  /**
   * if the address is organization address returns true else undefined
   */
  function isOrgAddress() {
    return addressData.orgAddress;
  }

  /**
   * Returns the adress card actions for AddressBook component
   */
  function getCardActionsForAddressBook() {
    return addressData.primary === "true"
      ? [
          {
            text: t("AddressCard.EditButton"),
            link: EDIT_ADDRESS + ROUTES.HOME + addressData.addressId,
          },
        ]
      : [
          {
            text: t("AddressCard.EditButton"),
            link: EDIT_ADDRESS + ROUTES.HOME + addressData.addressId,
          },
          {
            text: t("AddressCard.DeleteButton"),
            handleClick: () => deleteAddress(addressData.nickName),
            enableConfirmation: true,
          },
        ];
  }

  return readOnly ? (
    contentComponent
  ) : (
    <StyledCard
      testId={`${widgetName}-${nickName}`}
      className={`address-card ${isSelected ? "selected" : ""}`}
      headerProps={headerComponent}
      contentComponent={contentComponent}
      cardActions={cardActions}
      confirmLabel={t("AddressCard.Confirm")}
      cancelLabel={t("AddressCard.Cancel")}
    />
  );
};

export { AddressCard };
