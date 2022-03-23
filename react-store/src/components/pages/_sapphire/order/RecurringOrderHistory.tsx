/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *---------------------------------------------------
 */
//Standard libraries
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import orderService from "../../../../_foundation/apis/transaction/order.service";
//Custom libraries
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
//UI
import { CustomTable, StyledTypography, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { PAGINATION } from "../../../../constants/common";
import { cloneDeep } from "lodash-es";

interface RecurringOrderHistoryProps {
  parentOrderId: string;
}

const ATTR2COL = {
  grandTotal: "TOTALPRODUCT",
  placedDate: "TIMEPLACED",
  orderId: "ORDERS_ID",
  orderStatus: "STATUS",
};
const DIRECTION = { asc: "ASC", desc: "DESC" };

const useRecurringOrder = (props) => {
  const { parentOrderId } = props;
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = useMemo(() => [], []);

  const { t, i18n } = useTranslation();
  const [state, setState] = useState<any>({
    offset: 0,
    pgSz: PAGINATION.sizes[0].size,
    data: [],
    count: 0,
    sizes: cloneDeep(PAGINATION.sizes),
  });

  const columns = useMemo(() => {
    const cellStyle = { verticalAlign: "middle" };
    const fmtOpts: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const fmt = new Intl.DateTimeFormat(i18n.languages[0], fmtOpts);

    const headers = [
      {
        title: t("Order.OrderId"),
        idProp: "orderId",
        keyLookup: { key: "orderId" },
        display: {
          cellStyle,
        },
        sortable: {},
      },
      {
        title: t("Order.OrderDate"),
        keyLookup: { key: "placedDate" },
        display: {
          cellStyle,
          template: ({ rowData }) => {
            return <StyledTypography>{fmt.format(new Date(rowData.placedDate))}</StyledTypography>;
          },
        },
        sortable: {},
      },
      {
        title: t("Order.Status"),
        keyLookup: { key: "orderStatus" },
        display: {
          cellStyle,
          template: ({ rowData }) => {
            return <>{t(`Order.Status_${rowData.orderStatus}`)}</>;
          },
        },
        sortable: {},
      },
      {
        title: t("Order.TotalPrice"),
        keyLookup: { key: "grandTotal" },
        headerClass: "text-right",
        display: {
          cellStyle: { ...cellStyle, textAlign: "right" },
          template: ({ rowData: { grandTotal: t, grandTotalCurrency: c } }) => {
            return t ? (
              <StyledTypography>
                <FormattedPriceDisplay min={parseFloat(t)} currency={c} />
              </StyledTypography>
            ) : (
              <StyledTypography>{t(`Order.NotAvailable`)}</StyledTypography>
            );
          },
        },
        sortable: {},
      },
    ];

    return headers;
  }, [t, i18n]);

  useEffect(
    () => () => cancels.forEach((cancel) => cancel()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getOrders = useCallback(
    async (query, orderId) => {
      const widget = getDisplayName(RecurringOrderHistory);
      const payloadBase: any = {
        widget,
        cancelToken: new CancelToken((c) => cancels.push(c)),
      };
      const { pageSize, page, sort } = query;

      const orderBy = sort
        ? {
            orderByFieldName: ATTR2COL[sort.header.keyLookup.key],
            query: { orderBySortingOrder: DIRECTION[sort.direction] },
          }
        : {};

      const pageNumber = page + 1;
      const result = { page, totalCount: 0, data: [] };

      try {
        const r = await orderService.findByParentOrderId({
          orderId,
          pageSize,
          pageNumber,
          ...orderBy,
          ...payloadBase,
        });
        const { recordSetTotal: t, Order: data = [] } = r.data;
        Object.assign(result, { totalCount: parseInt(t), data });
      } catch (e) {
        return result;
      }

      return result;
    },
    [CancelToken, cancels]
  );

  const getPage = useCallback(
    async (props) => {
      const { pgSz, offset, sort: sSort } = state;
      const { pageSize = pgSz, page = offset / pgSz, sort = sSort } = props;

      if (pageSize !== pgSz) {
        state.sizes.forEach((s) => (s.selected = s.size === pageSize));
      }

      const r = await getOrders({ pageSize, page, sort }, parentOrderId);
      setState({
        ...state,
        pgSz: pageSize,
        offset: page * pageSize,
        data: r.data,
        count: r.totalCount,
        sort,
      });
    },
    [state, setState, getOrders, parentOrderId]
  );

  React.useEffect(() => {
    // get first page of data
    getPage({ page: 0, pageSize: PAGINATION.sizes[0].size });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    columns,
    data: state.data,
    t,
    labels: { emptyMsg: "Order.NoRecord" },
    sortAction: getPage,
    paginationData: {
      getPage,
      offset: state.offset,
      count: state.count,
      t,
      sizes: state.sizes,
      labels: {
        ofTotalCount: "commonTable.ofTotalCount",
      },
    },
  };
};

const RecurringOrderHistory: React.FC<RecurringOrderHistoryProps> = (props) => {
  const { t, columns, data, labels, paginationData, sortAction } = useRecurringOrder(props);
  const T = useMemo(() => withCustomTableContext(CustomTable), []);
  return (
    <T
      {...{
        t,
        data,
        labels,
        columns,
        sortAction,
        paginationData,
      }}
    />
  );
};

export default RecurringOrderHistory;
