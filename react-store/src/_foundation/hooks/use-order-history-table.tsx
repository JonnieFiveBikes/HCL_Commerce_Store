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
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import getDisplayName from "react-display-name";
import cloneDeep from "lodash/cloneDeep";
//Foundation libraries
import orderService from "../apis/transaction/order.service";
//Custom libraries
import { ORDER_DETAILS, ORDER_HISTORY } from "../../constants/routes";
import { PAGINATION, REG_EX } from "../../constants/common";
import { ORDER_STATUS } from "../../constants/order";
//Redux
import * as errorActions from "../../redux/actions/error";
//UI
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  PriceDisplay,
  StyledBox,
  StyledButton,
  StyledLink,
  StyledTypography,
  TableColumnDef,
  StyledTooltip,
} from "@hcl-commerce-store-sdk/react-component";
import OrderHistoryPage from "../../components/pages/_sapphire/order/OrderHistoryPage";
import { useSite } from "./useSite";
import { CONSTANTS } from "../../constants/order-history-table";
import { chunk, get, isNil } from "lodash-es";
import { COPY_CART_ACTION } from "../../redux/actions/order";
import { resolvePurchaseOrder } from "_foundation/utils/purchaseOrder";

export const useOrderHistoryTable = (props?) => {
  const sizes: any = useMemo(() => cloneDeep(PAGINATION.sizes), []);
  const { actionsKey = CONSTANTS.actions, from = ORDER_HISTORY, pgSz = sizes[0].size } = props;
  const widgetName = getDisplayName(OrderHistoryPage);
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({
    offset: 0,
    pgSz,
    data: [],
    count: 0,
    filters: {},
    search: "",
  });
  const dispatch = useDispatch();
  const noPO = "noPO";
  const noPoString = t(`Order.${noPO}`);
  const { mySite } = useSite();

  const controller = useMemo(() => new AbortController(), []);

  const columns = useMemo(() => {
    const lang = i18n.languages[0];
    const priceMsg = t(`Order.NotAvailable`);
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateFormatter = new Intl.DateTimeFormat(i18n.languages[0], dateFormatOptions);

    const statusLookup = {
      N: t(`Order.Status_N`),
      M: t(`Order.Status_M`),
      A: t(`Order.Status_A`),
      B: t(`Order.Status_B`),
      C: t(`Order.Status_C`),
      R: t(`Order.Status_R`),
      S: t(`Order.Status_S`),
      D: t(`Order.Status_D`),
      F: t(`Order.Status_F`),
      G: t(`Order.Status_G`),
      L: t(`Order.Status_L`),
      W: t(`Order.Status_W`),
    };
    const asFilter = Object.entries(statusLookup)
      .map(([key, value]) => ({
        key,
        value,
      }))
      .sort((a, b) => (a.value === b.value ? 0 : a.value < b.value ? -1 : 1));
    const columns: TableColumnDef[] = [
      {
        title: t("Order.OrderId"),
        idProp: CONSTANTS.orderId,
        keyLookup: {
          key: CONSTANTS.orderId,
        },
        display: {
          template: ({ rowData, ...props }) => {
            return (
              <StyledLink to={`${ORDER_DETAILS}/${rowData.orderId}`} state={{ from }}>
                {rowData.orderId}
              </StyledLink>
            );
          },
        },
      },
      {
        title: t("Order.PONumber"),
        keyLookup: {
          key: CONSTANTS.purchaseOrderNumber,
        },
        display: {
          template: ({ rowData, ...prop }) => (
            <StyledTypography className="wrapText">{rowData.purchaseOrderNumber}</StyledTypography>
          ),
        },
      },
      {
        title: t("Order.OrderDate"),
        keyLookup: {
          key: CONSTANTS.placedDate,
        },
        display: {
          template: ({ rowData, ...props }) => {
            return (
              <StyledTypography>
                {rowData.placedDate
                  ? dateFormatter.format(new Date(rowData.placedDate))
                  : rowData.orderStatus === ORDER_STATUS.ApprovalDenied
                  ? t(`Order.NotAvailable`)
                  : t("Order.Pending")}
              </StyledTypography>
            );
          },
        },
      },
      {
        title: t("Order.Status"),
        keyLookup: {
          key: CONSTANTS.orderStatus,
        },
        filters: asFilter,
        display: {
          template: ({ rowData, ...props }) => {
            const oStatus = t(`Order.Status_${rowData.orderStatus}`);
            const groups = rowData.orderItem?.reduce((m, v) => {
              m[v.orderItemStatus] = 1;
              return m;
            }, {});
            const grpSize = Object.keys(groups ?? {}).length;
            const disp = grpSize <= 1 ? oStatus : t("Order.multiStatus");
            return <StyledTypography>{disp}</StyledTypography>;
          },
        },
      },
      {
        title: t("Order.TotalPrice"),
        keyLookup: {
          key: CONSTANTS.grandTotal,
        },
        display: {
          template: ({ rowData, ...props }) => {
            return (
              <StyledBox>
                <PriceDisplay
                  min={rowData.grandTotal}
                  currency={rowData.grandTotalCurrency}
                  language={lang}
                  message={priceMsg}
                />
              </StyledBox>
            );
          },
        },
      },
      {
        title: t("Order.Actions"),
        keyLookup: {
          key: actionsKey,
        },
        display: {
          template: ({ rowData, headers, ...props }) => {
            const h = headers[headers.length - 1];
            const totalQuantity: number = rowData.orderItem
              ?.flatMap((order) => parseInt(order.quantity))
              .reduce((previous, current) => previous + current, 0);
            const handleReOrder = () => {
              dispatch(
                COPY_CART_ACTION({
                  fromOrderId: rowData.orderId,
                  widget: widgetName,
                  signal: controller.signal,
                  errorMessage: t("error-message.NoCopyOrderItems"),
                  orderItemCount: totalQuantity,
                })
              );
            };
            return (
              <div style={{ display: "flex" }}>
                {h.keyLookup.key === "recentActions" && (
                  <StyledTypography>
                    <StyledButton testId={"order-history-reorder"} variant="text" onClick={handleReOrder}>
                      {t("Order.TooltipReOrder")}
                    </StyledButton>
                  </StyledTypography>
                )}
                <StyledLink to={`${ORDER_DETAILS}/${rowData.orderId}`} state={{ from }}>
                  <StyledTooltip title={t("InprogressOrders.OrderDetail")}>
                    <ArrowForwardIosIcon />
                  </StyledTooltip>
                </StyledLink>
              </div>
            );
          },
        },
      },
    ];

    // No purchase-order in B2C
    if (!mySite.isB2B) {
      columns.splice(1, 1);
    }
    return columns;
  }, [t, i18n, mySite]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPage = async ({ page, pageSize, filters, search }) => {
    if (isNil(pageSize)) {
      pageSize = state.pgSz;
    } else if (pageSize !== state.pgSz) {
      sizes.forEach((s) => (s.selected = s.size === pageSize));
    }

    if (isNil(search)) {
      search = state.search;
    }

    if (isNil(filters)) {
      filters = state.filters;
    }

    try {
      const r = await getOrderHistories({ filters, pageSize, page, search });
      // need to fetch order-items to determine cumulative status (seller-specific)
      await getOrderItems(r);

      setState({
        ...state,
        pgSz: pageSize,
        offset: page === 0 ? 0 : page * pageSize,
        data: r.data ?? [],
        count: r.totalCount,
        search,
        filters,
      });
    } catch (e) {
      console.log("Error in getting order histories and order item details", e);
    }
  };

  React.useEffect(() => {
    // get first page of data
    getPage({ page: 0, pageSize: state.pgSz, filters: {}, search: "" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusQuery = "N,M,A,B,C,R,S,D,F,G,L,W,APP,RTN";
  const getPONumber = async (buyerPONumber: string) => {
    if (buyerPONumber) {
      const payload = { signal: controller.signal, widget: widgetName };
      const po = await resolvePurchaseOrder(buyerPONumber, payload);
      return po;
    } else {
      return noPoString;
    }
  };

  const getOrderItems = async (container) => {
    let count = 0;
    const ids = container.data?.map((o) => o.orderId);

    // do 5 at a time
    const blocks = chunk(ids, 5);
    const x = blocks.map(async (block) => {
      const p = block.map((orderId) => {
        const payload: any = { widget: widgetName, signal: controller.signal, orderId };
        return orderService.findByOrderId(payload);
      });
      const r = await Promise.all(p);
      r.forEach(({ data }) => (container.data[count++].orderItem = data.orderItem));
    });

    await Promise.all(x);
  };

  const getOrderHistories = async (query) => {
    const pageSize = query.pageSize;
    const pageNumber = query.page + 1;
    const byStatus = get(query.filters, CONSTANTS.orderStatus, {});
    const checkedStatuses = Object.entries(byStatus)
      .filter(([k, v]) => v)
      .map(([k, v]) => k);
    const csvStatuses = checkedStatuses.join(",").trim();
    const filterStatus = checkedStatuses.includes(ORDER_STATUS.Closed)
      ? [csvStatuses, ORDER_STATUS.LockedByAppeasement, ORDER_STATUS.LockedByReturn].join(",")
      : csvStatuses;
    const status = filterStatus === "" ? statusQuery : filterStatus;
    const search = query.search || "";
    const result: any = { page: pageNumber - 1 };
    const NUMERIC = REG_EX.NUMERIC;
    const payload = {
      widget: widgetName,
      signal: controller.signal,
    };
    if (search && search.trim() !== "" && NUMERIC.test(search)) {
      try {
        const findByOrderId: any = await orderService.findByOrderId({
          orderId: search.trim(),
          ...payload,
        });
        const order = findByOrderId?.data;
        order.id = findByOrderId?.data?.orderId;
        result["totalCount"] = 1;
        const po = await getPONumber(order.buyerPONumber);
        order.purchaseOrderNumber = po;
        result["data"] = [order];
        return result;
      } catch (e) {
        console.log("Error in getting order details by order id search", e);
        result["totalCount"] = 0;
        return result;
      }
    } else {
      if (!NUMERIC.test(search) && search !== "") {
        const parameters: any = { errorMessage: t("Order.InvalidOrderId") };
        dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
      }
      try {
        const orderByStatus = await orderService.findByStatus({
          status,
          pageSize,
          pageNumber,
          ...payload,
        });
        result["totalCount"] = parseInt(orderByStatus?.data?.recordSetTotal);
        const _ors: any[] = orderByStatus?.data?.Order || [];
        const rc = await Promise.all(_ors.map((o) => getPONumber(o.buyerPONumber)));
        _ors.forEach((order, i) => {
          order.id = order.orderId;
          order.purchaseOrderNumber = rc[i];
        });
        result["data"] = _ors;
        return result;
      } catch (e) {
        console.log("Error in getting order details find by status service call", e);
        result["totalCount"] = 0;
        return result;
      }
    }
  };

  useEffect(
    () => () => controller.abort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    columns,
    data: state.data,
    t,
    labels: {
      emptyMsg: "Order.NoRecord",
    },
    paginationData: {
      t,
      getPage,
      offset: state.offset,
      sizes,
      count: state.count,
      labels: {
        ofTotalCount: "commonTable.ofTotalCount",
      },
    },
    actionData: {
      getPage,
      headers: columns,
      hasSearch: true,
      hasFilters: true,
      labels: {
        searchPlaceholder: "Order.HistorySearchPlaceHolder",
        filter: "Order.FilterResults",
      },
    },
  };
};
