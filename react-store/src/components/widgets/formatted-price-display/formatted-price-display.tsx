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
import { PriceDisplay } from "@hcl-commerce-store-sdk/react-component";

/**
 * Formatted Price or Price Range Display component
 * displays a price or price range between min price to max price that is formatted to the currency and locale or show price pending if price is not available
 */
const FormattedPriceDisplay = (props: any) => {
  const { mySite } = useSite();
  const { i18n } = useTranslation();
  const min = props.min;
  const max = props.max ? props.max : null;
  const currency = props.currency ? props.currency : mySite ? mySite.defaultCurrencyID : "";

  const { t } = useTranslation();
  const message = t("PriceDisplay.Labels.Pending");
  const language = i18n.languages[0];

  return <PriceDisplay {...{ min, max, currency, message, language }} />;
};

export default FormattedPriceDisplay;
