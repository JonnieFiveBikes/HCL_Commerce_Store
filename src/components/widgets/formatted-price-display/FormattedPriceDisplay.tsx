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
import Currency from "react-currency-formatter";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";

interface FormattedPriceDisplayProps {
  min: number | null;
  max?: number | null;
  currency?: string;
  locale?: string;
}

/**
 * Formatted Price or Price Range Display component
 * displays a price or price range between min price to max price that is formatted to the currency and locale or show price pending if price is not available
 * @param props
 */
const FormattedPriceDisplay: React.FC<FormattedPriceDisplayProps> = (
  props: any
) => {
  const { mySite } = useSite();
  const { i18n } = useTranslation();
  const min = props.min;
  const max = props.max ? props.max : null;
  const currency = props.currency
    ? props.currency
    : mySite
    ? mySite.defaultCurrencyID
    : "";
  const locale = props.locale
    ? props.locale
    : i18n.languages[0].split("-").join("_");

  const { t } = useTranslation();

  return (
    <>
      {mySite && (
        <>
          {max === null ? (
            min === null ? (
              <>{t("PriceDisplay.Labels.Pending")}</>
            ) : (
              <Currency quantity={min} currency={currency} locale={locale} />
            )
          ) : (
            <>
              <Currency quantity={min} currency={currency} locale={locale} /> -{" "}
              <Currency quantity={max} currency={currency} locale={locale} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default FormattedPriceDisplay;
