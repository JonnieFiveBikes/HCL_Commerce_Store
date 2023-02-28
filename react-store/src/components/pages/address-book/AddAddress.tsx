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
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import getDisplayName from "react-display-name";
//Redux
import * as accountActions from "../../../redux/actions/account";
import * as successActions from "../../../redux/actions/success";
//Custom libraries
import { AddressForm } from "../../widgets/address-form";
import addressUtil from "../../../utils/addressUtil";
import {
  ADDRESS_BOOK,
  ADDRESS_LINE,
  ADDRESS_SHIPPING,
  ADDRESSLINE1,
  ADDRESSLINE2,
  EMPTY_STRING,
} from "../../../constants/common";
import {
  ADDRESS_BOOK as ADDRESS_BOOK_ROUTE,
  CHECKOUT_PROFILE_CREATE,
  CHECKOUT_PROFILE_EDIT,
} from "../../../constants/routes";
//Foundation libraries
import personContactService from "../../../_foundation/apis/transaction/personContact.service";
//UI
import {
  StyledButton,
  StyledPaper,
  StyledContainer,
  StyledBreadcrumbs,
  StyledLink,
  StyledTypography,
  StyledGrid,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";

/**
 * Add new address component
 * @param toggleShowAddressForm
 */
function AddAddress() {
  const widgetName = getDisplayName(AddAddress);
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  const [newAddressFormData, setNewAddressFormData] = useState<any>(addressFormDataInit);
  const controller = useMemo(() => new AbortController(), []);
  const navigate = useNavigate();
  const location: any = useLocation();
  const [locState, setLocState] = useState<any>({});

  /**
   * Form validation function
   * Return true when all mandatory field has been entered
   * else false
   */
  const canCreate = (): boolean => {
    return addressUtil.validateAddressForm(newAddressFormData);
  };

  /**
   * Create Address button handler to create the address
   * based on its type.
   */
  const createAddress = () => {
    // remove leading and trailing white space from all form input fields.
    const newAddressData = addressUtil.removeLeadingTrailingWhiteSpace(newAddressFormData);
    newAddressData[ADDRESS_LINE] = [newAddressData[ADDRESSLINE1]];
    if (newAddressData[ADDRESSLINE2] && newAddressData[ADDRESSLINE2].trim() !== EMPTY_STRING) {
      newAddressData[ADDRESS_LINE].push(newAddressData[ADDRESSLINE2]);
    }
    delete newAddressData[ADDRESSLINE1];
    delete newAddressData[ADDRESSLINE2];

    personContactService
      .addPersonContact({
        body: newAddressData,
        widget: widgetName,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((addressData) => {
        if (addressData.addressId) {
          // re-fetch and don't cancel if returning to profile edit/creation
          dispatch(
            accountActions.GET_ADDRESS_DETAIL_ACTION({
              widget: widgetName,
            })
          );
        }
      })
      .then(() => {
        const { nickName } = newAddressData;
        if (locState.profile) {
          if (locState.profile.xchkout_ProfileId) {
            navigate(CHECKOUT_PROFILE_EDIT, {
              state: { ...locState, nickName },
            });
          } else {
            navigate(CHECKOUT_PROFILE_CREATE, {
              state: { ...locState, nickName },
            });
          }
        } else {
          navigate(ADDRESS_BOOK_ROUTE);
        }
        const successMessage = {
          key: "success-message.ADD_ADDRESS_SUCCESS",
          messageParameters: {
            "0": newAddressData.nickName,
          },
        };
        dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(successMessage));
      })
      .catch((e) => {
        console.log("Could not create new address", e);
      });
  };

  const cancel = () => {
    if (locState.profile) {
      if (locState.profile.xchkout_ProfileId) {
        navigate(CHECKOUT_PROFILE_EDIT, { state: { ...locState } });
      } else {
        navigate(CHECKOUT_PROFILE_CREATE, { state: { ...locState } });
      }
    } else {
      navigate(ADDRESS_BOOK_ROUTE);
    }
  };

  useEffect(() => {
    if (location.state) {
      setLocState(location.state);
    }
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer cid="add-address">
      <StyledBreadcrumbs>
        <StyledLink to={ADDRESS_BOOK_ROUTE}>
          <StyledTypography variant="h4">{t("AddressBook.Title")}</StyledTypography>
        </StyledLink>
        <StyledTypography variant="h4">{t("AddressBook.AddrMsg")}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledPaper className="horizontal-padding-3 vertical-padding-3">
        <StyledGrid container spacing={3}>
          <StyledGrid item xs={12} md={6}>
            <AddressForm
              cid="newAddress"
              setAddressFormData={setNewAddressFormData}
              addressFormData={newAddressFormData}
              page={ADDRESS_BOOK}
            />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <Divider />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledButton testId="address-book-cancel" size="small" color="secondary" onClick={cancel}>
              {t("AddressBook.Cancel")}
            </StyledButton>
            <StyledButton
              testId="address-book-create-address"
              color="primary"
              size="small"
              style={{ float: "right" }}
              disabled={!canCreate()}
              onClick={createAddress}>
              {t("AddressBook.CreateAddress")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
    </StyledContainer>
  );
}

export default AddAddress;
