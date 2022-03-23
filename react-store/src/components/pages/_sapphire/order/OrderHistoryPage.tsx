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
//Custom libraries
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
import { OrderHistoryTable } from "../../../widgets/order-history-table";
//UI
import { StyledContainer, StyledGrid, StyledTypography } from "@hcl-commerce-store-sdk/react-component";
import { useTranslation } from "react-i18next";

function OrderHistoryPage(props: any) {
  const { t } = useTranslation();
  const title = t("Order.OrderHistory");

  return (
    <StyledContainer className="page">
      <StyledTypography variant="h3" component="h1" className="vertical-margin-4">
        {title}
      </StyledTypography>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3} className="sidebar">
          <AccountSidebar />
        </StyledGrid>
        <StyledGrid item xs={12} md={9}>
          <OrderHistoryTable />
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
}

export default OrderHistoryPage;
