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
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { useSelector, useDispatch } from "react-redux";
import getDisplayName from "react-display-name";
//Custom libraries
import { SectionContent } from "../../../../_foundation/constants/section-content-type";
import { StandardPageLayout } from "../../../layouts/standard-page";
import { AccountLinksLayout } from "../../../widgets/account-links-layout";
import { OrderLinksLayout } from "../../../widgets/order-links-layout-b2b";
import { forUserIdSelector, userIdSelector } from "../../../../redux/selectors/user";
import personService from "../../../../_foundation/apis/transaction/person.service";
import { BUYER_ADMIN_ROLE, IBM_ASSIGNED_ROLE_DETAILS, BUYER_APPROVAL_ROLE } from "../../../../constants/common";
import * as userAction from "../../../../redux/actions/user";
//UI
import { StyledContainer, StyledGrid, StyledButton } from "@hcl-commerce-store-sdk/react-component";
import { AdministrativeToolsLayout } from "../../../widgets/administrative-tools";
import { PersonalInformationLayout } from "../../../widgets/personal-information";
import { RecentOrders } from "../../../widgets/recent-orders";
import { WelcomeUserSection } from "../account-summary/WelcomeUserSection";
//Foundation
import { useStoreLocatorValue } from "../../../../_foundation/context/store-locator-context";
import { STORELOCATORACTIONS } from "../../../../_foundation/constants/common";

/**
 * Dashboard component
 * display dashboard and account details
 * @param props
 */
function Dashboard() {
  const widget = getDisplayName(Dashboard);
  const { t } = useTranslation();
  const userId = useSelector(userIdSelector);
  const forUserId = useSelector(forUserIdSelector);
  const [buyerRole, setBuyerRole] = useState<string[]>();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const dispatch = useDispatch();
  const storeLocatorDispach = useStoreLocatorValue().dispatch;
  const logOutUser = (props: any) => {
    const payload = { widget };
    dispatch(userAction.LOGOUT_REQUESTED_ACTION(payload));
    storeLocatorDispach({ type: STORELOCATORACTIONS.RESET_STORE_SELECTOR });
  };
  const getPerson = () => {
    const param = {
      userId: forUserId ?? userId,
      profileName: IBM_ASSIGNED_ROLE_DETAILS,
      widget,
      cancelToken: new CancelToken((c) => cancels.push(c)),
    };
    personService
      .findByUserId(param)
      .then((response) => checkBuyerRole(response.data?.rolesWithDetails ?? []))
      .catch((e) => {
        setBuyerRole([]);
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
        const SignOut = t("PersonalInformation.SignOutButton");
        return (
          <StyledContainer className="page">
            <StyledGrid container direction="row" justifyContent="space-between" alignItems="center">
              <StyledGrid item>
                <WelcomeUserSection />
              </StyledGrid>
              <StyledGrid item>
                {!forUserId && (
                  <StyledButton
                    testId="my-account-b2b-logout"
                    size="small"
                    fullWidth
                    color="primary"
                    onClick={logOutUser}>
                    {SignOut}
                  </StyledButton>
                )}
              </StyledGrid>
            </StyledGrid>
            <PersonalInformationLayout />
            <RecentOrders loading={!buyerRole} />
            <AccountLinksLayout />
            <OrderLinksLayout
              isBuyerApprover={!buyerRole?.includes(BUYER_ADMIN_ROLE) && buyerRole?.includes(BUYER_APPROVAL_ROLE)}
            />
            {buyerRole?.includes(BUYER_ADMIN_ROLE) && <AdministrativeToolsLayout />}
          </StyledContainer>
        );
      },
    },
  ];
  const rc = useMemo(() => <StandardPageLayout cid="my-account-b2b" sectionOne={sectionOne} />, [buyerRole, forUserId]); // eslint-disable-line react-hooks/exhaustive-deps
  return rc;
}

export default Dashboard;
