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
import { useMultipleShipmentTable } from "../../../../_foundation/hooks/use-multiple-shipment-table";

//HCL SDK
import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";

export const MultipleShipmentTable = (props: any) => {
  const { checkBox, labels, t, columns, data, paginationData, selectionActions } = useMultipleShipmentTable(props);
  const T = useMemo(() => withCustomTableContext(CustomTable), []);
  return (
    <T
      {...{
        checkBox,
        t,
        columns,
        data,
        paginationData,
        selectionActions,
        labels,
      }}
    />
  );
};
