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
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { EMPTY_STRING, IS_PERSONAL_ADDRESS_ALLOWED, STRING_TRUE } from "../../constants/common";
import { SHIPMODE } from "../../constants/order";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import shippingInfoService from "../../_foundation/apis/transaction/shippingInfo.service";
//Custom libraries
import { ORDER_CONFIGS } from "../../configs/order";
import * as ROUTES from "../../constants/routes";
//Redux
import { addressDetailsSelector } from "../../redux/selectors/account";
import { activeOrgSelector, organizationDetailsSelector } from "../../redux/selectors/organization";
import { shipInfosSelector, orderItemsSelector, cartSelector } from "../../redux/selectors/order";
import * as orderActions from "../../redux/actions/order";
import * as organizationAction from "../../redux/actions/organization";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import * as accountActions from "../../redux/actions/account";
import React from "react";

export const useShipping = () => {
  const navigate = useNavigate();
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
    cart && cart[IS_PERSONAL_ADDRESS_ALLOWED] ? cart[IS_PERSONAL_ADDRESS_ALLOWED] : STRING_TRUE;
  const [selectedShipAddressIds, setSelectedShipAddressIds] = useState<string[]>([]);
  const [selectedShipModeIds, setSelectedShipModeIds] = useState<string[]>([]);
  const { mySite } = useSite();
  const [useMultipleShipment, setUseMultipleShipment] = useState<boolean>(false);
  const [selectShipment, setSelectShipment] = useState<boolean>(false);
  const [skipMultipleShipment, setSkipMultipleShipment] = useState<boolean>(false);
  const handleMultipleShipmentChange = (event) => {
    if (orderItems.length > 1) {
      setUseMultipleShipment(event.target.checked);
      setSelectedShipAddressIds([]);
    }
  };

  const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const usableShipAddresses = useMemo(
    () => initUsableShippingAddresses(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usableShipInfos, addressDetails, orgAddressDetails]
  );
  const usableShippingMethods = useMemo(
    () => initUsableShippingMethods(),
    [usableShipInfos] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const [checkboxesActive, setCheckboxesActive] = useState<boolean>(false);
  const [selectAllCheckboxes, setSelectAllCheckboxes] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [tempItemsList, setTempItemsList] = useState<any[]>([]);

  const [itemsMap, setItemsMap] = useState({});

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : EMPTY_STRING;
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

  const cancelSelectShipment = () => {
    setSelectAllCheckboxes(false);
    setSelectedItems([]);
    setTempItemsList([]);
    setCheckboxesActive(false);
    setSelectShipment(false);
    setItemsMap({});
  };

  async function confirmShipInfo() {
    const orderItemsArray: any[] = [];
    selectedItems.forEach((item) => {
      const orderItem = orderItems.filter((orderItem) => orderItem.orderItemId === item.orderItemId)[0];
      const orderItemId = orderItem.orderItemId;
      const shipModeId = selectedShipModeIds[0];
      const addressId = selectedShipAddressIds[0];
      const orderItemJson = {
        shipModeId: shipModeId,
        orderItemId: orderItemId,
        addressId: addressId,
      };
      orderItemsArray.push(orderItemJson);
    });
    const body = {
      ...shipInfoBody,
      orderItem: orderItemsArray,
    };
    const payload = {
      ...payloadBase,
      body,
    };
    await shippingInfoService.updateOrderShippingInfo(payload);
    dispatch(orderActions.GET_SHIPINFO_ACTION({ ...payloadBase }));
    dispatch(orderActions.GET_CART_ACTION({ ...payloadBase, fetchCatentries: true }));
    setSelectShipment(false);
    setTempItemsList([]);
    setCheckboxesActive(false);
    setItemsMap({});
  }

  const handleSelectShipmentChangeForSingleItem = (items) => {
    const selectedItem = [...selectedItems];
    selectedItem.splice(0, selectedItems.length, items);
    setSelectedShipAddressIds([]);
    setSelectedshipModeId(0, items.shipModeId);
    setSelectedItems(selectedItem);
    setSelectShipment(true);
  };

  /**
   * Handles checkboxes selection logic for multiple shipment table
   *
   * @param evt, The orderItemId of the checkbox, on click. For CheckAll checkbox, -1
   */
  const clickCheckbox = (evt: any) => {
    let itemsList: any[] = [];
    const iMap = {};

    if (evt.target.value === "-1") {
      if (evt.target.checked) {
        orderItems.forEach((itemId) => {
          itemsList.push(itemId.orderItemId);
          iMap[itemId.orderItemId] = true;
        });
        setTempItemsList(itemsList);
        setItemsMap(iMap);
      } else {
        itemsList.splice(0, itemsList.length);
        setTempItemsList(itemsList);
        setItemsMap(iMap);
      }
    } else {
      if (evt.target.checked) {
        setItemsMap(Object.assign(iMap, itemsMap, { [evt.target.value]: true }));
        itemsList = tempItemsList;
        itemsList.push(evt.target.value);
        setTempItemsList(itemsList);
      } else {
        setItemsMap(Object.assign(iMap, itemsMap, { [evt.target.value]: false }));
        itemsList = tempItemsList;
        const index = itemsList.indexOf(evt.target.value, 0);
        if (index > -1) {
          itemsList.splice(index, 1);
          setTempItemsList(itemsList);
        }
      }
    }
  };

  const cancelMultipleSelection = () => {
    setCheckboxesActive(false);
    setSelectShipment(false);
    setSelectAllCheckboxes(false);
    setTempItemsList([]);
    setItemsMap({});
  };

  /**
   * Initialize filtered shipping addresses based on usable shipping address list
   */
  function initUsableShippingAddresses() {
    const _usableShippingAddresses: any[] = [];
    if (usableShipInfos && usableShipInfos.orderItem && usableShipInfos.orderItem.length > 0) {
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
  function pushUsableShippingAddresses(address: any[], _usableShippingAddresses: any[]) {
    if (address && address.length > 0) {
      return _usableShippingAddresses.concat(address);
    } else {
      return _usableShippingAddresses;
    }
  }

  function handleSelectShipmentChangeForCheckboxes() {
    setSelectedShipAddressIds([]);
    if (selectAllCheckboxes) {
      setSelectedItems(orderItems);
    } else {
      setSelectedItems(tempItemsList.map((itemId) => orderItems.find((item) => item.orderItemId === itemId)));
    }

    setSelectedshipModeId(
      0,
      tempItemsList.map((itemId) => orderItems.find((item) => item.orderItemId === itemId))[0].shipModeId
    );

    setSelectShipment(true);
  }

  const handleMultiSelect = (items) => {
    setSelectedItems(items.map((itemId) => orderItems.find((item) => item.orderItemId === itemId)));
    setSelectedshipModeId(
      0,
      items.map((itemId) => orderItems.find((item) => item.orderItemId === itemId))[0].shipModeId
    );

    setSelectShipment(true);
  };

  /**
   * Initialize usable shipping methods from orderitems
   */
  function initUsableShippingMethods() {
    const _usableShippingMethods: any[] = [];
    if (usableShipInfos && usableShipInfos.orderItem && usableShipInfos.orderItem.length > 0) {
      const orderItems: any[] = usableShipInfos.orderItem;
      orderItems.forEach((item) => {
        if (item.usableShippingMode) {
          pushUsableShippingMode(
            item.usableShippingMode.filter((mode) => mode.shipModeCode !== SHIPMODE.shipModeCode.PickUp),
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
  function pushUsableShippingMode(shippingMode: any[], _usableShippingMethods: any[]) {
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
          } else if (addressDetails.contactMap && addressDetails.contactMap[address.addressId]) {
            const adressDetailsFromContact = addressDetails.contactMap[address.addressId];
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
        if (address && orgAddressDetails && orgAddressDetails.contactInfo && orgAddressDetails.addressBook) {
          if (address.addressId === orgAddressDetails.contactInfo.addressId) {
            return (
              orgAddressDetails.contactInfo.address1 !== undefined &&
              orgAddressDetails.contactInfo.country !== undefined &&
              orgAddressDetails.contactInfo.address1 !== EMPTY_STRING &&
              orgAddressDetails.contactInfo.country !== EMPTY_STRING
            );
          } else {
            for (const orgAddress of orgAddressDetails.addressBook) {
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
        } else {
          return false;
        }
      });
      if (filteredList && filteredList.length > 0) {
        return filteredList;
      }
    }
    return [];
  }

  /**
   * Sets addressId to local state and update the current order, so that available shipping
   * methods can be populated according to selected address.
   * @param index The order item index in order
   * @param addressId
   * @param nickName, The nickName of address
   */
  const setSelectedShipAddressId = async (index, addressId, nickName) => {
    setSkipMultipleShipment(true);
    const addressIds = [...selectedShipAddressIds];
    addressIds.splice(index, 1, addressId);
    setSelectedShipAddressIds(addressIds);
    if (!useMultipleShipment) {
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
    } else {
      const orderItemsArray: any[] = [];
      let itemChanged: boolean = false;
      selectedItems.forEach((item) => {
        itemChanged = true;
        const orderItemId = item.orderItemId;
        const orderItemJson = {
          orderItemId: orderItemId,
          addressId: addressId,
        };
        orderItemsArray.push(orderItemJson);
      });
      orderItems.forEach((item) => {
        if (item.nickName !== undefined && item.nickName === nickName) {
          itemChanged = true;
          const orderItemId = item.orderItemId;
          const orderItemJson = {
            orderItemId: orderItemId,
            addressId: addressId,
          };
          orderItemsArray.push(orderItemJson);
        }
      });
      if (itemChanged) {
        const body = {
          ...shipInfoBody,
          orderItem: orderItemsArray,
        };
        const payload = {
          ...payloadBase,
          body,
        };
        await shippingInfoService.updateOrderShippingInfo(payload);
        dispatch(orderActions.GET_SHIPINFO_ACTION({ ...payloadBase }));
        dispatch(orderActions.GET_CART_ACTION({ ...payloadBase }));
      }
    }
  };

  /**
   * Sets shipModeId to local state, will be persisted
   * to server when hitting the "next" button
   * @param index item index in order
   * @param shipModeId
   */
  const setSelectedshipModeId = (index, shipModeId) => {
    const shipModeIds = [...selectedShipModeIds];
    shipModeIds.splice(index, 1, shipModeId);
    setSelectedShipModeIds(shipModeIds);
  };

  /**
   * Check if shopper can continue to the next step
   */
  function canContinue() {
    const usableAddresses: any[] = usableShipAddresses[0] || [];
    let i = 0;
    let res: boolean = false;
    usableAddresses
      .map((o) => o.addressId)
      .forEach((a) => {
        orderItems.forEach((item) => {
          if (a === item.addressId) {
            i++;
          }
        });
      });

    if (i < orderItems.length) {
      res = true;
    }

    return res;
  }

  function canContinueSingleShipment() {
    return selectedShipModeIds.length > 0 && selectedShipAddressIds.length > 0;
  }
  /**
   * Check and verify the existing shipMode is changed by shopper.
   */
  function shipModeUpdated(): boolean {
    return !orderItems[0] || selectedShipModeIds[0] !== orderItems[0].shipModeId;
  }

  /**
   * Submit the selected address or new address form
   */
  async function submit() {
    if (!useMultipleShipment && !canContinue()) {
      let isSingleShipModeId = true;
      if (!useMultipleShipment && orderItems?.length > 1) {
        const addressIds = orderItems.map((o) => o.addressId);
        const isSingleAddressId = addressIds.every((addressId, index, array) => addressId === array[0]);
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
        isSingleShipModeId = shipModeIds.every((shipModeId, index, array) => shipModeId === array[0]);
      }

      if (shipModeUpdated() || !isSingleShipModeId) {
        const body = {
          ...shipInfoBody,
          shipModeId: selectedShipModeIds[0],
          orderItem: [],
        };
        const shipInfoPayload = {
          ...payloadBase,
          body,
        };

        await shippingInfoService.updateOrderShippingInfo(shipInfoPayload);
      }
      dispatch(orderActions.FETCHING_CART_ACTION({ ...payloadBase }));
    }
    navigate(ROUTES.CHECKOUT_PAYMENT);
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
  }, [mySite]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => {
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
                return i !== undefined && usableShipAddresses[index]?.map((o) => o.addressId).includes(i);
              })
          );
        }
        if (selectedShipModeIds.length === 0 || !selectedShipModeIds[0]) {
          setSelectedShipModeIds(
            orderItems
              .filter((i) => i !== undefined && i.shipModeCode !== SHIPMODE.shipModeCode.PickUp)
              .map((o) => o.shipModeId)
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usableShipAddresses]
  );

  useEffect(() => {
    const bol: boolean = orderItems.some((item) => itemsMap[item.orderItemId]);
    const allCheck: boolean = orderItems.every((item) => itemsMap[item.orderItemId] === true);
    setCheckboxesActive(bol);
    setSelectAllCheckboxes(allCheck);
  }, [itemsMap]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled = (): boolean => {
    return !selectedShipAddressIds[0] || selectedShipAddressIds[0].trim() === EMPTY_STRING;
  };

  const setMultipleShipment = () => {
    const addressIds = orderItems.map((o) => o.addressId);
    const shipModeIds = orderItems.map((o) => o.shipModeId);

    const uniqueAddressIds = addressIds.filter((v, i, a) => a.indexOf(v) === i);
    const uniqueShipModeIds = shipModeIds.filter((v, i, a) => a.indexOf(v) === i);
    if (useMultipleShipment === false && (uniqueAddressIds.length > 1 || uniqueShipModeIds.length > 1)) {
      setUseMultipleShipment(true);
    }
  };

  React.useEffect(() => {
    if (!skipMultipleShipment) {
      setMultipleShipment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderItems]);

  return {
    usableShipAddresses,
    usableShippingMethods,
    useMultipleShipment,
    setUseMultipleShipment,
    handleMultipleShipmentChange,
    canContinue,
    canContinueSingleShipment,
    submit,
    t,
    createNewAddress,
    setCreateNewAddress,
    editAddress,
    setEditAddress,
    selectedShipAddressIds,
    setSelectedShipAddressId,
    selectedShipModeIds: selectedShipModeIds,
    setSelectedshipModeId,
    isPersonalAddressAllowed,
    orgAddressDetails,
    selectShipment,
    setSelectShipment,
    shipInfoBody,
    payloadBase,
    dispatch,
    checkboxesActive,
    cancelMultipleSelection,
    setCheckboxesActive,
    handleSelectShipmentChangeForCheckboxes,
    tempItemsList,
    setTempItemsList,
    itemsMap,
    setItemsMap,
    selectedItems,
    orderItems,
    handleSelectShipmentChangeForSingleItem,
    selectAllCheckboxes,
    clickCheckbox,
    cancelSelectShipment,
    confirmShipInfo,
    isDisabled,
    handleMultiSelect,
  };
};
export default useShipping;
