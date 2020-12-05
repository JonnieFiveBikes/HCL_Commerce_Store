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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { footerConfig } from "./footerConstant";
import { ContentRecommendationLayout } from "../widgets/content-recommendation";
import { SessionErrorDialog } from "../widgets/session-error-modal";
import ConfirmationDialog from "../widgets/confirmation-dialog/ConfirmationDialog";
//UI
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import {
  StyledGrid,
  StyledContainer,
  StyledTypography,
  StyledFooter,
  StyledTooltip,
} from "../StyledUI";

function Footer(props: any) {
  const { t } = useTranslation();
  const { mySite } = useSite();
  const Logo = () => {
    return mySite != null ? (
      <div className="footer-logo">
        <ContentRecommendationLayout
          cid="footer"
          eSpot={footerConfig.espot}
          page={footerConfig.page}></ContentRecommendationLayout>
      </div>
    ) : null;
  };

  const CustomerServiceLinks = () => {
    const customerServiceLinks = [
      {
        linkDescription: t("Footer.CustomerService.ContactUsDescription"),
        linkText: t("Footer.CustomerService.ContactUs"),
        linkURL: "contact-us",
      },
      {
        linkText: t("Footer.CustomerService.PrivacyPolicy"),
        linkURL: "privacy-policy",
      },
    ];
    return (
      <div className="footer-nav">
        <StyledTypography variant="overline">
          {t("Footer.CustomerService.Label")}
        </StyledTypography>
        <StyledTypography variant="caption">
          {customerServiceLinks.map((v: any) => (
            <div key={v.linkURL}>
              <StyledTooltip title={`${t("Footer.DisabledMessage")}`}>
                <Link
                  key={v.linkURL}
                  // to={`/${v.linkURL}`}
                  to="/"
                  onClick={(event) => event.preventDefault()}
                  // title={ v["linkDescription"] ? v["linkDescription"] : v.linkText}
                >
                  {v.linkText}
                </Link>
              </StyledTooltip>
            </div>
          ))}
        </StyledTypography>
      </div>
    );
  };

  const CompanyLinks = () => {
    const companyLinks = [
      {
        linkText: t("Footer.CompanyLinks.OurStory"),
        linkURL: "our-story",
      },
      {
        linkText: t("Footer.CompanyLinks.Careers"),
        linkURL: "careers",
      },
    ];
    return (
      <div className="contact-us">
        <StyledTypography variant="overline">
          {t("Footer.CompanyLinks.Label")}
        </StyledTypography>
        <StyledTypography variant="caption">
          {companyLinks.map((v: any) => (
            <div key={v.linkURL}>
              <StyledTooltip title={`${t("Footer.DisabledMessage")}`}>
                <Link
                  key={v.linkURL}
                  to="/"
                  onClick={(event) => event.preventDefault()}>
                  {v.linkText}
                </Link>
              </StyledTooltip>
            </div>
          ))}
        </StyledTypography>
      </div>
    );
  };

  const Copyright = () => {
    return (
      <div className="copyright">
        <StyledTypography variant="caption">
          &copy; <span>{new Date().getFullYear()}</span>
          <span> {t("Footer.Copyright")}</span>
        </StyledTypography>
      </div>
    );
  };

  return (
    <>
      <StyledFooter>
        <StyledContainer>
          <StyledGrid container spacing={2} className="footer-top">
            <StyledGrid item xs={12} lg={4}>
              <Logo />
              <StyledTypography variant="caption">
                {t("Footer.Description")}
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={6} sm={4} lg={2}>
              <CustomerServiceLinks />
            </StyledGrid>
            <StyledGrid item xs={6} sm={4} lg={2}>
              <CompanyLinks />
            </StyledGrid>
            <StyledGrid item xs={12} sm={4} lg={4}>
              <div>
                <StyledTypography variant="caption">
                  {t("Footer.FollowUs")}
                </StyledTypography>
              </div>
              <div className="footer-social-link">
                <FacebookIcon />
              </div>
              <div className="footer-social-link">
                <TwitterIcon />
              </div>
              <div className="footer-social-link">
                <InstagramIcon />
              </div>
            </StyledGrid>
          </StyledGrid>
          <StyledGrid container className="footer-bottom">
            <StyledGrid item xs={12} sm={9}>
              <Copyright />
            </StyledGrid>
          </StyledGrid>
        </StyledContainer>
      </StyledFooter>
      <SessionErrorDialog />
      <ConfirmationDialog />
    </>
  );
}

export default Footer;
