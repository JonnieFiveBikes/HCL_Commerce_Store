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
import { StyledLinkBox } from "../../StyledUI";
import OrganizationIcon from "@material-ui/icons/PeopleAlt";
import PersonAdd from "@material-ui/icons/PersonAdd";

function AdministrativeToolsLayout() {
  const { t } = useTranslation();

  let linkList: JSX.Element[] = [
    <StyledLinkBox
      title={t("AdminTools.orgManagement")}
      description={t("AdminTools.orgManagementDesc")}
      url={ROUTES.ORGANIZATION_MANAGEMENT}
      icon={<OrganizationIcon />}
    />,
    <StyledLinkBox
      title={t("AdminTools.buyerManagement")}
      description={t("AdminTools.buyerManagementDesc")}
      url={ROUTES.BUYER_MANAGEMENT}
      icon={<OrganizationIcon />}
    />,
    <StyledLinkBox
      title={t("AdminTools.orgAndBuyer")}
      description={t("AdminTools.orgAndBuyerDesc")}
      url={ROUTES.APPROVALS_MANAGEMENT}
      icon={<PersonAdd />}
    />,
  ];

  return (
    <AdministrativeToolsLinksSection
      title={t("AdminTools.adminTools")}
      linkList={linkList}
    />
  );
}

export { AdministrativeToolsLayout };
