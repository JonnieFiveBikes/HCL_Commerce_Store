/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
//foundation
import useCMC from "../../../../_foundation/hooks/useCMC/useCMC";
import { APPOVAL_TOOL_ID, USERS_TOOL_ID, ORG_TOOL_ID } from "../../../../_foundation/constants/common";
import {
  BUYER_MANAGEMENT,
  APPROVALS_MANAGEMENT,
  ORGANIZATION_MANAGEMENT,
  ORDER_APPROVAL,
} from "../../../../constants/routes";
//redux
import { sessionErrorSelector } from "../../../../redux/selectors/error";
//common
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
//style
import { StyledContainer, StyledGrid, StyledTypography, StylediFrame } from "@hcl-commerce-store-sdk/react-component";

const AdminTools = () => {
  const { i18n } = useTranslation();
  const { handled } = useSelector(sessionErrorSelector);
  const dispatch = useDispatch();
  const iframeRef = React.createRef<HTMLIFrameElement>();
  const cmcService = useCMC(iframeRef, i18n.languages[0], dispatch);
  const { t } = useTranslation();
  const location: any = useLocation();
  const [title, setTitle] = useState<string>();

  React.useEffect(() => {
    if (iframeRef.current && (handled === undefined || handled === null)) {
      cmcService.launchCMC();
      if (location.pathname === BUYER_MANAGEMENT) {
        setTitle(t("AdminTools.buyerManagement"));
        cmcService.openTool(USERS_TOOL_ID);
      } else if (location.pathname === APPROVALS_MANAGEMENT) {
        setTitle(t("AdminTools.orgAndBuyer"));
        cmcService.openTool(APPOVAL_TOOL_ID);
      } else if (location.pathname === ORDER_APPROVAL) {
        setTitle(t("Dashboard.ApproveOrders"));
        cmcService.openTool(APPOVAL_TOOL_ID);
      } else if (location.pathname === ORGANIZATION_MANAGEMENT) {
        setTitle(t("AdminTools.orgManagement"));
        cmcService.openTool(ORG_TOOL_ID);
      }
    }

    return () => {
      cmcService.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef.current, cmcService, location, handled]);

  return (
    <StyledContainer className="page">
      <StyledTypography variant="h4" component="h1" className="vertical-margin-4">
        {title}
      </StyledTypography>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3} className="sidebar">
          <AccountSidebar />
        </StyledGrid>
        <StyledGrid item xs={12} md={9}>
          {(handled === undefined || handled === null) && (
            <StylediFrame
              ref={iframeRef}
              className={`full-height full-width no-border`}
              style={{ visibility: "hidden" }}
              allow="fullscreen"></StylediFrame>
          )}
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default AdminTools;
