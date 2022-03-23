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
import { SectionContent } from "../../../../_foundation/constants/section-content-type";
import { StandardPageLayout } from "../../../layouts/standard-page";
import { PersonalInformationSection } from "./PersonalInformationSection";
import { ChangePasswordSection } from "./ChangePasswordSection";
import { WelcomeUserSection } from "./WelcomeUserSection";
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
//UI
import { StyledGrid, StyledPaper, StyledTypography, StyledContainer } from "@hcl-commerce-store-sdk/react-component";

/**
 * Account component
 * display account details
 * @param props
 */
function AccountSummary() {
  const { t } = useTranslation();
  const title = t("AccountSummary.Title");
  const sectionOne: SectionContent[] = [
    {
      key: "account-summary-b2b-page",
      CurrentComponent: () => {
        return (
          <StyledContainer className="page">
            <StyledTypography variant="h4" className="vertical-margin-4">
              {title}
            </StyledTypography>
            <StyledGrid container spacing={2}>
              <StyledGrid item xs={12} md={3} className="sidebar">
                <AccountSidebar />
              </StyledGrid>
              <StyledGrid container item xs={12} md={9}>
                <StyledGrid item xs={12} className="bottom-margin-2">
                  <StyledPaper className="vertical-padding-2 horizontal-padding-2">
                    <WelcomeUserSection />
                  </StyledPaper>
                </StyledGrid>
                <StyledGrid item xs={12}>
                  <StyledPaper className="vertical-padding-2 horizontal-padding-2">
                    <StyledGrid container spacing={2}>
                      <StyledGrid item xs={12} md={6} lg={5}>
                        <PersonalInformationSection />
                      </StyledGrid>
                      <StyledGrid item xs={12} md={6} lg={5}>
                        <ChangePasswordSection />
                      </StyledGrid>
                    </StyledGrid>
                  </StyledPaper>
                </StyledGrid>
              </StyledGrid>
            </StyledGrid>
          </StyledContainer>
        );
      },
    },
  ];
  return <StandardPageLayout cid="my-account-b2b" sectionOne={sectionOne} />;
}

export default AccountSummary;
