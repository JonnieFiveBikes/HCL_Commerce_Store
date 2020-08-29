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
import { AddressCard } from "../address-card";
//UI
import { StyledTypography } from "../../StyledUI";

interface OrderBillingInfoProps {
  billingInfo: any;
}

/**
 * Order Billing info component
 * displays billing info details of an order
 * @param props
 */
const OrderBillingInfo: React.FC<OrderBillingInfoProps> = (props: any) => {
  const billingInfo = props.billingInfo;
  const { t } = useTranslation();

  return (
    <>
      <StyledTypography variant="h6" gutterBottom>
        {t("OrderBillingInfo.Title")}
      </StyledTypography>
      {billingInfo && billingInfo.billing_address_id && (
        <>
          <StyledTypography variant="overline" gutterBottom>
            {t("OrderBillingInfo.Labels.BillAddress")}
          </StyledTypography>
          <AddressCard
            addressId={billingInfo.billing_address_id}
            addressData={billingInfo}
            nickName={billingInfo.nickName}
            readOnly={true}
          />
        </>
      )}
    </>
  );
};

export { OrderBillingInfo };
