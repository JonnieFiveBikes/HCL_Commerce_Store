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

import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";
import { useInprogressItems } from "../../../_foundation/hooks/use-inprogress-items";

const Garnish = (props: any) => {
  const {
    checkBox,
    columns,
    rows: data,
    detailPanel,
    disabled,
    labels,
    t,
    selectionActions,
    paginationData,
  } = useInprogressItems(props);

  const T = useMemo(() => {
    return (
      <CustomTable
        {...{
          className: "table-tablet",
          checkBox,
          disabled,
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
  }, [data, disabled]); // eslint-disable-line react-hooks/exhaustive-deps
  return T;
};

export const InProgressItemsTable = (props: any) => {
  const T = useMemo(() => withCustomTableContext(Garnish), []);
  return <T {...props} />;
};
