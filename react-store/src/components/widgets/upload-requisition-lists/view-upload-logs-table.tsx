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
import { useViewUploadLogs } from "../../../_foundation/hooks/use-view-upload-logs";
//UI
import {
  CustomTable,
  withCustomTableContext,
} from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";

export const ViewUploadLogsTable = (props: any) => {
  const { tableData } = useViewUploadLogs();
  const T = useMemo(() => withCustomTableContext(CustomTable), []);
  return <>{tableData.data ? <T {...tableData} /> : null}</>;
};
