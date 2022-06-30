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
import React, { useState } from "react";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { SignInLayout } from "../../widgets/sign-in";
import { RegistrationLayout } from "../../widgets/registration";
import { RegistrationB2BLayout } from "../../widgets/registration-b2b";
import { StandardPageHero2BlocksLayout } from "../../layouts/standard-page-hero-2-blocks";
import { SectionContent } from "../../../_foundation/constants/section-content-type";
import { useLocation } from "react-router";

const Sign: React.FC = (props: any) => {
  const { mySite } = useSite();
  const isB2B: boolean = mySite?.isB2B ? mySite.isB2B : false;
  const [showSignIn, setShowSignIn] = useState(true);
  const redirectRoute: string = props.location?.state?.redirectRoute ? props.location.state.redirectRoute : "";
  const location: any = useLocation();
  const checkoutFlow = location.state?.checkoutFlow;

  const toggleSignInRegisterpage = (flag: boolean) => {
    setShowSignIn(flag);
  };
  const sectionOne: SectionContent[] = [
    {
      key: "sign-in-registration-page-signin",
      CurrentComponent: () => {
        return (
          <SignInLayout
            cid="sign-in-registration-page-signin"
            redirectRoute={redirectRoute}
            hideRegistrationPage={toggleSignInRegisterpage}
            checkoutFlow={checkoutFlow}
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
              <RegistrationLayout
                cid="sign-in-registration-page-new-registration"
                showSignInPage={toggleSignInRegisterpage}
              />
            )}
          </>
        );
      },
    },
  ];

  return isB2B ? (
    <StandardPageHero2BlocksLayout cid="sign-in-registration-page" sectionOne={sectionOne} sectionTwo={sectionTwo} />
  ) : (
    <StandardPageHero2BlocksLayout cid="sign-in-registration-page" sectionOne={showSignIn ? sectionOne : sectionTwo} />
  );
};

export default Sign;
