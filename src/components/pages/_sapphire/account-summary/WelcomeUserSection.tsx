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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Redux
import { userNameSelector } from "../../../../redux/selectors/user";
//UI
import { StyledTypography } from "../../../StyledUI";

function WelcomeUserSection() {
  const { t } = useTranslation();
  const title = t("WelcomeUserSection.Title");
  const message = t("WelcomeUserSection.Message");
  const { firstName, lastName } = useSelector(userNameSelector);

  return (
    <>
      <StyledTypography variant="subtitle1">
        {title}
        {firstName} {lastName}
      </StyledTypography>
      <StyledTypography variant="body1">{message}</StyledTypography>
    </>
  );
}

export { WelcomeUserSection };
