/*
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
import { useCallback, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import getDisplayName from "react-display-name";

//foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";

import { currentContractIdSelector } from "../../redux/selectors/contract";
import shippingInfoService from "../../_foundation/apis/transaction/shippingInfo.service";
import { EMPTY_STRING, PICKUP_ONBEHALF, SELF_PICKUP } from "../../constants/common";
import { SHIPMODE } from "../../constants/order";

import * as ROUTES from "../../constants/routes";
import * as orderActions from "../../redux/actions/order";
import { useStoreLocatorValue } from "../context/store-locator-context";
import { orderItemsSelector, shipInfosSelector } from "../../redux/selectors/order";
import { GENERIC_ERROR_ACTION } from "../../redux/actions/error";
import { BAD_INV_ERROR } from "../../constants/errors";
import addressUtil from "../../utils/addressUtil";

export const usePickup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pickupPerson, setPickupPerson] = useState<string>("1");
  const [pickupPersonFullName, setPickupPersonFullName] = useState<string>("");
  const [buyerFullName, setBuyerFullName] = useState<string>("");
  const [pickupPersonEmail, setPickupPersonEmail] = useState<string>("");
  const contractId = useSelector(currentContractIdSelector);
  const widget = getDisplayName("usePickup");
  const orderItems = useSelector(orderItemsSelector);

  const handlePickupPerson = useCallback((event) => {
    setPickupPerson(event.target.value);
  }, []);
  const handleFirstName = useCallback((event) => {
    setFirstName(event.target.value);
  }, []);
  const handleLastName = useCallback((event) => {
    setLastName(event.target.value);
  }, []);
  const handleEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const handlePhone = useCallback((event) => {
    setPhone(event.target.value);
  }, []);
  const handlePickupPersonFullName = useCallback((event) => {
    setPickupPersonFullName(event.target.value);
  }, []);
  const handlePickupPersonEmail = useCallback((event) => {
    setPickupPersonEmail(event.target.value);
  }, []);
  const handleBuyerFullName = useCallback((event) => {
    setBuyerFullName(event.target.value);
  }, []);
  const { storeLocator } = useStoreLocatorValue();
  const canContinue = () => {
    if (pickupPerson === SELF_PICKUP) {
      if (!addressUtil.validateEmail(email)) {
        return false;
      } else if (!addressUtil.validatePhoneNumber(phone)) {
        return false;
      }
    }

    if (pickupPerson === PICKUP_ONBEHALF) {
      if (!addressUtil.validateEmail(pickupPersonEmail)) {
        return false;
      }
    }

    if (pickupPerson === SELF_PICKUP && firstName && lastName && email && phone) {
      return true;
    } else if (pickupPerson === PICKUP_ONBEHALF && pickupPersonFullName && pickupPersonEmail && buyerFullName) {
      return true;
    }
    return false;
  };

  const backToPickupStore = () => {
    navigate(`../${ROUTES.CHECKOUT_PICKUP_STORE}`);
  };
  const usableShipInfos: any = useSelector(shipInfosSelector);

  const controller = useMemo(() => {
    return new AbortController();
  }, []);
  const { mySite } = useSite();
  const currency: string = mySite ? mySite.defaultCurrencyID : EMPTY_STRING;
  const userData =
    pickupPerson === SELF_PICKUP
      ? {
          type: SELF_PICKUP,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }
      : {
          type: PICKUP_ONBEHALF,
          pickupPersonFullName: pickupPersonFullName,
          buyerPersonFullName: buyerFullName,
          pickupPersonEmail: pickupPersonEmail.trim(),
        };

  const proceed = async () => {
    const shipModeId = usableShipInfos?.orderItem[0]?.usableShippingMode?.find(
      (m) => m.shipModeCode === SHIPMODE.shipModeCode.PickUp
    )?.shipModeId;
    const shipInstructions = JSON.stringify(userData);
    const orderItemArr: any[] = [];
    for (let i = 0; i < orderItems.length; i++) {
      const obj = { shipInstructions, shipModeId, physicalStoreId: storeLocator?.selectedStore?.id };
      orderItemArr.push(obj);
    }
    const body = {
      shipModeId,
      addressId: "",
      orderItem: orderItemArr,
      physicalStoreId: storeLocator?.selectedStore?.id,
    };

    const updateOrderShippingInfoParams = {
      widget,
      currency,
      contractId,
      signal: controller.signal,
      body,
    };

    try {
      dispatch(orderActions.SET_PICKUP_PERSON_ACTION(pickupPerson));
      await shippingInfoService.updateOrderShippingInfo(updateOrderShippingInfoParams);
      navigate(`../${ROUTES.CHECKOUT_PAYMENT}`);
    } catch (error) {
      console.error("Error in updating order shipping info", error);
    }
  };

  /**
   * validate store inventory before next step
   */
  const ContinuePickupDetails = async () => {
    const shipModeId = usableShipInfos?.orderItem[0]?.usableShippingMode?.find(
      (m) => m.shipModeCode === SHIPMODE.shipModeCode.PickUp
    )?.shipModeId;
    const orderItemArr: any[] = [];
    for (let i = 0; i < orderItems.length; i++) {
      const obj = { shipModeId, physicalStoreId: storeLocator?.selectedStore?.id };
      orderItemArr.push(obj);
    }
    const body = {
      shipModeId,
      addressId: "",
      orderItem: orderItemArr,
      physicalStoreId: storeLocator?.selectedStore?.id,
    };

    const updateOrderShippingInfoParams = {
      widget,
      currency,
      contractId,
      signal: controller.signal,
      skipErrorSnackbar: { error: BAD_INV_ERROR },
      body,
    };

    try {
      await shippingInfoService.updateOrderShippingInfo(updateOrderShippingInfoParams);
      navigate(`../${ROUTES.CHECKOUT_PICKUP}`);
    } catch (error: any) {
      const errs = error.response?.data?.errors ?? [];
      const e = errs[0];
      if (e && e.errorKey === BAD_INV_ERROR) {
        const _error = {
          errorKey: `${BAD_INV_ERROR}_PICKUP`,
          linkAction: {
            url: ROUTES.CART,
            key: "ViewCart",
          },
        };
        dispatch(GENERIC_ERROR_ACTION(_error));
      }
      console.error("Error in updating order shipping info", error);
    }
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    phone,
    email,
    firstName,
    lastName,
    pickupPerson,
    setPickupPerson,
    handlePickupPerson,
    canContinue,
    backToPickupStore,
    handleFirstName,
    handleLastName,
    handleEmail,
    handlePhone,
    proceed,
    pickupPersonFullName,
    pickupPersonEmail,
    buyerFullName,
    handlePickupPersonFullName,
    handleBuyerFullName,
    handlePickupPersonEmail,
    ContinuePickupDetails,
  };
};
export default usePickup;
