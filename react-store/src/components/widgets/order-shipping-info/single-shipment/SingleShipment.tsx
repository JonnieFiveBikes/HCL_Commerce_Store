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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import { AddressCard } from "../../address-card";
import { OrderItemTable } from "../../order-item-table";
import OrderDetailSubsection from "../../order-detail-subsection/OrderDetailSubsection";
//UI
import { StyledGrid, StyledTypography, StyledIconLabel, StyledBox } from "@hcl-commerce-store-sdk/react-component";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import { get } from "lodash-es";
import { SELECTED_PROFILE } from "../../../../_foundation/constants/common";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { allowableShipModesSelector } from "../../../../redux/selectors/order";
import { useEffect } from "react";
import storeUtil from "../../../../utils/storeUtil";
import { useSite } from "../../../../_foundation/hooks/useSite";
interface SingleShipmentProps<T> {
  orderItems: [T, ...T[]];
  selectedProfileOrderItem: [T, ...T[]];
  showHeading?: boolean;
}

const SingleShipment: React.FC<SingleShipmentProps<any>> = ({
  orderItems,
  showHeading,
  selectedProfileOrderItem,
}: SingleShipmentProps<any>) => {
  const { t } = useTranslation();
  const location: any = useLocation();
  const usingProfile = get(location, `state.${SELECTED_PROFILE}`);
  const shipModes = useSelector(allowableShipModesSelector);
  const item = orderItems[0];
  const [shipModeMap, setShipModeMap] = useState<any>({});
  const preShip = showHeading;
  const { mySite, storeDisplayName } = useSite();
  const [partitionedBySellers, setPartBySellers] = useState<any[]>([]);
  const readOnly = true;
  const className = "review-order";
  const detailsClass = "flex-direction--column";

  useEffect(() => {
    setShipModeMap(storeUtil.toMap(shipModes, "shipModeId"));
  }, [shipModes]);

  useEffect(() => {
    const parts = storeUtil.partitionBySellers(orderItems, storeDisplayName, mySite);
    setPartBySellers(parts);
  }, [orderItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const heading = showHeading ? (
    <StyledTypography variant="h4">{t("OrderShippingInfo.Labels.CartDetails")}</StyledTypography>
  ) : null;
  const details = partitionedBySellers.length ? (
    partitionedBySellers.map((s, key) => <OrderItemTable {...{ preShip, readOnly, className, key, ...s }} />)
  ) : (
    <OrderItemTable {...{ data: orderItems, preShip, readOnly, className }} />
  );

  return (
    <>
      <StyledGrid item xs={12}>
        <OrderDetailSubsection {...{ heading, details, detailsClass }}></OrderDetailSubsection>
      </StyledGrid>
      <StyledGrid item xs={12}>
        <OrderDetailSubsection
          heading={<StyledTypography variant="h4">{t("OrderShippingInfo.Labels.ShippingDetails")}</StyledTypography>}
          details={
            <StyledGrid container spacing={2}>
              <StyledGrid item md={4} xs={12}>
                <StyledIconLabel icon={<HomeIcon color="primary" />} label={t("Shipping.Labels.ShippingAddress")} />
                <StyledBox my={2}>
                  <AddressCard
                    addressId={
                      usingProfile && selectedProfileOrderItem[0]
                        ? selectedProfileOrderItem[0].addressId
                        : item.addressId
                    }
                    addressData={usingProfile && selectedProfileOrderItem[0] ? selectedProfileOrderItem[0] : item}
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
                    {usingProfile && selectedProfileOrderItem[0] && shipModeMap[selectedProfileOrderItem[0].shipModeId]
                      ? shipModeMap[selectedProfileOrderItem[0].shipModeId].shipModeDescription
                      : item.shipModeDescription}
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
