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
//Custom libraries
import ForgotPasswordLayout from "./ForgotPasswordLayout";
import { StandardPageHero2BlocksLayout } from "../../layouts/standard-page-hero-2-blocks";
import { SectionContent } from "../../../_foundation/constants/section-content-type";

const ForgotPassword: React.FC = (props: any) => {
  const forgotPassword: SectionContent[] = [
    {
      key: "forgot-password-page-forgotpassword",
      CurrentComponent: () => {
        return <ForgotPasswordLayout />;
      },
    },
  ];

  return <StandardPageHero2BlocksLayout cid="forgot-password-page" sectionOne={forgotPassword} />;
};

export default ForgotPassword;
