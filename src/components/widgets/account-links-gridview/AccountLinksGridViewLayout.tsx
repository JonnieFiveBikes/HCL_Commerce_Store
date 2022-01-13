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
import { useTranslation } from "react-i18next";
//Custom libraries
import * as ROUTES from "../../../constants/routes";
import AccountLinksSection from "../account-links-section";

//UI
import HistoryIcon from "@material-ui/icons/History";
import ListIcon from "@material-ui/icons/List";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { StyledLinkBox } from "@hcl-commerce-store-sdk/react-component";

function AccountLinksGridViewLayout() {
  const { t } = useTranslation();

  const linkAddressBookText = t("AccountLinksGridView.AddressBookText");
  const linkAddressBookDescription = t(
    "AccountLinksGridView.AddressBookDescription"
  );
  const disabledTitle = t("AccountLinks.DisabledMessage");
  const linkAddressBookURL = ROUTES.ADDRESS_BOOK;

  const linkOrderHistoryText = t("AccountLinksGridView.OrderHistoryText");
  const linkOrderHistoryDescription = t(
    "AccountLinksGridView.OrderHistoryDescription"
  );
  const linkOrderHistoryURL = ROUTES.ORDER_HISTORY;

  const linkWishListText = t("AccountLinksGridView.WishListText");
  const linkWishListDescription = t("AccountLinksGridView.WishListDescription");
  const linkWishListURL = ROUTES.WISH_LIST;

  const checkoutProfs = {
    title: t("MyAccount.CheckoutProfiles"),
    description: t("CheckoutProfile.MyAcctDesc"),
    url: ROUTES.CHECKOUT_PROFILES,
    icon: <ShoppingCartIcon />,
  };

  let linkList: JSX.Element[] = [
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={linkAddressBookText}
      description={linkAddressBookDescription}
      url={linkAddressBookURL}
      icon={<LibraryBooksIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={linkOrderHistoryText}
      description={linkOrderHistoryDescription}
      url={linkOrderHistoryURL}
      icon={<HistoryIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={checkoutProfs.title}
      description={checkoutProfs.description}
      url={checkoutProfs.url}
      icon={checkoutProfs.icon}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={linkWishListText}
      description={linkWishListDescription}
      url={linkWishListURL}
      icon={<ListIcon />}
      disabled
    />,
  ];

  return (
    <AccountLinksSection
      title={t("AccountLinksGridView.Title")}
      linkList={linkList}
    />
  );
}

export { AccountLinksGridViewLayout };
