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
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams, useRoutes } from "react-router-dom";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import cartService from "../../../_foundation/apis/transaction/cart.service";
//Custom libraries
import * as ROUTES from "../../../constants/routes";
import { ROUTE_CONFIG } from "../../../configs/routes";
import { RESOURCE_NAME_CART } from "../../../constants/order";
//Redux
import * as orderActions from "../../../redux/actions/order";
import { numItemsSelector, isFetchingSelector, cartSelector, orderItemsSelector } from "../../../redux/selectors/order";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { guestStatusSelector } from "../../../redux/selectors/user";
import { RESET_ACTIVE_INPROGRESS_ORDER_ACTION } from "../../../redux/actions/order";
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
  StyledBreadcrumbs,
} from "@hcl-commerce-store-sdk/react-component";
//GA360
import UADataService from "../../../_foundation/gtm/ua/uaData.service";
import GA4DataService from "../../../_foundation/gtm/ga4/ga4Data.service";
import AsyncCall from "../../../_foundation/gtm/async.service";
import { SLASH } from "../../../constants/common";

const RouteRenderer = (props) => {
  const avecProps: any[] = ROUTE_CONFIG.Checkout(props);
  return useRoutes(avecProps);
};

/**
 * Checkout component
 * displays shipping, billing, payment, review sections
 * @param props
 */
const Checkout: React.FC = (props: any) => {
  const widgetName = getDisplayName(Checkout);
  const params = useParams();
  const location: any = useLocation();
  const url = SLASH + params["*"];
  const isGuest = useSelector(guestStatusSelector);
  const contractId = useSelector(currentContractIdSelector);
  const isFetching = useSelector(isFetchingSelector);
  const numItems = useSelector(numItemsSelector);
  const cart = useSelector(cartSelector);
  const isPONumberRequired = useMemo(() => cart?.x_isPurchaseOrderNumberRequired === "true", [cart]);
  const MemRouteRenderer = useCallback(RouteRenderer, []);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mySite, storeDisplayName } = useSite();
  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const steps = ["shipping", "payment", "review"];
  const stepsRoutes = {
    shipping: ROUTES.CHECKOUT_SHIPPING,
    payment: ROUTES.CHECKOUT_PAYMENT,
    review: ROUTES.CHECKOUT_REVIEW,
  };
  const calculateStep = () => {
    if (url === ROUTES.CHECKOUT) {
      return 0;
    } else {
      const path = url.substr(ROUTES.CHECKOUT.length + 1);
      return steps.indexOf(path);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeStep = useMemo(calculateStep, [params]);

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
  const extraProps: any =
    activeStep === 0 ? shippingProps : activeStep === 1 ? paymentProps : activeStep === 2 ? reviewOrderProps : {};

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
  useEffect(() => {
    if (mySite.enableGA) {
      AsyncCall.sendCheckoutPageViewEvent(
        { pageSubCategory: steps[activeStep], pathname: location.pathname },
        { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
      );
      const step = activeStep + 1;
      switch (step) {
        case 1:
          AsyncCall.sendCheckoutEvent(
            { cart, orderItems, step, value: steps[0] },
            { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
          );
          break;
        case 2:
          AsyncCall.sendCheckoutEvent(
            { cart, orderItems, step, value: steps[1] },
            { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
          );
          break;
        case 3:
          AsyncCall.sendCheckoutEvent(
            { cart, orderItems, step, value: steps[2] },
            { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
          );
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFetching === undefined || isFetching ? (
    <StyledProgressPlaceholder className="vertical-padding-15" />
  ) : numItems < 1 ? (
    isGuest ? (
      <Navigate replace to={ROUTES.CART} />
    ) : mySite.isB2B ? (
      <Navigate replace to={ROUTES.ORDER_HISTORY} />
    ) : (
      <Navigate replace to={ROUTES.CART} />
    )
  ) : (
    <StyledContainer className="page">
      <StyledBreadcrumbs className="top-padding-6 vertical-padding-3">
        <StyledLink to={ROUTES.CART}>
          <StyledTypography variant="h4">{t("Cart.Title")}</StyledTypography>
        </StyledLink>
        <span>
          <StyledTypography variant="h4">
            {location.state?.selectedProfile ? t("Checkout.CheckoutProfileTitle") : t("Checkout.Title")}
          </StyledTypography>
        </span>
      </StyledBreadcrumbs>
      <StyledPaper className="bottom-margin-2">
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

      {(location.pathname === ROUTES.CHECKOUT && <Navigate replace to={ROUTES.CHECKOUT_SHIPPING} />) || (
        <MemRouteRenderer {...extraProps} />
      )}
    </StyledContainer>
  );
};

export default Checkout;
