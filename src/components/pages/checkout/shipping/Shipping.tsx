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
import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import {
  EMPTY_STRING,
  IS_PERSONAL_ADDRESS_ALLOWED,
  STRING_TRUE,
} from "../../../../constants/common";
import { SHIPMODE } from "../../../../constants/order";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
import shippingInfoService from "../../../../_foundation/apis/transaction/shippingInfo.service";
//Custom libraries
import CheckoutAddress, { CheckoutPageType } from "../address/Address";
import { ORDER_CONFIGS } from "../../../../configs/order";
import * as ROUTES from "../../../../constants/routes";
//Redux
import { addressDetailsSelector } from "../../../../redux/selectors/account";
import {
  activeOrgSelector,
  organizationDetailsSelector,
} from "../../../../redux/selectors/organization";
import {
  shipInfosSelector,
  orderItemsSelector,
  cartSelector,
} from "../../../../redux/selectors/order";
import * as orderActions from "../../../../redux/actions/order";
import * as organizationAction from "../../../../redux/actions/organization";
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import * as accountActions from "../../../../redux/actions/account";
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
} from "../../../StyledUI";

const useShipping = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const orderItems = useSelector(orderItemsSelector);
  const contractId = useSelector(currentContractIdSelector);
  const usableShipInfos: any = useSelector(shipInfosSelector);
  const addressDetails: any = useSelector(addressDetailsSelector);
  const activeOrgId = useSelector(activeOrgSelector);
  const orgAddressDetails = useSelector(organizationDetailsSelector);
  const cart = useSelector(cartSelector);
  const isPersonalAddressAllowed: string =
    cart && cart[IS_PERSONAL_ADDRESS_ALLOWED]
      ? cart[IS_PERSONAL_ADDRESS_ALLOWED]
      : STRING_TRUE;
  const [selectedShipAddressIds, setSelectedShipAddressIds] = useState<
    string[]
  >([]);
  const [selectedShipModeIds, setSelectedShipModeIds] = useState<string[]>([]);

  const { mySite } = useSite();

  const [useMultipleShipment, setUseMultipleShipment] = useState(false);

  const handleMultipleShipmentChange = (event) =>
    setUseMultipleShipment(event.target.checked);

  const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);

  const usableShipAddresses = useMemo(() => initUsableShippingAddresses(), [
    usableShipInfos,
    addressDetails,
    orgAddressDetails,
  ]);

  const usableShippingMethods = useMemo(() => initUsableShippingMethods(), [
    usableShipInfos,
  ]);

  /**
   * Initialize filtered shipping addresses based on usable shipping address list
   */
  function initUsableShippingAddresses() {
    const _usableShippingAddresses: any[] = [];
    if (
      usableShipInfos &&
      usableShipInfos.orderItem &&
      usableShipInfos.orderItem.length > 0
    ) {
      const orderItems: any[] = usableShipInfos.orderItem;
      orderItems.forEach((item) => {
        let _usableShippingAddressesPerItem: any[] = [];
        _usableShippingAddressesPerItem = pushUsableShippingAddresses(
          filterAddresses(item.usableShippingAddress),
          _usableShippingAddressesPerItem
        );
        _usableShippingAddressesPerItem = pushUsableShippingAddresses(
          filterOrgAddresses(item.usableShippingAddress),
          _usableShippingAddressesPerItem
        );
        _usableShippingAddresses.push(_usableShippingAddressesPerItem);
      });
    } else if (usableShipInfos && usableShipInfos.usableShippingAddress) {
      let _usableShippingAddressesPerItem: any[] = [];
      _usableShippingAddressesPerItem = pushUsableShippingAddresses(
        filterAddresses(usableShipInfos.usableShippingAddress),
        _usableShippingAddressesPerItem
      );
      _usableShippingAddressesPerItem = pushUsableShippingAddresses(
        filterOrgAddresses(usableShipInfos.usableShippingAddress),
        _usableShippingAddressesPerItem
      );

      orderItems.forEach((item) => {
        _usableShippingAddresses.push(_usableShippingAddressesPerItem);
      });
    }
    return _usableShippingAddresses;
  }

  /**
   * Validate address and push it to _usableShippingAddresses array
   * @param address
   */
  function pushUsableShippingAddresses(
    address: any[],
    _usableShippingAddresses: any[]
  ) {
    if (address && address.length > 0) {
      return _usableShippingAddresses.concat(address);
    } else {
      return _usableShippingAddresses;
    }
  }

  /**
   * Initialize usable shipping methods from orderitems
   */
  function initUsableShippingMethods() {
    const _usableShippingMethods: any[] = [];
    if (
      usableShipInfos &&
      usableShipInfos.orderItem &&
      usableShipInfos.orderItem.length > 0
    ) {
      const orderItems: any[] = usableShipInfos.orderItem;
      orderItems.forEach((item) => {
        if (item.usableShippingMode) {
          pushUsableShippingMode(
            item.usableShippingMode.filter(
              (mode) => mode.shipModeCode !== SHIPMODE.shipModeCode.PickUp
            ),
            _usableShippingMethods
          );
        }
      });
    }
    return _usableShippingMethods;
  }

  /**
   * Validate shipping method/mode and push it to _usableShippingMethods array
   * @param address
   */
  function pushUsableShippingMode(
    shippingMode: any[],
    _usableShippingMethods: any[]
  ) {
    if (shippingMode && shippingMode.length > 0) {
      _usableShippingMethods.push(shippingMode);
    }
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
              addressDetails.addressLine[0] !== EMPTY_STRING &&
              addressDetails.country !== EMPTY_STRING
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
              adressDetailsFromContact.addressLine[0] !== EMPTY_STRING &&
              adressDetailsFromContact.country !== EMPTY_STRING
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
    return [];
  }

  /**
   * Filter out organization addresses that does not have the mandatory fields for checkout
   * @param usableAddresses List of addresses to scan
   * @returns Filtered list of addresses
   */
  function filterOrgAddresses(usableAddresses: any[]) {
    if (usableAddresses) {
      const filteredList = usableAddresses.filter((address) => {
        if (
          address &&
          orgAddressDetails &&
          orgAddressDetails.contactInfo &&
          orgAddressDetails.addressBook
        ) {
          if (address.addressId === orgAddressDetails.contactInfo.addressId) {
            return (
              orgAddressDetails.contactInfo.address1 !== undefined &&
              orgAddressDetails.contactInfo.country !== undefined &&
              orgAddressDetails.contactInfo.address1 !== EMPTY_STRING &&
              orgAddressDetails.contactInfo.country !== EMPTY_STRING
            );
          } else {
            for (let orgAddress of orgAddressDetails.addressBook) {
              if (address.addressId === orgAddress.addressId) {
                return (
                  orgAddress.address1 !== undefined &&
                  orgAddress.country !== undefined &&
                  orgAddress.address1 !== EMPTY_STRING &&
                  orgAddress.country !== EMPTY_STRING
                );
              }
            }
          }
          return false;
        }
      });
      if (filteredList && filteredList.length > 0) {
        return filteredList;
      }
    }
    return [];
  }

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite
    ? mySite.defaultCurrencyID
    : EMPTY_STRING;
  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };
  /**
   * ShipInfo request body base.
   */
  const shipInfoBody = {
    x_calculateOrder: ORDER_CONFIGS.calculateOrder,
    x_calculationUsage: ORDER_CONFIGS.calculationUsage,
    x_allocate: ORDER_CONFIGS.allocate,
    x_backorder: ORDER_CONFIGS.backOrder,
    x_remerge: ORDER_CONFIGS.remerge,
    x_check: ORDER_CONFIGS.check,
    orderId: ".",
  };

  /**
   * Sets addressId to local state and update the current order, so that available shipping
   * methods can be populated according to selected address.
   * @param index The order item index in order
   * @param addressId
   */
  const setSelectedShipAddressId = async (index, addressId) => {
    let addressIds = [...selectedShipAddressIds];
    addressIds.splice(index, 1, addressId);
    setSelectedShipAddressIds(addressIds);
    const body = {
      ...shipInfoBody,
      addressId: addressIds[0],
    };
    const payload = {
      ...payloadBase,
      body,
    };
    await shippingInfoService.updateOrderShippingInfo(payload);
    dispatch(orderActions.GET_SHIPINFO_ACTION({ ...payloadBase }));
    dispatch(orderActions.GET_CART_ACTION({ ...payloadBase }));
  };

  /**
   * Sets shipModeId to local state, will be persisted
   * to server when hitting the "next" button
   * @param index item index in order
   * @param shipModeId
   */
  const setSelectedshipModeId = (index, shipModeId) => {
    let shipModeIds = [...selectedShipModeIds];
    shipModeIds.splice(index, 1, shipModeId);
    setSelectedShipModeIds(shipModeIds);
  };

  /**
   * Check if shopper can continue to the next step
   */
  function canContinue() {
    return selectedShipModeIds.length > 0 && selectedShipAddressIds.length > 0;
  }

  /**
   * Check and verify the existing shipMode is changed by shopper.
   */
  function shipModeUpdated(): boolean {
    return (
      !orderItems[0] || selectedShipModeIds[0] !== orderItems[0].shipModeId
    );
  }

  /**
   * Submit the selected address or new address form
   */
  async function submit() {
    if (canContinue()) {
      let isSingleShipModeId = true;
      if (!useMultipleShipment && orderItems?.length > 1) {
        const addressIds = orderItems.map((o) => o.addressId);
        const isSingleAddressId = addressIds.every(
          (addressId, index, array) => addressId === array[0]
        );
        if (!isSingleAddressId) {
          const body = {
            ...shipInfoBody,
            addressId: addressIds[0],
          };
          const payload = {
            ...payloadBase,
            body,
          };
          await shippingInfoService.updateOrderShippingInfo(payload);
        }

        const shipModeIds = orderItems.map((o) => o.shipModeId);
        isSingleShipModeId = shipModeIds.every(
          (shipModeId, index, array) => shipModeId === array[0]
        );
      }

      if (shipModeUpdated() || !isSingleShipModeId) {
        const body = {
          ...shipInfoBody,
          shipModeId: selectedShipModeIds[0],
          orderItem: [], //bypass defect HC-2784
        };
        const shipInfoPayload = {
          ...payloadBase,
          body,
        };

        await shippingInfoService.updateOrderShippingInfo(shipInfoPayload);
      }
      dispatch(orderActions.FETCHING_CART_ACTION({ ...payloadBase }));
      history.push(ROUTES.CHECKOUT_PAYMENT);
    }
  }

  useEffect(() => {
    if (mySite) {
      dispatch(
        orderActions.GET_SHIPINFO_ACTION({
          ...payloadBase,
        })
      );
      dispatch(
        accountActions.GET_ADDRESS_DETAIL_ACTION({
          ...payloadBase,
        })
      );
      const param: any = {
        storeId: mySite.storeId,
        organizationId: activeOrgId,
        ...payloadBase,
      };
      dispatch(organizationAction.GET_ORGANIZATION_ADDRESS_ACTION(param));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  useEffect(() => {
    if (orderItems.length > 0) {
      if (
        (selectedShipAddressIds.length === 0 || !selectedShipAddressIds[0]) &&
        usableShipAddresses &&
        usableShipAddresses.length > 0
      ) {
        setSelectedShipAddressIds(
          orderItems
            .map((o) => o.addressId)
            .filter((i: any, index: number) => {
              return (
                i !== undefined &&
                usableShipAddresses[index]?.map((o) => o.addressId).includes(i)
              );
            })
        );
      }
      if (selectedShipModeIds.length === 0 || !selectedShipModeIds[0]) {
        setSelectedShipModeIds(
          orderItems
            .filter(
              (i) =>
                i !== undefined &&
                i.shipModeCode !== SHIPMODE.shipModeCode.PickUp
            )
            .map((o) => o.shipModeId)
        );
      }
    }
  }, [usableShipAddresses]);

  return {
    usableShipAddresses,
    usableShippingMethods,
    useMultipleShipment,
    handleMultipleShipmentChange,
    canContinue,
    submit,
    t,
    createNewAddress,
    setCreateNewAddress,
    editAddress,
    setEditAddress,
    selectedShipAddressIds,
    setSelectedShipAddressId,
    selectedshipModeIds: selectedShipModeIds,
    setSelectedshipModeId,
    isPersonalAddressAllowed,
    orgAddressDetails,
  };
};

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
    selectedshipModeIds,
    setSelectedshipModeId,
    useMultipleShipment,
    handleMultipleShipmentChange,
    t,
    canContinue,
    submit,
    createNewAddress,
    setCreateNewAddress,
    editAddress,
    setEditAddress,
    isPersonalAddressAllowed,
    orgAddressDetails,
  } = useShipping(props);

  const isDisabled = (): boolean => {
    return (
      !selectedShipAddressIds[0] ||
      selectedShipAddressIds[0].trim() === EMPTY_STRING
    );
  };

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid
        container
        direction="row"
        alignments="center"
        justify="flex-start"
        spacing={2}>
        {!createNewAddress && !editAddress ? (
          <>
            <StyledGrid item>
              <StyledBox
                display="flex"
                flexDirection="row"
                alignItems="center"
                className="full-height">
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
                disabled
              />
            </StyledGrid>
          </>
        ) : (
          <>
            <StyledGrid item>
              <StyledButton
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
              <StyledBox
                variant="div"
                display="inline-flex"
                alignItems="center"
                className="full-height">
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
      <Divider className="top-margin-3 bottom-margin-2" />
      <CheckoutAddress
        usableAddresses={usableShipAddresses[0] || []}
        //use first one since now we only support single shipment.
        page={CheckoutPageType.SHIPPING}
        setSelectedAddressId={(addressId) => {
          setSelectedShipAddressId(0, addressId);
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
            <StyledGrid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="center">
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
                <StyledInputLabel
                  disableAnimation={true}
                  shrink
                  htmlFor="checkout-ship-method">
                  {t("Shipping.Labels.SelectShippingMethod")}
                </StyledInputLabel>
                {usableShippingMethods[0] && (
                  <StyledSelect
                    data-testid="shipping-method-select"
                    native
                    value={selectedshipModeIds[0] || EMPTY_STRING}
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
          <StyledGrid container justify="flex-end" className="checkout-actions">
            <StyledGrid item>
              <StyledButton
                data-testid="shipping-can-continue"
                color="primary"
                disabled={!canContinue()}
                onClick={() => submit()}
                className="button">
                {t("Shipping.Actions.Next")}
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </>
      )}
    </StyledPaper>
  );
};

export default Shipping;
