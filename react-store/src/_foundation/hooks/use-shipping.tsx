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
import { EMPTY_STRING } from "../../constants/common";
import { SHIPMODE } from "../../constants/order";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import shippingInfoService from "../../_foundation/apis/transaction/shippingInfo.service";
//Custom libraries
import { SHIP_INFO } from "../../configs/order";
import * as ROUTES from "../../constants/routes";
//Redux
import { addressDetailsSelector } from "../../redux/selectors/account";
import { activeOrgSelector, organizationDetailsSelector } from "../../redux/selectors/organization";
import { shipInfosSelector, orderItemsSelector } from "../../redux/selectors/order";
import * as orderActions from "../../redux/actions/order";
import * as organizationAction from "../../redux/actions/organization";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import * as accountActions from "../../redux/actions/account";
import { GENERIC_ERROR_ACTION } from "../../redux/actions/error";
import { BAD_INV_ERROR } from "../../constants/errors";
import { cloneDeep, uniqBy } from "lodash-es";
import storeUtil from "../../utils/storeUtil";
import addressUtil from "../../utils/addressUtil";
import { loginStatusSelector } from "../../redux/selectors/user";

const handleShipError = (error: any, dispatch) => {
  const errs = error.response?.data?.errors ?? [];
  const e = errs[0];
  if (e?.errorKey === BAD_INV_ERROR) {
    const _error = {
      errorKey: `${BAD_INV_ERROR}_DELIVERY`,
      linkAction: { url: ROUTES.CART, key: "ViewCart" },
    };
    dispatch(GENERIC_ERROR_ACTION(_error));
  }
  console.log("unable to update the shipping.", error);
};
const BLANK_SEL = { addressId: "", nickName: "", shipModeId: "" };
export const useShipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = useSelector(orderItemsSelector);
  const byId = useMemo(() => storeUtil.toMap(orderItems, "orderItemId"), [orderItems]);
  const contractId = useSelector(currentContractIdSelector);
  const usableShipInfos: any = useSelector(shipInfosSelector);
  const addressDetails: any = useSelector(addressDetailsSelector);
  const regdUser: any = useSelector(loginStatusSelector);
  const activeOrgId = useSelector(activeOrgSelector);
  const orgAddressDetails = useSelector(organizationDetailsSelector);
  const [selShipInfo, setSelShipInfo] = useState<any>(cloneDeep(BLANK_SEL));
  const { mySite } = useSite();
  const [useMultipleShipment, setUseMultipleShipment] = useState<boolean>(false);
  const [selectShipment, setSelectShipment] = useState<boolean>(false);
  const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [global, setGlobal] = useState<any>({ usableAddrs: {}, usableMethods: {}, commonAddrs: [], commonMethods: [] });
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : EMPTY_STRING;
  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId,
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const personalAddresses = useMemo(() => {
    const { contactList = [] } = addressDetails ?? {};
    return [addressDetails, contactList].flat(1).filter(Boolean);
  }, [addressDetails]);

  const orgAddresses = useMemo(() => {
    const { contactInfo, addressBook = [] } = orgAddressDetails ?? {};
    return [contactInfo, addressBook].flat(1).filter(Boolean);
  }, [orgAddressDetails]);

  const toggleMultiShipment = (event) => {
    if (orderItems.length > 1) {
      setUseMultipleShipment(event.target.checked);
      setSelShipInfo(cloneDeep(BLANK_SEL));
    }
  };

  const filterByPersonalAndOrgAddrs = (addrList) => {
    const p = addressUtil.filterAddresses(addrList, addressDetails);
    const o = addressUtil.filterOrgAddresses(addrList, orgAddressDetails);
    return [...p, ...o];
  };

  // on load, find intersecting addresses and methods for all items -- if none, force-enable multi-shipping
  //   this applies mostly to b2b where different contracts may enforce different address
  //   behaviour
  useEffect(
    () => {
      const usableAddrs = initUsableShippingAddresses();
      const usableMethods = initUsableShippingMethods();
      setGlobal({
        usableAddrs,
        usableMethods,
        commonAddrs: findIntersectingAddrs(orderItems, usableAddrs),
        commonMethods: findIntersectingMethods(orderItems, usableMethods),
      });
      if (selectShipment) {
        setSelShipInfo({
          ...selShipInfo,
          commonMethods: findIntersectingMethods(selectedItems, usableMethods),
          commonAddrs: findIntersectingAddrs(selectedItems, usableAddrs),
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usableShipInfos, addressDetails, orgAddressDetails]
  );

  const cancelSelectShipment = () => {
    setSelectedItems([]);
    setSelectShipment(false);
    setSelShipInfo(cloneDeep(BLANK_SEL));
  };

  const handleSelectCommon = (items) => {
    const commonAddrs = findIntersectingAddrs(items);
    const commonMethods = findIntersectingMethods(items);
    setSelectedItems(items);
    setSelShipInfo({ ...cloneDeep(BLANK_SEL), commonMethods, commonAddrs });
    setSelectShipment(true);
  };
  const handleSingleSelect = (item) => handleSelectCommon([item]);
  const handleMultiSelect = (itemIds) => handleSelectCommon(itemIds.map((id) => byId[id]));

  const checkMultiSelect = (itemIds) => {
    const items = itemIds.map((id) => byId[id]);
    const addrs = findIntersectingAddrs(items);
    const methods = findIntersectingMethods(items);

    // multi-selection is only allowed if:
    // - guest user (this really only applies to b2c, since b2b users are always registered), OR
    // - selected order-items have intersecting methods and addresses
    //
    // intersecting address and methods are necessary in b2b scenarios where two different order-items may
    //   have been added under different contract selections that do not share the same addresses, e.g.,
    //   one order-item may allow selection of personal addresses and the other may only allow selection
    //   of org addresses
    //
    // in b2c scenarios, for logged-in users, there is always only one contract selection and the default address
    //   for the user is always available
    return !regdUser || (addrs.length > 0 && methods.length > 0);
  };

  /**
   * Initialize filtered shipping addresses based on usable shipping address list
   */
  function initUsableShippingAddresses() {
    const rc: any = {};
    let all: any[] = [];

    if (usableShipInfos?.orderItem?.length) {
      usableShipInfos.orderItem.forEach(({ usableShippingAddress, orderItemId }) => {
        const list = filterByPersonalAndOrgAddrs(usableShippingAddress);
        rc[orderItemId] = { list, byId: storeUtil.toMap(list, "nickName") };
        all.push(...list);
      });
      all = uniqBy(all, "nickName");
    } else if (usableShipInfos?.usableShippingAddress) {
      const list = filterByPersonalAndOrgAddrs(usableShipInfos.usableShippingAddress);
      const byId = storeUtil.toMap(list, "nickName");
      orderItems.forEach(({ orderItemId }) => (rc[orderItemId] = { list, byId }));
      all.push(...list);
    }

    rc.__all = { list: all };
    return rc;
  }

  /**
   * Initialize usable shipping methods from orderitems
   */
  function initUsableShippingMethods() {
    const rc: any = {};

    if (usableShipInfos?.orderItem?.length) {
      usableShipInfos.orderItem
        .filter(({ usableShippingMode: u }) => u)
        .forEach(({ usableShippingMode: u, orderItemId }) => {
          const list = u.filter((mode) => mode.shipModeCode !== SHIPMODE.shipModeCode.PickUp);
          rc[orderItemId] = { list, byId: storeUtil.toMap(list, "shipModeCode") };
        });
    }

    return rc;
  }

  /**
   * Sets addressId to local state and update the current order, so that available shipping
   * methods can be populated according to selected address.
   * @param addressId
   * @param nickName, The nickName of address
   */
  const updateAddress = async (addressId, nickName) => {
    setSelShipInfo({ ...selShipInfo, addressId, nickName });

    if (useMultipleShipment) {
      const orderItem: any[] = [];

      // selected items' address may have changed or existing address updated
      selectedItems.forEach(({ orderItemId }) => orderItem.push({ orderItemId, addressId }));

      // non-selected items that have the same nickName might need updating
      orderItems
        .filter(({ nickName: nn }) => nn === nickName)
        .forEach(({ orderItemId }) => orderItem.push({ orderItemId, addressId }));

      if (orderItem.length) {
        const body = { ...cloneDeep(SHIP_INFO), orderItem: uniqBy(orderItem, "orderItemId") };
        const payload = { ...payloadBase, body };
        await shippingInfoService.updateOrderShippingInfo(payload);
        dispatch(orderActions.GET_CART_ACTION({ ...payloadBase }));
      }
    }
  };

  /**
   * Check if shopper can continue to the next step
   */
  const canContinue = () =>
    orderItems.every(
      ({ nickName, orderItemId, shipModeCode }) =>
        addressUtil.validAddr(global.usableAddrs[orderItemId]?.byId[nickName]) &&
        global.usableMethods[orderItemId]?.byId[shipModeCode]
    );

  const updateFull = async (items, fetchCatentries = false) => {
    const { shipModeId, addressId } = selShipInfo;
    const orderItem = items.map(({ orderItemId }) => ({ shipModeId, orderItemId, addressId }));
    const body = { ...cloneDeep(SHIP_INFO), orderItem };
    const payload = { ...payloadBase, skipErrorSnackbar: { error: "_API_BAD_INV" }, body };
    let rc = false;
    try {
      await shippingInfoService.updateOrderShippingInfo(payload);
      dispatch(orderActions.GET_CART_ACTION({ ...payloadBase, fetchCatentries }));
      rc = true;
    } catch (error) {
      handleShipError(error, dispatch);
    }

    return rc;
  };

  async function confirmShipInfo() {
    const rc = await updateFull(selectedItems, true);
    if (rc) {
      cancelSelectShipment();
    }
  }

  /**
   * Submit the selected address or new address form
   */
  async function submit() {
    if (!useMultipleShipment) {
      const rc = await updateFull(orderItems);
      if (rc) {
        navigate(`../${ROUTES.CHECKOUT_PAYMENT}`);
      }
    } else {
      navigate(`../${ROUTES.CHECKOUT_PAYMENT}`);
    }
  }

  const findIntersecting = (items, obj, key) => {
    if (items.length === 1) {
      return obj[items[0].orderItemId]?.list ?? [];
    } else {
      const list: any[] = [];
      const n = items.length;
      const m = {};
      // collect all elements
      items.forEach((item) => list.push(...(obj[item.orderItemId]?.list ?? [])));

      // count instances
      list.forEach((e) => (m[e[key]] = 1 + (m[e[key]] ?? 0)));

      // return list where key-value is present in each item's usable list
      const rc = uniqBy(
        list.filter((e) => m[e[key]] === n),
        key
      );
      return rc;
    }
  };

  const findIntersectingAddrs = (items, addrs = global.usableAddrs) => findIntersecting(items, addrs, "nickName");
  const findIntersectingMethods = (items, meths = global.usableMethods) =>
    findIntersecting(items, meths, "shipModeCode");

  useEffect(() => {
    setGlobal({
      ...global,
      commonMethods: findIntersectingMethods(orderItems),
      commonAddrs: findIntersectingAddrs(orderItems),
    });
  }, [orderItems]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // enable multiple shipment if there are no common addresses -- but only if
    //   there were addresses to choose from in the first place -- we will always
    //   have some shipping methods to choose from since those are provided by server
    //   not the user
    if (
      orderItems?.length > 1 &&
      global.usableAddrs.__all?.list.length > 0 &&
      (global.commonAddrs.length === 0 || global.commonMethods.length === 0)
    ) {
      setUseMultipleShipment(true);
    } else if (
      orderItems?.length === 1 ||
      (personalAddresses.length === 0 && orgAddresses.length === 0 && global.usableAddrs.__all?.list.length === 0)
    ) {
      setUseMultipleShipment(false);
    }
  }, [global]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mySite) {
      dispatch(accountActions.GET_ADDRESS_DETAIL_ACTION(payloadBase));
      const param = { storeId: mySite.storeId, organizationId: activeOrgId, ...payloadBase };
      dispatch(organizationAction.GET_ORGANIZATION_ADDRESS_ACTION(param));
    }
  }, [mySite]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
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
    cancelSelectShipment,
    confirmShipInfo,
    handleSingleSelect,
    handleMultiSelect,
    checkMultiSelect,
    selShipInfo,
    setSelShipInfo,
    updateAddress,
    global,
  };
};
export default useShipping;
