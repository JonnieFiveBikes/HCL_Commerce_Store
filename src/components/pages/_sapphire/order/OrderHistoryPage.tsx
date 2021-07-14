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
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import cloneDeep from "lodash/cloneDeep";
//Foundation libraries
import orderService from "../../../../_foundation/apis/transaction/order.service";
import cartService from "../../../../_foundation/apis/transaction/cart.service";
//Custom libraries
import FormattedPriceDisplay from "../../../widgets/formatted-price-display";
import { ORDER_DETAILS, ORDER_HISTORY } from "../../../../constants/routes";
import { REG_EX } from "../../../../constants/common";
import { ORDER_STATUS } from "../../../../constants/order";
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
//Redux
import * as errorActions from "../../../../redux/actions/error";
//UI
import { MTableToolbar, Options } from "material-table";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {
  StyledButton,
  StyledContainer,
  StyledGrid,
  StyledTypography,
  StyledLink,
  StyledTable,
  StyledTableIcons,
} from "@hcl-commerce-store-sdk/react-component";
import { StyledMTableFilterRow } from "../../../StyledUI";
import { useSite } from "../../../../_foundation/hooks/useSite/useSite";
const useOrderHistoryTable = () => {
  const widgetName = getDisplayName(OrderHistoryPage);
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [options, setOptions] = useState<Options<any>>({
    filtering: false,
    actionsColumnIndex: -1,
    showTitle: false,
    tableLayout: "fixed",
    sorting: false,
  });
  const dispatch = useDispatch();

  const noPO = "noPO";
  const noPoString = t(`Order.${noPO}`);
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat(
    i18n.languages[0],
    dateFormatOptions
  );
  const [tableColumn, setTableColumn] = useState<any>();
  const { mySite } = useSite();

  const statusLookup = mySite.isB2B
    ? {
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
      }
    : {
        M: t(`Order.Status_M`),
        B: t(`Order.Status_B`),
        R: t(`Order.Status_R`),
        S: t(`Order.Status_S`),
        D: t(`Order.Status_D`),
        F: t(`Order.Status_F`),
        G: t(`Order.Status_G`),
        L: t(`Order.Status_L`),
      };
  const title = t("Order.OrderHistory");
  const columns = [
    {
      title: t("Order.OrderId"),
      field: "orderId",
      filtering: false,
      render: (rowData: any) => {
        const location = {
          pathname: `${ORDER_DETAILS}/${rowData.orderId}`,
          state: { from: ORDER_HISTORY },
        };
        return <StyledLink to={location}>{rowData.orderId}</StyledLink>;
      },
    },
    {
      title: t("Order.PONumber"),
      field: "purchaseOrderNumber",
      filtering: false,
      render: (rowData: any) => (
        <StyledTypography className="wrapText">
          {rowData.purchaseOrderNumber}
        </StyledTypography>
      ),
    },
    {
      title: t("Order.OrderDate"),
      field: "placedDate",
      filtering: false,
      render: (rowData: any) => (
        <StyledTypography>
          {rowData.placedDate
            ? dateFormatter.format(new Date(rowData.placedDate))
            : rowData.orderStatus === ORDER_STATUS.ApprovalDenied
            ? t(`Order.NotAvailable`)
            : t("Order.Pending")}
        </StyledTypography>
      ),
    },
    {
      title: t("Order.Status"),
      field: "orderStatus",
      lookup: statusLookup,
      filterCellStyle: { maxWidth: "160px" },
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

  const actions = [
    {
      icon: () => <ArrowForwardIosIcon />,
      tooltip: t("Order.HistoryViewDetailTooltip"),
      onClick: (event, rowData) => {
        const location = {
          pathname: `${ORDER_DETAILS}/${rowData.orderId}`,
          state: { from: ORDER_HISTORY },
        };
        history.push(location);
      },
    },
  ];

  const localization = {
    body: {
      emptyDataSourceMessage: t("Order.NoRecord"),
    },
    toolbar: {
      searchTooltip: t("Order.Search"),
      searchPlaceholder: t("Order.HistorySearchPlaceHolder"),
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
      actions: "",
    },
  };

  const components = {
    Toolbar: (props) => (
      <>
        <StyledButton
          variant="text"
          color="primary"
          className="table-filter-button"
          onClick={() => {
            setOptions(
              Object.assign(
                {},
                { ...options },
                { filtering: !options.filtering }
              )
            );
          }}>
          {t("Order.FilterResults")}
        </StyledButton>
        <MTableToolbar {...props} />
      </>
    ),
    FilterRow: (props) => <StyledMTableFilterRow {...props} />,
  };

  React.useEffect(() => {
    if (!mySite.isB2B) {
      columns.splice(1, 1);
    }
    setTableColumn(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
  };

  const statusQuery = "N,M,A,B,C,R,S,D,F,G,L,W";
  const getPONumber = (buyerPONumber: string) => {
    if (buyerPONumber) {
      return cartService
        .getBuyerPurchaseOrderDataBean({
          buyerPurchaseOrderId: buyerPONumber,
          cancelToken: new CancelToken(function executor(c) {
            cancels.push(c);
          }),
          ...payloadBase,
        })
        .then((r) => r.data)
        .then((d2) => {
          if (d2.resultList[0] && d2.resultList[0].purchaseOrderNumber) {
            return {
              buyerPONumber: [buyerPONumber],
              value: d2.resultList[0].purchaseOrderNumber,
            };
          } else {
            return { buyerPONumber: [buyerPONumber], value: noPoString };
          }
        });
    } else {
      return Promise.resolve({ buyerPONumber: "none", value: noPoString });
    }
  };

  const getOrderHistories = (query) => {
    const pageSize = query.pageSize;
    const pageNumber = query.page + 1;
    const filterStatus = (query.filters[0]?.value || []).join(",").trim();
    const status = filterStatus === "" ? statusQuery : filterStatus;
    const search = query.search || "";
    const pArray: Promise<any>[] = [];
    let result: any = { page: pageNumber - 1 };
    let _ors: any[] = [];
    const NUMERIC = REG_EX.NUMERIC;
    const cs = cancels;
    cancels = [];
    cs.forEach((cancel) => {
      cancel();
    });
    const payload = {
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
      ...payloadBase,
    };
    if (search && search.trim() !== "" && NUMERIC.test(search)) {
      return orderService
        .findByOrderId({
          orderId: search.trim(),
          ...cloneDeep(payload),
        })
        .then((response) => response.data)
        .then((o) => {
          o.id = o.orderId;
          result["totalCount"] = 1;
          _ors.push(o);
          pArray.push(getPONumber(o.buyerPONumber));
          return Promise.all(pArray);
        })
        .then((res) => {
          res.forEach((r, i) => {
            _ors[i].purchaseOrderNumber = r.value;
          });
          return _ors;
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
    } else {
      if (!NUMERIC.test(search) && search !== "") {
        let parameters: any = { errorMessage: t("Order.InvalidOrderId") };
        dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
      }
      return orderService
        .findByStatus({
          status,
          pageSize,
          pageNumber,
          ...cloneDeep(payload),
        })
        .then((response) => response.data)
        .then((d) => {
          result["totalCount"] = parseInt(d.recordSetTotal);
          _ors = d.Order || [];
          _ors.forEach((o) => {
            o.id = o.orderId;
            pArray.push(getPONumber(o.buyerPONumber));
          });
          return Promise.all(pArray);
        })
        .then((res) => {
          res.forEach((r, i) => {
            _ors[i].purchaseOrderNumber = r.value;
          });
          return _ors;
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
    }
  };

  return {
    options,
    columns,
    localization,
    dateFormatter,
    getOrderHistories,
    title,
    components,
    actions,
    cancels,
    tableColumn,
  };
};

function OrderHistoryPage(props: any) {
  const {
    options,
    localization,
    getOrderHistories,
    title,
    components,
    actions,
    cancels,
    tableColumn,
  } = useOrderHistoryTable();

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer className="page">
      <StyledTypography
        variant="h3"
        component="h1"
        className="vertical-margin-4">
        {title}
      </StyledTypography>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3} className="sidebar">
          <AccountSidebar />
        </StyledGrid>
        <StyledGrid item xs={12} md={9}>
          <StyledTable
            icons={StyledTableIcons}
            columns={tableColumn}
            data={(query) => {
              return getOrderHistories(query);
            }}
            localization={localization}
            options={options}
            components={components}
            actions={actions}
          />
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
}

export default OrderHistoryPage;
