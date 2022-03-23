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
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import FormattedPriceDisplay from "../formatted-price-display";
//UI
import { StyledGrid, StyledTypography } from "@hcl-commerce-store-sdk/react-component";

interface OrderDiscountSummaryProps {
  order: any;
}

/**
 * Order discounts summary component
 * displays break down of the discounts on the order
 * @param props
 */
const OrderDiscountSummary: React.FC<OrderDiscountSummaryProps> = (props: any) => {
  const { t } = useTranslation();

  const order = props.order;
  const { totalDiscounts, discountList } = initOrderDiscountSummary();

  /**
   * Initialize the discount data
   */
  function initOrderDiscountSummary() {
    let totalDiscounts: number | null = null;
    let discountList: any[] = [];
    if (order) {
      try {
        totalDiscounts = order.totalAdjustment ? parseFloat(order.totalAdjustment) : null;
        discountList = order.adjustment ? order.adjustment : [];
      } catch (e) {
        console.log("Could not parse order discount summary");
      }
    }
    return {
      totalDiscounts,
      discountList,
    };
  }

  return (
    <StyledGrid container>
      {totalDiscounts !== null && totalDiscounts !== 0 && (
        <>
          {discountList.map((discount: any, index: number) => (
            <Fragment key={discount.code}>
              <StyledGrid item xs={6}>
                <StyledTypography gutterBottom>
                  {discount.description ? discount.description : discount.code.replace(/-\d+$/, "")}
                </StyledTypography>
              </StyledGrid>
              <StyledGrid item xs={6}>
                <StyledTypography gutterBottom align="right">
                  <FormattedPriceDisplay min={parseFloat(discount.amount)} currency={discount.currency} />
                </StyledTypography>
              </StyledGrid>
            </Fragment>
          ))}
          <StyledGrid item xs={6}>
            <StyledTypography variant="body1" gutterBottom>
              {t("OrderDiscountSummary.Labels.Total")}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={6}>
            <StyledTypography variant="body1" gutterBottom align="right">
              <FormattedPriceDisplay min={totalDiscounts} currency={order.totalAdjustmentCurrency} />
            </StyledTypography>
          </StyledGrid>
        </>
      )}
    </StyledGrid>
  );
};

export { OrderDiscountSummary };
