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
//Custom libraries
import { useRequisitionList } from "../../../_foundation/hooks/use-requisition-lists";

//HCL SDK
import { CustomTable } from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";

export const RequisitionListsTable = (props: any) => {
  const { columns, data, labels, t, actionData, paginationData } = useRequisitionList();
  const T = useMemo(() => CustomTable, []);
  return <T {...{ t, labels, data, columns, actionData, paginationData }} />;
};
