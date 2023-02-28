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
import { useTranslation } from "react-i18next";
//Foundation libraries
//Custom libraries
import addressUtil from "../../../../utils/addressUtil";
import { EMPTY_STRING } from "../../../../constants/common";
import { CountryState } from "../../../widgets/country-state";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledTextField,
  StyledButton,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { useSellerRegistration } from "./use-seller-registration";
import { RegistrationInfo, useSellerRegContext } from "./seller-registration-context";

const SellerOrganization = (props: any) => {
  const { t } = useTranslation();
  const { orgReg, setOrgReg } = useSellerRegContext();
  const { canProceedToInfoPage, handleSellerOrgSubmit, navHome } = useSellerRegistration();

  const setAttr = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setOrgReg({ ...orgReg, [name]: value } as RegistrationInfo);
  };

  const setCountry = (value) => setAttr({ target: { name: "country", value } });
  const setState = (value) => setAttr({ target: { name: "state", value } });

  return (
    <StyledContainer>
      <StyledGrid container item xs={12} md={6}>
        <StyledGrid item>
          <StyledTypography variant="h5" className="bottom-margin-2 top-margin-2">
            {t("SellerRegistration.SellerOrganizationTitle")}
          </StyledTypography>
        </StyledGrid>
        <StyledGrid container item spacing={2}>
          <StyledGrid item xs={12}>
            <StyledTextField
              required
              data-testid="sellerFullName"
              inputProps={{ maxLength: 254 }}
              label={t("SellerRegistration.SellerFull")}
              name="firstName"
              autoFocus
              fullWidth
              variant="outlined"
              value={orgReg.firstName ?? EMPTY_STRING}
              onChange={setAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledTextField
              required
              data-testid="address1"
              name="address1"
              label={t("SellerRegistration.Address1")}
              onChange={setAttr}
              value={orgReg.address1 ?? EMPTY_STRING}
              inputProps={{ maxLength: 99 }}
              fullWidth
              autoComplete="address1"
            />
          </StyledGrid>

          <StyledGrid item xs={12}>
            <StyledTextField
              data-testid="address2"
              name="address2"
              label={t("SellerRegistration.Address2")}
              onChange={setAttr}
              value={orgReg.address2 ?? EMPTY_STRING}
              inputProps={{ maxLength: 99 }}
              fullWidth
              autoComplete="address2"
            />
          </StyledGrid>

          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              data-testid="city"
              inputProps={{ maxLength: 40 }}
              label={t("SellerRegistration.City")}
              name="city"
              fullWidth
              value={orgReg.city ?? EMPTY_STRING}
              onChange={setAttr}
            />
          </StyledGrid>
          <CountryState
            country={orgReg.country ?? ""}
            setCountry={setCountry}
            state={orgReg.state ?? ""}
            setState={setState}
          />
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              data-testid="zipCode"
              inputProps={{ maxLength: 30 }}
              label={t("SellerRegistration.ZipCode")}
              name="zipCode"
              fullWidth
              value={orgReg.zipCode ?? EMPTY_STRING}
              onChange={setAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledTextField
              required
              data-testid="email"
              name="email1"
              type="email"
              label={t("SellerRegistration.Email")}
              onChange={setAttr}
              value={orgReg.email1 ?? EMPTY_STRING}
              error={!addressUtil.validateEmail(orgReg.email1)}
              helperText={
                !addressUtil.validateEmail(orgReg.email1) ? t("AddressForm.Msgs.InvalidFormat") : EMPTY_STRING
              }
              inputProps={{ maxLength: 35 }}
              fullWidth
              autoComplete="email"
            />
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
      <StyledGrid container justifyContent="space-between" className="top-margin-2 bottom-margin-2">
        <StyledGrid item>
          <StyledButton testId="display-information-back-button" onClick={navHome} color="secondary">
            {t("SellerRegistration.Cancel")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            testId="seller-organization-next-button"
            onClick={handleSellerOrgSubmit}
            color="primary"
            disabled={!canProceedToInfoPage()}>
            {t("SellerRegistration.Next")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default SellerOrganization;
