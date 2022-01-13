/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

//Standard libraries
import { useMemo } from "react";
//Custom libraries
import { useOrderItemTable } from "../../../_foundation/hooks/use-order-item-table";
//HCL SDK
import {
  CustomTable,
  withCustomTableContext,
} from "@hcl-commerce-store-sdk/react-component";
import { PAGINATION } from "../../../constants/common";

export const OrderItemTable = (props: any) => {
  const { miniCartView: c, className: n } = props;
  const { columns, data, t, labels } = useOrderItemTable(props);
  const className = [n, c ? "mini-cart-table" : "order-item-table"]
    .filter(Boolean)
    .join(" ");
  const outerClassName = c ? "" : undefined;
  const paginationData = c
    ? undefined
    : {
        clientSide: true,
        t,
        sizes: PAGINATION.sizes,
        labels: {
          ofTotalCount: "commonTable.ofTotalCount",
        },
      };

  const T = useMemo(() => withCustomTableContext(CustomTable), []);
  return (
    <T
      {...{
        t,
        labels,
        data,
        columns,
        className,
        outerClassName,
        paginationData,
      }}
    />
  );
};
