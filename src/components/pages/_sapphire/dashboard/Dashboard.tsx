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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useSelector } from "react-redux";
import getDisplayName from "react-display-name";
//Custom libraries
import { SectionContent } from "../../../layouts/sectionContentType";
import { StandardPageLayout } from "../../../layouts/standard-page";
import { AccountLinksLayout } from "../../../widgets/account-links-layout";
import { OrderLinksLayout } from "../../../widgets/order-links-layout-b2b";
import {
  forUserIdSelector,
  userIdSelector,
} from "../../../../redux/selectors/user";
import personService from "../../../../_foundation/apis/transaction/person.service";
import {
  BUYER_ADMIN_ROLE,
  IBM_ASSIGNED_ROLE_DETAILS,
  BUYER_APPROVAL_ROLE,
} from "../../../../constants/common";
//UI
import { StyledTypography, StyledContainer } from "../../../StyledUI";
import { AdministrativeToolsLayout } from "../../../widgets/administrative-tools";

/**
 * Dashboard component
 * display dashboard and account details
 * @param props
 */
function Dashboard() {
  const widgetName = getDisplayName(Dashboard);
  const { t } = useTranslation();
  const title = t("Dashboard.Title");
  const userId = useSelector(userIdSelector);
  const forUserId = useSelector(forUserIdSelector);
  const [buyerRole, setBuyerRole] = useState<string[]>([]);
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const getPerson = () => {
    const param = {
      userId: forUserId ?? userId,
      profileName: IBM_ASSIGNED_ROLE_DETAILS,
      ...payloadBase,
    };
    return personService
      .findByUserId(param)
      .then((response) => {
        if (response.data) {
          const roleDetail = response.data.rolesWithDetails;
          if (roleDetail) {
            checkBuyerRole(roleDetail);
          }
        }
      })
      .catch((e) => {
        console.log("Could not retrieve role details");
      });
  };

  const checkBuyerRole = (roleDetail: any[]) => {
    const roles: string[] = [];
    for (const value of roleDetail) {
      roles.push(String(value.roleId));
    }
    setBuyerRole(roles);
  };

  React.useEffect(() => {
    getPerson();
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sectionOne: SectionContent[] = [
    {
      key: "my-account-b2b-page",
      CurrentComponent: () => {
        return (
          <StyledContainer className="page">
            <StyledTypography variant="h4" className="vertical-margin-4">
              {title}
            </StyledTypography>
            <AccountLinksLayout />
            <OrderLinksLayout
              isBuyerApprover={
                !buyerRole.includes(BUYER_ADMIN_ROLE) &&
                buyerRole.includes(BUYER_APPROVAL_ROLE)
              }
            />
            {buyerRole.includes(BUYER_ADMIN_ROLE) && (
              <AdministrativeToolsLayout />
            )}
          </StyledContainer>
        );
      },
    },
  ];
  return <StandardPageLayout cid="my-account-b2b" sectionOne={sectionOne} />;
}

export default Dashboard;
