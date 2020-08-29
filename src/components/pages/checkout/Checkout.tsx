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
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import * as ROUTES from "../../../constants/routes";
//Redux
import * as orderActions from "../../../redux/actions/order";
import {
  numItemsSelector,
  isFetchingSelector,
} from "../../../redux/selectors/order";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
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

/**
 * Checkout component
 * displays shipping, billing, payment, review sections
 * @param props
 */
const Checkout: React.FC = (props: any) => {
  const { route, location, match } = props;

  const contractId = useSelector(currentContractIdSelector);
  const isFetching = useSelector(isFetchingSelector);
  const numItems = useSelector(numItemsSelector);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mySite: any = useSite();
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
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const sampleExtraProps = {};

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

  return isFetching === undefined || isFetching ? (
    <StyledProgressPlaceholder className="vertical-padding-15" />
  ) : numItems < 1 ? (
    <Redirect to={ROUTES.CART} />
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
        renderRoutes(route.routes, sampleExtraProps)}
    </StyledContainer>
  );
};

export default Checkout;
