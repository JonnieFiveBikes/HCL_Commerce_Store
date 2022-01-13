/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { CONSTANTS } from "../../constants/order-item-table";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
import { INVENTORY_STATUS } from "../../constants/order";
import { PAGINATION_CONFIGS } from "../../configs/order";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import * as orderActions from "../../redux/actions/order";
import {
  forUserIdSelector,
  loginStatusSelector,
  userIdSelector,
} from "../../redux/selectors/user";
//UI
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import {
  StyledAvatar,
  StyledGrid,
  StyledTypography,
  StyledNumberInput,
  StyledIconButton,
  TableColumnDef,
} from "@hcl-commerce-store-sdk/react-component";

//GA360
import AsyncCall from "../../_foundation/gtm/async.service";
import { cartSelector } from "../../redux/selectors/order";
import { useWinDimsInEM } from "./use-win-dims-in-em";
import { XS_MOBILE_W } from "../../constants/common";

/**
 * Order item table component
 * displays order item table with item info, inventory status, quantity and actions
 * allows for ready-only mode with no edits/actions
 * @param props
 */
export const useOrderItemTable = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const contractId = useSelector(currentContractIdSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const isRecurringOrderFeatureEnabled = mySite?.isB2B && loginStatus;

  const dataProps = props.data;
  /**
   * Initialize table data by making a copy
   * Material-table alters the input data, so data cannot be of immutable type
   * @returns Copy of the data prop
   */
  const data = useMemo(() => {
    const newData = (dataProps ?? []).map((oi) => ({ ...oi }));
    return newData;
  }, [dataProps]);

  const readOnly = props.readOnly !== undefined ? props.readOnly : true;
  const miniCartView =
    props.miniCartView !== undefined ? props.miniCartView : false;

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  //update this flag as need later
  const pagination = !readOnly && !miniCartView;
  const handleMiniCartClose =
    props.handleMiniCartClose !== undefined ? props.handleMiniCartClose : null;
  /**
   * Initialize quantity data per order item
   * @returns quantities object for each order item
   */
  const initQuantityData = () => {
    let newData: any = {};
    if (dataProps) {
      dataProps.map((oi) => {
        if (oi.quantity) {
          try {
            const parsedQty = parseInt(oi.quantity);
            if (parsedQty > 0) {
              newData[oi.orderItemId] = parsedQty;
            }
          } catch (e) {
            console.log("Could not parse quantity");
          }
        }
        return null;
      });
    }
    return newData;
  };
  const [quantityList, setQuantityList] = useState<any>(initQuantityData());
  const defaultOptions = {
    toolbar: false,
    header: !miniCartView,
    paging: pagination,
    pageSize: PAGINATION_CONFIGS.pageLimit,
    pageSizeOptions: PAGINATION_CONFIGS.pageSizeOptions,
    actionsColumnIndex: -1,
    fixedColumns: {
      left: 0,
      right: 0,
    },
  };
  const options = props.options !== undefined ? props.options : defaultOptions;

  const columns = useMemo(() => {
    let cancels: Canceler[] = [];
    const payloadBase: any = {
      currency: defaultCurrencyID,
      contractId: contractId,
      widget: "Order Item Table",
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    const itemValCalc = ({ rowData: r }) => r.name || r.partNumber;
    const oaValCalc = ({ rowData: r }) => {
      return r.availableDate === ""
        ? r.orderItemInventoryStatus === INVENTORY_STATUS.available ||
          r.orderItemInventoryStatus === INVENTORY_STATUS.allocated
          ? t("CommerceEnvironment.inventoryStatus.Available")
          : t("CommerceEnvironment.inventoryStatus.OOS")
        : r.availableDate <= new Date()
        ? t("CommerceEnvironment.inventoryStatus.Available")
        : r.orderItemInventoryStatus !== INVENTORY_STATUS.backordered
        ? t("CommerceEnvironment.inventoryStatus.Available")
        : t("CommerceEnvironment.inventoryStatus.Backordered");
    };
    const priceCalc = ({ rowData: r }) => Number(r.orderItemPrice);
    const quantityCalc = ({ rowData: r }) =>
      Number(quantityList[r.orderItemId]);

    const QuantityDisplay = (props: any) => (
      <StyledTypography>
        {quantityList[props.rowData.orderItemId]}
      </StyledTypography>
    );

    const OrderItemPrice = (props: any) => (
      <StyledTypography align={miniCartView ? "right" : "inherit"}>
        <FormattedPriceDisplay
          min={parseFloat(props.rowData.orderItemPrice)}
          currency={props.rowData.currency}
        />
      </StyledTypography>
    );
    const ThumbnailCell = ({ rowData, ...props }) => {
      return (
        <>
          {rowData.seo && rowData.seo.href ? (
            <Link
              to={rowData.seo?.href}
              onClick={handleMiniCartClose ? handleMiniCartClose : null}>
              <StyledAvatar
                alt={rowData.name}
                src={rowData.thumbnail}
                style={{ margin: "0", justifyContent: "flex-start" }}
              />
            </Link>
          ) : (
            <StyledAvatar alt={rowData.name} src={rowData.thumbnail} />
          )}
        </>
      );
    };

    const QuantityCell = ({ rowData, ...props }) => {
      const forUserId = useSelector(forUserIdSelector);
      const uId = useSelector(userIdSelector);
      const userId = forUserId ?? uId;
      const cart = useSelector(cartSelector);
      const itemMemberId = rowData.xitem_memberId;
      const { w } = useWinDimsInEM();
      const mobile = !miniCartView && w > XS_MOBILE_W ? true : undefined;
      const disabled =
        rowData.freeGift === "true" ||
        (cart?.buyerId !== userId && userId !== itemMemberId);

      /**
       * Dispatch quantity update action for order item
       * @param item The selected order item
       */
      const onQuantityUpdate = (quantityString: string, item: any) => {
        if (item) {
          try {
            const quantity = parseInt(quantityString);
            if (quantity > 0) {
              let payload = {
                ...payloadBase,
                quantity: quantity.toString(),
                orderItemId: item.orderItemId,
                fetchCatentries: true,
              };
              dispatch(orderActions.UPDATE_ITEM_ACTION(payload));

              // update this (even tho it's temporary) just so that once the dispatch
              //   action completes, we don't "temporarily" revert back to the old value
              quantityList[rowData.orderItemId] = quantity;
            }
          } catch (e) {
            console.log("Could not parse quantity");
          }
        }
      };
      return !miniCartView && readOnly ? (
        <QuantityDisplay rowData={rowData} />
      ) : (
        <StyledNumberInput
          mobile={mobile}
          value={quantityList[rowData.orderItemId]}
          min={1}
          step={1}
          precision={0}
          disabled={disabled}
          onChange={(event) => onQuantityUpdate(event, rowData)}
          stopLoadingOnUpdateValue={rowData}
          debounceTiming={250}
          strict
        />
      );
    };

    const ItemDetailsCell = ({ rowData, ...props }) => {
      return (
        <>
          <StyledGrid
            container
            justifyContent="space-between"
            wrap={miniCartView ? "nowrap" : undefined}>
            <StyledGrid item>
              <StyledTypography variant="body2">
                {rowData.seo && rowData.seo.href ? (
                  <Link
                    to={rowData.seo?.href}
                    onClick={handleMiniCartClose ? handleMiniCartClose : null}>
                    {rowData.name ? rowData.name : rowData.partNumber}
                  </Link>
                ) : rowData.name ? (
                  rowData.name
                ) : (
                  rowData.partNumber
                )}
              </StyledTypography>
              <StyledTypography variant="body1">
                {!miniCartView && t("OrderItemTable.Labels.SKU")}
                {rowData.partNumber}
              </StyledTypography>
              {!miniCartView &&
                rowData.attributes &&
                rowData.attributes.map(
                  (attribute: any, index: number) =>
                    attribute.values &&
                    attribute.values.map((value: any, index: number) => (
                      <StyledTypography variant="body1" key={value.id}>
                        {attribute.name}: {value.value}
                      </StyledTypography>
                    ))
                )}
              {rowData.freeGift === "true" && (
                <StyledTypography variant="overline" color="textSecondary">
                  {t("OrderItemTable.Labels.Gift")}
                </StyledTypography>
              )}
              {!miniCartView &&
                isRecurringOrderFeatureEnabled &&
                rowData.disallowRecurringOrder === "1" && (
                  <StyledTypography variant="overline" color="textSecondary">
                    {t("OrderItemTable.Labels.NonRecurring")}
                  </StyledTypography>
                )}
            </StyledGrid>
            {miniCartView ? (
              <StyledGrid item>
                <DeleteActionCell {...{ rowData }} />
              </StyledGrid>
            ) : null}
          </StyledGrid>
          {miniCartView && (
            <StyledGrid
              container
              alignItems="center"
              justifyContent="space-between">
              <StyledGrid item xs={12} sm className="qty-price-section">
                <QuantityCell {...{ rowData }} />
              </StyledGrid>
              <StyledGrid item xs className="qty-price-section">
                <OrderItemPrice rowData={rowData} />
              </StyledGrid>
            </StyledGrid>
          )}
        </>
      );
    };

    const DeleteActionCell = ({ rowData, ...props }) => {
      const cart = useSelector(cartSelector);
      const forUserId = useSelector(forUserIdSelector);
      const uId = useSelector(userIdSelector);
      const userId = forUserId ?? uId;
      const itemMemberId = rowData.xitem_memberId;
      const [clicked, setClicked] = useState<boolean>(false);
      const disabled =
        clicked ||
        rowData.freeGift === "true" ||
        (cart?.buyerId !== userId && userId !== itemMemberId);

      /**
       * Dispatch action to remove selected order item
       * @param item The selected order item
       */
      const removeItem = (item: any) => {
        const orderItemId = item.orderItemId;
        let payload = {
          ...payloadBase,
          orderItemId: orderItemId,
          fetchCatentries: true,
        };
        setClicked(true);
        dispatch(orderActions.REMOVE_ITEM_ACTION(payload));

        //GA360
        if (mySite.enableGA) {
          AsyncCall.sendRemoveFromCartEvent(item, {
            enableUA: mySite.enableUA,
            enableGA4: mySite.enableGA4,
          });
        }
      };

      return (
        <StyledIconButton
          disabled={disabled}
          color="primary"
          style={{ padding: "0.2rem" }}
          onClick={() => removeItem(rowData)}>
          {miniCartView ? <CloseIcon /> : <DeleteOutlineIcon />}
        </StyledIconButton>
      );
    };
    let columns: TableColumnDef[] = [
      {
        title: "",
        idProp: "orderItemId",
        keyLookup: {
          key: CONSTANTS.thumbnail,
        },
        display: {
          cellStyle: {
            textAlign: "center",
          },
          template: ThumbnailCell,
        },
      },
      {
        title: t("OrderItemTable.Labels.ItemDetails"),
        keyLookup: {
          key: CONSTANTS.name,
        },
        sortable: { fn: itemValCalc },
        display: {
          template: ItemDetailsCell,
        },
      },
      {
        title: t("OrderItemTable.Labels.Status"),
        keyLookup: {
          key: CONSTANTS.orderItemInventoryStatus,
        },
        sortable: { fn: oaValCalc },
        display: {
          template: ({ rowData, ...props }) => (
            <>
              {rowData.availableDate === ""
                ? rowData.orderItemInventoryStatus ===
                    INVENTORY_STATUS.available ||
                  rowData.orderItemInventoryStatus ===
                    INVENTORY_STATUS.allocated
                  ? t("CommerceEnvironment.inventoryStatus.Available")
                  : t("CommerceEnvironment.inventoryStatus.OOS")
                : rowData.availableDate <= new Date()
                ? t("CommerceEnvironment.inventoryStatus.Available")
                : rowData.orderItemInventoryStatus !==
                  INVENTORY_STATUS.backordered
                ? t("CommerceEnvironment.inventoryStatus.Available")
                : t("CommerceEnvironment.inventoryStatus.Backordered")}
            </>
          ),
        },
      },

      {
        title: t("OrderItemTable.Labels.Quantity"),
        keyLookup: {
          key: CONSTANTS.quantity,
        },
        sortable: { numeric: true, fn: quantityCalc },
        display: {
          cellStyle: {
            textAlign: "left",
          },
          template: QuantityCell,
        },
      },
      {
        title: t("OrderItemTable.Labels.Price"),
        keyLookup: {
          key: CONSTANTS.orderItemPrice,
        },
        sortable: { numeric: true, fn: priceCalc },
        display: {
          cellStyle: {
            textAlign: "left",
          },
          template: ({ rowData, ...props }) => (
            <OrderItemPrice rowData={rowData} />
          ),
        },
      },
      {
        title: t("OrderItemTable.Labels.Actions"),
        keyLookup: {
          key: CONSTANTS.orderItemActions,
        },

        display: {
          cellStyle: {
            textAlign: "left",
          },
          template: DeleteActionCell,
        },
      },
    ];

    if (readOnly) {
      columns = columns.filter(
        (col) => col.keyLookup.key !== CONSTANTS.orderItemActions
      );
    }
    if (miniCartView) {
      columns = columns.filter(
        (col) =>
          col.keyLookup.key !== CONSTANTS.orderItemInventoryStatus &&
          col.keyLookup.key !== CONSTANTS.quantity &&
          col.keyLookup.key !== CONSTANTS.orderItemPrice &&
          col.keyLookup.key !== CONSTANTS.orderItemActions
      );
    }
    return columns;
  }, [
    t,
    mySite,
    miniCartView,
    handleMiniCartClose,
    isRecurringOrderFeatureEnabled,
    contractId,
    dispatch,
    CancelToken,
    readOnly,
    quantityList,
    defaultCurrencyID,
  ]);

  useEffect(() => {
    setQuantityList(initQuantityData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProps]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    columns,
    data,
    options,
    labels: {
      labelRowsSelect: t("OrderItemTable.Labels.PageSizeLabel"),
      labelDisplayedRows: t("OrderItemTable.Labels.RowCount"),
      firstTooltip: t("OrderItemTable.Labels.FirstPage"),
      previousTooltip: t("OrderItemTable.Labels.PreviousPage"),
      nextTooltip: t("OrderItemTable.Labels.NextPage"),
      lastTooltip: t("OrderItemTable.Labels.LastPage"),
    },
    t,
    miniCartView,
    handleMiniCartClose,
  };
};
