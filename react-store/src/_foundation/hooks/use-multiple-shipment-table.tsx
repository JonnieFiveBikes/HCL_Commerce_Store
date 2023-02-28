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
import { useTranslation } from "react-i18next";
//Common libraries
import { PAGINATION } from "../../constants/common";
//UI
import EditIcon from "@mui/icons-material/Edit";
import {
  StyledAvatar,
  StyledTypography,
  StyledButton,
  TableColumnDef,
  useTableUtils,
  useCustomTable,
  StyledLink,
  StyledTooltip,
} from "@hcl-commerce-store-sdk/react-component";
import { useMemo } from "react";
import { get } from "lodash-es";
import storeUtil from "../../utils/storeUtil";
import addrUtil from "../../utils/addressUtil";

const QuantityCell = ({ rowData, ...props }) => {
  const qty = parseInt(get(rowData, "quantity", 0));
  return <StyledTypography>{qty || null}</StyledTypography>;
};

const ItemDetailsCell = ({ rowData, ...props }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledTypography variant="body2">
        {rowData.seo && rowData.seo.href ? (
          <StyledLink to={rowData.seo?.href}>{rowData.name ? rowData.name : rowData.partNumber}</StyledLink>
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
          attribute.values?.map((value: any, index: number) => (
            <StyledTypography variant="body1" key={value.id}>
              {attribute.name}: {storeUtil.csValue(value.value)}
            </StyledTypography>
          ))
        )}
    </>
  );
};

const ThumbnailCell = ({ rowData, ...props }) => {
  const A = (
    <StyledAvatar alt={rowData.name} src={rowData.thumbnail} style={{ margin: "0", justifyContent: "flex-start" }} />
  );
  return <>{rowData.seo && rowData.seo.href ? <StyledLink to={rowData.seo?.href}>{A}</StyledLink> : <>{A}</>}</>;
};

const ShippingCell = ({ rowData, ...props }) => {
  const { t } = useTranslation();
  const { __handleMethod__: fn, __validAddress__: valid, __displayData__ } = rowData;
  const addressData = __displayData__ ?? rowData;

  const onSelecting = () => fn(rowData);
  return (
    <>
      {!valid ? (
        <>
          <StyledButton
            testId={"multiple-shipment-select-address-method"}
            variant="text"
            onClick={onSelecting}
            startIcon={<EditIcon />}>
            <StyledTypography variant="body2" align="left">
              {t("MultipleShipmentTable.Labels.SelectShippingAddressAndMethod")}
            </StyledTypography>
          </StyledButton>
        </>
      ) : (
        <>
          <StyledTypography variant="body2">{rowData.shipModeDescription}</StyledTypography>
          {addressData.addressLine?.length > 2 ? (
            <StyledTypography variant="body1">
              {addressData.addressLine[0]}, {addressData.addressLine[1]}
            </StyledTypography>
          ) : null}
          <StyledTypography variant="body1">
            {addressData.city}, {addressData.state}, {addressData.zipCode}
          </StyledTypography>
          <StyledTypography variant="body1">{addressData.country}</StyledTypography>
        </>
      )}
    </>
  );
};

const AddressCell = ({ rowData, ...props }) => {
  const { __handleMethod__: fn, __validAddress__: valid } = rowData;
  const { t } = useTranslation();
  const onChangeSelection = () => fn(rowData);
  return (
    <>
      {valid && (
        <StyledButton
          testId={"multiple-shipment-table-change-select"}
          onClick={onChangeSelection}
          variant="text"
          startIcon={<EditIcon />}>
          <StyledTypography variant="body2">{t("MultipleShipmentTable.Labels.ChangeSelection")}</StyledTypography>
        </StyledButton>
      )}
    </>
  );
};

export const useMultipleShipmentTable = (props: any) => {
  const { t } = useTranslation();
  const { data: dataProps, usableAddresses = {}, handleSingleSelect, handleMultiSelect, checkMultiSelect } = props;

  const data = useMemo(
    () =>
      (dataProps ?? []).map((oi) => ({
        ...oi,
        __handleMethod__: handleSingleSelect,
        __validAddress__: addrUtil.validAddr(usableAddresses[oi.orderItemId]?.byId[oi.nickName]),
        __displayData__: usableAddresses[oi.orderItemId]?.byId[oi.nickName],
      })),
    [dataProps, usableAddresses, handleSingleSelect]
  );

  const columns: TableColumnDef[] = [
    {
      idProp: "orderItemId",
      title: "",
      keyLookup: { key: "thumbnail" },
      display: { cellStyle: { verticalAlign: "middle", textAlign: "center" }, template: ThumbnailCell },
    },
    {
      title: t("MultipleShipmentTable.Labels.ItemDetails"),
      keyLookup: { key: "itemDetails" },
      idProp: "name",
      display: { template: ItemDetailsCell },
    },

    {
      title: t("MultipleShipmentTable.Labels.Quantity"),
      keyLookup: { key: "quantity" },
      display: { cellStyle: { textAlign: "center" }, template: QuantityCell },
    },
    {
      keyLookup: { key: "shippingDetails" },
      title: t("MultipleShipmentTable.Labels.ShippingDetails"),
      display: { template: ShippingCell },
    },
    {
      title: "",
      keyLookup: { key: "changeAddress" },
      display: { cellStyle: { textAlign: "center" }, template: AddressCell },
    },
  ];

  const MultiAssignAction = ({ fullTable: tbl, headers: h, ...props }) => {
    const { tableState: s } = useCustomTable();
    const { findSelectedKeys } = useTableUtils();
    const { t } = useTranslation();
    const keys = findSelectedKeys(s);
    const valid = checkMultiSelect(keys);
    const onMultiSelect = () => handleMultiSelect(keys);

    return (
      <StyledTooltip open={valid ? false : true} title={t("MultipleShipmentTable.Labels.SelInvalid")}>
        <span>
          <StyledButton
            testId="group-select-shipping-address"
            color="primary"
            disabled={!valid}
            onClick={onMultiSelect}
            style={{ marginLeft: "0.5rem" }}
            className="button">
            {t("MultipleShipmentTable.Labels.SelectShippingAddressAndMethod")}
          </StyledButton>
        </span>
      </StyledTooltip>
    );
  };

  const selectionActions = [MultiAssignAction];
  return {
    checkBox: true,
    columns,
    data: data,
    t,
    labels: {
      selected: "MultipleShipmentTable.Labels.nItemsSel",
      emptyMsg: "MultipleShipmentTable.Labels.noItems",
    },
    selectionActions,
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
