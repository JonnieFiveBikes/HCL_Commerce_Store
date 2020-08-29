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
import { StyledGrid, StyledTypography } from "../../StyledUI";

interface OrderShippingInfoProps {
  shippingInfo: any;
}

/**
 * Order Payment info component
 * displays payment instruction details of an order
 * @param props
 */
const OrderShippingInfo: React.FC<OrderShippingInfoProps> = (props: any) => {
  const shippingInfo = props.shippingInfo;
  const { t } = useTranslation();

  return (
    <>
      <StyledTypography variant="h6" gutterBottom>
        {t("OrderShippingInfo.Title")}
      </StyledTypography>
      {shippingInfo && (
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} sm={6}>
            {shippingInfo.addressId && (
              <>
                <StyledTypography variant="overline" gutterBottom>
                  {t("OrderShippingInfo.Labels.ShipAddress")}
                </StyledTypography>
                <AddressCard
                  addressId={shippingInfo.addressId}
                  addressData={shippingInfo}
                  readOnly={true}
                />
              </>
            )}
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            {shippingInfo.shipModeDescription && (
              <>
                <StyledTypography variant="overline" gutterBottom>
                  {t("OrderShippingInfo.Labels.ShipMethod")}
                </StyledTypography>
                <StyledTypography gutterBottom>
                  {shippingInfo.shipModeDescription}
                </StyledTypography>
              </>
            )}
          </StyledGrid>
        </StyledGrid>
      )}
    </>
  );
};

export { OrderShippingInfo };
