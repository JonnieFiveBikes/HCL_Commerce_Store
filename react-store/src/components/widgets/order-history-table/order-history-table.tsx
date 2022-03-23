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
//Custom libraries
import { useOrderHistoryTable } from "../../../_foundation/hooks/use-order-history-table";

//HCL SDK
import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";

export const OrderHistoryTable = (props: any) => {
  const { noPagination, noActions, outerClassName } = props;
  const { columns, data, t, paginationData, actionData, labels } = useOrderHistoryTable(props);
  const T = useMemo(() => withCustomTableContext(CustomTable), []);

  return (
    <T
      {...{
        className: "better-pivot",
        outerClassName,
        actionData: noActions ? null : actionData,
        t,
        columns,
        data,
        paginationData: noPagination ? null : paginationData,
        labels,
      }}
    />
  );
};
