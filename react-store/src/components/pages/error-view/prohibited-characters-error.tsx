/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *==================================================
 */
//Standard libraries
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
//Custom libraries
import { HOME } from "../../../constants/routes";
//UI
import {
  StyledContainer,
  StyledButton,
  StyledPaper,
  StyledTypography,
  StyledGrid,
} from "@hcl-commerce-store-sdk/react-component";
import Divider from "@mui/material/Divider";

const ProhibitedCharactersErrorView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const gotoHomePage = () => {
    navigate(HOME);
  };
  return (
    <StyledGrid container spacing={2} alignItems="center" justifyContent="center" direction="column">
      <StyledGrid item xs={12}>
        <StyledContainer>
          <StyledPaper className="top-margin-5 horizontal-padding-2 vertical-padding-3">
            <StyledTypography component="h4" variant="h5">
              {t("error-message.ProhibitedCharacterErrorTitle")}
            </StyledTypography>
            <Divider className="bottom-margin-2" />
            <StyledTypography variant="body1" className="bottom-margin-1">
              {t("error-message.ProhibitedCharacterErrorMsg")}
            </StyledTypography>
            <StyledButton
              testId="prohibited-error-view-goto-home"
              variant="text"
              color="secondary"
              onClick={() => gotoHomePage()}>
              {t("StoreLocator.home")}
            </StyledButton>
          </StyledPaper>
        </StyledContainer>
      </StyledGrid>
    </StyledGrid>
  );
};

export default ProhibitedCharactersErrorView;
