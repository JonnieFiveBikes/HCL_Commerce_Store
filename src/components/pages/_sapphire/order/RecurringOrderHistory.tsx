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
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import orderService from "../../../../_foundation/apis/transaction/order.service";
//Custom libraries
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
//UI
import { Options } from "material-table";
import { StyledTable, StyledTableIcons } from "../../../StyledUI";
import { StyledTypography } from "@hcl-commerce-store-sdk/react-component";

interface RecurringOrderHistoryProps {
  parentOrderId: string;
}

const useRecurringOrder = () => {
  const widgetName = getDisplayName(RecurringOrderHistory);
  const { t, i18n } = useTranslation();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat(
    i18n.languages[0],
    dateFormatOptions
  );

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const columns = [
    {
      title: t("Order.OrderId"),
      field: "orderId",
    },
    {
      title: t("Order.OrderDate"),
      field: "placedDate",
      filtering: false,
      render: (rowData: any) => (
        <StyledTypography>
          {dateFormatter.format(new Date(rowData.placedDate))}
        </StyledTypography>
      ),
    },
    {
      title: t("Order.Status"),
      field: "orderStatus",
      lookup: statusLookup,
    },
    {
      title: t("Order.TotalPrice"),
      field: "grandTotal",
      filtering: false,
      type: "currency",
      headerStyle: {
        textAlign: "right",
      },
      render: (rowData: any) => {
        return rowData.grandTotal ? (
          <StyledTypography>
            <FormattedPriceDisplay
              min={parseFloat(rowData.grandTotal)}
              currency={rowData.grandTotalCurrency}
            />
          </StyledTypography>
        ) : (
          <StyledTypography>{t(`Order.NotAvailable`)}</StyledTypography>
        );
      },
    },
  ];

  const localization = {
    body: {
      emptyDataSourceMessage: t("Order.NoRecord"),
    },
    pagination: {
      labelRowsSelect: t("Order.PageSizeLabel"),
      labelDisplayedRows: t("Order.RowCount"),
      firstTooltip: t("Order.FirstPage"),
      previousTooltip: t("Order.PreviousPage"),
      nextTooltip: t("Order.NextPage"),
      lastTooltip: t("Order.LastPage"),
    },
  };

  const options: Options<any> = {
    filtering: false,
    showTitle: false,
    toolbar: false,
    search: false,
  };

  const getOrders = (query, orderId) => {
    const pageSize = query.pageSize;
    const pageNumber = query.page + 1;
    let result: any = { page: pageNumber - 1 };
    return orderService
      .findByParentOrderId({ orderId, pageSize, pageNumber, ...payloadBase })
      .then((response) => response.data)
      .then((d) => {
        result["totalCount"] = parseInt(d.recordSetTotal);
        return d.Order || [];
      })
      .catch((e) => {
        //error case set to empty array
        result["totalCount"] = 0;
        return [];
      })
      .then((o) => {
        result["data"] = o;
        return result;
      });
  };

  return {
    options,
    columns,
    localization,
    getOrders,
  };
};

const RecurringOrderHistory: React.FC<RecurringOrderHistoryProps> = (props) => {
  const { options, columns, localization, getOrders } = useRecurringOrder();
  const { parentOrderId } = props;
  return (
    <StyledTable
      icons={StyledTableIcons}
      columns={columns}
      data={(query) => getOrders(query, parentOrderId)}
      localization={localization}
      options={options}
    />
  );
};

export default RecurringOrderHistory;
