/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
 *
 *==================================================
 */

//Foundation
import { OrderDetails } from "../order-details";
import { useCheckoutReview } from "../../../_foundation/hooks/use-checkout-review";

const CheckoutReview: React.FC = (props: any) => {
  const {
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
  } = useCheckoutReview(props);

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
export default CheckoutReview;
