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
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
//Custom libraries
import { SectionContent } from "../../../../_foundation/constants/section-content-type";
import { StandardPageLayout } from "../../../layouts/standard-page";
import { PersonalInformationLayout } from "../../../widgets/personal-information";
import { AccountLinksGridViewLayout } from "../../../widgets/account-links-gridview";
//Redux
import * as ACTIONS from "../../../../redux/actions/account";
//UI
import { StyledTypography } from "@hcl-commerce-store-sdk/react-component";

/**
 * Account component
 * display account details
 * @param props
 */
const Account: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const title = t("Account.Title");
  const sectionOne: SectionContent[] = [
    {
      key: "my-account-page-personalinformation",
      CurrentComponent: () => {
        return (
          <>
            <StyledTypography variant="h4" className="vertical-margin-4">
              {title}
            </StyledTypography>
            <PersonalInformationLayout />
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
