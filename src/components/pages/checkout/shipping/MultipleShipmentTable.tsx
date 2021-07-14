/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//UI
import EditIcon from "@material-ui/icons/Edit";
import {
  StyledAvatar,
  StyledTypography,
  StyledCheckbox,
  StyledButton,
  StyledTable,
} from "@hcl-commerce-store-sdk/react-component";

interface MultipleShipmentTableProps {
  data: any[];
  columnData?: any[];
  title?: string;
  options?: any;
  className?: string;
  handleSelectShipmentChangeForSingleItem: Function;
  checkboxesActive?: boolean;
  clickCheckbox: Function;
  selectAllCheckboxes?: boolean;
  itemsMap?: any;
  usableAddresses: any[];
}

/**
 * Multiple shipment table component
 * displays multiple shipment table with item info, quantity, shipping details and actions
 * @param props
 */
const MultipleShipmentTable: React.FC<MultipleShipmentTableProps> = (
  props: any
) => {
  const { t } = useTranslation();

  const selectAllCheckboxes =
    props.selectAllCheckboxes !== undefined ? props.selectAllCheckboxes : false;

  const itemsMap = props.itemsMap !== undefined ? props.itemsMap : {};
  const usableAddresses =
    props.usableAddresses !== undefined ? props.usableAddresses : [];

  const dataProps = props.data;
  const data = initData();

  const title = props.title !== undefined ? props.title : "";

  const quantityList = initQuantityData();

  function handleSelectForOneItem(item: any) {
    props.handleSelectShipmentChangeForSingleItem(item);
  }

  function clickCheckbox(evt: any) {
    props.clickCheckbox(evt);
  }

  const QuantityDisplay = (props: any) => (
    <StyledTypography>
      {quantityList[props.rowData.orderItemId]}
    </StyledTypography>
  );

  const isValidAddress = (addressId): boolean => {
    let res: boolean = false;
    usableAddresses.forEach((address) => {
      if (address.addressId === addressId) {
        res = true;
      }
    });
    return res;
  };

  const defaultColumnData = [
    {
      title: (
        <StyledCheckbox
          onClick={(event) => {
            clickCheckbox(event);
          }}
          value="-1"
          checked={selectAllCheckboxes}
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
      ),
      field: "select",
      render: (rowData) => (
        <StyledCheckbox
          value={rowData.orderItemId}
          onClick={(event) => {
            clickCheckbox(event);
          }}
          checked={itemsMap[rowData.orderItemId] === true}
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
      ),
    },
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
      title: t("MultipleShipmentTable.Labels.ItemDetails"),
      field: "name",
      render: (rowData: any) => (
        <>
          <StyledTypography variant="body2">
            {rowData.seo && rowData.seo.href ? (
              <Link to={rowData.seo?.href}>
                {rowData.name ? rowData.name : rowData.partNumber}
              </Link>
            ) : rowData.name ? (
              rowData.name
            ) : (
              rowData.partNumber
            )}
          </StyledTypography>
          <StyledTypography variant="body1">
            {t("MultipleShipmentTable.Labels.SKU")}
            {rowData.partNumber}
          </StyledTypography>
          {rowData.attributes &&
            rowData.attributes.map((attribute: any, index: number) =>
              attribute.values.map((value: any, index: number) => (
                <StyledTypography variant="body1" key={value.id}>
                  {attribute.name}: {value.value}
                </StyledTypography>
              ))
            )}
        </>
      ),
    },
    {
      title: t("MultipleShipmentTable.Labels.Quantity"),
      field: "quantity",
      type: "numeric",
      headerStyle: {
        textAlign: "center",
        flexDirection: "row",
      },
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData: any) => <QuantityDisplay rowData={rowData} />,
    },
    {
      title: t("MultipleShipmentTable.Labels.ShippingDetails"),
      render: (rowData) => (
        <>
          {!isValidAddress(rowData.addressId) ||
          usableAddresses.length === 0 ||
          usableAddresses === undefined ? (
            <>
              <StyledButton
                variant="text"
                disabled={itemsMap[rowData.orderItemId] === true ? true : false}
                onClick={() => {
                  handleSelectForOneItem(rowData);
                }}
                startIcon={<EditIcon />}>
                <StyledTypography variant="body2" align="left">
                  {t(
                    "MultipleShipmentTable.Labels.SelectShippingAddressAndMethod"
                  )}
                </StyledTypography>
              </StyledButton>
            </>
          ) : (
            <>
              <StyledTypography variant="body2">
                {rowData.shipModeCode}
              </StyledTypography>
              {rowData.addressLine?.length > 2 ? (
                <StyledTypography variant="body1">
                  {rowData.addressLine[0]}, {rowData.addressLine[1]}
                </StyledTypography>
              ) : null}
              <StyledTypography variant="body1">
                {rowData.city}, {rowData.state}, {rowData.zipCode}
              </StyledTypography>
              <StyledTypography variant="body1">
                {rowData.country}
              </StyledTypography>
            </>
          )}
        </>
      ),
    },
    {
      field: "changeAddress",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => (
        <>
          {isValidAddress(rowData.addressId) && (
            <>
              <StyledButton
                disabled={itemsMap[rowData.orderItemId] === true ? true : false}
                onClick={() => {
                  handleSelectForOneItem(rowData);
                }}
                variant="text"
                startIcon={<EditIcon />}>
                <StyledTypography variant="body2">
                  {t("MultipleShipmentTable.Labels.ChangeSelection")}
                </StyledTypography>
              </StyledButton>
            </>
          )}
        </>
      ),
    },
  ];

  const defaultOptions = {
    toolbar: false,
    header: true,
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

  return (
    <StyledTable
      columns={columnData}
      data={data}
      title={title}
      options={options}
      className={`${props.className ? props.className : ""}
          ${"order-item-table"}`}
    />
  );
};

export default MultipleShipmentTable;
