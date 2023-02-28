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
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import cartService from "../../_foundation/apis/transaction/cart.service";
import subscriptionService from "../../_foundation/apis/transaction/subscription.service";
import { ACCOUNT, LOCALE, SELECTED_PROFILE } from "../../_foundation/constants/common";
//Custom libraries
import { RECURRING_ORDER_OPTIONS, PO_NUMBER } from "./../../constants/order";
import * as ROUTES from ".././../constants/routes";
import { ORDER_ID, HYPHEN } from ".././../constants/common";
//Redux
import { currentContractIdSelector } from ".././../redux/selectors/contract";
import {
  cartSelector,
  orderItemsSelector,
  isCheckoutDisabledSelector,
  isRecurringOrderDisabledSelector,
} from "../.././redux/selectors/order";
import { entitledOrgSelector, activeOrgSelector } from "../../redux/selectors/organization";
import { sellersSelector } from "../../redux/selectors/sellers";
import { GET_CART_ACTION } from "../.././redux/actions/order";
import { RESET_CART_ACTION } from "../.././redux/actions/order";
//GA360
import AsyncCall from ".././../_foundation/gtm/async.service";
import { get } from "lodash-es";

/**
 * Review Order section
 * displays order item table, order total summary, shipping and billing info
 * @param props
 */
export const useCheckoutReview = (props: any): any => {
  const widgetName = getDisplayName(useCheckoutReview);
  const { isPONumberRequired } = props;
  const componentName = "Review";
  const contractId = useSelector(currentContractIdSelector);
  const cart = useSelector(cartSelector);
  const orderItems = useSelector(orderItemsSelector);
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  const entitledOrgs = useSelector(entitledOrgSelector);
  const activeOrgId = useSelector(activeOrgSelector);
  const sellers = useSelector(sellersSelector);
  let isRecurringOrder: boolean = false;
  let recurringOrderFrequency: string = "0";
  let recurringOrderStartDate: string = "";
  const isRecurringOrderDisabled = useSelector(isRecurringOrderDisabledSelector);
  const locale = localStorageUtil.get(LOCALE);

  const recurringOrderDetails = useMemo(
    () => localStorageUtil.get(ACCOUNT + HYPHEN + ORDER_ID + HYPHEN + cart?.orderId),
    [cart]
  );
  const poNumber = useMemo(() => localStorageUtil.get(ACCOUNT + "-" + PO_NUMBER + "-" + cart?.orderId), [cart]);

  if (recurringOrderDetails && recurringOrderDetails.length === 3) {
    isRecurringOrder = recurringOrderDetails[0];
    recurringOrderFrequency = recurringOrderDetails[1];
    recurringOrderStartDate = recurringOrderDetails[2];
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mySite } = useSite();
  const controller = useMemo(() => new AbortController(), []);
  const location: any = useLocation();
  const usingProfile = get(location, `state.${SELECTED_PROFILE}`);

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    widget: widgetName,
    signal: controller.signal,
  };

  useEffect(() => {
    if (mySite) {
      dispatch(GET_CART_ACTION({ ...payloadBase, fetchCatentries: true }));
      // no need to refresh addresses here -- the useCheckoutProfileReview hook call
      //   to the CPROF_FETCH_ALL_ACTION will take care of it
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, locale]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function canContinue() {
    return (
      !isCheckoutDisabled &&
      (!isRecurringOrder ||
        (isRecurringOrder &&
          !isRecurringOrderDisabled &&
          recurringOrderFrequency !== "" &&
          recurringOrderStartDate != null))
    );
  }

  async function submit(e, cprofList?) {
    if (canContinue()) {
      let payloadBodyBase = {};
      if (isPONumberRequired) {
        payloadBodyBase = {
          purchaseorder_id: poNumber?.trim(),
        };
      }
      if (isRecurringOrder) {
        if (recurringOrderStartDate != null) {
          let fulfillmentInterval = "";
          let fulfillmentIntervalUOM = "";
          const startDate = recurringOrderStartDate;

          for (let i = 0; i < RECURRING_ORDER_OPTIONS.length; i++) {
            if (recurringOrderFrequency === RECURRING_ORDER_OPTIONS[i].value) {
              fulfillmentInterval = RECURRING_ORDER_OPTIONS[i].fulfillmentInterval;
              fulfillmentIntervalUOM = RECURRING_ORDER_OPTIONS[i].fulfillmentIntervalUOM;
              break;
            }
          }

          if (fulfillmentInterval !== "" && fulfillmentIntervalUOM !== "" && startDate !== "") {
            const payload: any = {
              ...payloadBase,
              orderId: cart.orderId,
              query: { ...payloadBodyBase }, //PO must be specified in the params too else API throws error
              body: {
                ...payloadBodyBase, //API uses the PO number value from body
                fulfillmentInterval: fulfillmentInterval,
                fulfillmentIntervalUOM: fulfillmentIntervalUOM,
                startDate: startDate,
              },
            };
            await cartService.preCheckout({ ...payloadBase });
            await subscriptionService.submitRecurringOrSubscription(payload);
          }
        }
      } else {
        await cartService.preCheckout({ ...payloadBase });
        const param = {
          notifyOrderSubmitted: "1",
          notifyMerchant: "1",
          notifyShopper: "1",
          ...payloadBodyBase,
        };
        await cartService.checkOut({
          ...payloadBase,
          body: param,
        });
      }

      const emailList: string[] = [];
      if (cprofList || cart.paymentInstruction) {
        (cprofList?.length ? cprofList : cart.paymentInstruction)
          .filter(({ email1 }) => email1?.trim())
          .forEach(({ email1 }) => emailList.push(email1));
      }

      navigate(ROUTES.ORDER_CONFIRMATION, {
        state: {
          orderId: cart.orderId,
          emailList: emailList,
        },
      });
      dispatch(RESET_CART_ACTION());
      dispatch(GET_CART_ACTION({ widget: widgetName }));
      localStorageUtil.remove(ACCOUNT + "-" + PO_NUMBER + "-" + cart.orderId);
      //GA360
      if (mySite.enableGA) {
        const storeName = mySite.storeName;
        AsyncCall.sendCheckoutPageViewEvent(
          {
            pageSubCategory: "Order Confirmation",
            pathname: ROUTES.ORDER_CONFIRMATION,
          },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
        AsyncCall.sendPurchaseEvent(
          { cart, orderItems, entitledOrgs, activeOrgId, sellers, storeName },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
    }
  }

  function back() {
    usingProfile ? navigate(ROUTES.CART) : navigate(`../${ROUTES.CHECKOUT_PAYMENT}`);
  }

  return {
    cart,
    orderItems,
    isRecurringOrder,
    recurringOrderFrequency,
    recurringOrderStartDate,
    back,
    canContinue,
    submit,
    componentName,
    poNumber,
  };
};
