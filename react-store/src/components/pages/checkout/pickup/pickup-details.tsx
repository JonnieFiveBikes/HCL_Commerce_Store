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
//UI
import {
  StyledFormControl,
  StyledFormControlLabel,
  StyledGrid,
  StyledPaper,
  StyledRadio,
  StyledRadioGroup,
  StyledTextField,
  StyledTypography,
  StyledButton,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";
//Functional libraries
import addressUtil from "../../../../utils/addressUtil";
import { usePickup } from "../../../../_foundation/hooks/use-pickup";
import { PICKUP_ONBEHALF, SELF_PICKUP } from "../../../../constants/common";
import { withOutletContext } from "../stepper-guard";

/**
 * Pickup section
 * displays pickup details form
 * @param props
 */
const PickupDetails: React.FC = (props: any) => {
  const { t } = useTranslation();
  const {
    phone,
    email,
    firstName,
    lastName,
    pickupPerson,
    handlePickupPerson,
    backToPickupStore,
    canContinue,
    proceed,
    handleFirstName,
    handleLastName,
    handleEmail,
    handlePhone,
    pickupPersonFullName,
    pickupPersonEmail,
    buyerFullName,
    handlePickupPersonFullName,
    handleBuyerFullName,
    handlePickupPersonEmail,
  } = usePickup();
  return (
    <StyledPaper className="vertical-padding-4 horizontal-padding-4">
      <StyledGrid container direction="row" justifyContent="flex-start" spacing={4}>
        <StyledGrid item xs={12} sm={6} container direction="column" justifyContent="flex-start" spacing={2}>
          <StyledGrid item>
            <StyledTypography variant="subtitle2">{t("Pickup.PickupOrderMsg")}</StyledTypography>
          </StyledGrid>
          <StyledGrid item>
            <StyledFormControl className="vertical-margin-1" component="fieldset">
              <StyledRadioGroup name="pickupPerson" value={pickupPerson} onChange={handlePickupPerson}>
                <StyledFormControlLabel
                  data-testid="radio-button-self-pickup"
                  value={SELF_PICKUP}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("Pickup.IllPickupRadioLabel")}</StyledTypography>}
                />
                <StyledFormControlLabel
                  data-testid="radio-button-pickup-onbehalf"
                  value={PICKUP_ONBEHALF}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("Pickup.SomeoneElseRadioLabel")}</StyledTypography>}
                />
              </StyledRadioGroup>
            </StyledFormControl>
          </StyledGrid>
          <Divider className="vertical-margin-1" />
          {pickupPerson === SELF_PICKUP ? (
            <StyledGrid item>
              <StyledTextField
                data-testid="pickup-firstname"
                margin="normal"
                required
                fullWidth
                label={t("Pickup.FirstName")}
                name="firstName"
                onChange={handleFirstName}
                value={firstName}
                inputProps={{
                  maxLength: 40,
                }}
              />

              <StyledTextField
                data-testid="pickup-lastname"
                margin="normal"
                required
                fullWidth
                label={t("Pickup.LastName")}
                name="lastName"
                onChange={handleLastName}
                value={lastName}
                inputProps={{
                  maxLength: 40,
                }}
              />

              <StyledTextField
                data-testid="pickup-email"
                margin="normal"
                required
                fullWidth
                label={t("Pickup.Email")}
                name="email"
                autoComplete="email"
                onChange={handleEmail}
                value={email}
                inputProps={{
                  maxLength: 100,
                  type: "email",
                  placeholder: "name@domain.com",
                }}
                error={!addressUtil.validateEmail(email)}
                helperText={!addressUtil.validateEmail(email) ? t("RegistrationLayout.Msgs.InvalidFormat") : ""}
              />

              <StyledTextField
                data-testid="pickup-phone"
                margin="normal"
                fullWidth
                label={t("Pickup.Phone")}
                name="phone"
                autoComplete="phone"
                onChange={handlePhone}
                value={phone}
                inputProps={{
                  maxLength: 32,
                  type: "tel",
                }}
                error={!addressUtil.validatePhoneNumber(phone)}
                helperText={!addressUtil.validatePhoneNumber(phone) ? t("RegistrationLayout.Msgs.InvalidFormat") : ""}
              />
            </StyledGrid>
          ) : (
            <StyledGrid item>
              <StyledTextField
                data-testid="pickup-person-fullname"
                margin="normal"
                required
                fullWidth
                label={t("Pickup.PickupPersonFullName")}
                name="pickupPersonFullName"
                onChange={handlePickupPersonFullName}
                value={pickupPersonFullName}
                inputProps={{
                  maxLength: 40,
                }}
              />

              <StyledTextField
                data-testid="pickup-person-email"
                margin="normal"
                required
                fullWidth
                label={t("Pickup.PickupPersonEmail")}
                name="pickupPersonEmail"
                autoComplete="pickupPersonEmail"
                onChange={handlePickupPersonEmail}
                value={pickupPersonEmail}
                inputProps={{
                  maxLength: 100,
                  type: "email",
                  placeholder: "name@domain.com",
                }}
                error={!addressUtil.validateEmail(pickupPersonEmail)}
                helperText={
                  !addressUtil.validateEmail(pickupPersonEmail) ? t("RegistrationLayout.Msgs.InvalidFormat") : ""
                }
              />

              <StyledTextField
                data-testid="pickup-buyer-fullname"
                margin="normal"
                required
                fullWidth
                label={t("Pickup.BuyerFullName")}
                name="buyerFullName"
                onChange={handleBuyerFullName}
                value={buyerFullName}
                inputProps={{
                  maxLength: 40,
                }}
              />
            </StyledGrid>
          )}
        </StyledGrid>
        <StyledGrid item xs={12} sm={6} container direction="column" justifyContent="flex-start" spacing={2}>
          <StyledGrid item>
            <StyledTypography variant="subtitle2">{t("Pickup.HowPickupOrderMsg")}</StyledTypography>
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography>{t("Pickup.EmailMsg")}</StyledTypography>
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography>{t("Pickup.ContinueMsg")}</StyledTypography>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>

      <Divider className="vertical-margin-2" />
      <StyledGrid container justifyContent="space-between" spacing={2} className="checkout-actions">
        <StyledGrid item>
          <StyledButton testId="back-to-pickup-store" color="secondary" onClick={backToPickupStore} className="button">
            {t("Pickup.BackToPickupStore")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            testId="pickup-can-continue"
            color="primary"
            disabled={!canContinue()}
            onClick={proceed}
            className="button">
            {t("Pickup.ProceedPayment")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};

export default withOutletContext(PickupDetails);
