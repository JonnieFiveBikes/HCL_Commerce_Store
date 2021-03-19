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

  const { t } = useTranslation();

  return (
    <>
      {mySite && (
        <>
          {max === null ? (
            min === null ? (
              <>{t("PriceDisplay.Labels.Pending")}</>
            ) : (
              <>
                {Intl.NumberFormat(i18n.languages[0], {
                  style: "currency",
                  currency,
                }).format(min)}
              </>
            )
          ) : (
            <>{`${Intl.NumberFormat(i18n.languages[0], {
              style: "currency",
              currency,
            }).format(min)} - ${Intl.NumberFormat(i18n.languages[0], {
              style: "currency",
              currency,
            }).format(max)}`}</>
          )}
        </>
      )}
    </>
  );
};

export default FormattedPriceDisplay;
