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
import { useLocation } from "react-router-dom";
//Custom libraries
import {
  PERSONAL_INFORMATION,
  // ADDRESS_BOOK,
  ORDER_HISTORY,
  RECURRING_ORDERS,
  // REQUISITION_LISTS,
  // SAVED_ORDERS,
  // APPROVE_ORDERS
} from "../../../constants/routes";
//UI
import {
  StyledLink,
  StyledListItem,
  StyledListItemText,
  StyledList,
  StyledTooltip,
  StyledTypography,
} from "../../StyledUI";

interface DashboardProps {
  selectedMenuItem?: any;
}

/**
 * Dashboard component
 * displays user's account and order links
 * @param props
 */
function Dashboard(props: DashboardProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const sectionsArray = [
    {
      title: t("Dashboard.AccountSettings"),
      pages: [
        {
          title: t("Dashboard.PersonalInformation"),
          link: PERSONAL_INFORMATION,
        },
        {
          title: t("Dashboard.AddressBook"),
          link: "",
        },
      ],
    },
    {
      title: t("Dashboard.OrderManagement"),
      pages: [
        {
          title: t("Dashboard.OrderHistory"),
          link: ORDER_HISTORY,
        },
        {
          title: t("Dashboard.RecurringOrders"),
          link: RECURRING_ORDERS,
        },
        {
          title: t("Dashboard.RequisitionLists"),
          link: "",
        },
        {
          title: t("Dashboard.SavedOrders"),
          link: "",
        },
        {
          title: t("Dashboard.ApproveOrders"),
          link: "",
        },
      ],
    },
  ];

  return (
    <StyledList component="nav" aria-labelledby={t("Dashboard.Title")}>
      {sectionsArray.map((v: any, sectionIndex: number) => (
        <React.Fragment key={sectionIndex}>
          <StyledListItem className="section-title">
            <StyledTypography variant="overline" component="span">
              {v.title}
            </StyledTypography>
          </StyledListItem>
          {v.pages.map((pageObj: any, index: number) => {
            const uniqueIndex = `${sectionIndex}${index}`;
            return pageObj.link ? (
              pageObj.link === location.pathname ? (
                <StyledListItem key={uniqueIndex} selected={true}>
                  <StyledListItemText primary={pageObj.title} />
                </StyledListItem>
              ) : (
                <StyledLink
                  key={uniqueIndex}
                  to={pageObj.link}
                  className="section-link">
                  <StyledListItem>
                    <StyledListItemText primary={pageObj.title} />
                  </StyledListItem>
                </StyledLink>
              )
            ) : (
              <StyledTooltip
                title={`${t("AccountLinks.DisabledMessage")}`}
                key={uniqueIndex}>
                <div>
                  <StyledListItem className="section-disabled">
                    <StyledListItemText primary={pageObj.title} />
                  </StyledListItem>
                </div>
              </StyledTooltip>
            );
          })}
        </React.Fragment>
      ))}
    </StyledList>
  );
}

export default Dashboard;
