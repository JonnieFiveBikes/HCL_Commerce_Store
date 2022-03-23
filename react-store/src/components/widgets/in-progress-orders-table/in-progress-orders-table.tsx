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
import { useInprogressOrders } from "../../../_foundation/hooks/use-inprogress-orders";

//HCL SDK
import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";

export const InProgressOrdersTable = (props: any) => {
  const { columns, data, labels, t, actionData, paginationData } = useInprogressOrders();
  const T = useMemo(() => withCustomTableContext(CustomTable), []);
  return <T {...{ t, labels, data, columns, actionData, paginationData }} />;
};
