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
import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { PAGINATION } from "../../../constants/common";

const OrderItemTableComponent = (props: any) => {
  const { miniCartView: c, className: n, outerClassName: oc } = props;
  const { actionData, columns, data, t, labels, detailPanel, panelExpanderComps } = useOrderItemTable(props);
  const className = [n, c ? "mini-cart-table" : "order-item-table"].filter(Boolean).join(" ");
  const outerClassName = c ? "" : oc;
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

  return (
    <CustomTable
      {...{
        t,
        labels,
        data,
        columns,
        className,
        detailPanel: c ? null : detailPanel,
        showPanelOnMobile: true,
        outerClassName,
        paginationData,
        panelExpanderComps,
        actionData,
      }}
    />
  );
};

export const OrderItemTable = (props) => {
  const WithCTCtx = useMemo(() => withCustomTableContext(OrderItemTableComponent), []);
  return <WithCTCtx {...props} />;
};
