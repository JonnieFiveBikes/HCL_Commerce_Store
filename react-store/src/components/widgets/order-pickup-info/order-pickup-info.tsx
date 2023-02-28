/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//UI
import { StyledGrid, StyledTypography, StyledIconLabel, StyledBox } from "@hcl-commerce-store-sdk/react-component";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
//foundation libraries
import OrderDetailSubsection from "../order-detail-subsection/OrderDetailSubsection";
import { OrderItemTable } from "../order-item-table";
import { PICKUP_ONBEHALF, SELF_PICKUP } from "../../../constants/common";
import { SHIPMODE } from "../../../constants/order";
import { useSite } from "../../../_foundation/hooks/useSite";
import storeUtil from "../../../utils/storeUtil";

interface OrderPickupInfoProps<T> {
  orderItems: [T, ...T[]];
  parentComponent?: string;
}

const OrderPickupInfo: React.FC<OrderPickupInfoProps<any>> = ({ orderItems, parentComponent }) => {
  const { t } = useTranslation();
  const item = orderItems[0];
  const userData = item.shipInstruction ? JSON.parse(item.shipInstruction) : {};
  const { mySite, storeDisplayName } = useSite();
  const [partitionedBySellers, setPartBySellers] = useState<any[]>([]);
  const readOnly = true;
  const className = "review-order";
  const preShip = parentComponent === "Review";
  const detailsClass = "flex-direction--column";

  useEffect(() => {
    const parts = storeUtil.partitionBySellers(orderItems, storeDisplayName, mySite);
    setPartBySellers(parts);
  }, [orderItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const details = partitionedBySellers.length ? (
    partitionedBySellers.map((s, key) => <OrderItemTable {...{ preShip, readOnly, className, key, ...s }} />)
  ) : (
    <OrderItemTable {...{ data: orderItems, preShip, readOnly, className }} />
  );
  return (
    <>
      <StyledGrid item xs={12}>
        <OrderDetailSubsection
          heading={<StyledTypography variant="h4">{t("OrderShippingInfo.Labels.CartDetails")}</StyledTypography>}
          details={details}
          detailsClass={detailsClass}></OrderDetailSubsection>
      </StyledGrid>
      <StyledGrid item xs={12}>
        <OrderDetailSubsection
          heading={
            <StyledTypography variant="h4">
              {item.shipModeCode === SHIPMODE.shipModeCode.PickUp
                ? t("Pickup.PickupDetailsTitle")
                : t("OrderShippingInfo.Labels.ShippingDetails")}
            </StyledTypography>
          }
          details={
            <StyledGrid container spacing={2}>
              <StyledGrid item md={4} xs={12}>
                <StyledIconLabel icon={<HomeIcon color="primary" />} label={t("Pickup.PickupContactTitle")} />
                <StyledBox my={2}>
                  <StyledTypography variant="body2">{t("Pickup.ContactDetailsTitle")}</StyledTypography>
                  {userData.type === SELF_PICKUP ? (
                    <>
                      <StyledTypography>
                        {userData?.firstName} {userData?.lastName}
                      </StyledTypography>
                      <StyledTypography>{userData?.email}</StyledTypography>
                      <StyledTypography>{userData?.phone}</StyledTypography>
                    </>
                  ) : null}
                  {userData.type === PICKUP_ONBEHALF ? (
                    <>
                      <StyledTypography>{userData?.buyerPersonFullName}</StyledTypography>
                      <StyledTypography>{userData?.pickupPersonEmail}</StyledTypography>
                    </>
                  ) : null}
                </StyledBox>
              </StyledGrid>
              <StyledGrid item md={4} xs={12}>
                <StyledIconLabel icon={<LocalShippingIcon color="primary" />} label={t("Pickup.PickupStoreTitle")} />
                <StyledBox my={2}>
                  <StyledTypography variant="body2">{item.fulfillmentCenterName}</StyledTypography>
                  <StyledTypography>{item.addressLine[0]}</StyledTypography>
                  <StyledTypography>
                    {item.city}, {item.stateOrProvinceName}, {item.postalCode}
                  </StyledTypography>
                </StyledBox>
              </StyledGrid>
            </StyledGrid>
          }></OrderDetailSubsection>
      </StyledGrid>
    </>
  );
};

export default OrderPickupInfo;
