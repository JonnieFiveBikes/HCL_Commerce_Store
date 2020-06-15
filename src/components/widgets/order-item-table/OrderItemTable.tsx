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
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import FormattedPriceDisplay from "../formatted-price-display";
import { INVENTORY_STATUS } from "../../../constants/order";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import * as orderActions from "../../../redux/actions/order";
import { loginStatusSelector } from "../../../redux/selectors/user";
//UI
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  StyledAvatar,
  StyledNumberInput,
  StyledTable,
  StyledTypography,
} from "../../StyledUI";

interface OrderItemTableProps {
  data: any[];
  columnData?: any[];
  title?: string;
  readOnly?: boolean;
  options?: any;
}

/**
 * Order item table component
 * displays order item table with item info, inventory status, quantity and actions
 * allows for ready-only mode with no edits/actions
 * @param props
 */
const OrderItemTable: React.FC<OrderItemTableProps> = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const contractId = useSelector(currentContractIdSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const isRecurringOrderFeatureEnabled = mySite?.isB2B && loginStatus;

  const dataProps = props.data;
  const data = initData();

  const title = props.title !== undefined ? props.title : "";
  const readOnly = props.readOnly !== undefined ? props.readOnly : true;
  const [quantityList, setQuantityList] = useState<any>(initQuantityData());

  const defaultColumnData = [
    {
      field: "thumbnail",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => (
        <>
          {rowData.seo && rowData.seo.href ? (
            <Link to={rowData.seo?.href}>
              <StyledAvatar alt={rowData.name} src={rowData.thumbnail} />
            </Link>
          ) : (
            <StyledAvatar alt={rowData.name} src={rowData.thumbnail} />
          )}
        </>
      ),
    },
    {
      title: t("OrderItemTable.Labels.ItemDetails"),
      field: "name",
      render: (rowData: any) => (
        <>
          <StyledTypography variant="body2">
            {rowData.seo && rowData.seo.href ? (
              <Link to={rowData.seo.href}>
                {rowData.name ? rowData.name : rowData.partNumber}
              </Link>
            ) : rowData.name ? (
              rowData.name
            ) : (
              rowData.partNumber
            )}
          </StyledTypography>
          <StyledTypography variant="body1">
            {t("OrderItemTable.Labels.SKU")}: {rowData.partNumber}
          </StyledTypography>
          {rowData.attributes &&
            rowData.attributes.map((attribute: any, index: number) =>
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
          {isRecurringOrderFeatureEnabled &&
            rowData.disallowRecurringOrder === "1" && (
              <StyledTypography variant="overline" color="textSecondary">
                {t("OrderItemTable.Labels.NonRecurring")}
              </StyledTypography>
            )}
        </>
      ),
    },
    {
      title: t("OrderItemTable.Labels.Status"),
      field: "orderItemInventoryStatus",
      render: (rowData: any) =>
        rowData.availableDate == ""
          ? rowData.orderItemInventoryStatus === INVENTORY_STATUS.available ||
            rowData.orderItemInventoryStatus === INVENTORY_STATUS.allocated
            ? t("CommerceEnvironment.inventoryStatus.Available")
            : t("CommerceEnvironment.inventoryStatus.OOS")
          : rowData.availableDate <= new Date()
          ? t("CommerceEnvironment.inventoryStatus.Available")
          : rowData.orderItemInventoryStatus !== INVENTORY_STATUS.backordered
          ? t("CommerceEnvironment.inventoryStatus.Available")
          : t("CommerceEnvironment.inventoryStatus.Backordered"),
    },

    {
      title: t("OrderItemTable.Labels.Quantity"),
      field: "quantity",
      type: "numeric",
      headerStyle: {
        textAlign: "left",
        flexDirection: "row",
      },
      cellStyle: {
        textAlign: "left",
      },
      render: (rowData: any) =>
        readOnly ? (
          <StyledTypography>
            {quantityList[rowData.orderItemId]}
          </StyledTypography>
        ) : (
          <StyledNumberInput
            mobile
            value={quantityList[rowData.orderItemId]}
            min={1}
            step={1}
            precision={0}
            disabled={rowData.freeGift === "true"}
            onChange={(event) => onQuantityUpdate(event, rowData)}
            stopLoadingOnUpdateValue={rowData}
            debounceTiming={1000}
            strict
          />
        ),
    },
    {
      title: t("OrderItemTable.Labels.Price"),
      field: "orderItemPrice",
      type: "numeric",
      headerStyle: {
        textAlign: "left",
        flexDirection: "row",
      },
      cellStyle: {
        textAlign: "left",
      },
      render: (rowData: any) => (
        <StyledTypography>
          <FormattedPriceDisplay
            min={parseFloat(rowData.orderItemPrice)}
            currency={rowData.currency}
          />
        </StyledTypography>
      ),
    },
  ];
  const actions = [
    (rowData: any) => ({
      icon: () => <DeleteOutlineIcon />,
      tooltip: t("OrderItemTable.Actions.Delete"),
      onClick: (event, rowData: any) => removeItem(rowData),
      hidden: rowData.freeGift === "true",
    }),
  ];
  const defaultOptions = {
    toolbar: false,
    paging: false,
    actionsColumnIndex: -1,
    fixedColumns: {
      left: 0,
      right: 0,
    },
  };

  const columnData =
    props.columnData !== undefined ? props.columnData : defaultColumnData;
  const options = props.options !== undefined ? props.options : defaultOptions;

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    setQuantityList(initQuantityData());
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [dataProps]);

  /**
   * Initialize table data by making a copy
   * Material-table alters the input data, so data cannot be of immutable type
   * @returns Copy of the data prop
   */
  function initData() {
    let newData: any[] = [];
    if (dataProps) {
      newData = dataProps.map((oi) => ({ ...oi }));
    }
    return newData;
  }

  /**
   * Initialize quantity data per order item
   * @returns quantities object for each order item
   */
  function initQuantityData() {
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
  }

  /**
   * Dispatch action to remove selected order item
   * @param item The selected order item
   */
  function removeItem(item: any) {
    const orderItemId = item.orderItemId;
    let payload = {
      ...payloadBase,
      orderItemId: orderItemId,
    };
    dispatch(orderActions.REMOVE_ITEM_ACTION(payload));
  }

  /**
   * Dispatch quantity update actino for order item
   * @param item The selected order item
   */
  function onQuantityUpdate(quantityString: string, item: any) {
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
        }
      } catch (e) {
        console.log("Could not parse quantity");
      }
    }
  }

  return (
    <StyledTable
      columns={columnData}
      data={data}
      title={title}
      options={options}
      actions={readOnly ? [] : actions}
    />
  );
};

export { OrderItemTable };
