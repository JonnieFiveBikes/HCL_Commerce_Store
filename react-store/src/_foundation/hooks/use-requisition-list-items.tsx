/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
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
} from "@hcl-commerce-store-sdk/react-component";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { EMPTY_STRING, OFFER } from "../../constants/common";
import { CONSTANTS } from "../../constants/requisition-list-items";
import { useEffect, useMemo } from "react";
import { PAGINATION } from "../../constants/common";
import * as orderActions from "../../redux/actions/order";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { useDispatch, useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import { useSite } from "./useSite";
import storeUtil from "../../utils/storeUtil";
import { get } from "lodash-es";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../redux/actions/success";
import { OPEN_CONFIRMATION_ACTION } from "../../redux/actions/confirmation";
import { ConfirmationReducerState } from "../../redux/reducers";
import { FETCH_ORDER_DETAILS_ACTION } from "../../redux/actions/orderDetails";
import requisitionListService from "../apis/transaction/requisitionList.service";
import { forUserIdSelector, userIdSelector } from "../../redux/selectors/user";

const useUtils = () => {
  const { getRowKey, updateSelection, findSelectedKeys, getValueForCell, getCurrentContext } = useTableUtils();
  const contract = useSelector(currentContractIdSelector);
  const dispatch = useDispatch();
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : "";
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    storeId: storeId,
    widget: "Requisition List Items",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };

  const deleteKeys = ({ orderId, currency, keys, t, h, s, f }) => {
    const confirmState: ConfirmationReducerState = {
      key: "RequisitionListItems.DeleteDialogHeading",
      messageParameters: {},
      title: "RequisitionListItems.DeleteDialogHeading",
      labels: { cancel: "RequisitionListItems.Cancel", submit: "RequisitionListItems.Confirm" },
      props: {
        root: { className: "dialog--minimal" },
        title: { disableTypography: true },
        buttons: [{ className: "cancel-action-button" }, { className: "confirm-action-button", color: "secondary" }],
      },
      template: <></>,
      okAction: () => deleteKeysConfirmed({ orderId, currency, keys, t, h, s, f }),
    };
    dispatch(OPEN_CONFIRMATION_ACTION(confirmState));
  };

  const deleteKeysConfirmed = ({ orderId, currency, keys, t, h, s, f }) => {
    const deletingArray: Promise<any>[] = [];
    keys.forEach((k) => delete s[k]);
    const orderDescription = get(getCurrentContext(s), "orderDescription");
    if (keys.length > 0) {
      s[TableConstants.HEADERS][TableConstants.CHECKBOX] = false;
      updateSelection({ t, h, s, f });

      keys.forEach((key) => {
        const body: any = {
          action: "updateItem",
          query: {
            orderId: orderId,
            orderItemId: key,
            quantity: 0,
          },
        };
        const payload = { ...payloadBase, ...body };
        deletingArray.push(requisitionListService.performActionOnRequisitionList(payload));
      });

      Promise.all(deletingArray)
        .then((res) => {
          const m = {
            key: "success-message.deletedItemListSuccessfully",
            messageParameters: { n: keys.length, v: orderDescription },
          };
          dispatch(HANDLE_SUCCESS_MESSAGE_ACTION(m));
          dispatch(
            FETCH_ORDER_DETAILS_ACTION({
              orderId,
              currency,
              skipErrorSnackbar: true,
              ...payloadBase,
            })
          );
        })
        .catch((e) => {
          console.log("Deleting item has error", e);
        });
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
            quantityArray.push(getValueForCell(CONSTANTS.quantity, o, h, s) ?? o.quantity);
          }
        });

        const param = {
          partnumber: partnumberArray,
          quantity: quantityArray,
          contractId: contract,
          ...payloadBase,
        };
        dispatch(orderActions.ADD_ITEM_ACTION(param));
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contract]
  );

  useEffect(
    () => () => cancels.forEach((cancel) => cancel()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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

const DetailPanel = ({ rowData, ...props }) => {
  const { attributes: rawData } = rowData;
  const cellStyle = { verticalAlign: "middle" };
  const { t } = useTranslation();
  // generate headers array
  const columns = rawData?.map((a, i) => ({
    title: a.name,
    idProp: "name",
    keyLookup: { key: `attr_${i}_value` },
    display: {
      cellStyle,
    },
  }));
  // generate single row out of all attribute values
  const data = [
    rawData?.reduce((n, v, i) => {
      n[`attr_${i}_value`] = storeUtil.csValue(get(v, "values[0].value", t("CommerceEnvironment.inventoryStatus.NA")));
      return n;
    }, {}),
  ];

  const className = "detailPanel table-tablet";
  const style = { width: "auto", border: "0" };
  const D = useMemo(() => withCustomTableContext(CustomTable), []);
  return columns ? (
    <D
      {...{
        t,
        data,
        columns,
        style,
        className,
        outerClassName: "order-item-table-drawer",
        labels: { emptyMsg: "RequisitionListItems.noItems" },
      }}
    />
  ) : null;
};

const QuantityCell = ({ rowData: r, headers: h }) => {
  const { setValueForCell, getValueForCell, getCurrentContext } = useTableUtils();
  const { tableState: s, setTableState: f } = useCustomTable();
  const orderId = get(getCurrentContext(s), "orderId");
  const buyerId = get(getCurrentContext(s), "buyerId");
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const disabled = userId !== buyerId;
  const dispatch = useDispatch();
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : "";
  const currency: string = get(mySite, "defaultCurrencyID", "");
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    storeId: storeId,
    widget: "Requisition List Items",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const onChangeQuantity = (_new) => {
    setValueForCell(CONSTANTS.quantity, _new, r, h, s, f);
    const body: any = {
      action: "updateItem",
      query: {
        orderId: orderId,
        orderItemId: r.orderItemId,
        quantity: String(_new),
      },
    };
    const payload = { ...payloadBase, ...body };
    requisitionListService
      .performActionOnRequisitionList(payload)
      .then((res) => {
        dispatch(
          FETCH_ORDER_DETAILS_ACTION({
            orderId,
            currency,
            skipErrorSnackbar: true,
            ...payloadBase,
          })
        );
      })
      .catch((e) => {
        console.log("Could not update quantity of this item", e);
      });
  };

  useEffect(() => {
    setValueForCell(CONSTANTS.quantity, r.quantity, r, h, s, f);
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledNumberInput
      min={1}
      size={5}
      debounceTiming={100}
      onChange={onChangeQuantity}
      value={getValueForCell(CONSTANTS.quantity, r, h, s) ?? r.quantity ?? 1}
      strict
      {...{ disabled }}
    />
  );
};

export const useRequisitionListItems = (props) => {
  const { order, orderItems: rows } = props;
  const { mySite } = useSite();
  const { t, i18n } = useTranslation();
  const { deleteKeys, findSelectedKeys, getRowKey, addKeysToCart } = useUtils();
  const { tableState: s, setTableState: f } = useCustomTable();
  const { setCurrentContextValue, getCurrentContext, getValueForCell, setValueForCell } = useTableUtils();
  const cancels: Canceler[] = [];
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;

  const AddToCartAction = ({ rowData, fullTable: t, headers: h, ...props }) => {
    const onClickSKC = () => {
      const keys = [getRowKey(rowData, h)];
      addKeysToCart({ keys, t, h, s, f });
    };
    return (
      <StyledIconButton
        style={{ padding: "0.2rem" }}
        color="primary"
        onClick={onClickSKC}
        data-testid="use-requisition-shopping-cart-icon-button">
        <ShoppingCart />
      </StyledIconButton>
    );
  };

  const MultiAddToCartAction = ({ fullTable: tbl, headers: h, ...props }) => {
    const { t } = useTranslation();
    const onClickMKC = () => {
      const keys = findSelectedKeys(s);
      addKeysToCart({ keys, t: tbl, h, s, f });
    };
    return (
      <StyledButton
        testId="requisition-list-add-selected-to-cart"
        color="primary"
        onClick={onClickMKC}
        style={{ marginLeft: "0.5rem" }}
        className="button">
        {t("RequisitionListItems.addSelToCart")}
      </StyledButton>
    );
  };

  const MultiDeleteAction = ({ fullTable: tbl, headers: h, ...props }) => {
    const { t } = useTranslation();
    const orderId = get(getCurrentContext(s), "orderId");
    const buyerId = get(getCurrentContext(s), "buyerId");
    const currency: string = get(mySite, "defaultCurrencyID", "");
    const onClickMDK = () => {
      const keys = findSelectedKeys(s);
      deleteKeys({ orderId, currency, keys, t: tbl, h, s, f });
    };
    const disabled = buyerId !== userId;

    return (
      <StyledButton
        testId="requisition-list-delete-selected"
        color="secondary"
        onClick={onClickMDK}
        style={{ marginLeft: "0.5rem" }}
        className="button"
        {...{ disabled }}>
        {t("RequisitionListItems.deleteSelected")}
      </StyledButton>
    );
  };

  const DeleteAction = ({ rowData: r, fullTable: t, headers: h, ...props }) => {
    const orderId = get(getCurrentContext(s), "orderId");
    const buyerId = get(getCurrentContext(s), "buyerId");
    const currency: string = get(mySite, "defaultCurrencyID", "");
    const disabled = buyerId !== userId;
    const onClickSDK = () => {
      const keys = [getRowKey(r, h)];
      deleteKeys({ orderId, currency, keys, t, h, s, f });
    };
    return (
      <StyledIconButton
        style={{ padding: "0.2rem" }}
        color="primary"
        onClick={onClickSDK}
        {...{ disabled }}
        data-testid="use-requisition-delete-icon-button">
        <DeleteOutlineOutlinedIcon />
      </StyledIconButton>
    );
  };

  const selectionActions = [MultiAddToCartAction, MultiDeleteAction];

  const columns = useMemo(() => {
    const priceMsg = t("PriceDisplay.Labels.Pending");
    const sku = t("OrderItemTable.Labels.SKU");

    const lang = i18n.languages[0];
    const cellStyle = { verticalAlign: "middle" };

    const columns: TableColumnDef[] = [
      {
        title: t("RequisitionListItems.orderItem"),
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
        title: t("RequisitionListItems.each"),
        keyLookup: {
          key: CONSTANTS.unitPrice,
        },
        display: {
          cellStyle,
          template: ({ rowData, ...props }) => {
            const o = rowData.price.find(({ usage: u, value: v }) => u === OFFER && v);
            const offerPrice = o ? parseFloat(o.value) : 0;
            const disPrice = offerPrice > 0 ? offerPrice : null;
            return (
              <PriceDisplay min={disPrice} currency={rowData.price[0].currency} language={lang} message={priceMsg} />
            );
          },
        },
        sortable: {
          fn: ({ rowData: r }) => {
            const o = r.price.find(({ usage: u, value: v }) => u === OFFER && v);
            const offerPrice = o ? parseFloat(o.value) : 0;
            return offerPrice > 0 ? offerPrice : null;
          },
          numeric: true,
        },
      },
      {
        title: t("RequisitionListItems.manufacturer"),
        keyLookup: {
          key: CONSTANTS.manufacturer,
        },
        display: {
          cellStyle,
          template: ({ rowData, ...props }) => (
            <StyledTypography
              style={{
                verticalAlign: "middle",
                marginRight: "0.25rem",
                wordBreak: "break-word",
              }}>
              {rowData.manufacturer ?? EMPTY_STRING}
            </StyledTypography>
          ),
        },
        sortable: {},
      },

      {
        title: t("RequisitionListItems.quantity"),
        keyLookup: {
          key: CONSTANTS.quantity,
        },
        display: {
          cellStyle,
          template: ({ rowData, headers }) => QuantityCell({ rowData, headers }),
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
        title: t("RequisitionListItems.actions"),
        keyLookup: {
          key: CONSTANTS.actions,
        },
        display: {
          cellStyle,
          template: ({ rowData, fullTable, headers, ...props }) => (
            <>
              <DeleteAction {...{ rowData, fullTable, headers, ...props }} />
              <AddToCartAction {...{ rowData, fullTable, headers, ...props }} />
            </>
          ),
        },
      },
    ];
    return columns;
  }, [i18n, t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // save headers in context for some of sorting function to reference (avoid recursive refs)
    setCurrentContextValue("headers", columns, s, f);
  }, [columns]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentContextValue("orderId", order.orderId, s, f);
    setCurrentContextValue("orderDescription", order.orderDescription, s, f);
    setCurrentContextValue("buyerId", order.buyerId, s, f);
  }, [order]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    rows
      ?.filter((r) => !r.attributes?.length)
      .forEach((r) =>
        setValueForCell(TableConstants.NOPANEL, true, r, columns, s, () => {
          return;
        })
      );
    f({ ...s });
  }, [rows]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    checkBox: true,
    columns,
    rows,
    detailPanel: DetailPanel,
    showPanelOnMobile: true,
    labels: {
      selected: "RequisitionListItems.nProductsSel",
      emptyMsg: "RequisitionListItems.noItems",
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
