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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Redux
import { addressDetailsSelector } from "../../../../redux/selectors/account";
//UI
import { StyledTypography } from "@hcl-commerce-store-sdk/react-component";

function WelcomeUserSection() {
  const { t } = useTranslation();
  const title = t("WelcomeUserSection.Title");
  const addressDetails = useSelector(addressDetailsSelector);

  return (
    <>
      <StyledTypography variant="h4" className="vertical-margin-4 break-word">
        {title}
        {addressDetails?.firstName}
      </StyledTypography>
    </>
  );
}

export { WelcomeUserSection };
