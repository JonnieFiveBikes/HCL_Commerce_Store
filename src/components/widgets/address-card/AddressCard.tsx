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
import React, { Fragment, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";

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
} from "../../../constants/common";
import { EDIT_ADDRESS } from "../../../constants/routes";
import * as ROUTES from "../../../constants/routes";
import EditAddressContext from "../../pages/checkout/address/EditAddressContext";
import addressUtil from "../../../utils/addressUtil";
//UI
import { StyledTypography, StyledCard } from "../../StyledUI";

interface AddressCardProps {
  addressId: string;
  nickName?: string;
  addressData?: any;
  actions?: any[];
  type?: boolean;
  setSelectedAddressId?: Function; //selected address setter
  selectedAddressId?: string;
  readOnly?: boolean;
}

/**
 * Address card display component
 * displays the details of a single address
 * @param props
 */
const AddressCard: React.FC<AddressCardProps> = (props: any) => {
  const addressId = props.addressId ? props.addressId : "";
  const nickName = props.nickName ? props.nickName : "";
  const actions = props.actions;
  const type = props.type ? props.type : false;
  const readOnly = props.readOnly ? props.readOnly : false;
  const selectedAddressId = props.selectedAddressId
    ? props.selectedAddressId
    : "";
  const setSelectedAddressId = props.setSelectedAddressId
    ? props.setSelectedAddressId
    : null;
  const isSelected = selectedAddressId === addressId;
  const addressDetails = useSelector(addressDetailsSelector);
  const addressData = props.addressData
    ? buildAddressData(props.addressData)
    : getAddress();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let editAddressDetails: any;
  const mySite: any = useSite();
  const editAddressContext = useContext(EditAddressContext);
  const TOGGLE_EDIT_ADDRESS = "toggleEditAddress";
  const SET_EDIT_ADDRESS_FORM_DATA = "setEditAddressFormData";

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const payload = {
    ...payloadBase,
  };

  useEffect(() => {
    if (mySite && addressDetails === null) {
      let payload = {
        ...payloadBase,
      };
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
    }
  }, [mySite]);

  function deleteAddress(nickName: string) {
    const parameters: any = {
      nickName: nickName,
    };
    personContactService.deletePersonContact(parameters).then((res) => {
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
      const successMessage = {
        key: "success-message.DELETE_ADDRESS_SUCCESS",
        messageParameters: {
          ["0"]: nickName,
        },
      };
      dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
    });
  }

  function getAddress() {
    let finalAddressData: any = {};
    if (addressDetails && addressId !== "") {
      const contactMap = addressDetails.contactMap;
      if (
        addressDetails.addressId === addressId ||
        addressDetails.nickName === nickName
      ) {
        finalAddressData = addressDetails;
      } else if (contactMap && contactMap[addressId]) {
        finalAddressData = contactMap[addressId];
      } else if (nickName !== "") {
        for (let key in contactMap) {
          if (contactMap[key].nickName == nickName) {
            finalAddressData = contactMap[key];
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
    if (finalAddressData.state !== undefined && finalAddressData.state !== "") {
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
    return finalAddressData;
  }

  const handleEditButton = () => {
    editAddressContext[TOGGLE_EDIT_ADDRESS](true);
    editAddressDetails = { ...addressData };
    setAndCleanAddressData(addressData);
    if (!addressData.phone1) {
      editAddressDetails[PHONE1] = EMPTY_STRING;
    }
    editAddressContext[SET_EDIT_ADDRESS_FORM_DATA](editAddressDetails);
  };

  const setAndCleanAddressData = (filteredAddressDetails: any) => {
    if (
      filteredAddressDetails.addressLine &&
      filteredAddressDetails.addressLine.length > 2
    ) {
      editAddressDetails[ADDRESSLINE1] = filteredAddressDetails.addressLine[0];
      editAddressDetails[ADDRESSLINE2] = filteredAddressDetails.addressLine[1];
      editAddressDetails = addressUtil.removeIgnorableAddressFormFields(
        editAddressDetails
      );
    }
  };
  const headerComponent = (
    <>
      {addressData.nickName && (
        <StyledTypography variant="subtitle2" display="block" noWrap>
          {addressData.nickName}
        </StyledTypography>
      )}
      {type && addressData.addressType && (
        <StyledTypography variant="caption">
          {t(ADDRESS_TYPE_MAP.get(addressData.addressType))}
        </StyledTypography>
      )}
    </>
  );

  const contentComponent = (
    <>
      {addressData.fullNameString && (
        <StyledTypography variant="body1" display="block" noWrap>
          {addressData.fullNameString}
        </StyledTypography>
      )}
      {addressData.addressLine &&
        addressData.addressLine.map((line: string, index: number) => (
          <Fragment key={index}>
            {line && (
              <StyledTypography variant="body1" display="block" noWrap>
                {line}
              </StyledTypography>
            )}
          </Fragment>
        ))}

      {addressData.cityStateZipString && (
        <StyledTypography variant="body1" display="block" noWrap>
          {addressData.cityStateZipString}
        </StyledTypography>
      )}

      {addressData.country && (
        <StyledTypography variant="body1" display="block" noWrap>
          {addressData.country}
        </StyledTypography>
      )}

      {addressData.phone1 && (
        <StyledTypography variant="body1" display="block" noWrap>
          {addressData.phone1}
        </StyledTypography>
      )}

      {addressData.email1 && (
        <StyledTypography variant="body1" display="block" noWrap>
          {addressData.email1}
        </StyledTypography>
      )}
    </>
  );

  const cardActions = actions
    ? actions
    : setSelectedAddressId
    ? isSelected
      ? [
          {
            text: t("AddressCard.EditButton"),
            handleClick: () => handleEditButton(),
          },
        ]
      : [
          {
            text: t("AddressCard.EditButton"),
            handleClick: () => handleEditButton(),
          },
          {
            text: t("AddressCard.UseAddress"),
            handleClick: () => setSelectedAddressId(addressData.addressId),
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

  return readOnly ? (
    contentComponent
  ) : (
    <StyledCard
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
