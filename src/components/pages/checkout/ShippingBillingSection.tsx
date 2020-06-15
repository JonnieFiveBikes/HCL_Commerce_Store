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
import React, { useState, useEffect, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import personContactService from "../../../_foundation/apis/transaction/personContact.service";
//Custom libraries
import { CART } from "../../../constants/routes";
import addressUtil from "../../../utils/addressUtil";
import { AddressForm } from "../../widgets/address-form";
import { AddressList } from "../../widgets/address-list";
//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import {
  shipAddressesSelector,
  payMethodsSelector,
  isCheckoutDisabledSelector,
} from "../../../redux/selectors/order";
import * as orderActions from "../../../redux/actions/order";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import * as accountActions from "../../../redux/actions/account";
import * as errorActions from "../../../redux/actions/error";
//UI
import { Divider } from "@material-ui/core";
import {
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledFormControlLabel,
  StyledCheckbox,
  StyledButton,
} from "../../StyledUI";

interface ShippingBillingSectionProps {
  setSelectedShipAddressId: Function; //setter fn to set selecting shipping address id
  setSelectedBillAddressId: Function; //setter fn to set selecting billing address id
  selectedShipAddressId: string;
  selectedBillAddressId: string;
  selectedPayMethod: string;
}

/**
 * Shipping and billing section
 * displays shipping and billing input/selection
 * @param props
 */
const ShippingBillingSection: React.FC<ShippingBillingSectionProps> = (
  props: any
) => {
  const contractId = useSelector(currentContractIdSelector);
  const shipAddresseses = useSelector(shipAddressesSelector);
  const payMethods = useSelector(payMethodsSelector);
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  const addressDetails = useSelector(addressDetailsSelector);

  const setSelectedShipAddressId = props.setSelectedShipAddressId;

  const setSelectedBillAddressId = props.setSelectedBillAddressId;
  const selectedShipAddressId = props.selectedShipAddressId;
  const selectedBillAddressId = props.selectedBillAddressId;
  const selectedPayMethod = props.selectedPayMethod;

  const usableShipAddresses = initUsableShippingAddresses();
  const usableBillAddresses = initUsableBillingAddresses();

  const [sameForBilling, setSameForBilling] = useState<boolean>(false);
  const [useSavedShipping, setUseSavedShipping] = useState<boolean>(
    usableShipAddresses ? true : false
  );
  const [useSavedBilling, setUseSavedBilling] = useState<boolean>(
    usableBillAddresses ? true : false
  );
  const [shipSubmitError, setShipSubmitError] = useState<boolean>(false);
  const [billSubmitError, setBillSubmitError] = useState<boolean>(false);

  const addressFormDataInit = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    email1: "",
    phone1: "",
    nickName: "",
  };
  const [newShipAddressFormData, setNewShipAddressFormData] = useState<any>(
    addressFormDataInit
  );
  const [newBillAddressFormData, setNewBillAddressFormData] = useState<any>(
    addressFormDataInit
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite) {
      let payload = {
        ...payloadBase,
      };
      dispatch(orderActions.GET_SHIPINFO_ACTION(payload));
      dispatch(orderActions.GET_PAYMETHODS_ACTION(payload));
      dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payload));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  useEffect(() => {
    if (
      usableShipAddresses &&
      usableShipAddresses.length > 0 &&
      !shipSubmitError
    ) {
      setUseSavedShipping(true);
      setSameForBilling(false);
    }
  }, [shipAddresseses, addressDetails]);

  useEffect(() => {
    if (
      usableBillAddresses &&
      usableBillAddresses.length > 0 &&
      !billSubmitError
    ) {
      setUseSavedBilling(true);
    }
  }, [payMethods, addressDetails]);

  /**
   * Initialize filtered shipping addresses based on usable shipping address list
   */
  function initUsableShippingAddresses() {
    if (shipAddresseses && shipAddresseses.usableShippingAddress) {
      const newFilteredUsableShipAddresses = filterAddresses(
        shipAddresseses.usableShippingAddress
      );
      return newFilteredUsableShipAddresses;
    }
    return null;
  }

  /**
   * Initialize filtered billing addresses based on usable payment info
   */
  function initUsableBillingAddresses() {
    let newFilteredUsableBillAddresses: any[] | null = null;
    if (payMethods) {
      let newUsableBillAddresses: any[] = [];
      for (let i = 0; i < payMethods.length; i++) {
        if (payMethods[i].paymentMethodName === selectedPayMethod) {
          newUsableBillAddresses = payMethods[i].usableBillingAddress;
          break;
        }
      }
      if (newUsableBillAddresses && newUsableBillAddresses.length > 0) {
        newFilteredUsableBillAddresses = filterAddresses(
          newUsableBillAddresses
        );
      }
    }
    return newFilteredUsableBillAddresses;
  }

  /**
   * Filter out addresses that does not have the mandatory fields for checkout
   * @param usableAddresses List of addresses to scan
   * @returns Filtered list of addresses
   */
  function filterAddresses(usableAddresses: any[]) {
    if (usableAddresses) {
      const filteredList = usableAddresses.filter((address) => {
        if (address && addressDetails) {
          if (address.addressId === addressDetails.addressId) {
            return (
              addressDetails.addressLine !== undefined &&
              addressDetails.country !== undefined &&
              addressDetails.addressLine[0] !== "" &&
              addressDetails.country !== ""
            );
          } else if (
            addressDetails.contactMap &&
            addressDetails.contactMap[address.addressId]
          ) {
            const adressDetailsFromContact =
              addressDetails.contactMap[address.addressId];
            return (
              adressDetailsFromContact.addressLine !== undefined &&
              adressDetailsFromContact.country !== undefined &&
              adressDetailsFromContact.addressLine[0] !== "" &&
              adressDetailsFromContact.country !== ""
            );
          } else {
            return false;
          }
        }
        return false;
      });
      if (filteredList && filteredList.length > 0) {
        return filteredList;
      }
    }
    return null;
  }

  /**
   * Toggle option to create new or use existing shipping addresses
   * @param event The mouse event
   */
  function toggleUseSavedShipping(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setUseSavedShipping(!useSavedShipping);
    setSameForBilling(false);
  }

  /**
   * Check if shopper can continue to the next step
   */
  function canContinue() {
    return (
      !isCheckoutDisabled &&
      ((useSavedShipping && selectedShipAddressId !== "") ||
        (!useSavedShipping &&
          addressUtil.validateAddressForm(newShipAddressFormData))) &&
      ((useSavedBilling && selectedBillAddressId !== "") ||
        (!useSavedBilling &&
          !sameForBilling &&
          addressUtil.validateAddressForm(newBillAddressFormData)) ||
        sameForBilling)
    );
  }

  /**
   * Submit the selected address or new address form
   */
  async function submit() {
    if (canContinue()) {
      let result: any = {
        newShipAddressToSubmit: "",
        shipSubmitSuccess: false,
        billSubmitSuccess: false,
      };

      if (!useSavedShipping && !useSavedBilling && !sameForBilling) {
        if (
          newShipAddressFormData.nickName.trim() ===
          newBillAddressFormData.nickName.trim()
        ) {
          let parameters: any = {
            errorMessage: t("ShippingBillingSection.Msgs.SameNickname"),
          };
          dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
          return;
        }
      }

      if (useSavedShipping) {
        result["newShipAddressToSubmit"] = selectedShipAddressId;
        setShipSubmitError(false);
        result["shipSubmitSuccess"] = true;
      } else {
        let newShipAddressData = { ...newShipAddressFormData };
        if (sameForBilling) {
          newShipAddressData["addressType"] = "ShippingAndBilling";
        } else {
          newShipAddressData["addressType"] = "Shipping";
        }
        newShipAddressData["addressLine"] = [
          newShipAddressFormData["addressLine1"],
        ];
        if (newShipAddressFormData["addressLine2"].trim() !== "") {
          newShipAddressData["addressLine"].push(
            newShipAddressFormData["addressLine2"]
          );
        }
        newShipAddressData["isNew"] = "true";

        await personContactService
          .addPersonContact({
            body: newShipAddressData,
            cancelToken: new CancelToken(function executor(c) {
              cancels.push(c);
            }),
          })
          .then((res) => res.data)
          .then((shipData) => {
            setSelectedShipAddressId(shipData.addressId);
            result["newShipAddressToSubmit"] = shipData.addressId;
            setShipSubmitError(false);
            result["shipSubmitSuccess"] = true;
            if (sameForBilling) {
              setSelectedBillAddressId(shipData.addressId);
              setBillSubmitError(false);
              result["billSubmitSuccess"] = true;
            }
          })
          .catch((e) => {
            console.log("Could not create shipping address");
            setShipSubmitError(true);
          });
      }

      if (useSavedBilling) {
        setBillSubmitError(false);
        result["billSubmitSuccess"] = true;
      } else if (
        !useSavedBilling &&
        !sameForBilling &&
        result["shipSubmitSuccess"]
      ) {
        let newBillAddressData = { ...newBillAddressFormData };
        newBillAddressData["addressType"] = "Billing";
        newBillAddressData["addressLine"] = [
          newBillAddressFormData["addressLine1"],
        ];
        if (newBillAddressFormData["addressLine2"].trim !== "") {
          newBillAddressData["addressLine"].push(
            newBillAddressFormData["addressLine2"]
          );
        }
        newBillAddressData["isNew"] = "true";

        await personContactService
          .addPersonContact({
            body: newBillAddressData,
            cancelToken: new CancelToken(function executor(c) {
              cancels.push(c);
            }),
          })
          .then((res) => res.data)
          .then((billData) => {
            setSelectedBillAddressId(billData.addressId);
            setBillSubmitError(false);
            result["billSubmitSuccess"] = true;
          })
          .catch((e) => {
            console.log("Could not create billing address");
            setBillSubmitError(true);
          });
      }

      let payload = {
        ...payloadBase,
      };
      if (
        result["shipSubmitSuccess"] &&
        result["billSubmitSuccess"] &&
        result["newShipAddressToSubmit"] !== ""
      ) {
        let shipInfoPayload = {
          ...payloadBase,
          addressId: result.newShipAddressToSubmit,
        };
        dispatch(orderActions.UPDATE_SHIPINFO_ACTION(shipInfoPayload));
      } else if (
        result["shipSubmitSuccess"] &&
        result["newShipAddressToSubmit"] !== ""
      ) {
        setNewShipAddressFormData(addressFormDataInit);
        dispatch(orderActions.GET_SHIPINFO_ACTION(payload));
        dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payload));
      } else if (result["billSubmitSuccess"]) {
        setNewBillAddressFormData(addressFormDataInit);
        dispatch(orderActions.GET_PAYMETHODS_ACTION(payload));
        dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payload));
      }
    }
  }

  /**
   * Go back to the previous step
   */
  function back() {
    history.push(CART);
  }

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid container>
        <StyledGrid container item xs={12} md={6}>
          <StyledGrid item xs={12} md={11} lg={10}>
            <StyledTypography
              variant="h6"
              component="p"
              className="vertical-margin-2">
              {t("ShippingBillingSection.Title.Shipping")}
            </StyledTypography>
            {usableShipAddresses && (
              <StyledButton
                className="bottom-margin-2"
                color="primary"
                onClick={(event) => toggleUseSavedShipping(event)}>
                {useSavedShipping
                  ? t("ShippingBillingSection.Actions.CreateNew")
                  : t("ShippingBillingSection.Actions.SelectSaved")}
              </StyledButton>
            )}

            {useSavedShipping && usableShipAddresses ? (
              <>
                <StyledTypography className="bottom-margin-2">
                  {t("ShippingBillingSection.Msgs.UseSavedAddress")}
                </StyledTypography>
                <AddressList
                  cid="shipping"
                  addressList={usableShipAddresses}
                  setSelectedAddressId={setSelectedShipAddressId}
                  selectedAddressId={selectedShipAddressId}
                />
              </>
            ) : (
              <>
                <AddressForm
                  cid="shipping"
                  setAddressFormData={setNewShipAddressFormData}
                  addressFormData={newShipAddressFormData}
                />
                <StyledFormControlLabel
                  className="top-margin-1"
                  label={t("ShippingBillingSection.Labels.UseForBilling")}
                  control={
                    <StyledCheckbox
                      color="secondary"
                      name="saveAddress"
                      checked={sameForBilling}
                      onChange={(event) => setSameForBilling(!sameForBilling)}
                    />
                  }
                />
              </>
            )}
          </StyledGrid>
        </StyledGrid>

        <StyledGrid container item xs={12} md={6}>
          <StyledGrid item xs={12} md={11} lg={10}>
            <StyledTypography
              variant="h6"
              component="p"
              className="vertical-margin-2">
              {t("ShippingBillingSection.Title.Billing")}
            </StyledTypography>
            {!sameForBilling && usableBillAddresses && (
              <StyledButton
                className="bottom-margin-2"
                color="primary"
                onClick={() => {
                  setUseSavedBilling(!useSavedBilling);
                }}>
                {useSavedBilling
                  ? t("ShippingBillingSection.Actions.CreateNew")
                  : t("ShippingBillingSection.Actions.SelectSaved")}
              </StyledButton>
            )}

            {sameForBilling ? (
              <StyledTypography variant="body1" className="bottom-margin-2">
                {t("ShippingBillingSection.Msgs.SameAsShipping")}
              </StyledTypography>
            ) : useSavedBilling && usableBillAddresses ? (
              <>
                <StyledTypography className="bottom-margin-2">
                  {t("ShippingBillingSection.Msgs.UseSavedAddress")}
                </StyledTypography>
                <AddressList
                  cid="billing"
                  addressList={usableBillAddresses}
                  setSelectedAddressId={setSelectedBillAddressId}
                  selectedAddressId={selectedBillAddressId}
                />
              </>
            ) : (
              <AddressForm
                cid="billing"
                setAddressFormData={setNewBillAddressFormData}
                addressFormData={newBillAddressFormData}
              />
            )}
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
      <Divider className="top-margin-3 bottom-margin-2" />
      <StyledGrid
        container
        justify="space-between"
        className="checkout-actions">
        <StyledGrid item>
          <StyledButton
            color="secondary"
            onClick={() => back()}
            className="button">
            {t("Checkout.Actions.ReturnCart")}
          </StyledButton>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            color="primary"
            disabled={!canContinue()}
            onClick={() => submit()}
            className="button">
            {t("ShippingBillingSection.Actions.Next")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};

export { ShippingBillingSection };
