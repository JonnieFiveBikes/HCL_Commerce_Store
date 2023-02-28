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
//Custom libraries
import FormattedPriceDisplay from "../formatted-price-display";
//UI
import { StyledGrid, StyledTypography } from "@hcl-commerce-store-sdk/react-component";

interface OrderTotalSummaryProps {
  order: any;
  estimate?: boolean;
}

/**
 * Order total summary component
 * displays order total summary section including subtotal, taxes, shipping, discounts and total, if applied
 * @param props
 */
const OrderTotalSummary: React.FC<OrderTotalSummaryProps> = (props: any) => {
  const { t } = useTranslation();
  const { order, estimate } = props;
  const { subtotal, tax, shipping, shippingTax, totalDiscounts, grandTotal } = initOrderTotalSummary();
  const prefix = "OrderTotalSummary.Labels";
  const estKey = estimate ? "Estimated" : "";

  /**
   * Initialize the summary data
   */
  function initOrderTotalSummary() {
    let subtotal: number | null = null;
    let tax: number | null = null;
    let shipping: number | null = null;
    let shippingTax: number | null = null;
    let totalDiscounts: number | null = null;
    let grandTotal: number | null = null;
    if (order) {
      try {
        subtotal = order.totalProductPrice ? parseFloat(order.totalProductPrice) : null;
        tax = order.totalSalesTax ? parseFloat(order.totalSalesTax) : null;
        shipping = order.totalShippingCharge ? parseFloat(order.totalShippingCharge) : null;
        shippingTax = order.totalShippingTax ? parseFloat(order.totalShippingTax) : null;
        totalDiscounts = order.totalAdjustment ? parseFloat(order.totalAdjustment) : null;
        grandTotal = order.grandTotal ? parseFloat(order.grandTotal) : null;
      } catch (e) {
        console.log("Could not parse order total summary");
      }
    }
    return {
      subtotal,
      tax,
      shipping,
      shippingTax,
      totalDiscounts,
      grandTotal,
    };
  }

  return (
    <StyledGrid container>
      {subtotal ? (
        <>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom>{t(`${prefix}.Subtotal`)}</StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom align="right">
              <FormattedPriceDisplay min={subtotal} currency={order.totalProductPriceCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      ) : null}
      {tax != null ? (
        <>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom>{t(`${prefix}.${estKey}Tax`)}</StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom align="right">
              <FormattedPriceDisplay min={tax} currency={order.totalSalesTaxCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      ) : null}
      {shipping != null ? (
        <>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom>{t(`${prefix}.${estKey}Shipping`)}</StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom align="right">
              <FormattedPriceDisplay min={shipping} currency={order.totalShippingChargeCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      ) : null}
      {shippingTax != null ? (
        <>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom>{t(`${prefix}.${estKey}ShippingTax`)}</StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography gutterBottom align="right">
              <FormattedPriceDisplay min={shippingTax} currency={order.totalShippingTaxCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      ) : null}
      {totalDiscounts !== null && totalDiscounts !== 0 ? (
        <>
          <StyledGrid item xs={6}>
            <StyledTypography className="total-discount" gutterBottom>
              {t(`${prefix}.Discount`)}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography className="total-discount" gutterBottom align="right">
              <FormattedPriceDisplay min={totalDiscounts} currency={order.totalAdjustmentCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      ) : null}
      {grandTotal != null ? (
        <>
          <StyledGrid item xs={6}>
            <StyledTypography variant="subtitle1" gutterBottom>
              {t(`${prefix}.${estKey}Total`)}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography variant="subtitle1" gutterBottom align="right">
              <FormattedPriceDisplay min={grandTotal} currency={order.grandTotalCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      ) : null}
    </StyledGrid>
  );
};

export { OrderTotalSummary };
