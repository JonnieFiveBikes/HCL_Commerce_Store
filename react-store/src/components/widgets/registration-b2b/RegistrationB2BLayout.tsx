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
import { BUYER_REGISTRATION, ORG_REGISTRATION } from "../../../constants/routes";
//UI
import {
  StyledGrid,
  StyledB2BLandingPageButton,
  StyledTypography,
  StyledPaper,
  StyledIcon,
} from "@hcl-commerce-store-sdk/react-component";
import RegisterBuyer from "@mui/icons-material/PersonOutlineOutlined";
import RegisterOrg from "@mui/icons-material/Business";
interface RegistrationB2BContext {
  cid: string;
}

/**
 * Registration links for B2B
 * displays links to B2B registration forms
 * @param props
 */
const RegistrationB2BLayout: React.FC<RegistrationB2BContext> = (props: any) => {
  const { t } = useTranslation();
  const cid = props.cid;

  return (
    <>
      <StyledPaper className="top-margin-5 horizontal-padding-2 vertical-padding-3 bottom-padding-3">
        <StyledGrid container spacing={4}>
          <StyledGrid item xs={12}>
            <StyledTypography variant="h4" id={`registration_h4_3_${cid}`} className="bottom-margin-2">
              {t("RegistrationB2BLayout.Title")}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item className="bottom-margin-8">
            <StyledGrid container direction="row" spacing={1}>
              <StyledGrid item xs={12} md={6}>
                <StyledB2BLandingPageButton component={Link} to={BUYER_REGISTRATION} color="secondary" fullWidth>
                  <StyledGrid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <StyledGrid item>
                      <StyledIcon
                        icon={<RegisterBuyer className="full-center" />}
                        iconSize={24}
                        backgroundSize={60}
                        iconColor="#ffffff"
                        backgroundColor="rgba(0, 145, 255, 0.6)"
                      />
                    </StyledGrid>
                    <StyledGrid item>
                      <StyledTypography variant="caption" className="shipment-group-heading">
                        {t("RegistrationB2BLayout.Actions.BuyerReg")}
                      </StyledTypography>
                    </StyledGrid>
                    <StyledGrid item className="bottom-margin-1">
                      <StyledTypography variant="caption" display="block" gutterBottom align="center">
                        {t("RegistrationB2BLayout.Actions.AddBuyer")}
                      </StyledTypography>
                    </StyledGrid>
                  </StyledGrid>
                </StyledB2BLandingPageButton>
              </StyledGrid>
              <StyledGrid item xs={12} md={6}>
                <StyledB2BLandingPageButton component={Link} to={ORG_REGISTRATION} color="secondary" fullWidth>
                  <StyledGrid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <StyledGrid item>
                      <StyledIcon
                        icon={<RegisterOrg className="full-center" />}
                        iconSize={24}
                        backgroundSize={60}
                        iconColor="#ffffff"
                        backgroundColor="rgba(0, 145, 255, 0.6)"
                      />
                    </StyledGrid>
                    <StyledGrid item>
                      <StyledTypography variant="caption" className="shipment-group-heading">
                        {t("RegistrationB2BLayout.Actions.OrgReg")}
                      </StyledTypography>
                    </StyledGrid>
                    <StyledGrid item className="bottom-margin-1">
                      <StyledTypography variant="caption" display="block" gutterBottom align="center">
                        {t("RegistrationB2BLayout.Actions.AddOrg")}
                      </StyledTypography>
                    </StyledGrid>
                  </StyledGrid>
                </StyledB2BLandingPageButton>
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
    </>
  );
};

export { RegistrationB2BLayout };
