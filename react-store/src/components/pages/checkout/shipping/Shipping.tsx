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
import React from "react";
import { Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
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
  StyledFormControl,
  StyledRadioGroup,
  StyledFormControlLabel,
  StyledRadio,
  StyledFormHelperText,
} from "@hcl-commerce-store-sdk/react-component";
import { withOutletContext } from "../stepper-guard";
import { useTranslation } from "react-i18next";

/**
 * Shipping and billing section
 * displays shipping and billing input/selection
 * @param props
 */
const Shipping: React.FC = () => {
  const { t } = useTranslation();
  const {
    useMultipleShipment,
    toggleMultiShipment,
    canContinue,
    submit,
    createNewAddress,
    setCreateNewAddress,
    editAddress,
    setEditAddress,
    addressDetails,
    orgAddressDetails,
    selectShipment,
    selectedItems,
    orderItems,
    handleSingleSelect,
    checkMultiSelect,
    cancelSelectShipment,
    confirmShipInfo,
    handleMultiSelect,
    selShipInfo,
    setSelShipInfo,
    updateAddress,
    global,
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
                      ? t("Shipping.Labels.SelectedCount", { selected: selectedItems.length, all: orderItems.length })
                      : selectedItems[0]?.name}
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
                    setChecked={toggleMultiShipment}
                    label={t("Shipping.Labels.UseMultiple")}
                    disabled={
                      orderItems?.length === 1 ||
                      (useMultipleShipment &&
                        global.usableAddrs.__all?.list.length > 0 &&
                        (global.commonAddrs.length === 0 || global.commonMethods.length === 0))
                    }
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
            <StyledGrid item>
              <StyledTypography variant="h4" component="p">
                {t(`Shipping.Labels.${editAddress ? "EditAddress" : "AddNewAddress"}`)}
              </StyledTypography>
            </StyledGrid>
          </>
        )}
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-4" />

      {useMultipleShipment && !selectShipment && (
        <>
          <MultipleShipmentTable
            data={orderItems}
            handleSingleSelect={handleSingleSelect}
            className="review-order top-margin-3"
            usableAddresses={global.usableAddrs}
            handleMultiSelect={handleMultiSelect}
            checkMultiSelect={checkMultiSelect}
          />
          <StyledGrid container justifyContent="flex-end" className="checkout-actions">
            <StyledGrid item>
              <StyledButton
                testId="shipping-can-continue"
                color="primary"
                disabled={!canContinue()}
                onClick={submit}
                className="button top-margin-3">
                {t("Shipping.Actions.Next")}
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </>
      )}
      {(!useMultipleShipment || selectShipment) && (
        <>
          <CheckoutAddress
            usableAddresses={selShipInfo.commonAddrs ?? global.commonAddrs}
            page={CheckoutPageType.SHIPPING}
            setSelectedAddressId={(addressId, nickName) => updateAddress(addressId, nickName)}
            selectedAddressId={selShipInfo.addressId}
            toggleCreateNewAddress={setCreateNewAddress}
            createNewAddress={createNewAddress}
            editAddress={editAddress}
            toggleEditAddress={setEditAddress}
            orgAddressDetails={orgAddressDetails}
            addressDetails={addressDetails}
          />
          {!createNewAddress && !editAddress ? (
            <>
              <StyledGrid container spacing={2}>
                <StyledGrid item container direction="row" justifyContent="space-between" alignItems="center">
                  <StyledIconLabel
                    icon={<LocalShippingIcon color="primary" />}
                    label={t("Shipping.Labels.ShippingMethod")}
                  />
                </StyledGrid>
                <StyledGrid item xs={12}>
                  {!selShipInfo.addressId ? (
                    <StyledTypography className="bottom-margin-2">
                      {t("Shipping.Msgs.SelectShippingAddress")}
                    </StyledTypography>
                  ) : null}
                  <StyledFormControl variant="outlined" disabled={!selShipInfo.addressId}>
                    <StyledFormHelperText component="div">
                      <StyledTypography variant="body1">
                        <b>{t("Shipping.Labels.SelectShippingMethod")}</b>
                      </StyledTypography>
                    </StyledFormHelperText>
                    <StyledRadioGroup
                      data-testid="shipping-method-select"
                      value={selShipInfo.shipModeId}
                      onChange={(e) => setSelShipInfo({ ...selShipInfo, shipModeId: e.target.value })}
                      name="shippingMethodModes">
                      {(selShipInfo.commonMethods ?? global.commonMethods).map((m) => (
                        <StyledFormControlLabel
                          key={m.shipModeId}
                          value={m.shipModeId}
                          control={<StyledRadio />}
                          label={<StyledTypography variant="body2">{m.description || m.shipModeCode}</StyledTypography>}
                        />
                      ))}
                    </StyledRadioGroup>
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
                      disabled={!selShipInfo.addressId || !selShipInfo.shipModeId}
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
                      disabled={!selShipInfo.addressId || !selShipInfo.shipModeId}
                      className="button">
                      {t("Shipping.Actions.Confirm")}
                    </StyledButton>
                  </StyledGrid>
                </StyledGrid>
              )}
            </>
          ) : null}
        </>
      )}
    </StyledPaper>
  );
};
export default withOutletContext(Shipping);
