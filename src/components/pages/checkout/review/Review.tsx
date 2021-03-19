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
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useHistory } from "react-router";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
import { localStorageUtil } from "../../../../_foundation/utils/storageUtil";
import cartService from "../../../../_foundation/apis/transaction/cart.service";
import subscriptionService from "../../../../_foundation/apis/transaction/subscription.service";
import { ACCOUNT } from "../../../../_foundation/constants/common";
//Custom libraries
import {
  RECURRING_ORDER_OPTIONS,
  PO_NUMBER,
} from "../../../../constants/order";
import { OrderDetails } from "../../../widgets/order-details";
import * as ROUTES from "../../../../constants/routes";
import { ORDER_ID, HYPHEN } from "../../../../constants/common";
//Redux
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import {
  cartSelector,
  orderItemsSelector,
  isCheckoutDisabledSelector,
  isRecurringOrderDisabledSelector,
} from "../../../../redux/selectors/order";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../../redux/actions/account";
import { GET_CART_ACTION } from "../../../../redux/actions/order";
import { RESET_CART_ACTION } from "../../../../redux/actions/order";
//GA360
import AsyncCall from "../../../../_foundation/gtm/async.service";

/**
 * Review Order section
 * displays order item table, order total summary, shipping and billing info
 * @param props
 */
const Review: React.FC = (props: any) => {
  const widgetName = getDisplayName(Review);
  const { isPONumberRequired } = props;
  const componentName = "Review";
  const contractId = useSelector(currentContractIdSelector);
  const cart = useSelector(cartSelector);
  const orderItems = useSelector(orderItemsSelector);
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  let isRecurringOrder: boolean = false;
  let recurringOrderFrequency: string = "0";
  let recurringOrderStartDate: string = "";
  const isRecurringOrderDisabled = useSelector(
    isRecurringOrderDisabledSelector
  );

  const recurringOrderDetails = useMemo(
    () =>
      localStorageUtil.get(
        ACCOUNT + HYPHEN + ORDER_ID + HYPHEN + cart?.orderId
      ),
    [cart]
  );
  const poNumber = useMemo(
    () => localStorageUtil.get(ACCOUNT + "-" + PO_NUMBER + "-" + cart?.orderId),
    [cart]
  );

  if (recurringOrderDetails && recurringOrderDetails.length === 3) {
    isRecurringOrder = recurringOrderDetails[0];
    recurringOrderFrequency = recurringOrderDetails[1];
    recurringOrderStartDate = recurringOrderDetails[2];
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const { mySite } = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite) {
      dispatch(GET_CART_ACTION({ ...payloadBase, fetchCatentries: true }));
      //Refresh address list to get any new shipping/billing addresses created
      dispatch(GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

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

  async function submit() {
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
              fulfillmentInterval =
                RECURRING_ORDER_OPTIONS[i].fulfillmentInterval;
              fulfillmentIntervalUOM =
                RECURRING_ORDER_OPTIONS[i].fulfillmentIntervalUOM;
              break;
            }
          }

          if (
            fulfillmentInterval !== "" &&
            fulfillmentIntervalUOM !== "" &&
            startDate !== ""
          ) {
            const payload: any = {
              ...payloadBase,
              orderId: cart.orderId,
              $queryParameters: { ...payloadBodyBase }, //PO must be specified in the params too else API throws error
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
        await cartService.checkOut({
          ...payloadBase,
          body: { ...payloadBodyBase },
        });
      }

      let emailList: string[] = [];
      if (cart.paymentInstruction) {
        const piList: any[] = cart.paymentInstruction;
        piList.forEach((pi: any) => {
          if (pi.email1.trim() !== "") {
            emailList.push(pi.email1);
          }
        });
      }

      history.push(ROUTES.ORDER_CONFIRMATION, {
        orderId: cart.orderId,
        emailList: emailList,
      });
      dispatch(RESET_CART_ACTION());
      localStorageUtil.remove(ACCOUNT + "-" + PO_NUMBER + "-" + cart.orderId);
      //GA360
      if (mySite.enableGA) {
        AsyncCall.sendCheckoutPageViewEvent(
          {
            pageSubCategory: "Order Confirmation",
            pathname: ROUTES.ORDER_CONFIRMATION,
          },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
        AsyncCall.sendPurchaseEvent(
          { cart, orderItems },
          { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
        );
      }
    }
  }

  function back() {
    history.push(ROUTES.CHECKOUT_PAYMENT);
  }

  return (
    <OrderDetails
      order={cart}
      orderItems={orderItems}
      isRecurringOrder={isRecurringOrder}
      orderSchedule={recurringOrderFrequency}
      startDateString={recurringOrderStartDate}
      backButtonFunction={back}
      submitButtonDisableFunction={canContinue}
      submitButtonFunction={submit}
      parentComponent={componentName}
      poNumber={poNumber}
    />
  );
};

export default Review;
