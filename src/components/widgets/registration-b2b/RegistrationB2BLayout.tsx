/**
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
import { Link } from "react-router-dom";
//Custom libraries
import {
  BUYER_REGISTRATION,
  ORG_REGISTRATION,
} from "../../../constants/routes";
//UI
import { StyledGrid, StyledButton, StyledTypography } from "../../StyledUI";

interface RegistrationB2BContext {
  cid: string;
}

/**
 * Registration links for B2B
 * displays links to B2B registration forms
 * @param props
 */
const RegistrationB2BLayout: React.FC<RegistrationB2BContext> = (
  props: any
) => {
  const { t } = useTranslation();
  const cid = props.cid;

  return (
    <>
      <StyledTypography
        component="h1"
        variant="h4"
        id={`registration_h4_3_${cid}`}
        className="bottom-margin-2">
        {t("RegistrationB2BLayout.Title")}
      </StyledTypography>
      <StyledGrid container direction="column" spacing={3}>
        <StyledGrid item xs={12} md={6}>
          <StyledButton
            component={Link}
            to={BUYER_REGISTRATION}
            color="primary"
            fullWidth>
            {t("RegistrationB2BLayout.Actions.BuyerReg")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item xs={12} md={6}>
          <StyledButton
            component={Link}
            to={ORG_REGISTRATION}
            color="primary"
            fullWidth>
            {t("RegistrationB2BLayout.Actions.OrgReg")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </>
  );
};

export { RegistrationB2BLayout };
