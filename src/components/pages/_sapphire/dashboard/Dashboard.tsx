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
//Custom libraries
import { SectionContent } from "../../../layouts/sectionContentType";
import { StandardPageLayout } from "../../../layouts/standard-page";
import { AccountLinksLayout } from "../../../widgets/account-links-layout";
import { OrderLinksLayout } from "../../../widgets/order-links-layout-b2b";
//UI
import { StyledTypography } from "../../../StyledUI";

/**
 * Dashboard component
 * display dashboard and account details
 * @param props
 */
function Dashboard() {
  const { t } = useTranslation();
  const title = t("Dashboard.Title");
  const sectionOne: SectionContent[] = [
    {
      key: "my-account-b2b-page",
      CurrentComponent: () => {
        return (
          <>
            <StyledTypography variant="h4" className="vertical-margin-4">
              {title}
            </StyledTypography>
            <AccountLinksLayout />
            <OrderLinksLayout />
          </>
        );
      },
    },
  ];
  return <StandardPageLayout cid="my-account-b2b" sectionOne={sectionOne} />;
}

export default Dashboard;
