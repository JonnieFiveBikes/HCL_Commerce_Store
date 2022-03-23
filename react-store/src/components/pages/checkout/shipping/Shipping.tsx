/*
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
import React, { ChangeEvent } from "react";
import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { EMPTY_STRING } from "../../../../constants/common";
//Custom libraries
import CheckoutAddress, { CheckoutPageType } from "../address/CheckoutAddress";
import { MultipleShipmentTable } from "./MultipleShipmentTable";
//Foundation
import { useShipping } from "../../../../_foundation/hooks/use-shipping";
//UI
import {
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledButton,
  StyledSwitch,
  StyledBox,
  StyledIconLabel,
  StyledSelect,
  StyledFormControl,
  StyledInputLabel,
} from "@hcl-commerce-store-sdk/react-component";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

/**
 * Shipping and billing section
 * displays shipping and billing input/selection
 * @param props
 */
const Shipping: React.FC = (props: any) => {
  const {
    usableShipAddresses,
    usableShippingMethods,
    selectedShipAddressIds,
    setSelectedShipAddressId,
    selectedShipModeIds,
    setSelectedshipModeId,
    useMultipleShipment,
    handleMultipleShipmentChange,
    t,
    canContinue,
    canContinueSingleShipment,
    submit,
    createNewAddress,
    setCreateNewAddress,
    editAddress,
    setEditAddress,
    isPersonalAddressAllowed,
    orgAddressDetails,
    selectShipment,
    checkboxesActive,
    handleSelectShipmentChangeForCheckboxes,
    cancelMultipleSelection,
    tempItemsList,
    itemsMap,
    selectedItems,
    orderItems,
    handleSelectShipmentChangeForSingleItem,
    selectAllCheckboxes,
    clickCheckbox,
    cancelSelectShipment,
    confirmShipInfo,
    isDisabled,
    handleMultiSelect,
  } = useShipping();
  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid container direction="row" alignments="center" justifyContent="flex-start" spacing={2}>
        {!createNewAddress && !editAddress ? (
          <>
            {selectShipment ? (
              <>
                <StyledGrid item>
                  <StyledButton variant="text" testId="shipping-cancel-select" onClick={cancelSelectShipment}>
                    <StyledTypography variant="h4" component="p">
                      {t("Shipping.Title")}
                    </StyledTypography>
                  </StyledButton>
                </StyledGrid>
                <StyledGrid item>
                  <StyledBox variant="div" display="inline-flex" alignItems="center" className="full-height">
                    <ChevronRightIcon />
                  </StyledBox>
                </StyledGrid>
                <StyledGrid item>
                  <StyledTypography variant="h4" component="p">
                    {selectedItems.length > 1
                      ? t("Shipping.Labels.SelectedCount", {
                          selected: selectedItems.length,
                          all: orderItems.length,
                        })
                      : selectedItems[0].name}
                  </StyledTypography>
                </StyledGrid>
              </>
            ) : (
              <>
                <StyledGrid item>
                  <StyledBox display="flex" flexDirection="row" alignItems="center" className="full-height">
                    <StyledTypography variant="h4" component="p">
                      {t("Shipping.Title")}
                    </StyledTypography>
                  </StyledBox>
                </StyledGrid>
                <StyledGrid item>
                  <StyledSwitch
                    checked={useMultipleShipment}
                    setChecked={handleMultipleShipmentChange}
                    label={t("Shipping.Labels.UseMultiple")}
                  />
                </StyledGrid>
              </>
            )}
          </>
        ) : (
          <>
            <StyledGrid item>
              <StyledButton
                testId="shipping-cancel-edit-create"
                variant="text"
                onClick={() => {
                  setCreateNewAddress(false);
                  setEditAddress(false);
                }}>
                <StyledTypography variant="h4" component="p">
                  {t("Shipping.Title")}
                </StyledTypography>
              </StyledButton>
            </StyledGrid>
            <StyledGrid item>
              <StyledBox variant="div" display="inline-flex" alignItems="center" className="full-height">
                <ChevronRightIcon />
              </StyledBox>
            </StyledGrid>
            {editAddress ? (
              <StyledGrid item>
                <StyledTypography variant="h4" component="p">
                  {t("Shipping.Labels.EditAddress")}
                </StyledTypography>
              </StyledGrid>
            ) : (
              <StyledGrid item>
                <StyledTypography variant="h4" component="p">
                  {t("Shipping.Labels.AddNewAddress")}
                </StyledTypography>
              </StyledGrid>
            )}
          </>
        )}
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-4" />

      {useMultipleShipment && !selectShipment && (
        <>
          {checkboxesActive && (
            <StyledGrid container>
              <StyledGrid item xs={12} md={6}>
                <StyledBox flexDirection="row" alignItems="flex-start">
                  <StyledIconLabel
                    icon={<CheckOutlinedIcon color="primary" className="full-center" />}
                    label={t("Shipping.Labels.ItemsSelected", {
                      itemsSelected: `${tempItemsList.length}`,
                    })}
                  />
                </StyledBox>
              </StyledGrid>
              <StyledGrid item xs={12} md={6}>
                <StyledGrid container spacing={2} alignItems="center" justifyContent="flex-end">
                  <StyledGrid item>
                    <StyledButton
                      testId="shipping-address-select-cancel"
                      color="secondary"
                      onClick={cancelMultipleSelection}>
                      {t("Shipping.Actions.Cancel")}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      testId="shipping-address-select"
                      color="primary"
                      onClick={handleSelectShipmentChangeForCheckboxes}>
                      {t("Shipping.Actions.SelectShippingAddress")}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              </StyledGrid>
            </StyledGrid>
          )}
          <MultipleShipmentTable
            data={orderItems}
            handleSelectShipmentChangeForSingleItem={handleSelectShipmentChangeForSingleItem}
            checkboxesActive={checkboxesActive}
            className="review-order top-margin-3"
            selectAllCheckboxes={selectAllCheckboxes}
            clickCheckbox={clickCheckbox}
            itemsMap={itemsMap}
            usableAddresses={usableShipAddresses[0] || []}
            handleMultiSelect={handleMultiSelect}
          />
          <StyledGrid container justifyContent="flex-end" className="checkout-actions">
            <StyledGrid item>
              <StyledButton
                testId="shipping-can-continue"
                color="primary"
                disabled={canContinue() || checkboxesActive}
                onClick={submit}
                className="button top-margin-3">
                {t("Shipping.Actions.Next")}
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </>
      )}
      {(!useMultipleShipment || (useMultipleShipment && selectShipment)) && (
        <>
          <CheckoutAddress
            usableAddresses={usableShipAddresses[0] || []}
            page={CheckoutPageType.SHIPPING}
            setSelectedAddressId={(addressId, nickName) => {
              setSelectedShipAddressId(0, addressId, nickName);
            }}
            selectedAddressId={selectedShipAddressIds[0] || EMPTY_STRING}
            toggleCreateNewAddress={setCreateNewAddress}
            createNewAddress={createNewAddress}
            editAddress={editAddress}
            toggleEditAddress={setEditAddress}
            isPersonalAddressAllowed={isPersonalAddressAllowed}
            orgAddressDetails={orgAddressDetails}
          />
          {!createNewAddress && !editAddress && (
            <>
              <StyledGrid container spacing={2}>
                <StyledGrid item container direction="row" justifyContent="space-between" alignItems="center">
                  <StyledIconLabel
                    icon={<LocalShippingIcon color="primary" />}
                    label={t("Shipping.Labels.ShippingMethod")}
                  />
                </StyledGrid>
                <StyledGrid item xs={12}>
                  {isDisabled() && (
                    <StyledTypography className="bottom-margin-2">
                      {t("Shipping.Msgs.SelectShippingAddress")}
                    </StyledTypography>
                  )}
                  <StyledFormControl variant="outlined" disabled={isDisabled()}>
                    <StyledInputLabel disableAnimation={true} shrink htmlFor="checkout-ship-method">
                      {t("Shipping.Labels.SelectShippingMethod")}
                    </StyledInputLabel>
                    {usableShippingMethods[0] && (
                      <StyledSelect
                        data-testid="shipping-method-select"
                        native
                        value={selectedShipModeIds[0] || EMPTY_STRING}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                          setSelectedshipModeId(0, event.target.value)
                        }
                        id="checkout-ship-method">
                        {usableShippingMethods[0].map((m) => (
                          <option key={m.shipModeId} value={m.shipModeId}>
                            {m.description || m.shipModeCode}
                          </option>
                        ))}
                      </StyledSelect>
                    )}
                  </StyledFormControl>
                </StyledGrid>
              </StyledGrid>
              <Divider className="top-margin-3 bottom-margin-2" />
              {!selectShipment ? (
                <StyledGrid container justifyContent="flex-end" className="checkout-actions">
                  <StyledGrid item>
                    <StyledButton
                      testId="single-shipping-can-continue"
                      color="primary"
                      disabled={!canContinueSingleShipment()}
                      onClick={submit}
                      className="button">
                      {t("Shipping.Actions.Next")}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              ) : (
                <StyledGrid container justifyContent="flex-end" spacing={2} className="checkout-actions">
                  <StyledGrid item>
                    <StyledButton
                      testId="shipping-cancel"
                      color="secondary"
                      onClick={cancelSelectShipment}
                      className="button">
                      {t("Shipping.Actions.Cancel")}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid item>
                    <StyledButton
                      testId="shipping-can-confirm"
                      color="primary"
                      onClick={confirmShipInfo}
                      disabled={selectedShipAddressIds.length > 0 ? false : true}
                      className="button">
                      {t("Shipping.Actions.Confirm")}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              )}
            </>
          )}
        </>
      )}
    </StyledPaper>
  );
};
export default Shipping;
