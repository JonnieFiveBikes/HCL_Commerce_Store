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
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
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
} from "../../StyledUI";
import Add from "@material-ui/icons/Add";
//Custom libraries
import AccountSidebar from "../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../widgets/title/TitleLayout";
import { AddressList } from "../../widgets/address-list";
import {
  ADDRESS_SHIPPING,
  ADDRESS_BILLING,
  ADDRESS_SHIPPING_BILLING,
} from "../../../constants/common";
import { ADD_ADDRESS } from "../../../constants/routes";

const AddressBook: React.FC = (props: any) => {
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginStatus = useSelector(loginStatusSelector);
  const addressDetails = useSelector(addressDetailsSelector);
  const [addressList, setAddressList] = React.useState<any[]>([]);
  const [type, setType] = React.useState<number>(0);
  const payloadBase: any = {
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const history = useHistory();

  useEffect(() => {
    if (mySite) {
      let payload = {
        ...payloadBase,
      };
      dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payload));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  useEffect(() => {
    if (addressDetails && addressDetails.contactList) {
      setAddressList(addressDetails.contactList);
      let id = type;
      setType(id);
      checkFilterType(id.toString());
    }
  }, [addressDetails]);

  const handleChange = (props: any) => {
    let id = props.target.value;
    setType(id);
    checkFilterType(id);
  };

  const goToAddAddress = () => {
    history.push(ADD_ADDRESS);
  };

  const checkFilterType = (id: string) => {
    if (id === "0") {
      setAddressList(addressDetails.contactList);
    } else if (id === "1") {
      filterList(ADDRESS_SHIPPING);
    } else if (id === "2") {
      filterList(ADDRESS_BILLING);
    } else if (id === "3") {
      filterList(ADDRESS_SHIPPING_BILLING);
    }
  };

  const filterList = (type: string) => {
    let filterList: any[] = [];
    addressDetails.contactList.forEach((address) => {
      if (address.addressType.includes(type)) {
        filterList.push(address);
      }
    });
    setAddressList(filterList);
  };

  if (!loginStatus) {
    return <Redirect to={SIGNIN} />;
  } else {
    return (
      <StyledContainer cid="address-book">
        <TitleLayout title={t("AddressBook.Title")} cid="address-book-title" />

        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={3} className="sidebar">
            <AccountSidebar />
          </StyledGrid>

          <StyledGrid
            item
            xs={12}
            md={9}
            container
            spacing={2}
            direction="column">
            <StyledGrid item container spacing={2} alignItems="center">
              <StyledGrid item xs={12} sm={9} md={8}>
                <StyledButtonBox
                  msg={t("AddressBook.AddrMsg")}
                  button={t("AddressBook.AddButton")}
                  icon={<Add />}
                  buttonAction={goToAddAddress}
                />
              </StyledGrid>
              <StyledGrid item xs={6} sm={6} md={4}>
                {addressDetails &&
                  addressDetails.contactList &&
                  addressDetails.contactList.length > 0 && (
                    <StyledFormControl variant="outlined" fullWidth>
                      <StyledFormHelperText>
                        {t("AddressBook.FilterLabel")}
                      </StyledFormHelperText>
                      <StyledSelect
                        native
                        fullWidth
                        value={type}
                        onChange={handleChange}
                        inputProps={{
                          name: "id",
                        }}>
                        <option value={0}>
                          {t("AddressBook.ShowAllLabel")}
                        </option>
                        <option value={1}>
                          {t("AddressBook.ShippingLabel")}
                        </option>
                        <option value={2}>
                          {t("AddressBook.BillingLabel")}
                        </option>
                        {/* <option value={3}>Shipping And Billing</option> */}
                      </StyledSelect>
                    </StyledFormControl>
                  )}
              </StyledGrid>
            </StyledGrid>
            <StyledGrid item container spacing={2}>
              {addressDetails &&
                addressDetails.contactList &&
                addressDetails.contactList.length > 0 && (
                  <StyledGrid item xs={12}>
                    {addressList.length === 0 ? (
                      <StyledTypography variant="subtitle2">
                        {t("AddressBook.NoAddrForFilterMsg")}
                      </StyledTypography>
                    ) : (
                      <AddressList
                        cid="addresses"
                        addressList={addressList}
                        type={true}
                      />
                    )}
                  </StyledGrid>
                )}

              {addressDetails &&
                (addressDetails.contactList === undefined ||
                  (addressDetails.contactList &&
                    addressDetails.contactList.length === 0)) && (
                  <StyledGrid item xs={12}>
                    <StyledTypography variant="subtitle2">
                      {t("AddressBook.NoAddrMsg")}
                    </StyledTypography>
                  </StyledGrid>
                )}
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default AddressBook;
