/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import { useState, useEffect, useMemo } from "react";
import HTMLReactParser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { CONSTANTS } from "../../constants/order-item-table";
import FormattedPriceDisplay from "../../components/widgets/formatted-price-display";
import { PAGINATION_CONFIGS } from "../../configs/order";
import * as ROUTES from "../../constants/routes";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import * as orderActions from "../../redux/actions/order";
import { forUserIdSelector, loginStatusSelector, userIdSelector } from "../../redux/selectors/user";

//UI
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TruckIcon from "@material-ui/icons/LocalShipping";

import CloseIcon from "@material-ui/icons/CloseOutlined";
import {
  StyledAvatar,
  StyledGrid,
  StyledTypography,
  StyledNumberInput,
  StyledIconButton,
  TableColumnDef,
  withCustomTableContext,
  CustomTable,
  useTableUtils,
  TableConstants,
  useCustomTable,
  StyledLink,
  StyledCircularProgress,
} from "@hcl-commerce-store-sdk/react-component";

//GA360
import AsyncCall from "../../_foundation/gtm/async.service";
import { cartSelector, orderMethodIsPickupSelector } from "../../redux/selectors/order";
import { useWinDimsInEM } from "./use-win-dims-in-em";
import { STRING_TRUE, XS_MOBILE_W } from "../../constants/common";
import { get } from "lodash-es";
import Closed from "@material-ui/icons/ChevronRight";
import Open from "@material-ui/icons/ExpandMoreOutlined";
import storeUtil from "../../utils/storeUtil";
import inventoryavailabilityService from "../apis/transaction/inventoryavailability.service";
import { useStoreLocatorValue } from "../context/store-locator-context";
import { sellersSelector } from "../../redux/selectors/sellers";

const OpenDrawer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Closed />
      <StyledTypography variant="caption">{t("OrderItemTable.Labels.showAttrs")}</StyledTypography>
    </>
  );
};
const CloseDrawer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Open />
      <StyledTypography variant="caption">{t("OrderItemTable.Labels.hideAttrs")}</StyledTypography>
    </>
  );
};

const DetailPanel = ({ rowData, ...props }) => {
  const { attributes: rawData } = rowData;
  const cellStyle = { verticalAlign: "middle" };
  const { t } = useTranslation();
  const attrs = rawData?.filter((a) => STRING_TRUE === a.displayable);

  // generate headers array
  const columns = attrs?.map((a, i) => ({
    title: a.name,
    idProp: "name",
    keyLookup: { key: `attr_${i}_value` },
    display: { cellStyle },
  }));

  // generate single row out of all attribute values
  const data = [
    attrs?.reduce((n, v, i) => {
      n[`attr_${i}_value`] = storeUtil.csValue(get(v, "values[0].value", t("CommerceEnvironment.inventoryStatus.NA")));
      return n;
    }, {}),
  ];

  const className = "detailPanel table-tablet";
  const style = { width: "auto", border: "0" };
  const D = useMemo(() => withCustomTableContext(CustomTable), []);
  return columns?.length > 0 ? (
    <D
      {...{
        t,
        data,
        columns,
        style,
        className,
        outerClassName: "order-item-table-drawer",
        labels: { emptyMsg: "InprogressItems.noItems" },
      }}
    />
  ) : null;
};

function calculateAvailability(o: any, availability: Availability, counter: any) {
  const { onlineInventory, sellerInventory, physicalStoreInventory } = availability;
  const deliveryInventory = [...onlineInventory, ...sellerInventory];
  const { partNumber } = o;
  let count = counter[partNumber];
  try {
    const qty = parseInt(o.quantity);
    if (physicalStoreInventory.length > 0) {
      //pickup in store
      if (!count) {
        const _avl = physicalStoreInventory.find((i) => i.partNumber === partNumber);
        if (_avl?.availableQuantity) {
          count = parseInt(_avl.availableQuantity);
        }
      }
      if (!count || count < qty) {
        o["availability"] = "NOT_AVAIL_PICKUP";
      } else {
        count = count - qty;
        o["availability"] = "AVAIL_PICKUP";
      }
      counter[partNumber] = count;
    } else {
      if (!count) {
        const _avl = deliveryInventory.find((i) => i.partNumber === partNumber);
        if (_avl?.availableQuantity) {
          count = parseInt(_avl.availableQuantity);
        }
      }
      if (!count || count < qty) {
        o["availability"] = "NOT_AVAIL_DELIVERY";
      } else {
        count = count - qty;
        o["availability"] = "AVAIL_DELIVERY";
      }
      counter[partNumber] = count;
    }
  } catch (e) {
    console.log("fail to calculate availability", o, availability, e);
  }
}

interface PartNumberMap {
  [key: string]: Set<string>;
}

interface Availability {
  onlineInventory: any[];
  physicalStoreInventory: any[];
  sellerInventory: any[];
}

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
  const cancels: Canceler[] = [];
  const contractId = useSelector(currentContractIdSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const isRecurringOrderFeatureEnabled = mySite?.isB2B && loginStatus;
  const { preShip, data: dataProps, cartPage = false } = props;
  const { tableState, setTableState } = useCustomTable();
  const { setValueForCell } = useTableUtils();
  const [actionData, setActionData] = useState<any>(null);
  const sellers = useSelector(sellersSelector);
  const orderMethodIsPickup = useSelector(orderMethodIsPickupSelector);
  const reviewPage = useLocation().pathname === ROUTES.CHECKOUT + "/" + ROUTES.CHECKOUT_REVIEW;

  const storeId: string = mySite ? mySite.storeID : "";
  const payloadBase: any = {
    storeId: storeId,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  const { storeLocator } = useStoreLocatorValue();
  const selectedStore = useMemo(() => storeLocator.selectedStore, [storeLocator]);
  const [availability, setAvailability] = useState<Availability>();

  const getInventory = async (pnMap: PartNumberMap) => {
    let physicalStoreInventory: any[] = [];
    let onlineInventory: any[] = [];
    let sellerInventory: any[] = [];
    if (orderMethodIsPickup && selectedStore) {
      const _pns: string[] = [];
      Object.values(pnMap).forEach((pn: Set<string>) => _pns.push(...Array.from(pn)));
      const _params = {
        ...payloadBase,
        partNumbers: _pns.join(),
        physicalStoreName: selectedStore.physicalStoreName,
      };
      try {
        const resp = await inventoryavailabilityService.getInventoryAvailabilityByPartNumber(_params);
        physicalStoreInventory = (resp.data.InventoryAvailability ?? []).filter((a) => a.physicalStoreId);
      } catch (e) {
        console.log("fail to get physical inventory", _params, e);
      }
    } else {
      const _ops: Promise<any>[] = [];
      const _sps: Promise<any>[] = [];
      for (const [key, _pn] of Object.entries(pnMap)) {
        if (key === "online") {
          //online inventory, only one sevice call.
          const _params = {
            ...payloadBase,
            partNumbers: Array.from(_pn).join(),
          };
          _ops.push(inventoryavailabilityService.getInventoryAvailabilityByPartNumber(_params));
        } else {
          //seller inventory call, grouped by sellerId
          const _params = {
            ...payloadBase,
            partNumbers: Array.from(_pn).join(),
            sellerId: key,
          };
          _sps.push(inventoryavailabilityService.getInventoryAvailabilityByPartNumber(_params));
        }
      }
      if (_ops.length > 0) {
        try {
          const _oresp = await _ops[0];
          onlineInventory = _oresp.data.InventoryAvailability ?? [];
        } catch (e) {
          console.log("fail to get online inventory", e);
        }
      }
      if (_sps.length > 0) {
        try {
          const _resps = await Promise.all(_sps);
          sellerInventory = (
            _resps.reduce((p, c) => {
              const _a: any[] = c.data.InventoryAvailability ?? [];
              p.push(..._a);
              return p;
            }, []) as any[]
          ).filter((a) => a.x_sellerId);
        } catch (e) {
          console.log("fail to get seller inventory", e);
        }
      }
    }

    setAvailability({
      onlineInventory,
      sellerInventory,
      physicalStoreInventory,
    });
  };

  /**
   * Initialize table data by making a copy
   * Material-table alters the input data, so data cannot be of immutable type
   * @returns Copy of the data prop
   */
  const data = useMemo(() => {
    /**
     * {partnumber: remainingInventory}
     * This is based on one partnumber only have one seller
     */
    const counter: any = {};
    const newData = (dataProps ?? []).map((oi) => {
      const _oi = { ...oi };
      if (availability) {
        calculateAvailability(_oi, availability, counter);
      }
      return _oi;
    });
    return newData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProps, availability]);

  const readOnly = props.readOnly !== undefined ? props.readOnly : true;
  const miniCartView = props.miniCartView !== undefined ? props.miniCartView : false;

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  //update this flag as need later
  const pagination = !readOnly && !miniCartView;
  const handleMiniCartClose = props.handleMiniCartClose !== undefined ? props.handleMiniCartClose : null;
  const { seller } = props;

  /**
   * Initialize quantity data per order item
   * @returns quantities object for each order item
   */
  const initQuantityData = () => {
    const newData: any = {};
    const pnMap: PartNumberMap = {};
    if (dataProps) {
      //get all inventories
      dataProps.forEach((oi) => {
        const { partNumber, fulfillmentCenterOwnerId } = oi;
        if (sellers?.sellers?.some((s) => s.id === fulfillmentCenterOwnerId)) {
          let pSet: Set<string> = pnMap[fulfillmentCenterOwnerId];
          if (!pSet) {
            pSet = new Set<string>();
            pnMap[fulfillmentCenterOwnerId] = pSet;
          }
          pSet.add(partNumber);
        } else {
          let pSet: Set<string> = pnMap["online"];
          if (!pSet) {
            pSet = new Set<string>();
            pnMap["online"] = pSet;
          }
          pSet.add(partNumber);
        }
        if (oi.quantity) {
          try {
            const parsedQty = parseInt(oi.quantity);
            if (parsedQty > 0) {
              newData[oi.orderItemId] = parsedQty;
            }
          } catch (e) {
            console.log("Could not parse quantity", e);
          }
        }
      });
    }
    getInventory(pnMap);
    return newData;
  };
  const [quantityList, setQuantityList] = useState<any>({});
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

  const columns = useMemo(
    () => {
      const cancels: Canceler[] = [];
      const payloadBase: any = {
        currency: defaultCurrencyID,
        contractId: contractId,
        widget: "Order Item Table",
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      };
      const itemValCalc = ({ rowData: r }) => r.name || r.partNumber;
      const oaValCalc = ({ rowData }) => {
        return storeUtil.constructInventoryMessage(rowData, t, cartPage, selectedStore?.storeName);
      };
      const priceCalc = ({ rowData: r }) => Number(r.orderItemPrice);
      const quantityCalc = ({ rowData: r }) => Number(quantityList[r.orderItemId]);
      const statusCalc = ({ rowData: r }) => t(`Order.Status_${r.orderItemStatus}`);

      const QuantityDisplay = (props: any) => (
        <StyledTypography data-testid={`order-item-quantity-${props.rowData.partNumber}`}>
          {quantityList[props.rowData.orderItemId]}
        </StyledTypography>
      );

      const OrderItemPrice = (props: any) => (
        <StyledTypography
          data-testid={`order-item-price-${props.rowData.partNumber}`}
          align={miniCartView ? "right" : "inherit"}>
          <FormattedPriceDisplay min={parseFloat(props.rowData.orderItemPrice)} currency={props.rowData.currency} />
        </StyledTypography>
      );
      const ThumbnailCell = ({ rowData, ...props }) => {
        return (
          <>
            {rowData.seo && rowData.seo.href ? (
              <StyledLink to={rowData.seo?.href} onClick={handleMiniCartClose ? handleMiniCartClose : null}>
                <StyledAvatar
                  data-testid={`order-item-thumbnail-image-${rowData.partNumber}`}
                  alt={rowData.name}
                  src={rowData.thumbnail}
                  style={{ margin: "0", justifyContent: "flex-start" }}
                />
              </StyledLink>
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
          rowData.freeGift === "true" || (cart?.buyerId !== userId && userId !== itemMemberId) || reviewPage;

        /**
         * Dispatch quantity update action for order item
         * @param item The selected order item
         */
        const onQuantityUpdate = (quantityString: string, item: any) => {
          if (item) {
            try {
              const quantity = parseInt(quantityString);
              if (quantity > 0) {
                const payload = {
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
            data-testid={`order-item-quantity-input-${rowData.partNumber}`}
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
            <StyledGrid container justifyContent="space-between" wrap={miniCartView ? "nowrap" : undefined}>
              <StyledGrid item>
                <StyledTypography variant="body2" style={{ wordBreak: "break-word" }}>
                  {rowData.seo && rowData.seo.href ? (
                    <StyledLink to={rowData.seo?.href} onClick={handleMiniCartClose}>
                      {rowData.name ? rowData.name : rowData.partNumber}
                    </StyledLink>
                  ) : rowData.name ? (
                    rowData.name
                  ) : (
                    rowData.partNumber
                  )}
                </StyledTypography>
                <StyledTypography data-testid={`order-item-sku-${rowData.partNumber}`} variant="body1">
                  {!miniCartView && t("OrderItemTable.Labels.SKU")}
                  {rowData.partNumber}
                </StyledTypography>
                {rowData.freeGift === "true" && (
                  <StyledTypography variant="overline" color="textSecondary">
                    {t("OrderItemTable.Labels.Gift")}
                  </StyledTypography>
                )}
                {!miniCartView && isRecurringOrderFeatureEnabled && rowData.disallowRecurringOrder === "1" && (
                  <StyledTypography variant="overline" color="textSecondary">
                    {t("OrderItemTable.Labels.NonRecurring")}
                  </StyledTypography>
                )}
              </StyledGrid>
              {miniCartView && !reviewPage && (
                <StyledGrid item>
                  <DeleteActionCell {...{ rowData }} />
                </StyledGrid>
              )}
            </StyledGrid>
            {miniCartView && (
              <StyledGrid container alignItems="center" justifyContent="space-between">
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
          clicked || rowData.freeGift === "true" || (cart?.buyerId !== userId && userId !== itemMemberId);

        /**
         * Dispatch action to remove selected order item
         * @param item The selected order item
         */
        const removeItem = (item: any) => {
          const orderItemId = item.orderItemId;
          const payload = {
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
            onClick={() => removeItem(rowData)}
            data-testid={`order-remove-item-button-${rowData.partNumber}`}>
            {miniCartView ? <CloseIcon /> : <DeleteOutlineIcon />}
          </StyledIconButton>
        );
      };

      const ItemStatusCell = ({ rowData: r }) => {
        return t(`Order.Status_${r.orderItemStatus}`);
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
          title: t("OrderItemTable.Labels.status"),
          keyLookup: {
            key: CONSTANTS.status,
          },
          sortable: { fn: statusCalc },
          display: {
            template: ItemStatusCell,
          },
        },
        {
          title: t("OrderItemTable.Labels.Status"),
          keyLookup: {
            key: CONSTANTS.orderItemInventoryStatus,
          },
          sortable: { fn: oaValCalc },
          display: {
            template: ({ rowData, ...props }) => {
              const _avi = storeUtil.constructInventoryMessage(rowData, t, cartPage, selectedStore?.storeName);
              return _avi ? (
                <StyledTypography data-testid={`order-item-inventory-status-${rowData.partNumber}`}>
                  {HTMLReactParser(_avi)}
                </StyledTypography>
              ) : (
                <StyledCircularProgress />
              );
            },
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
            template: ({ rowData, ...props }) => <OrderItemPrice rowData={rowData} />,
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
        columns = columns.filter((col) => col.keyLookup.key !== CONSTANTS.orderItemActions);
      }

      // don't show status if order hasn't been shipped
      if (preShip) {
        columns = columns.filter(({ keyLookup: { key: k } }) => k !== CONSTANTS.status);
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

      // hide panel for any records with not attributes
      data
        .filter((r) => !r.attributes?.length)
        .forEach((r) =>
          setValueForCell(TableConstants.NOPANEL, true, r, columns, tableState, () => {
            return;
          })
        );

      setTableState({ ...tableState });

      return columns;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
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
      data,
    ]
  );

  const panelExpanderComps = useMemo(
    () => ({
      compShow: OpenDrawer,
      compHide: CloseDrawer,
    }),
    []
  );
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

  useEffect(() => {
    if (seller) {
      setActionData({
        grids: [{ xs: true }],
        extraActions: [
          <div style={{ display: "flex", alignItems: "center" }}>
            <TruckIcon fontSize="large" className="right-margin-1" />
            <StyledTypography variant="h6">
              {t("productDetail.SellerSimple", { seller: seller.seller })}
            </StyledTypography>
          </div>,
        ],
      });
    }
  }, [seller]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    columns,
    data,
    options,
    detailPanel: DetailPanel,
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
    panelExpanderComps,
    actionData,
  };
};
