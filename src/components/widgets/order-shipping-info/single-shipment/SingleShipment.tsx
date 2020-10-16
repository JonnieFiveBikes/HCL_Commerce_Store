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
import { AddressCard } from "../../address-card";
import { OrderItemTable } from "../../order-item-table";
import OrderDetailSubsection from "../../order-detail-subsection/OrderDetailSubsection";
//UI
import {
  StyledGrid,
  StyledTypography,
  StyledIconLabel,
  StyledBox,
} from "../../../StyledUI";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import HomeIcon from "@material-ui/icons/Home";

interface SingleShipmentProps<T> {
  orderItems: [T, ...T[]];
  showHeading?: boolean;
}

const SingleShipment: React.FC<SingleShipmentProps<any>> = ({
  orderItems,
  showHeading,
}: SingleShipmentProps<any>) => {
  const { t } = useTranslation();

  const item = orderItems[0];
  return (
    <>
      <StyledGrid item xs={12}>
        {!!showHeading ? (
          <OrderDetailSubsection
            heading={
              <StyledTypography variant="h4" gutterBottom>
                {t("OrderShippingInfo.Labels.CartDetails")}
              </StyledTypography>
            }
            details={
              <OrderItemTable
                data={orderItems}
                readOnly={true}
                className="review-order"
              />
            }></OrderDetailSubsection>
        ) : (
          <OrderDetailSubsection
            details={
              <OrderItemTable
                data={orderItems}
                readOnly={true}
                className="review-order"
              />
            }></OrderDetailSubsection>
        )}
      </StyledGrid>
      <StyledGrid item xs={12}>
        <OrderDetailSubsection
          heading={
            <StyledTypography variant="h4" gutterBottom>
              {t("OrderShippingInfo.Labels.ShippingDetails")}
            </StyledTypography>
          }
          details={
            <StyledGrid container spacing={2}>
              <StyledGrid item md={4} xs={12}>
                <StyledIconLabel
                  icon={<HomeIcon color="primary" />}
                  label={t("Shipping.Labels.ShippingAddress")}
                />
                <StyledBox my={2}>
                  <AddressCard
                    addressId={item.addressId}
                    addressData={item}
                    readOnly={true}
                  />
                </StyledBox>
              </StyledGrid>
              <StyledGrid item md={4} xs={12}>
                <StyledIconLabel
                  icon={<LocalShippingIcon color="primary" />}
                  label={t("Shipping.Labels.ShippingMethod")}
                />
                <StyledBox my={2}>
                  <StyledTypography variant="body1" gutterBottom>
                    {item.shipModeDescription}
                  </StyledTypography>
                </StyledBox>
              </StyledGrid>
            </StyledGrid>
          }></OrderDetailSubsection>
      </StyledGrid>
    </>
  );
};

export default SingleShipment;
