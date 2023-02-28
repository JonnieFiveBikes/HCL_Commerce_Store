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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation libraries
import { SIGNIN } from "../../../constants/routes";
//Redux
import * as accountActions from "../../../redux/actions/account";
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { loginStatusSelector } from "../../../redux/selectors/user";
//UI
import {
  StyledGrid,
  StyledTypography,
  StyledButtonBox,
  StyledContainer,
  StyledSelect,
  StyledFormHelperText,
  StyledFormControl,
} from "@hcl-commerce-store-sdk/react-component";
import Add from "@mui/icons-material/Add";
//Custom libraries
import AccountSidebar from "../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../widgets/title/TitleLayout";
import { AddressList } from "../../widgets/address-list";
import { ADDRESS_SHIPPING, ADDRESS_BILLING, ADDRESS_SHIPPING_BILLING } from "../../../constants/common";
import { ADD_ADDRESS } from "../../../constants/routes";
import addressUtil from "../../../utils/addressUtil";

const AddressBook: React.FC = (props: any) => {
  const widgetName = getDisplayName(AddressBook);
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginStatus = useSelector(loginStatusSelector);
  const addressDetails = useSelector(addressDetailsSelector);
  const [addressList, setAddressList] = useState<any[]>([]);
  const [type, setType] = useState<number>(0);
  const payloadBase: any = {
    widget: widgetName,
    signal: controller.signal,
  };
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAddressList = (addressType: number) => {
    const addressDetailsArray: any[] = [];
    if (addressDetails && addressDetails.addressLine) {
      addressDetailsArray.push(addressUtil.getRegisteredInitialAddress(addressDetails));
    }
    if (addressDetails && addressDetails.contactList) {
      addressDetails.contactList.forEach((address) => {
        return addressDetailsArray.push(address);
      });
    }
    setAddressList(addressDetailsArray);
    setType(addressType);
  };
  useEffect(() => {
    if (!addressDetails) {
      const payload = {
        ...payloadBase,
      };
      dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payload));
    } else {
      getAddressList(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressDetails]);

  const handleChange = (props: any) => {
    const id = props.target.value;
    setType(id);
    checkFilterType(id);
  };

  const goToAddAddress = () => {
    navigate(ADD_ADDRESS);
  };

  const checkFilterType = (id: string) => {
    if (id === "0") {
      getAddressList(0);
    } else if (id === "1") {
      filterList(ADDRESS_SHIPPING);
    } else if (id === "2") {
      filterList(ADDRESS_BILLING);
    } else if (id === "3") {
      filterList(ADDRESS_SHIPPING_BILLING);
    }
  };

  const filterList = (type: string) => {
    const filterList: any[] = [];
    addressDetails?.contactList?.forEach((address) => {
      if (address.addressType.includes(type)) {
        filterList.push(address);
      }
    });
    if (addressDetails?.addressLine && addressDetails?.addressType?.includes(type)) {
      filterList.push(addressUtil.getRegisteredInitialAddress(addressDetails));
    }
    setAddressList(filterList);
  };

  if (!loginStatus) {
    return <Navigate replace to={SIGNIN} />;
  } else {
    return (
      <StyledContainer cid="address-book">
        <TitleLayout title={t("AddressBook.Title")} cid="address-book-title" />

        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={3} className="sidebar">
            <AccountSidebar />
          </StyledGrid>

          <StyledGrid item xs={12} md={9} container spacing={2} direction="column">
            <StyledGrid item container spacing={2} alignItems="center">
              <StyledGrid item xs={12} sm={9} md={8}>
                <StyledButtonBox
                  testId="address-book-add"
                  msg={t("AddressBook.AddrMsg")}
                  button={t("AddressBook.AddButton")}
                  icon={<Add />}
                  buttonAction={goToAddAddress}
                />
              </StyledGrid>
              <StyledGrid item xs={6} sm={6} md={4}>
                {addressDetails?.contactList?.length > 0 || addressDetails?.addressLine ? (
                  <StyledFormControl variant="outlined" fullWidth>
                    <StyledFormHelperText>{t("AddressBook.FilterLabel")}</StyledFormHelperText>
                    <StyledSelect
                      data-testid="addresstype-filter"
                      native
                      fullWidth
                      value={type}
                      onChange={handleChange}>
                      <option value={0}>{t("AddressBook.ShowAllLabel")}</option>
                      <option value={1}>{t("AddressBook.ShippingLabel")}</option>
                      <option value={2}>{t("AddressBook.BillingLabel")}</option>
                      {/* <option value={3}>Shipping And Billing</option> */}
                    </StyledSelect>
                  </StyledFormControl>
                ) : null}
              </StyledGrid>
            </StyledGrid>
            <StyledGrid item>
              {addressDetails &&
              ((addressDetails.contactList && addressDetails.contactList.length > 0) || addressDetails.addressLine) ? (
                addressList && addressList.length === 0 ? (
                  <StyledTypography variant="subtitle2">{t("AddressBook.NoAddrForFilterMsg")}</StyledTypography>
                ) : (
                  <AddressList cid="addresses" addressList={addressList} type={true} />
                )
              ) : null}
              {addressDetails &&
              (!addressDetails.contactList || addressDetails.contactList.length === 0) &&
              !addressDetails.addressLine ? (
                <StyledGrid item xs={12}>
                  <StyledTypography variant="subtitle2">{t("AddressBook.NoAddrMsg")}</StyledTypography>
                </StyledGrid>
              ) : null}
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default AddressBook;
