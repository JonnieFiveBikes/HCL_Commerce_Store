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
import { renderRoutes } from "react-router-config";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import * as ROUTES from "../../../constants/routes";
//Redux
import * as orderActions from "../../../redux/actions/order";
import {
  numItemsSelector,
  isFetchingSelector,
  cartSelector,
  orderItemsSelector,
} from "../../../redux/selectors/order";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { guestStatusSelector } from "../../../redux/selectors/user";
//UI
import {
  StyledContainer,
  StyledPaper,
  StyledTypography,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
  StyledProgressPlaceholder,
  StyledLink,
} from "../../StyledUI";
//GA360
import GADataService from "../../../_foundation/gtm/gaData.service";

/**
 * Checkout component
 * displays shipping, billing, payment, review sections
 * @param props
 */
const Checkout: React.FC = (props: any) => {
  const widgetName = getDisplayName(Checkout);

  const { route, location, match } = props;
  const isGuest = useSelector(guestStatusSelector);
  const contractId = useSelector(currentContractIdSelector);
  const isFetching = useSelector(isFetchingSelector);
  const numItems = useSelector(numItemsSelector);
  const cart = useSelector(cartSelector);
  const isPONumberRequired = useMemo(
    () => cart?.x_isPurchaseOrderNumberRequired === "true",
    [cart]
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mySite, storeDisplayName } = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const steps = ["shipping", "payment", "review"];
  const stepsRoutes = {
    shipping: ROUTES.CHECKOUT_SHIPPING,
    payment: ROUTES.CHECKOUT_PAYMENT,
    review: ROUTES.CHECKOUT_REVIEW,
  };
  const calculateStep = () => {
    if (match.path === location.pathname) {
      return 0;
    } else {
      const path = location.pathname.substr(match.path.length + 1);
      return steps.indexOf(path);
    }
  };
  const activeStep = useMemo(calculateStep, [location, match]);

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const shippingProps = {};
  const paymentProps = { isPONumberRequired };
  const reviewOrderProps = { isPONumberRequired };
  const extraProps =
    activeStep === 0
      ? shippingProps
      : activeStep === 1
      ? paymentProps
      : activeStep === 2
      ? reviewOrderProps
      : {};

  //GA360
  if (mySite.enableGA) GADataService.setPageTitle(storeDisplayName);

  useEffect(() => {
    if (mySite && contractId && defaultCurrencyID) {
      let payload = {
        ...payloadBase,
        fetchCatentries: true,
      };
      dispatch(orderActions.GET_CART_ACTION({ ...payload }));
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite, contractId, defaultCurrencyID]);

  /**GA360: checkout process and  purchase event */
  const orderItems = useSelector(orderItemsSelector);
  useEffect(() => {
    if (mySite.enableGA) {
      GADataService.sendCheckoutPageViewEvent(
        steps[activeStep],
        location.pathname
      );
      let step = activeStep + 1;
      switch (step) {
        case 1:
          GADataService.sendCheckoutEvent(orderItems, step, steps[0]);
          break;
        case 2:
          GADataService.sendCheckoutEvent(orderItems, step, steps[1]);
          break;
        case 3:
          GADataService.sendCheckoutEvent(orderItems, step, steps[2]);
          break;
      }
    }
  }, [activeStep]);

  return isFetching === undefined || isFetching ? (
    <StyledProgressPlaceholder className="vertical-padding-15" />
  ) : numItems < 1 ? (
    isGuest ? (
      <Redirect to={ROUTES.CART} />
    ) : mySite.isB2B ? (
      <Redirect to={ROUTES.ORDER_HISTORY} />
    ) : (
      <Redirect to={ROUTES.CART} />
    )
  ) : (
    <StyledContainer className="page">
      <StyledTypography variant="h3" className="vertical-margin-4">
        {t("Checkout.Title")}
      </StyledTypography>
      <StyledPaper className="bottom-margin-2">
        <StyledStepper activeStep={activeStep}>
          {steps.map((key, i) => (
            <StyledStep key={key}>
              <StyledStepLabel>
                {i < activeStep ? (
                  <StyledLink to={stepsRoutes[key]}>
                    {t(`Checkout.Labels.${key}`)}
                  </StyledLink>
                ) : (
                  t(`Checkout.Labels.${key}`)
                )}
              </StyledStepLabel>
            </StyledStep>
          ))}
        </StyledStepper>
      </StyledPaper>
      {(match.path === location.pathname && (
        <Redirect to={ROUTES.CHECKOUT_SHIPPING} />
      )) ||
        renderRoutes(route.routes, extraProps)}
    </StyledContainer>
  );
};

export default Checkout;
