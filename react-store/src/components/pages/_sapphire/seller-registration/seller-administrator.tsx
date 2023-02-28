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
import { useSellerRegistration } from "./use-seller-registration";
import { LoginInfo, RegistrationInfo, useSellerRegContext } from "./seller-registration-context";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledTextField,
  StyledButton,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { EMPTY_STRING } from "../../../../constants/common";
import util from "../../../../utils/addressUtil";

const SellerAdministrator = (props: any) => {
  const { t } = useTranslation();
  const { canSubmit, handleSellerAdminSubmit, returnToInfoPage } = useSellerRegistration();
  const { adminReg, setAdminReg } = useSellerRegContext();
  const { address = {} as RegistrationInfo, loginInfo = {} as any } = adminReg;

  const setLoginAttr = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newLoginInfo = { ...loginInfo, [name]: value } as LoginInfo;
    setAdminReg({ ...adminReg, loginInfo: newLoginInfo });
  };

  const setAttr = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newAddr = { ...address, [name]: value } as RegistrationInfo;
    setAdminReg({ ...adminReg, address: newAddr });
  };

  return (
    <StyledContainer>
      <StyledGrid container item xs={12} md={6}>
        <StyledGrid item>
          <StyledTypography variant="h5" className="bottom-margin-2 top-margin-2">
            {t("SellerRegistration.SellerAdminTitle")}
          </StyledTypography>
        </StyledGrid>
        <StyledGrid item>
          <StyledTypography variant="body2" className="bottom-margin-2 top-margin-2">
            {t("SellerRegistration.SellerAdminDesc")}
          </StyledTypography>
        </StyledGrid>
        <StyledGrid container item spacing={2}>
          <StyledGrid item xs={12}>
            <StyledTextField
              required
              inputProps={{ maxLength: 128 }}
              label={t("SellerRegistration.LoginId")}
              name="logonId"
              autoComplete={false}
              autoFocus
              fullWidth
              value={loginInfo.logonId ?? EMPTY_STRING}
              onChange={setLoginAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              inputProps={{ maxLength: 50, type: "password" }}
              label={t("SellerRegistration.Password")}
              name="password"
              autoComplete={false}
              fullWidth
              value={loginInfo.password ?? EMPTY_STRING}
              onChange={setLoginAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              inputProps={{ maxLength: 50, type: "password" }}
              label={t("SellerRegistration.Password2")}
              name="password2"
              fullWidth
              value={loginInfo.password2 ?? EMPTY_STRING}
              onChange={setLoginAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              inputProps={{ maxLength: 40 }}
              label={t("SellerRegistration.FirstName")}
              name="firstName"
              fullWidth
              value={address.firstName ?? EMPTY_STRING}
              onChange={setAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              inputProps={{ maxLength: 40 }}
              label={t("SellerRegistration.LastName")}
              name="lastName"
              fullWidth
              value={address.lastName ?? EMPTY_STRING}
              onChange={setAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              required
              data-testid="email"
              name="email1"
              type="email"
              label={t("SellerRegistration.Email")}
              value={address.email1 ?? EMPTY_STRING}
              error={!util.validateEmail(address.email1)}
              helperText={!util.validateEmail(address.email1) ? t("AddressForm.Msgs.InvalidFormat") : null}
              fullWidth
              onChange={setAttr}
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label={t("SellerRegistration.Phone")}
              name="phone1"
              type="phone"
              value={address.phone1 ?? EMPTY_STRING}
              error={!util.validatePhoneNumber(address.phone1)}
              helperText={!util.validatePhoneNumber(address.phone1) ? t("AddressForm.Msgs.InvalidFormat") : null}
              onChange={setAttr}
            />
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
      <StyledGrid container justifyContent="space-between" className="top-margin-2 bottom-margin-2">
        <StyledGrid item>
          <StyledButton testId="display-information-back-button" onClick={returnToInfoPage} color="secondary">
            {t("SellerRegistration.Back")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            testId="seller-registration-submit"
            onClick={handleSellerAdminSubmit}
            color="primary"
            disabled={!canSubmit()}>
            {t("SellerRegistration.Submit")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default SellerAdministrator;
