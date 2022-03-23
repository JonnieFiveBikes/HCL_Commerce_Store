/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//Custom libraries
import { SIGNIN } from "../../../../constants/routes";
import CreateInprogressOrdersWidget from "../../../widgets/in-progress-orders/create-inprogress-orders";
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../../widgets/title/TitleLayout";
import { InProgressOrdersTable } from "../../../widgets/in-progress-orders-table";
//Redux
import { loginStatusSelector } from "../../../../redux/selectors/user";
//UI
import { StyledGrid, StyledContainer } from "@hcl-commerce-store-sdk/react-component";

const InprogressOrders: React.FC = () => {
  const { t } = useTranslation();
  const loginStatus = useSelector(loginStatusSelector);

  if (!loginStatus) {
    return <Navigate replace to={SIGNIN} />;
  } else {
    return (
      <StyledContainer cid="inprogress-orders">
        <TitleLayout title={t("InprogressOrders.Title")} cid="inprogress-orders-title" />
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={3} className="sidebar">
            <AccountSidebar />
          </StyledGrid>
          <StyledGrid item xs={12} md={9}>
            <StyledGrid item xs={12} className="bottom-margin-2">
              <CreateInprogressOrdersWidget />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <InProgressOrdersTable />
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default InprogressOrders;
