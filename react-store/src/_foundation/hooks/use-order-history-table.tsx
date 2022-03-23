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
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import cloneDeep from "lodash/cloneDeep";
//Foundation libraries
import orderService from "../apis/transaction/order.service";
import cartService from "../apis/transaction/cart.service";
//Custom libraries
import { ORDER_DETAILS, ORDER_HISTORY } from "../../constants/routes";
import { PAGINATION, REG_EX } from "../../constants/common";
import { ORDER_STATUS } from "../../constants/order";
//Redux
import * as errorActions from "../../redux/actions/error";
//UI
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {
  PriceDisplay,
  StyledButton,
  StyledLink,
  StyledTypography,
  TableColumnDef,
} from "@hcl-commerce-store-sdk/react-component";
import OrderHistoryPage from "../../components/pages/_sapphire/order/OrderHistoryPage";
import { useSite } from "./useSite";
import { CONSTANTS } from "../../constants/order-history-table";
import { get, isNil } from "lodash-es";
import { COPY_CART_ACTION } from "../../redux/actions/order";

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

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const columns = useMemo(() => {
    const lang = i18n.languages[0];
    const priceMsg = t(`Order.NotAvailable`);
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateFormatter = new Intl.DateTimeFormat(i18n.languages[0], dateFormatOptions);

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
            return <StyledTypography>{statusLookup[rowData.orderStatus]}</StyledTypography>;
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
              <PriceDisplay
                min={rowData.grandTotal}
                currency={rowData.grandTotalCurrency}
                language={lang}
                message={priceMsg}
              />
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
            const handleReOrder = () => {
              dispatch(
                COPY_CART_ACTION({
                  fromOrderId: rowData.orderId,
                  widget: widgetName,
                  cancelToken: new CancelToken((c) => cancels.push(c)),
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
                  <ArrowForwardIosIcon />
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

  const getPage = ({ page, pageSize, filters, search }) => {
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

    getOrderHistories({ filters, pageSize, page, search }).then((r) => {
      setState({
        ...state,
        pgSz: pageSize,
        offset: page === 0 ? 0 : page * pageSize,
        data: r.data,
        count: r.totalCount,
        search,
        filters,
      });
    });
  };

  React.useEffect(() => {
    // get first page of data
    getPage({ page: 0, pageSize: state.pgSz, filters: {}, search: "" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const byStatus = get(query.filters, CONSTANTS.orderStatus, {});
    const checkedStatuses = Object.entries(byStatus)
      .filter(([k, v]) => v)
      .map(([k, v]) => k);
    const filterStatus = checkedStatuses.join(",").trim();
    const status = filterStatus === "" ? statusQuery : filterStatus;
    const search = query.search || "";
    const pArray: Promise<any>[] = [];
    const result: any = { page: pageNumber - 1 };
    let _ors: any[] = [];
    const NUMERIC = REG_EX.NUMERIC;
    cancels = [];
    const payload = {
      cancelToken: new CancelToken((c) => cancels.push(c)),
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
        const parameters: any = { errorMessage: t("Order.InvalidOrderId") };
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

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cancels,
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
