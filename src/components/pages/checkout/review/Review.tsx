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
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useHistory } from "react-router";
//Foundation libraries
import { useSite } from "../../../../_foundation/hooks/useSite";
import cartService from "../../../../_foundation/apis/transaction/cart.service";
import subscriptionService from "../../../../_foundation/apis/transaction/subscription.service";
//Custom libraries
import { RECURRING_ORDER_OPTIONS } from "../../../../constants/order";
import { OrderDetails } from "../../../widgets/order-details";
import * as ROUTES from "../../../../constants/routes";
//Redux
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import {
  cartSelector,
  orderItemsSelector,
  isCheckoutDisabledSelector,
  isRecurringOrderSelector,
  recurringOrderFrequencySelector,
  recurringOrderStartDateSelector,
  isRecurringOrderDisabledSelector,
} from "../../../../redux/selectors/order";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../../redux/actions/account";
import { RESET_CART_ACTION } from "../../../../redux/actions/order";
//UI
import { StyledGrid } from "../../../StyledUI";

/**
 * Review Order section
 * displays order item table, order total summary, shipping and billing info
 * @param props
 */
const Review: React.FC = (props: any) => {
  const contractId = useSelector(currentContractIdSelector);
  const cart = useSelector(cartSelector);
  const orderItems = useSelector(orderItemsSelector);
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  const isRecurringOrder = useSelector(isRecurringOrderSelector);
  const recurringOrderFrequency = useSelector(recurringOrderFrequencySelector);
  const recurringOrderStartDate = useSelector(recurringOrderStartDateSelector);
  const isRecurringOrderDisabled = useSelector(
    isRecurringOrderDisabledSelector
  );

  const dispatch = useDispatch();
  const history = useHistory();
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
      //Refresh address list to get any new shipping/billing addresses created
      dispatch(GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
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
      if (isRecurringOrder) {
        if (recurringOrderStartDate != null) {
          let fulfillmentInterval = "";
          let fulfillmentIntervalUOM = "";
          const startDate = recurringOrderStartDate.toISOString();

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
              body: {
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
        await cartService.checkOut({ ...payloadBase });
      }

      const piList: any[] = cart.paymentInstruction;
      let emailList: string[] = [];

      piList.forEach((pi: any) => {
        if (pi.email1.trim() !== "") {
          emailList.push(pi.email1);
        }
      });

      history.push(ROUTES.ORDER_CONFIRMATION, {
        orderId: cart.orderId,
        emailList: emailList,
      });
      dispatch(RESET_CART_ACTION());
    }
  }

  function back() {
    history.push(ROUTES.CHECKOUT_PAYMENT);
  }

  return (
    <>
      <StyledGrid item xs={12}>
        <OrderDetails
          order={cart}
          orderItems={orderItems}
          isRecurringOrder={isRecurringOrder}
          orderSchedule={recurringOrderFrequency}
          startDateString={
            recurringOrderStartDate
              ? recurringOrderStartDate?.toISOString()
              : ""
          }
          backButtonFunction={back}
          submitButtonDisableFunction={canContinue}
          submitButtonFunction={submit}
        />
      </StyledGrid>
    </>
  );
};

export default Review;
