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
import React, { Fragment, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import Axios, { Canceler } from "axios";
import { useSelector } from "react-redux";
//Custom libraries
import {
  ACCOUNT,
  DASHBOARD,
  PERSONAL_INFORMATION,
  ADDRESS_BOOK,
  ORDER_HISTORY,
  RECURRING_ORDERS,
  BUYER_MANAGEMENT,
  APPROVALS_MANAGEMENT,
  ORGANIZATION_MANAGEMENT,
  ORDER_APPROVAL,
  // REQUISITION_LISTS,
  // SAVED_ORDERS,
  // APPROVE_ORDERS
} from "../../../constants/routes";
import { userIdSelector } from "../../../redux/selectors/user";
import personService from "../../../_foundation/apis/transaction/person.service";
import {
  IBM_ASSIGNED_ROLE_DETAILS,
  BUYER_ADMIN_ROLE,
  BUYER_APPROVAL_ROLE,
} from "../../../constants/common";
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
}

/**
 * CustomAccountSidebarProps component
 * displays user's account links
 * @param props
 */
function CustomAccountSidebar(props: CustomAccountSidebarProps) {
  const { sectionsArray } = props;
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

const useSectionArray = (isB2B: boolean) => {
  const widgetName = getDisplayName(AccountSidebar);
  const { t } = useTranslation();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const userId = useSelector(userIdSelector);

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const param = {
    userId: userId,
    profileName: IBM_ASSIGNED_ROLE_DETAILS,
    ...payloadBase,
  };

  const [buyerRole, setBuyerRole] = useState<string[]>([]);

  const getPerson = () => {
    personService
      .findByUserId(param)
      .then((response) => response.data)
      .then((data) => {
        const roleDetail = data?.rolesWithDetails;
        if (roleDetail) {
          checkBuyerAdmin(roleDetail);
        }
      })
      .catch((e) => {
        console.log("Could not retrieve role details");
      });
  };

  const checkBuyerAdmin = (roleDetail) => {
    const roles: string[] = [];
    for (const value of roleDetail) {
      roles.push(String(value.roleId));
    }
    setBuyerRole(roles);
  };

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

  const orderManagement = {
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
    ],
  };

  const accountSetting_B2B = {
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
  };

  const B2B_Admin = {
    title: t("AdminTools.adminTools"),
    pages: [
      {
        title: t("AdminTools.orgManagement"),
        link: ORGANIZATION_MANAGEMENT,
      },
      {
        title: t("AdminTools.buyerManagement"),
        link: BUYER_MANAGEMENT,
      },
      {
        title: t("AdminTools.orgAndBuyer"),
        link: APPROVALS_MANAGEMENT,
      },
    ],
  };

  const formatSectionArray = () => {
    if (!isB2B) {
      return sectionsArray_B2C;
    } else {
      const array: any[] = [];
      array.push(accountSetting_B2B);
      const orders = { ...orderManagement };
      array.push(orders);
      if (buyerRole.includes(BUYER_ADMIN_ROLE)) {
        array.push({ ...B2B_Admin });
      } else if (buyerRole.includes(BUYER_APPROVAL_ROLE)) {
        orders.pages = [
          ...orderManagement.pages,
          {
            title: t("Dashboard.ApproveOrders"),
            link: ORDER_APPROVAL,
          },
        ];
      }
      return array;
    }
  };

  const sectionsArray = useMemo(() => formatSectionArray(), [buyerRole, isB2B]);

  React.useEffect(() => {
    if (userId) {
      getPerson();
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [userId]);

  return { sectionsArray };
};

/**
 * AccountSidebar component
 * displays user's b2c or b2b account links in a sidebar
 * @param props
 */
function AccountSidebar(props: AccountSidebarProps) {
  const { t } = useTranslation();
  const { mySite } = useSite();
  const isB2B = props.isB2B || mySite.isB2B;
  const title = isB2B ? t("Dashboard.Title") : t("MyAccount.Title");
  const titleLink = isB2B ? DASHBOARD : ACCOUNT;

  const { sectionsArray } = useSectionArray(isB2B);

  return (
    <StyledSidebar
      title={title}
      sidebarContent={<CustomAccountSidebar sectionsArray={sectionsArray} />}
      linkTo={titleLink}
      breakpoint="md"
      scrollable={true}
    />
  );
}

export default AccountSidebar;
