/**
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
import AdministrativeToolsLinksSection from "../administrative-tools-link-section/AdministrativeToolsLinkSection";
//UI
import { StyledLinkBox } from "@hcl-commerce-store-sdk/react-component";
import OrganizationIcon from "@mui/icons-material/PeopleAlt";
import PersonAdd from "@mui/icons-material/PersonAdd";

function AdministrativeToolsLayout() {
  const { t } = useTranslation();

  const disabledTitle = t("AccountLinks.DisabledMessage");
  const linkList: JSX.Element[] = [
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("AdminTools.orgManagement")}
      description={t("AdminTools.orgManagementDesc")}
      url={ROUTES.ORGANIZATION_MANAGEMENT}
      icon={<OrganizationIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("AdminTools.buyerManagement")}
      description={t("AdminTools.buyerManagementDesc")}
      url={ROUTES.BUYER_MANAGEMENT}
      icon={<OrganizationIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("AdminTools.orgAndBuyer")}
      description={t("AdminTools.orgAndBuyerDesc")}
      url={ROUTES.APPROVALS_MANAGEMENT}
      icon={<PersonAdd />}
    />,
  ];

  return <AdministrativeToolsLinksSection title={t("AdminTools.adminTools")} linkList={linkList} />;
}

export { AdministrativeToolsLayout };
