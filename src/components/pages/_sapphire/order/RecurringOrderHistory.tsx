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
//Foundation libraries
import orderService from "../../../../_foundation/apis/transaction/order.service";
//Custom libraries
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
//UI
import { Options } from "material-table";
import {
  StyledTable,
  StyledTableIcons,
  StyledTypography,
} from "../../../StyledUI";

interface RecurringOderHistoryProps {
  parentOrderId: string;
}

const useRecurringOrder = () => {
  const { t, i18n } = useTranslation();

  const dateFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateFormatter = new Intl.DateTimeFormat(
    i18n.languages[0],
    dateFormatOptions
  );

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
      .findByParentOrderId({ orderId, pageSize, pageNumber })
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

const RecurringOderHistory: React.FC<RecurringOderHistoryProps> = (props) => {
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

export default RecurringOderHistory;
