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
import AccountSidebar from "../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../widgets/title";
import CheckoutProfileShipping from "./CheckoutProfileShipping";
import CheckoutProfileBilling from "./CheckoutProfileBilling";
import { CHECKOUT_PROFILES } from "../../../constants/routes";
//UI
import {
  StyledContainer,
  StyledPaper,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
  StyledGrid,
  StyledBreadcrumbs,
  StyledLink,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { useCheckoutProfileContext, withCheckoutProfileContext } from "./checkout-profile.context";
import useCheckoutProfile from "../../../_foundation/hooks/use-checkout-profile";

/**
 * Checkout component
 * displays shipping, billing, payment, review sections
 * @param props
 */
const CheckoutProfileCreate: React.FC = (props: any) => {
  const { activeStep, updateProfile } = useCheckoutProfileContext();
  const { landed } = useCheckoutProfile();
  const { t } = useTranslation();

  return (
    <StyledContainer cid="create-checkout-profile" spacing={2}>
      {updateProfile ? (
        <StyledBreadcrumbs className="vertical-padding-2">
          <StyledLink to={CHECKOUT_PROFILES}>
            <StyledTypography variant="h4">{t("CheckoutProfile.TitleCreate")}</StyledTypography>
          </StyledLink>
          <span>
            <StyledTypography variant="h4">{t("CheckoutProfile.EditProfile")}</StyledTypography>
          </span>
        </StyledBreadcrumbs>
      ) : (
        <TitleLayout title={t("CheckoutProfile.CreateCheckoutTitle")} />
      )}

      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3}>
          <AccountSidebar />
        </StyledGrid>

        <StyledGrid container item xs={12} md={9} spacing={2} direction="column">
          <StyledGrid item>
            <StyledPaper style={{ flex: "1" }}>
              <StyledStepper activeStep={activeStep}>
                <StyledStep key="Shipping">
                  <StyledStepLabel>{t("CheckoutProfile.ShippingInformation")}</StyledStepLabel>
                </StyledStep>
                <StyledStep key="Billing">
                  <StyledStepLabel>{t("CheckoutProfile.BillingInformation")}</StyledStepLabel>
                </StyledStep>
              </StyledStepper>
            </StyledPaper>
          </StyledGrid>
          {landed ? (
            <StyledGrid item>{activeStep === 0 ? <CheckoutProfileShipping /> : <CheckoutProfileBilling />}</StyledGrid>
          ) : null}
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default withCheckoutProfileContext(CheckoutProfileCreate);
