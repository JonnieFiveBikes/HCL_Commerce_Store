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
import { Fragment, useEffect, useState } from "react";
//Foundation libraries
//Custom libraries
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledTextField,
  StyledButton,
  StyledTypography,
  StyledLink,
  StyledCheckbox,
  StyledFormControlLabel,
} from "@hcl-commerce-store-sdk/react-component";
import { useSellerRegistration } from "./use-seller-registration";

const DisplayInformation = (props: any) => {
  const { t } = useTranslation();
  const {
    handleChange,
    canProceedToAdminPage,
    returnToOrgPage,
    handleDisplayInformationSubmit,
    sellerTranslatedInfoList,
    isAllChecked,
    handleCheck,
    handleShowAll,
  } = useSellerRegistration();
  const [addTranslation, setAddTranslation] = useState<boolean>(false);

  useEffect(() => {
    const f = sellerTranslatedInfoList?.filter(({ isDefault }) => !isDefault).filter(({ shown }) => shown);
    if (f?.length) {
      setAddTranslation(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledContainer>
      <StyledGrid spacing={2} container item xs={12} justifyContent="flex-start" alignItems="flex-start">
        <StyledGrid container direction="column" item xs={6}>
          <StyledGrid item>
            <StyledTypography variant="h5" className="bottom-margin-2 top-margin-2">
              {t("SellerRegistration.DisplayInformationTitle")}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography variant="body2" className="bottom-margin-2 top-margin-2">
              {t("SellerRegistration.DisplayInformationDesc")}
            </StyledTypography>
          </StyledGrid>

          {sellerTranslatedInfoList
            .filter(({ shown }) => shown)
            .map((language: any) => (
              <Fragment key={language.langId}>
                <StyledGrid className="top-margin-3 bottom-margin-2" item>
                  <StyledTypography color="primary">
                    {t(`CommerceEnvironment.language.${language.langId}`)}
                  </StyledTypography>
                </StyledGrid>
                <StyledGrid container item spacing={2}>
                  <StyledGrid item xs={12}>
                    <StyledTextField
                      required
                      data-testid={`sellerName_${language.langId}`}
                      inputProps={{ maxLength: 254 }}
                      label={t("SellerRegistration.SellerName")}
                      name={`sellerName_${language.langId}`}
                      autoFocus
                      fullWidth
                      variant="outlined"
                      value={language.sellerName}
                      onChange={(e) => handleChange(language.langId, "sellerName", e.target.value)}
                    />
                  </StyledGrid>
                  <StyledGrid item xs={12}>
                    <StyledTextField
                      required
                      multiline
                      rows={4}
                      data-testid={`sellerDesc_${language.langId}`}
                      inputProps={{ maxLength: 254 }}
                      label={t("SellerRegistration.SellerDesc")}
                      name={`sellerDesc_${language.langId}`}
                      fullWidth
                      variant="outlined"
                      value={language.sellerDescription}
                      onChange={(e) => handleChange(language.langId, "sellerDescription", e.target.value)}
                    />
                  </StyledGrid>
                </StyledGrid>
              </Fragment>
            ))}

          {addTranslation ? null : (
            <StyledGrid className="top-margin-2 bottom-margin-2" item>
              <StyledLink onClick={(e) => setAddTranslation(true)}>
                {t("SellerRegistration.AddTranslations")}
              </StyledLink>
            </StyledGrid>
          )}
        </StyledGrid>

        {addTranslation ? (
          <StyledGrid container direction="column" item xs={6}>
            <StyledGrid item>
              <StyledTypography variant="h5" className="bottom-margin-2 top-margin-2">
                {t("SellerRegistration.TranslationsTitle")}
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item>
              <StyledTypography variant="body2" className="bottom-margin-2 top-margin-2">
                {t("SellerRegistration.TranslationsText")}
              </StyledTypography>
            </StyledGrid>
            <StyledGrid container direction="column" item>
              <StyledGrid item>
                <StyledFormControlLabel
                  control={
                    <StyledCheckbox
                      checked={isAllChecked()}
                      onChange={(e) => handleShowAll(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Show All"
                />
              </StyledGrid>
              {sellerTranslatedInfoList.map((lang: any) => (
                <StyledGrid item>
                  <StyledFormControlLabel
                    className="top-margin-1"
                    key={lang.langId}
                    control={
                      <StyledCheckbox
                        disabled={lang.isDefault}
                        checked={lang.shown}
                        onChange={(e) => handleCheck(lang.langId, e.target.checked)}
                        color="primary"
                      />
                    }
                    label={t(`CommerceEnvironment.language.${lang.langId}`)}
                  />
                </StyledGrid>
              ))}
            </StyledGrid>
          </StyledGrid>
        ) : null}
      </StyledGrid>

      <StyledGrid container justifyContent="space-between" className="top-margin-2 bottom-margin-2">
        <StyledGrid item>
          <StyledButton testId="display-information-back-button" onClick={returnToOrgPage} color="secondary">
            {t("SellerRegistration.Back")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            testId="display-information-next-button"
            onClick={handleDisplayInformationSubmit}
            color="primary"
            disabled={!canProceedToAdminPage()}>
            {t("SellerRegistration.Next")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default DisplayInformation;
