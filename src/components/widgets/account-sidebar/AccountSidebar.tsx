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
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import {
  ACCOUNT,
  DASHBOARD,
  PERSONAL_INFORMATION,
  ADDRESS_BOOK,
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
  StyledSidebar,
  StyledTooltip,
  StyledTypography,
} from "../../StyledUI";

interface CustomAccountSidebarProps {
  sectionsArray: any[];
  isB2B?: boolean;
}

/**
 * CustomAccountSidebarProps component
 * displays user's account links
 * @param props
 */
function CustomAccountSidebar(props: CustomAccountSidebarProps) {
  const { sectionsArray } = props;
  const isB2B = props.isB2B ? props.isB2B : false;
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <StyledList component="nav" aria-labelledby={t("Dashboard.Title")}>
      {sectionsArray.map((v: any, sectionIndex: number) => (
        <Fragment key={sectionIndex}>
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
        </Fragment>
      ))}
    </StyledList>
  );
}

interface AccountSidebarProps {
  isB2B?: boolean;
}

/**
 * AccountSidebar component
 * displays user's b2c or b2b account links in a sidebar
 * @param props
 */
function AccountSidebar(props: AccountSidebarProps) {
  const { t } = useTranslation();
  const mySite: any = useSite();

  const isB2B = props.isB2B ? props.isB2B : mySite?.isB2B;
  const title = isB2B ? t("Dashboard.Title") : t("MyAccount.Title");
  const titleLink = isB2B ? DASHBOARD : ACCOUNT;

  const sectionsArray_B2C = [
    {
      title: t("MyAccount.AccountSettings"),
      pages: [
        {
          title: t("MyAccount.PersonalInformation"),
          link: "",
        },
        {
          title: t("MyAccount.AddressBook"),
          link: ADDRESS_BOOK,
        },
        {
          title: t("MyAccount.OrderHistory"),
          link: "",
        },
        {
          title: t("MyAccount.Wishlists"),
          link: "",
        },
      ],
    },
  ];

  const sectionsArray_B2B = [
    {
      title: t("Dashboard.AccountSettings"),
      pages: [
        {
          title: t("Dashboard.PersonalInformation"),
          link: PERSONAL_INFORMATION,
        },
        {
          title: t("Dashboard.AddressBook"),
          link: ADDRESS_BOOK,
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

  const sectionsArray = isB2B ? sectionsArray_B2B : sectionsArray_B2C;

  return (
    <StyledSidebar
      title={title}
      sidebarContent={
        <CustomAccountSidebar isB2B={isB2B} sectionsArray={sectionsArray} />
      }
      linkTo={titleLink}
      breakpoint="md"
    />
  );
}

export default AccountSidebar;
