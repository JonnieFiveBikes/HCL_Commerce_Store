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
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { RECURRING_ORDER_OPTIONS } from "../../../constants/order";
import { OrderDetails } from "../../widgets/order-details";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import {
  cartSelector,
  orderItemsSelector,
  isCheckoutDisabledSelector,
  isRecurringOrderSelector,
  recurringOrderFrequencySelector,
  recurringOrderStartDateSelector,
  isRecurringOrderDisabledSelector,
} from "../../../redux/selectors/order";
import {
  GET_CART_ACTION,
  PLACE_ORDER_ACTION,
  PLACE_RECURRINGORDER_ACTION,
} from "../../../redux/actions/order";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
//UI
import { StyledGrid } from "../../StyledUI";

interface ReviewOrderSectionProps {
  handleBack: Function; //handle back fn to move back in checkout flow
}

/**
 * Review Order section
 * displays order item table, order total summary, shipping and billing info
 * @param props
 */
const ReviewOrderSection: React.FC<ReviewOrderSectionProps> = (props: any) => {
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

  const handleBack = props.handleBack;

  const dispatch = useDispatch();
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
    if (mySite && contractId && defaultCurrencyID) {
      let payload = {
        ...payloadBase,
        fetchCatentries: true,
      };
      dispatch(GET_CART_ACTION(payload));

      //Refresh address list to get any new shipping/billing addresses created
      dispatch(GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite, contractId, defaultCurrencyID]);

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

  function submit() {
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
            let payload = {
              ...payloadBase,
              orderId: cart.orderId,
              fulfillmentInterval: fulfillmentInterval,
              fulfillmentIntervalUOM: fulfillmentIntervalUOM,
              startDate: startDate,
            };
            dispatch(PLACE_RECURRINGORDER_ACTION(payload));
          }
        }
      } else {
        let payload = {
          ...payloadBase,
        };
        dispatch(PLACE_ORDER_ACTION(payload));
      }
    }
  }

  function back() {
    handleBack();
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
            recurringOrderStartDate ? recurringOrderStartDate.toISOString() : ""
          }
          backButtonFunction={back}
          submitButtonDisableFunction={canContinue}
          submitButtonFunction={submit}
        />
      </StyledGrid>
    </>
  );
};

export { ReviewOrderSection };
