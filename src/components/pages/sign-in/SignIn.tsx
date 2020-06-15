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
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { SignInLayout } from "../../widgets/sign-in";
import { RegistrationLayout } from "../../widgets/registration";
import { RegistrationB2BLayout } from "../../widgets/registration-b2b";
import { TitleLayout } from "../../widgets/title";
import { StandardPageHero2BlocksLayout } from "../../layouts/standard-page-hero-2-blocks";
import { SectionContent } from "../../layouts/sectionContentType";

const Sign: React.FC = (props: any) => {
  const { t } = useTranslation();
  const mySite: any = useSite();
  const isB2B: boolean = mySite?.isB2B ? mySite.isB2B : false;
  const redirectRoute: string = props.location?.state?.redirectRoute
    ? props.location.state.redirectRoute
    : "";
  const title = t("SignInPage.Title");

  const banner: SectionContent[] = [
    {
      key: "sign-in-registration-page-title",
      CurrentComponent: () => {
        return (
          <TitleLayout cid="sign-in-registration-page-title" title={title} />
        );
      },
    },
  ];

  const sectionOne: SectionContent[] = [
    {
      key: "sign-in-registration-page-signin",
      CurrentComponent: () => {
        return (
          <SignInLayout
            cid="sign-in-registration-page-signin"
            redirectRoute={redirectRoute}
          />
        );
      },
    },
  ];

  const sectionTwo: SectionContent[] = [
    {
      key: "sign-in-registration-page-new-registration",
      CurrentComponent: () => {
        return (
          <>
            {isB2B ? (
              <RegistrationB2BLayout cid="sign-in-registration-page-new-registration" />
            ) : (
              <RegistrationLayout cid="sign-in-registration-page-new-registration" />
            )}
          </>
        );
      },
    },
  ];

  return (
    <StandardPageHero2BlocksLayout
      cid="sign-in-registration-page"
      banner={banner}
      sectionOne={sectionOne}
      sectionTwo={sectionTwo}
    />
  );
};

export default Sign;
