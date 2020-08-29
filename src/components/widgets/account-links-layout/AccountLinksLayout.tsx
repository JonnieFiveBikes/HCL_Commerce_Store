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
import PersonIcon from "@material-ui/icons/Person";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { StyledLinkBox } from "../../StyledUI";

function AccountLinksLayout() {
  const { t } = useTranslation();

  let linkList: JSX.Element[] = [
    <StyledLinkBox
      title={t("AccountLinks.PersonalInformationText")}
      description={t("AccountLinks.PersonalInformationDescription")}
      url={ROUTES.PERSONAL_INFORMATION}
      icon={<PersonIcon />}
    />,
    <StyledLinkBox
      title={t("AccountLinks.AddressBookText")}
      description={t("AccountLinks.AddressBookDescription")}
      url={ROUTES.ADDRESS_BOOK}
      icon={<LibraryBooksIcon />}
    />,
  ];

  return (
    <AccountLinksSection title={t("AccountLinks.Title")} linkList={linkList} />
  );
}

export { AccountLinksLayout };
