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
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import cartService from "../../../_foundation/apis/transaction/cart.service";
//Custom libraries
import * as ROUTES from "../../../constants/routes";
import { RESOURCE_NAME_CART } from "../../../constants/order";
//Redux
import * as orderActions from "../../../redux/actions/order";
import {
  numItemsSelector,
  isFetchingSelector,
  cartSelector,
  orderItemsSelector,
  orderMethodIsPickupSelector,
} from "../../../redux/selectors/order";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { RESET_ACTIVE_INPROGRESS_ORDER_ACTION } from "../../../redux/actions/order";
import { entitledOrgSelector, activeOrgSelector } from "../../../redux/selectors/organization";
import { sellersSelector } from "../../../redux/selectors/sellers";
//UI
import {
  StyledContainer,
  StyledPaper,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
  StyledProgressPlaceholder,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
//GA360
import UADataService from "../../../_foundation/gtm/ua/uaData.service";
import GA4DataService from "../../../_foundation/gtm/ga4/ga4Data.service";
import AsyncCall from "../../../_foundation/gtm/async.service";
import OrderMethod from "../../widgets/order-method/order-method";
import { CheckoutStepperGuard } from "./stepper-guard";

/**
 * Checkout component
 * displays shipping, billing, payment, review sections
 * @param props
 */
const Checkout: React.FC = () => {
  const widgetName = getDisplayName(Checkout);
  const location: any = useLocation();
  const { pathname } = location;
  const contractId = useSelector(currentContractIdSelector);
  const isFetching = useSelector(isFetchingSelector);
  const numItems = useSelector(numItemsSelector);
  const cart = useSelector(cartSelector);
  const isPONumberRequired = useMemo(() => cart?.x_isPurchaseOrderNumberRequired === "true", [cart]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mySite, storeDisplayName } = useSite();
  const controller = useMemo(() => new AbortController(), []);
  const orderMethodIsPickup = useSelector(orderMethodIsPickupSelector);
  const [visited, setVisited] = useState(-1);
  const stepsRoutes = {
    shipping: ROUTES.CHECKOUT_SHIPPING,
    payment: ROUTES.CHECKOUT_PAYMENT,
    review: ROUTES.CHECKOUT_REVIEW,
    pickup: ROUTES.CHECKOUT_PICKUP,
    "pickup-store": ROUTES.CHECKOUT_PICKUP_STORE,
  };
  const steps = useMemo(() => {
    return orderMethodIsPickup ? ROUTES.PICKUP_STEPS : ROUTES.DELIVERY_STEPS;
  }, [orderMethodIsPickup]);

  const isCheckoutWithProfile = useMemo(() => {
    return location?.state?.selectedProfile ? true : false;
  }, [location?.state?.selectedProfile]);

  const activeStep = useMemo(() => {
    if (pathname === ROUTES.CHECKOUT) {
      return 0;
    } else {
      const path = pathname.substr(ROUTES.CHECKOUT.length + 1);
      return steps.indexOf(path);
    }
  }, [steps, pathname]);

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    widget: widgetName,
    signal: controller.signal,
  };

  const extraProps: any = useMemo(() => {
    return { isPONumberRequired };
  }, [isPONumberRequired]);

  //GA360
  if (mySite.enableGA) {
    if (mySite.enableUA) {
      UADataService.setPageTitle(storeDisplayName);
    }
    if (mySite.enableGA4) {
      GA4DataService.setPageTitle(storeDisplayName);
    }
  }

  useEffect(() => {
    if (mySite && contractId && defaultCurrencyID) {
      if (cart && cart.resourceName !== RESOURCE_NAME_CART) {
        const cartPayload: any = {
          orderId: cart?.orderId,
          body: {
            orderId: cart?.orderId,
          },
          ...payloadBase,
        };
        // no matter whehter setPendingorder success or not we are working on current cart.
        dispatch(RESET_ACTIVE_INPROGRESS_ORDER_ACTION());
        cartService
          .setPendingOrder(cartPayload)
          .catch((e) => {
            console.log("Could not set pending order ", e);
          })
          .finally(() => {
            const payload = {
              ...payloadBase,
              fetchCatentries: true,
            };
            dispatch(orderActions.FETCHING_CART_ACTION({ ...payload }));
          });
      } else {
        const payload = {
          ...payloadBase,
          fetchCatentries: true,
        };
        dispatch(orderActions.GET_CART_ACTION({ ...payload }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, contractId, defaultCurrencyID]);

  //GA360: checkout process and  purchase event
  const orderItems = useSelector(orderItemsSelector);
  const entitledOrgs = useSelector(entitledOrgSelector);
  const activeOrgId = useSelector(activeOrgSelector);
  const sellers = useSelector(sellersSelector);
  useEffect(() => {
    if (mySite.enableGA) {
      const storeName = mySite.storeName;
      AsyncCall.sendCheckoutPageViewEvent(
        { pageSubCategory: steps[activeStep], pathname: location.pathname },
        { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
      );
      const step = activeStep + 1;
      switch (step) {
        case 1:
          AsyncCall.sendCheckoutEvent(
            { cart, orderItems, step, value: steps[0], entitledOrgs, activeOrgId, sellers, storeName },
            { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
          );
          break;
        case 2:
          AsyncCall.sendCheckoutEvent(
            { cart, orderItems, step, value: steps[1], entitledOrgs, activeOrgId, sellers, storeName },
            { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
          );
          break;
        case 3:
          AsyncCall.sendCheckoutEvent(
            { cart, orderItems, step, value: steps[2], entitledOrgs, activeOrgId, sellers, storeName },
            { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
          );
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFetching === undefined || isFetching ? (
    <StyledProgressPlaceholder className="vertical-padding-15" />
  ) : numItems < 1 ? (
    <Navigate replace to={ROUTES.CART} />
  ) : (
    <StyledContainer className="page">
      {activeStep <= 0 ? <OrderMethod /> : null}
      <StyledPaper className="top-margin-2 bottom-margin-2">
        <StyledStepper activeStep={activeStep}>
          {steps.map((key, i) => (
            <StyledStep key={key}>
              <StyledStepLabel>
                {i < activeStep ? (
                  <StyledLink to={stepsRoutes[key]}>{t(`Checkout.Labels.${key}`)}</StyledLink>
                ) : (
                  t(`Checkout.Labels.${key}`)
                )}
              </StyledStepLabel>
            </StyledStep>
          ))}
        </StyledStepper>
      </StyledPaper>
      {location.pathname === ROUTES.CHECKOUT ? (
        <Navigate replace to={orderMethodIsPickup ? ROUTES.CHECKOUT_PICKUP_STORE : ROUTES.CHECKOUT_SHIPPING} />
      ) : (
        <>
          <CheckoutStepperGuard {...{ activeStep, steps, setVisited, visited, isCheckoutWithProfile }} />
          <Outlet context={{ extraProps }} />
        </>
      )}
    </StyledContainer>
  );
};

export default Checkout;
