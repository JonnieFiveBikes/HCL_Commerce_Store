/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import { useTranslation } from "react-i18next";
//Foundation libraries
//Custom libraries
import DisplayInformation from "./display-information";
import SellerAdministrator from "./seller-administrator";
import SellerOrganization from "./seller-organization";
import { useSellerRegContext, withSellerRegContext } from "./seller-registration-context";
//Redux
//UI
import {
  StyledContainer,
  StyledPaper,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
  StyledGrid,
} from "@hcl-commerce-store-sdk/react-component";
import { TitleLayout } from "../../../widgets/title";

const SellerRegistration: React.FC = () => {
  const { activeStep } = useSellerRegContext();
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <TitleLayout title={t("SellerRegistration.Title")} cid="seller-registration-title" />
      <StyledGrid container item xs={12} direction="column">
        <StyledGrid item>
          <StyledPaper style={{ flex: "1" }}>
            <StyledStepper activeStep={activeStep}>
              <StyledStep key="Organization">
                <StyledStepLabel>{t("SellerRegistration.Labels.organization")}</StyledStepLabel>
              </StyledStep>
              <StyledStep key="Information">
                <StyledStepLabel>{t("SellerRegistration.Labels.information")}</StyledStepLabel>
              </StyledStep>
              <StyledStep key="Administrator">
                <StyledStepLabel>{t("SellerRegistration.Labels.administrator")}</StyledStepLabel>
              </StyledStep>
            </StyledStepper>
          </StyledPaper>
        </StyledGrid>
        <StyledGrid item>
          <StyledPaper className="top-margin-2 bottom-margin-2">
            {activeStep === 0 && <SellerOrganization />}
            {activeStep === 1 && <DisplayInformation />}
            {activeStep === 2 && <SellerAdministrator />}
          </StyledPaper>
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default withSellerRegContext(SellerRegistration);
