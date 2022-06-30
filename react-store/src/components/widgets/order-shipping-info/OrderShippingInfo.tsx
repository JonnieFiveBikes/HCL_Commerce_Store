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
import React, { useMemo } from "react";
//Custom libraries
import SingleShipment from "./single-shipment/SingleShipment";
import ShipmentGroups from "./multiple-shipment/ShipmentGroups";

interface OrderShippingInfoProps {
  shippingInfo: any;
}

/**
 * Order Payment info component
 * displays payment instruction details of an order
 * @param props
 */
const OrderShippingInfo: React.FC<OrderShippingInfoProps> = (props: any) => {
  const { shippingInfo } = props;
  const { orderItems, parentComponent, paymentInstruction } = shippingInfo;
  const preShip = parentComponent === "Review";
  const formatShippingGroup = () => {
    const groups: any[] = [];
    /**
     * groupby addressId and shipModeId
     * groups: [
     *  [{orderItem}, {orderItem}..],
     *  [...],
     *  [...],
     *  '''
     * ]
     */

    if (orderItems) {
      orderItems.forEach((o) => {
        const filteredGroup = groups.filter((g) => {
          return g[0].addressId === o.addressId && g[0].shipModeId === o.shipModeId;
        });
        if (filteredGroup.length === 0) {
          const tempGroup = [{ ...o }];
          groups.push(tempGroup);
        } else {
          const group: any[] = filteredGroup[0];
          group.push({ ...o });
        }
      });
    }
    return groups;
  };
  const shippingGroups = useMemo(formatShippingGroup, [orderItems]);

  return (
    <>
      {shippingGroups.length === 1 && (
        <SingleShipment
          orderItems={shippingGroups[0]}
          selectedProfileOrderItem={paymentInstruction.length > 0 ? paymentInstruction : []}
          showHeading={preShip}
        />
      )}
      {shippingGroups.length > 1 && <ShipmentGroups {...{ preShip, groups: shippingGroups }} />}
    </>
  );
};

export { OrderShippingInfo };
