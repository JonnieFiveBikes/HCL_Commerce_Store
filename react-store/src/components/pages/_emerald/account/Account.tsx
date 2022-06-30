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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import getDisplayName from "react-display-name";
//Custom libraries
import { SectionContent } from "../../../../_foundation/constants/section-content-type";
import { StandardPageLayout } from "../../../layouts/standard-page";
import { PersonalInformationLayout } from "../../../widgets/personal-information";
import { RecentOrders } from "../../../widgets/recent-orders";
import { AccountLinksGridViewLayout } from "../../../widgets/account-links-gridview";
//Redux
import * as ACTIONS from "../../../../redux/actions/account";
import * as userAction from "../../../../redux/actions/user";
import { forUserIdSelector } from "../../../../redux/selectors/user";
//UI
import { StyledButton, StyledGrid } from "@hcl-commerce-store-sdk/react-component";
import { WelcomeUserSection } from "../../_sapphire/account-summary/WelcomeUserSection";
//Foundation
import { STORELOCATORACTIONS } from "../../../../_foundation/constants/common";
import { useStoreLocatorValue } from "../../../../_foundation/context/store-locator-context";

/**
 * Account component
 * display account details
 * @param props
 */
const Account: React.FC = (props: any) => {
  const widgetName = getDisplayName(Account);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const forUserId = useSelector(forUserIdSelector);

  const payloadBase: any = {
    widget: widgetName,
  };

  const storeLocatorDispach = useStoreLocatorValue().dispatch;

  const logOutUser = (props: any) => {
    const payload = {
      ...payloadBase,
    };
    dispatch(userAction.LOGOUT_REQUESTED_ACTION(payload));
    storeLocatorDispach({ type: STORELOCATORACTIONS.RESET_STORE_SELECTOR });
  };

  const SignOut = t("PersonalInformation.SignOutButton");
  const sectionOne: SectionContent[] = [
    {
      key: "my-account-page-personalinformation",
      CurrentComponent: () => {
        return (
          <>
            <StyledGrid container direction="row" justifyContent="space-between" alignItems="center">
              <StyledGrid item>
                <WelcomeUserSection />
              </StyledGrid>
              <StyledGrid item>
                {!forUserId && (
                  <StyledButton
                    testId="personal-info-log-out"
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
            <RecentOrders />
            <AccountLinksGridViewLayout />
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(ACTIONS.getOrders());
  }, [dispatch]);

  return <StandardPageLayout cid="my-account-page" sectionOne={sectionOne} />;
};

export default Account;
