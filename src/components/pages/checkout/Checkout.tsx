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
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { PAYMENT } from "../../../constants/order";
import { CART } from "../../../constants/routes";
import { ShippingBillingSection } from "./ShippingBillingSection";
import { PaymentSection } from "./PaymentSection";
import { ReviewOrderSection } from "./ReviewOrderSection";
import { ConfirmationSection } from "./ConfirmationSection";
//Redux
import * as orderActions from "../../../redux/actions/order";
import {
  numItemsSelector,
  checkoutActiveStepSelector,
} from "../../../redux/selectors/order";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledPaper,
  StyledTypography,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
} from "../../StyledUI";

const useActiveStep = () => {
  const activeStep = useSelector(checkoutActiveStepSelector);

  useEffect(() => {
    //scroll to top on step change.
    window.scrollTo(0, 0);
  }, [activeStep]);

  return activeStep;
};

/**
 * Checkout component
 * displays shipping, billing, payment, review sections
 * @param props
 */
const Checkout: React.FC = (props: any) => {
  const contractId = useSelector(currentContractIdSelector);
  const activeStep = useActiveStep();
  const numItems = useSelector(numItemsSelector);

  const [selectedShipAddressId, setSelectedShipAddressId] = useState<string>(
    ""
  );
  const [selectedBillAddressId, setSelectedBillAddressId] = useState<string>(
    ""
  );
  const [selectedPayMethod, setSelectedPayMethod] = useState<string>(
    PAYMENT.paymentMethodName.cod
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mySite: any = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const steps = [
    t("Checkout.Labels.ShippingBilling"),
    t("Checkout.Labels.PaymentDetails"),
    t("Checkout.Labels.ReviewOrder"),
  ];

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
      dispatch(orderActions.GET_CART_ACTION(payload));
    }

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite, contractId, defaultCurrencyID]);

  function handleBack() {
    dispatch(orderActions.PREV_CHECKOUTSTEP_ACTION());
  }

  function getStepContent(step: any) {
    switch (step) {
      case 0:
        const props = {
          setSelectedShipAddressId,
          setSelectedBillAddressId,
          selectedShipAddressId,
          selectedBillAddressId,
          selectedPayMethod,
        };
        return <ShippingBillingSection {...props} />;
      case 1:
        const props1 = {
          handleBack,
          selectedShipAddressId,
          selectedBillAddressId,
          selectedPayMethod,
          setSelectedPayMethod,
        };
        return <PaymentSection {...props1} />;
      case 2:
        const props2 = { handleBack };
        return <ReviewOrderSection {...props2} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return numItems < 1 && activeStep < 3 ? (
    <Redirect to={CART} />
  ) : (
    <StyledContainer className="page">
      <StyledTypography
        variant="h4"
        component="h1"
        className="vertical-margin-4">
        {t("Checkout.Title")}
      </StyledTypography>

      <StyledPaper className="bottom-margin-2">
        <StyledStepper activeStep={activeStep}>
          {steps.map((label) => (
            <StyledStep key={label}>
              <StyledStepLabel>{label}</StyledStepLabel>
            </StyledStep>
          ))}
        </StyledStepper>
      </StyledPaper>

      {activeStep === steps.length ? (
        <ConfirmationSection />
      ) : (
        getStepContent(activeStep)
      )}
    </StyledContainer>
  );
};

export default Checkout;
