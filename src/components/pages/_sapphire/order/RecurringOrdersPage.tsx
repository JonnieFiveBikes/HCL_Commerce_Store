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
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import cloneDeep from "lodash-es/cloneDeep";
//Custom libraries
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
import {
  RECURRING_ORDERS,
  ORDER_DETAILS,
  DASHBOARD,
} from "../../../../constants/routes";
import Dashboard from "../../../widgets/dashboard/Dashboard";
//Redux
import { COPY_CART_ACTION } from "../../../../redux/actions/order";
import { recurringOrderSelector } from "../../../../redux/selectors/recurringOrder";
import {
  FETCH_RECURRING_ORDER_ACTION,
  CANCEL_RECURRING_ACTION,
} from "../../../../redux/actions/recurringOrder";
import { ConfirmationReducerState } from "../../../../redux/reducers/reducerStateInterface";
import { OPEN_CONFIRMATION_ACTION } from "../../../../redux/actions/confirmation";
//UI
import { AddShoppingCart, Cancel } from "@material-ui/icons";
import {
  StyledLink,
  StyledTable,
  StyledTableIcons,
  StyledTypography,
  StyledContainer,
  StyledGrid,
  StyledProgressPlaceholder,
  StyledSidebar,
} from "../../../StyledUI";
const useRecurringOrderTable = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  //12 hours
  const cancelRecurringOrderNoticePeriod: number = 12;
  const nextAvailableStates = ["Active", "InActive", "PendingCancel"];
  const dateFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateFormatter = new Intl.DateTimeFormat(
    i18n.languages[0],
    dateFormatOptions
  );
  const formatRecurringOrders = (od: any) => {
    if (od.length > 0) {
      return od.map((_o) => {
        const o = cloneDeep(_o);
        o.id =
          o.purchaseDetails.parentOrderIdentifier.externalOrderID ||
          o.purchaseDetails.parentOrderIdentifier.parentOrderId;
        o.totalPrice = o.subscriptionInfo.paymentInfo.totalCost.value.toFixed(
          2
        );
        const frequencyInfo =
          o.subscriptionInfo.fulfillmentSchedule.frequencyInfo;
        if (frequencyInfo) {
          o.frequencyDisplay = t(
            `Order.EveryX${frequencyInfo.frequency.uom.trim()}`,
            {
              frequency: parseInt(frequencyInfo.frequency.value),
            }
          );
          if (o.subscriptionInfo.fulfillmentSchedule.endInfo?.duration?.value) {
            const du = parseInt(
              o.subscriptionInfo.fulfillmentSchedule.endInfo.duration.value
            );
            if (du === 1) {
              o.frequencyDisplay = t("Order.Once");
            }
          }
          o.nextOrder = dateFormatter.format(
            new Date(frequencyInfo.nextOccurence)
          );
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
  };

  const formatedRecurringOrderSelector = createSelector(
    recurringOrderSelector,
    formatRecurringOrders
  );
  const orders = useSelector(formatedRecurringOrderSelector);
  // const [orders, setOrders] = useState<any[]>([]);

  const cancelRecurring = ({ subscriptionId, orderId, frequency }) => {
    //dispatch
    const message: ConfirmationReducerState = {
      key: "Confirmation.ScheduleOrderCancel",
      title: "Confirmation.CancelRecurringOrder",
      okAction: () =>
        dispatch(CANCEL_RECURRING_ACTION({ subscriptionId, orderId })),
    };
    if (frequency && frequency.nextOccurence) {
      const hours =
        (new Date(frequency.nextOccurence).getTime() - new Date().getTime()) /
        60 /
        60 /
        1000;
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
  const columns = [
    {
      title: t("Order.OrderId"),
      field: "id",
      render: (rowData: any) => {
        const location = {
          pathname: `${ORDER_DETAILS}/${rowData.id}`,
          state: { from: RECURRING_ORDERS, recurringOrder: rowData },
        };
        return <StyledLink to={location}>{rowData.id}</StyledLink>;
      },
    },
    {
      title: t("Order.Schedule"),
      field: "frequencyDisplay",
    },
    {
      title: t("Order.NextOrder"),
      field: "nextOrder",
    },
    {
      title: t("Order.Status"),
      field: "state",
      lookup: stateLookup,
    },
    {
      title: t("Order.TotalPrice"),
      field: "totalPrice",
      render: (rowData: any) => {
        return rowData.totalPrice ? (
          <StyledTypography>
            <FormattedPriceDisplay
              min={parseFloat(rowData.totalPrice)}
              currency={rowData.subscriptionInfo.paymentInfo.totalCost.currency}
            />
          </StyledTypography>
        ) : (
          <StyledTypography>{t(`Order.NotAvailable`)}</StyledTypography>
        );
      },
    },
  ];

  const actions: any = [
    {
      icon: () => <AddShoppingCart color="primary" />,
      tooltip: t("Order.TooltipReOrder"),
      onClick: (event, rowData) =>
        dispatch(COPY_CART_ACTION({ fromOrderId: rowData.id })),
    },
    (rowData) => ({
      icon: (props) =>
        props.disabled ? (
          <Cancel color="disabled" />
        ) : (
          <Cancel color="primary" />
        ),
      tooltip: t("Order.TooltipCancel"),
      onClick: (event, rowData) =>
        cancelRecurring({
          subscriptionId: rowData.subscriptionIdentifier.subscriptionId,
          orderId: rowData.id,
          frequency: rowData.subscriptionInfo.fulfillmentSchedule.frequencyInfo,
        }),
      disabled: rowData.state !== "Active",
    }),
  ];

  const options = {
    actionsColumnIndex: -1,
    showTitle: false,
  };

  const localization = {
    body: {
      emptyDataSourceMessage: t("Order.NoRecord"),
    },
    toolbar: {
      searchTooltip: t("Order.Search"),
    },
    pagination: {
      labelRowsSelect: t("Order.PageSizeLabel"),
      labelDisplayedRows: t("Order.RowCount"),
      firstTooltip: t("Order.FirstPage"),
      previousTooltip: t("Order.PreviousPage"),
      nextTooltip: t("Order.NextPage"),
      lastTooltip: t("Order.LastPage"),
    },
    header: {
      actions: t("Order.Actions"),
    },
  };

  React.useEffect(() => {
    dispatch(FETCH_RECURRING_ORDER_ACTION());
  }, []);

  return {
    columns,
    options,
    localization,
    actions,
    orders,
    title,
  };
};

function RecurringOrders(props: any) {
  const { t } = useTranslation();
  const {
    columns,
    options,
    localization,
    actions,
    orders,
    title,
  } = useRecurringOrderTable();

  return (
    <StyledContainer className="page">
      <StyledTypography
        variant="h4"
        component="h1"
        className="vertical-margin-4">
        {title}
      </StyledTypography>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3} className="sidebar">
          <StyledSidebar
            title={t("Dashboard.Title")}
            sidebarContent={<Dashboard />}
            linkTo={DASHBOARD}
            breakpoint="md"
          />
        </StyledGrid>
        <StyledGrid item xs={12} md={9}>
          {orders !== null ? (
            <StyledTable
              icons={StyledTableIcons}
              columns={columns}
              data={orders}
              localization={localization}
              actions={actions}
              options={options}
            />
          ) : (
            <StyledProgressPlaceholder className="vertical-padding-20" />
          )}
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
}

export default RecurringOrders;
