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

import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";
import { useRequisitionListItems } from "../../../_foundation/hooks/use-requisition-list-items";

const Garnish = (props: any) => {
  const {
    checkBox,
    columns,
    rows: data,
    detailPanel,
    showPanelOnMobile,
    labels,
    t,
    selectionActions,
    paginationData,
  } = useRequisitionListItems(props);

  const T = useMemo(() => {
    return (
      <CustomTable
        {...{
          className: "list-item-table table-tablet",
          checkBox,
          showPanelOnMobile,
          labels,
          t,
          columns,
          detailPanel,
          data,
          selectionActions,
          paginationData,
        }}
      />
    );
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  return T;
};

export const RequisitionListItemsTable = (props: any) => {
  const T = useMemo(() => withCustomTableContext(Garnish), []);
  return <T {...props} />;
};
