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
import AccountLinksSection from "../account-links-section";
//UI
import { StyledLinkBox } from "@hcl-commerce-store-sdk/react-component";
import HistoryIcon from "@mui/icons-material/History";
import ListIcon from "@mui/icons-material/List";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface OrderLinksLayoutProps {
  isBuyerApprover?: boolean;
}

function OrderLinksLayout({ isBuyerApprover }: OrderLinksLayoutProps) {
  const { t } = useTranslation();

  const disabledTitle = t("AccountLinks.DisabledMessage");
  const baseLinkList: JSX.Element[] = [
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("OrderLinks.OrderHistoryText")}
      description={t("OrderLinks.OrderHistoryDescription")}
      url={ROUTES.ORDER_HISTORY}
      icon={<HistoryIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("OrderLinks.RecurringOrdersText")}
      description={t("OrderLinks.RecurringOrdersDescription")}
      url={ROUTES.RECURRING_ORDERS}
      icon={<RepeatIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("OrderLinks.InprogressOrdersText")}
      description={t("OrderLinks.InprogressOrdersDescription")}
      url={ROUTES.INPROGRESS_ORDERS}
      icon={<BookmarkBorderIcon />}
    />,
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("OrderLinks.RequisitionListsText")}
      description={t("OrderLinks.RequisitionListsDescription")}
      url={ROUTES.REQUISITION_LISTS}
      icon={<ListIcon />}
    />,
  ];
  const orderApprovalLink = [
    <StyledLinkBox
      disabledTitle={disabledTitle}
      title={t("OrderLinks.ApproveOrdersText")}
      description={t("OrderLinks.ApproveOrdersDescription")}
      url={ROUTES.ORDER_APPROVAL}
      icon={<PersonAddIcon />}
    />,
  ];

  return (
    <AccountLinksSection
      title={t("OrderLinks.Title")}
      linkList={isBuyerApprover ? baseLinkList.concat(orderApprovalLink) : baseLinkList}
    />
  );
}

export { OrderLinksLayout };
