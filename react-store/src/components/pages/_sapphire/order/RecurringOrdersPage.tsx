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
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { isNil } from "lodash-es";
//Foundation
import orderService from "../../../../_foundation/apis/transaction/order.service";
//Custom libraries
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
import { RECURRING_ORDERS, ORDER_DETAILS } from "../../../../constants/routes";
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
import { PAGINATION } from "../../../../constants/common";
//Redux
import { COPY_CART_ACTION } from "../../../../redux/actions/order";
import { recurringOrderSelector } from "../../../../redux/selectors/recurringOrder";
import { FETCH_RECURRING_ORDER_ACTION, CANCEL_RECURRING_ACTION } from "../../../../redux/actions/recurringOrder";
import { ConfirmationReducerState } from "../../../../redux/reducers/reducerStateInterface";
import { OPEN_CONFIRMATION_ACTION } from "../../../../redux/actions/confirmation";
//UI
import { AddShoppingCart, Cancel } from "@mui/icons-material";
import {
  StyledLink,
  StyledTypography,
  StyledContainer,
  StyledGrid,
  TableColumnDef,
  CustomTable,
  StyledTooltip,
  withCustomTableContext,
} from "@hcl-commerce-store-sdk/react-component";

const useRecurringOrderTable = () => {
  const sizes: any = useMemo(() => cloneDeep(PAGINATION.sizes), []);
  const widgetName = getDisplayName(RecurringOrders);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  //12 hours
  const cancelRecurringOrderNoticePeriod: number = 12;
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.languages[0], {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [i18n]
  );

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const formatRecurringOrders = useCallback(
    (od: any) => {
      const nextAvailableStates = ["Active", "InActive", "PendingCancel"];

      if (od.length > 0) {
        return od.map((_o) => {
          const o = cloneDeep(_o);
          o.id =
            o.purchaseDetails.parentOrderIdentifier.externalOrderID ||
            o.purchaseDetails.parentOrderIdentifier.parentOrderId;
          o.totalPrice = o.subscriptionInfo.paymentInfo.totalCost.value.toFixed(2);
          const frequencyInfo = o.subscriptionInfo.fulfillmentSchedule.frequencyInfo;
          if (frequencyInfo) {
            o.frequencyDisplay = t(`Order.EveryX${frequencyInfo.frequency.uom.trim()}`, {
              frequency: parseInt(frequencyInfo.frequency.value),
            });
            if (o.subscriptionInfo.fulfillmentSchedule.endInfo?.duration?.value) {
              const du = parseInt(o.subscriptionInfo.fulfillmentSchedule.endInfo.duration.value);
              if (du === 1) {
                o.frequencyDisplay = t("Order.Once");
              }
            }
            o.nextOrder = dateFormatter.format(new Date(frequencyInfo.nextOccurence));
            if (!nextAvailableStates.includes(o.state)) {
              o.nextOrder = t("Order.NotAvailable");
            }
          } else {
            o.frequencyDisplay = t("Order.NotAvailable");
            o.nextOrder = t("Order.NotAvailable");
          }

          if (!o.state) {
            o.state = "NotAvailable";
          }
          return o;
        });
      } else {
        return od;
      }
    },
    [dateFormatter, t]
  );

  const formattedRecurringOrderSelector = useMemo(
    () => createSelector(recurringOrderSelector, formatRecurringOrders),
    [formatRecurringOrders]
  );

  const orders = useSelector(formattedRecurringOrderSelector);

  const [state, setState] = useState({
    offset: 0,
    pgSz: sizes[0].size,
    data: orders,
    count: orders.length,
    filters: {},
    search: "",
  });

  const cancelRecurring = ({ subscriptionId, orderId, frequency }) => {
    //dispatch
    const message: ConfirmationReducerState = {
      key: "Confirmation.ScheduleOrderCancel",
      title: "Confirmation.CancelRecurringOrder",
      okAction: () => dispatch(CANCEL_RECURRING_ACTION({ subscriptionId, orderId, ...payloadBase })),
    };
    if (frequency && frequency.nextOccurence) {
      const hours = (new Date(frequency.nextOccurence).getTime() - new Date().getTime()) / 60 / 60 / 1000;
      if (hours > 0 && hours < cancelRecurringOrderNoticePeriod) {
        message.key = "Confirmation.ScheduleOrderCancelNotification";
        message.messageParameters = {
          next: dateFormatter.format(new Date(frequency.nextOccurence)),
        };
      }
    }
    dispatch(OPEN_CONFIRMATION_ACTION(message));
  };

  const title = t("Order.RecurringOrders");
  const stateLookup = {
    InActive: t(`Order.StateInactive`),
    Active: t(`Order.StateActive`),
    Expired: t(`Order.StateExpired`),
    Cancelled: t(`Order.StateCancelled`),
    Completed: t(`Order.StateCompleted`),
    Suspended: t(`Order.StateSuspended`),
    PendingCancel: t(`Order.StatePendingCancel`),
    NotAvailable: t(`Order.NotAvailable`),
  };

  const handleCopyCart = async (rowData: any) => {
    const params = { orderId: rowData.id, ...payloadBase };
    const response = await orderService.findByOrderId(params);
    const totalQuantity: number = response?.data?.orderItem
      ?.flatMap((order) => parseInt(order.quantity))
      .reduce((previous, current) => previous + current, 0);
    dispatch(
      COPY_CART_ACTION({
        fromOrderId: rowData.id,
        errorMessage: t("error-message.NoCopyOrderItems"),
        orderItemCount: totalQuantity ?? 0,
      })
    );
  };

  const handleCancelCart = (rowData: any) => {
    cancelRecurring({
      subscriptionId: rowData.subscriptionIdentifier.subscriptionId,
      orderId: rowData.id,
      frequency: rowData.subscriptionInfo.fulfillmentSchedule.frequencyInfo,
    });
  };

  const getPage = ({ page, pageSize, filters, search }) => {
    if (isNil(pageSize)) {
      pageSize = state.pgSz;
    } else if (pageSize !== state.pgSz) {
      sizes.forEach((s) => (s.selected = s.size === pageSize));
    }

    if (isNil(search)) {
      search = state.search;
    }

    const { data, totalCount } = getRecurringOrders({
      filters,
      pageSize,
      page,
      search,
    });

    // update state only once in scope (otherwise values get overwritten before next render)
    setState({
      ...state,
      offset: page === 0 ? 0 : state.offset + pageSize,
      data: data,
      count: totalCount,
      search,
      filters,
    });
  };

  const getRecurringOrders = (query) => {
    const pageNumber = query.page + 1;

    const search = query.search || "";

    const result: any = { page: pageNumber - 1 };

    if (search && search.trim() !== "") {
      const newOrders = orders.filter((order) => order.id.includes(search.trim()));

      result["data"] = newOrders;
      result["totalCount"] = newOrders.length;
      return result;
    }

    result["data"] = orders;
    result["totalCount"] = orders.length;
    return result;
  };

  const columns: TableColumnDef[] = [
    {
      title: t("Order.OrderId"),
      idProp: "id",
      keyLookup: {
        key: "id",
      },
      sortable: { numeric: true },
      display: {
        template: ({ rowData, ...props }) => {
          return (
            <StyledLink
              to={`${ORDER_DETAILS}/${rowData.id}`}
              state={{ from: RECURRING_ORDERS, recurringOrder: rowData }}>
              {rowData.id}
            </StyledLink>
          );
        },
      },
    },
    {
      title: t("Order.Schedule"),
      keyLookup: {
        key: "frequencyDisplay",
      },
      sortable: {},
      display: {},
    },
    {
      title: t("Order.NextOrder"),
      keyLookup: {
        key: "nextOrder",
      },
      sortable: {},
      display: {},
    },
    {
      title: t("Order.Status"),
      keyLookup: {
        key: "state",
      },
      sortable: { fn: ({ rowData: r }) => t(`Order.State${r.state}`) },
      display: {
        template: ({ rowData, ...props }) => {
          const stateStatus = stateLookup[rowData.state];
          return <StyledTypography>{stateStatus}</StyledTypography>;
        },
      },
    },
    {
      title: t("Order.TotalPrice"),
      keyLookup: {
        key: "totalPrice",
      },
      sortable: {
        numeric: true,
        fn: ({ rowData: r }) => parseFloat(r.totalPrice),
      },
      display: {
        template: ({ rowData, ...props }) =>
          rowData.totalPrice ? (
            <StyledTypography>
              <FormattedPriceDisplay
                min={parseFloat(rowData.totalPrice)}
                currency={rowData.subscriptionInfo.paymentInfo.totalCost.currency}
              />
            </StyledTypography>
          ) : (
            <StyledTypography>{t(`Order.NotAvailable`)}</StyledTypography>
          ),
      },
    },
    {
      title: t("InprogressItems.actions"),
      keyLookup: {
        key: "Actions",
      },
      display: {
        template: ({ rowData, ...props }) => (
          <>
            <StyledTooltip title={t("Order.TooltipReOrder")}>
              <AddShoppingCart
                data-testid="reorder-add-to-cart"
                color="primary"
                onClick={() => {
                  handleCopyCart(rowData);
                }}
              />
            </StyledTooltip>
            <StyledTooltip title={t("Order.TooltipCancel")}>
              {rowData.state !== "Active" ? (
                <Cancel
                  data-testid="cancel-recurring"
                  color="disabled"
                  onClick={() => {
                    handleCancelCart(rowData);
                  }}
                />
              ) : (
                <Cancel
                  color="primary"
                  onClick={() => {
                    handleCancelCart(rowData);
                  }}
                />
              )}
            </StyledTooltip>
          </>
        ),
      },
    },
  ];

  React.useEffect(() => {
    setState({
      ...state,
      data: orders,
      count: orders.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  React.useEffect(() => {
    dispatch(FETCH_RECURRING_ORDER_ACTION({ ...payloadBase }));
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    columns,
    title,
    data: state.data,
    t,
    labels: {
      emptyMsg: "Order.NoRecord",
    },
    paginationData: {
      clientSide: true,
      t,
      sizes,
      labels: {
        ofTotalCount: "commonTable.ofTotalCount",
      },
    },
    actionData: {
      getPage,
      headers: columns,
      hasSearch: true,
      labels: {
        searchPlaceholder: "Order.HistorySearchPlaceHolder",
      },
    },
  };
};

function RecurringOrders(props: any) {
  const { columns, title, labels, t, paginationData, actionData, data } = useRecurringOrderTable();
  const T = useMemo(() => withCustomTableContext(CustomTable), []);

  return (
    <StyledContainer className="page">
      <StyledTypography variant="h4" component="h1" className="vertical-margin-4">
        {title}
      </StyledTypography>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3} className="sidebar">
          <AccountSidebar />
        </StyledGrid>
        <StyledGrid item xs={12} md={9}>
          <T
            {...{
              actionData,
              t,
              columns,
              data,
              paginationData,
              labels,
            }}
          />
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
}

export default RecurringOrders;
