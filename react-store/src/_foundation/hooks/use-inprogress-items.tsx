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

import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  StyledAvatar,
  StyledNumberInput,
  StyledTypography,
  StyledLink,
  TableColumnDef,
  CustomTable,
  withCustomTableContext,
  StyledButton,
  StyledIconButton,
  useCustomTable,
  useTableUtils,
  TableConstants,
  StyledGrid,
  StyledTooltip,
} from "@hcl-commerce-store-sdk/react-component";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

import { CONSTANTS } from "../../constants/inprogress-items";
import { useEffect, useMemo, useState } from "react";
import { PAGINATION } from "../../constants/common";
import * as orderActions from "../../redux/actions/order";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { useDispatch, useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import { useSite } from "./useSite";
import storeUtil from "../../utils/storeUtil";
import { cartSelector } from "../../redux/selectors/order";
import { get } from "lodash-es";
import { forUserIdSelector, userIdSelector } from "../../redux/selectors/user";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../redux/actions/success";
interface InprogressItemsHookProps {
  order: any;
  orderItems: any[];
}

const useUtils = () => {
  const { getRowKey, updateSelection, findSelectedKeys, getValueForCell, getCurrentContext } = useTableUtils();
  const { tableState } = useCustomTable();
  const payloadBase = get(getCurrentContext(tableState), "payloadBase");
  const contract = useSelector(currentContractIdSelector);
  const dispatch = useDispatch();

  const deleteKeys = ({ orderId, currency, keys, t, h, s, f }) => {
    keys.forEach((k) => delete s[k]);
    if (keys.length > 0) {
      const fetchCatentries = true;
      s[TableConstants.HEADERS][TableConstants.CHECKBOX] = false;
      updateSelection({ t, h, s, f });

      dispatch(
        orderActions.REMOVE_INPROGRESS_ORDER_ITEM_ACTION({
          ...payloadBase,
          fetchCatentries,
          items: keys,
          orderId,
          currency,
        })
      );
      const m = {
        key: "success-message.deletedSuccessfully",
        messageParameters: { n: keys.length },
      };
      dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(m));
    }
  };

  const addKeysToCart = useMemo(
    () =>
      ({ keys, t, h, s, f }) => {
        const partnumberArray: any[] = [];
        const quantityArray: any[] = [];
        const asMap = storeUtil.toMap(keys);

        t.forEach((o) => {
          if (asMap[o.orderItemId]) {
            partnumberArray.push(o.partNumber);
            quantityArray.push(o.quantity);
          }
        });

        const param = {
          partnumber: partnumberArray,
          quantity: quantityArray,
          contractId: contract,
          ...payloadBase,
        };
        dispatch(orderActions.ADD_ITEM_ACTION(param));

        const m = {
          key: `success-message.${partnumberArray.length > 1 ? "addedNSuccessfully" : "addedItemSuccessfully"}`,
          messageParameters: {
            v: partnumberArray.length > 1 ? partnumberArray.length : partnumberArray[0],
          },
        };
        dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(m));
      },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [contract]
  );

  return {
    getRowKey,
    deleteKeys,
    addKeysToCart,
    findSelectedKeys,
    getValueForCell,
    getCurrentContext,
  };
};

const MultiDeleteAction = ({ fullTable: tbl, headers: h, ...props }) => {
  const { mySite } = useSite();
  const { tableState: s, setTableState: f } = useCustomTable();
  const { deleteKeys, findSelectedKeys, getValueForCell, getCurrentContext } = useUtils();
  const { t } = useTranslation();
  const cart = useSelector(cartSelector);
  const orderId = get(getCurrentContext(s), "orderId");
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const currency: string = get(mySite, "defaultCurrencyID", "");

  const keys = storeUtil.toMap(findSelectedKeys(s));
  const disabled =
    cart?.orderId !== orderId ||
    tbl.some(
      (r) =>
        keys[r.orderItemId] &&
        ((cart?.buyerId !== userId && userId !== r.xitem_memberId) ||
          getValueForCell(TableConstants.DISABLED, r, h, s, f))
    );

  const onClickMDK = () => {
    const keys = findSelectedKeys(s);
    deleteKeys({ orderId, currency, keys, t: tbl, h, s, f });
  };

  return (
    <StyledButton
      testId="inprogress-item-delete-selected"
      color="secondary"
      disabled={disabled}
      onClick={onClickMDK}
      style={{ marginLeft: "0.5rem" }}
      className="button">
      {t("InprogressItems.deleteSelected")}
    </StyledButton>
  );
};

const DeleteAction = ({ rowData: r, fullTable: t, headers: h, tooltipTitle, ...props }) => {
  const { mySite } = useSite();
  const { tableState: s, setTableState: f } = useCustomTable();
  const { getRowKey, deleteKeys, getValueForCell, getCurrentContext } = useUtils();
  const cart = useSelector(cartSelector);
  const orderId = get(getCurrentContext(s), "orderId");
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const currency: string = get(mySite, "defaultCurrencyID", "");
  const disabled =
    cart?.orderId !== orderId ||
    (cart?.buyerId !== userId && userId !== r.xitem_memberId) ||
    getValueForCell(TableConstants.DISABLED, r, h, s, f);
  const onClickSDK = () => {
    const keys = [getRowKey(r, h)];
    deleteKeys({ orderId, currency, keys, t, h, s, f });
  };
  return (
    <StyledIconButton
      style={{ padding: "0.2rem" }}
      disabled={disabled}
      color="primary"
      onClick={onClickSDK}
      data-testid="use-inprogress-delete-outline-icon-button">
      <StyledTooltip title={tooltipTitle}>
        <DeleteOutlineOutlinedIcon />
      </StyledTooltip>
    </StyledIconButton>
  );
};

const MultiAddToCartAction = ({ fullTable: tbl, headers: h, ...props }) => {
  const { tableState: s, setTableState: f } = useCustomTable();
  const { addKeysToCart, findSelectedKeys, getCurrentContext } = useUtils();
  const { t } = useTranslation();
  const cart = useSelector(cartSelector);
  const orderId = get(getCurrentContext(s), "orderId");
  const disabled = cart?.orderId === orderId;
  const onClickMKC = () => {
    const keys = findSelectedKeys(s);
    addKeysToCart({ keys, t: tbl, h, s, f });
  };
  return (
    <StyledButton
      testId="inprogress-item-add-selected-to-cart"
      color="primary"
      disabled={disabled}
      onClick={onClickMKC}
      style={{ marginLeft: "0.5rem" }}
      className="button">
      {t("InprogressItems.addSelToCart")}
    </StyledButton>
  );
};

const AddToCartAction = ({ rowData, fullTable: t, headers: h, tooltipTitle, ...props }) => {
  const { tableState: s, setTableState: f } = useCustomTable();
  const { getRowKey, addKeysToCart, getCurrentContext } = useUtils();
  const cart = useSelector(cartSelector);
  const orderId = get(getCurrentContext(s), "orderId");
  const disabled = cart?.orderId === orderId;
  const onClickSKC = () => {
    const keys = [getRowKey(rowData, h)];
    addKeysToCart({ keys, t, h, s, f });
  };
  return (
    <StyledIconButton
      style={{ padding: "0.2rem" }}
      disabled={disabled}
      color="primary"
      onClick={onClickSKC}
      data-testid="use-inprogress-shopping-cart-icon-button">
      <StyledTooltip title={tooltipTitle}>
        <ShoppingCart />
      </StyledTooltip>
    </StyledIconButton>
  );
};

const DetailPanel = ({ rowData, ...props }) => {
  const { attributes: rawData } = rowData;
  const cellStyle = { verticalAlign: "middle" };
  const { t } = useTranslation();
  // generate headers array
  const columns = rawData.map((a, i) => ({
    title: a.name,
    idProp: "name",
    keyLookup: { key: `attr_${i}_value` },
    display: {
      cellStyle,
    },
  }));

  // generate single row out of all attribute values
  const data = [
    rawData.reduce((n, v, i) => {
      n[`attr_${i}_value`] = storeUtil.csValue(get(v, "values[0].value", t("CommerceEnvironment.inventoryStatus.NA")));
      return n;
    }, {}),
  ];

  const className = "detailPanel table-tablet";
  const style = { width: "auto", border: "0" };
  const D = useMemo(() => withCustomTableContext(CustomTable), []);
  return (
    <D
      {...{
        t,
        data,
        columns,
        style,
        className,
        labels: { emptyMsg: "InprogressItems.noItems" },
      }}
    />
  );
};

const QuantityCell = ({ rowData: r, headers: h }) => {
  const { mySite } = useSite();
  const { setValueForCell, getValueForCell, getCurrentContext } = useTableUtils();
  const { tableState: s, setTableState: f } = useCustomTable();
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const orderId = get(getCurrentContext(s), "orderId");
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const disabled =
    cart?.orderId !== orderId ||
    (cart?.buyerId !== userId && userId !== r.xitem_memberId) ||
    getValueForCell(TableConstants.DISABLED, r, h, s, f);
  const currency: string = get(mySite, "defaultCurrencyID", "");
  const payload = get(getCurrentContext(s), "payloadBase");

  const onChangeQuantity = (_new) => {
    setValueForCell(CONSTANTS.quantity, _new, r, h, s, f);
    dispatch(
      orderActions.UPDATE_INPROGRESS_ORDER_ITEM_ACTION({
        ...payload,
        orderId,
        currency,
        quantity: String(_new),
        orderItemId: r.orderItemId,
        fetchCatentries: true,
      })
    );
  };

  return (
    <StyledNumberInput
      min={1}
      size={5}
      debounceTiming={100}
      disabled={disabled}
      onChange={onChangeQuantity}
      value={getValueForCell(CONSTANTS.quantity, r, h, s) ?? r.quantity ?? 1}
      strict
    />
  );
};
export const useInprogressItems = (props: InprogressItemsHookProps) => {
  const { order, orderItems: rows } = props;
  const { t, i18n } = useTranslation();
  const [disabled, setDisabled] = useState<any>({});
  const selectionActions = [MultiAddToCartAction, MultiDeleteAction];
  const { tableState, setTableState } = useCustomTable();
  const { setCurrentContextValue, getCurrentContext, getValueForCell } = useTableUtils();
  const cart = useSelector(cartSelector);
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  const storeId: string = mySite?.storeID ?? "";
  const cancels: Canceler[] = [];
  const payloadBase: any = {
    storeId,
    widget: "In Progress Order Items",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };

  // share one payloadBase for all hooks and components inside this hook
  useEffect(() => {
    setCurrentContextValue("payloadBase", payloadBase, tableState, setTableState);
    return () => cancels.forEach((cancel) => cancel());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentContextValue("orderId", order.orderId, tableState, setTableState);

    // disable some rows if necessary -- first check if add-to-cart will be disabled:
    //   1. order is current-order
    //   2. order is not owned by current-user
    if (cart?.orderId === order.orderId && order.buyerId !== userId) {
      // now check if there exist any order-items that aren't owned by current user --
      //   those are the rows that will be disabled
      const d = rows
        .filter(({ xitem_memberId }) => xitem_memberId !== userId)
        .reduce((m, v) => {
          m[v.orderItemId] = 1;
          return m;
        }, {});
      setDisabled(d);
    }
  }, [order]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = useMemo(() => {
    const priceMsg = t("PriceDisplay.Labels.Pending");
    const sku = t("OrderItemTable.Labels.SKU");
    const opts: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const lang = i18n.languages[0];
    const dFmt = new Intl.DateTimeFormat(lang, opts);
    const cellStyle = { verticalAlign: "middle" };

    const columns: TableColumnDef[] = [
      {
        title: t("InprogressItems.orderItem"),
        idProp: "orderItemId",
        keyLookup: {
          key: CONSTANTS.orderItemId,
        },
        display: {
          cellStyle,
          template: ({ rowData, ...props }) => {
            const A = (
              <StyledAvatar
                style={{
                  margin: "0 0.5rem 0 0",
                  border: "1px solid lightgray",
                  borderRadius: "0",
                }}
                alt={rowData.name}
                src={rowData.thumbnail}
              />
            );
            return (
              <StyledGrid container>
                <StyledGrid item xs sm style={{ flexGrow: 0 }}>
                  {rowData.seo && rowData.seo.href ? <StyledLink to={rowData.seo.href}>{A}</StyledLink> : <>{A}</>}
                </StyledGrid>

                <StyledGrid item xs={12} sm style={{ wordBreak: "break-word" }}>
                  <StyledTypography variant="body2">
                    {rowData.seo?.href ? (
                      <StyledLink to={rowData.seo.href}>{rowData.name ?? rowData.partNumber}</StyledLink>
                    ) : (
                      rowData.name ?? rowData.partNumber
                    )}
                  </StyledTypography>
                  <StyledTypography variant="body1">
                    {sku} {rowData.partNumber}
                  </StyledTypography>
                </StyledGrid>
              </StyledGrid>
            );
          },
        },
        sortable: {
          fn: ({ rowData: { name: n, partNumber: p } }) => `${n ?? p}${p}`,
        },
      },
      {
        title: t("InprogressItems.creationDate"),
        keyLookup: {
          key: CONSTANTS.createDate,
        },
        display: {
          cellStyle,
          template: ({ rowData, ...props }) => <>{dFmt.format(new Date(rowData.createDate))}</>,
        },
        sortable: {
          fn: ({ rowData }) => dFmt.format(new Date(rowData.createDate)),
        },
      },
      {
        title: t("InprogressItems.quantity"),
        keyLookup: {
          key: CONSTANTS.quantity,
        },
        display: {
          cellStyle,
          template: QuantityCell,
        },
        sortable: {
          fn: ({ rowData: r, tableState: s }) => {
            const h = get(getCurrentContext(s), "headers", []);
            const rc = getValueForCell("quantity", r, h, s) ?? parseInt(r.quantity);
            return rc;
          },
          numeric: true,
        },
      },
      {
        title: t("InprogressItems.contributor"),
        keyLookup: {
          key: CONSTANTS.contributor,
        },
        display: {
          cellStyle,
          template: ({ rowData, ...props }) => (
            <>
              <AccountCircleOutlinedIcon style={{ verticalAlign: "middle", marginRight: "0.25rem" }} />
              {rowData.xitem_firstName} {rowData.xitem_lastName}
            </>
          ),
        },
        sortable: {
          fn: ({ rowData: { xitem_firstName: f, xitem_lastName: l } }) => `${f}${l}`,
        },
      },
      {
        title: t("InprogressItems.each"),
        keyLookup: {
          key: CONSTANTS.unitPrice,
        },
        display: {
          cellStyle,
          template: ({ rowData, ...props }) => (
            <PriceDisplay min={rowData.unitPrice} currency={rowData.currency} language={lang} message={priceMsg} />
          ),
        },
        sortable: { numeric: true },
      },
      {
        title: t("InprogressItems.actions"),
        keyLookup: {
          key: CONSTANTS.actions,
        },
        display: {
          cellStyle,
          template: ({ rowData, fullTable, headers, ...props }) => (
            <>
              <AddToCartAction
                {...{ rowData, fullTable, headers, tooltipTitle: t("productDetail.AddToCart"), ...props }}
              />
              <DeleteAction {...{ rowData, fullTable, headers, tooltipTitle: t("CheckoutProfile.Delete"), ...props }} />
            </>
          ),
        },
      },
    ];
    return columns;
  }, [i18n, t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // save headers in context for some of sorting function to reference (avoid recursive refs)
    setCurrentContextValue("headers", columns, tableState, setTableState);
  }, [columns]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    checkBox: true,
    columns,
    rows,
    detailPanel: DetailPanel,
    disabled,
    labels: {
      selected: "InprogressItems.nProductsSel",
      emptyMsg: "InprogressItems.noItems",
    },
    selectionActions,
    t,
    paginationData: {
      clientSide: true,
      t,
      sizes: PAGINATION.sizes,
      labels: {
        ofTotalCount: "commonTable.ofTotalCount",
      },
    },
  };
};
