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
import { useTranslation } from "react-i18next";
//Custom libraries
import * as ROUTES from "../../../constants/routes";
import AccountLinksSection from "../account-links-section";
//UI
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StyledLinkBox } from "@hcl-commerce-store-sdk/react-component";

function AccountLinksLayout() {
  const { t } = useTranslation();
  const disabledTitle = t("AccountLinks.DisabledMessage");

  const checkoutProfs = {
    title: t("MyAccount.CheckoutProfiles"),
    description: t("CheckoutProfile.MyAcctDesc"),
    url: ROUTES.CHECKOUT_PROFILES,
    icon: <ShoppingCartIcon />,
  };

  const linkList: JSX.Element[] = [
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("AccountLinks.AddressBookText")}
      description={t("AccountLinks.AddressBookDescription")}
      url={ROUTES.ADDRESS_BOOK}
      icon={<LibraryBooksIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={checkoutProfs.title}
      description={checkoutProfs.description}
      url={checkoutProfs.url}
      icon={checkoutProfs.icon}
    />,
  ];

  return <AccountLinksSection title={t("AccountLinks.Title")} linkList={linkList} />;
}

export { AccountLinksLayout };
