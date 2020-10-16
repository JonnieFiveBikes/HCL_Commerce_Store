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
import { StyledLinkBox } from "../../StyledUI";
import HistoryIcon from "@material-ui/icons/History";
import ListIcon from "@material-ui/icons/List";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import RepeatIcon from "@material-ui/icons/Repeat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

interface OrderLinksLayoutProps {
  isBuyerApprover?: boolean;
}

function OrderLinksLayout({ isBuyerApprover }: OrderLinksLayoutProps) {
  const { t } = useTranslation();

  const baseLinkList: JSX.Element[] = [
    <StyledLinkBox
      title={t("OrderLinks.OrderHistoryText")}
      description={t("OrderLinks.OrderHistoryDescription")}
      url={ROUTES.ORDER_HISTORY}
      icon={<HistoryIcon />}
    />,
    <StyledLinkBox
      title={t("OrderLinks.RecurringOrdersText")}
      description={t("OrderLinks.RecurringOrdersDescription")}
      url={ROUTES.RECURRING_ORDERS}
      icon={<RepeatIcon />}
    />,
    <StyledLinkBox
      title={t("OrderLinks.SavedOrdersText")}
      description={t("OrderLinks.SavedOrdersDescription")}
      url={ROUTES.SAVED_ORDERS}
      icon={<BookmarkBorderIcon />}
      disabled
    />,
    <StyledLinkBox
      title={t("OrderLinks.RequisitionListsText")}
      description={t("OrderLinks.RequisitionListsDescription")}
      url={ROUTES.REQUISITION_LISTS}
      icon={<ListIcon />}
      disabled
    />,
  ];
  const orderApprovalLink = [
    <StyledLinkBox
      title={t("OrderLinks.ApproveOrdersText")}
      description={t("OrderLinks.ApproveOrdersDescription")}
      url={ROUTES.ORDER_APPROVAL}
      icon={<PersonAddIcon />}
    />,
  ];

  return (
    <AccountLinksSection
      title={t("OrderLinks.Title")}
      linkList={
        isBuyerApprover ? baseLinkList.concat(orderApprovalLink) : baseLinkList
      }
    />
  );
}

export { OrderLinksLayout };
