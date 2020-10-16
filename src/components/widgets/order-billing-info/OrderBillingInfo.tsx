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
import { StyledIconLabel, StyledBox } from "../../StyledUI";
import ContactsIcon from "@material-ui/icons/Contacts";

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
      {billingInfo && billingInfo.billing_address_id && (
        <>
          <StyledIconLabel
            icon={<ContactsIcon color="primary" />}
            label={t("OrderBillingInfo.Labels.BillAddress")}
          />
          <StyledBox my={2}>
            <AddressCard
              addressId={billingInfo.billing_address_id}
              addressData={billingInfo}
              nickName={billingInfo.nickName}
              readOnly={true}
            />
          </StyledBox>
        </>
      )}
    </>
  );
};

export { OrderBillingInfo };
