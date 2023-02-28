/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { useSite } from "../../../../_foundation/hooks/useSite";
import NotFound from "../../../commerce-layouts/not-found";
import { FETCH_ORDER_DETAILS_ACTION } from "../../../../redux/actions/orderDetails";
import * as errorActions from "../../../../redux/actions/error";
import { activeInprogressOrderSelector, cartSelector } from "../../../../redux/selectors/order";

import {
  StyledContainer,
  StyledGrid,
  StyledCircularProgress,
  StyledLink,
  StyledTypography,
  PriceDisplay,
  StyledBreadcrumbs,
  StyledButton,
} from "@hcl-commerce-store-sdk/react-component";
import { InProgressItemsTable } from "../../../widgets/in-progress-items-table";

import { useTranslation } from "react-i18next";

import { Divider } from "@mui/material";
import * as ROUTES from "../../../../constants/routes";

import { forUserIdSelector, userIdSelector } from "../../../../redux/selectors/user";
import { CHECKOUT } from "../../../../constants/routes";
import { SET_ACTIVE_INPROGRESS_ORDER_ACTION } from "../../../../redux/actions/order";

const InprogressOrderDetailsPage = (props: any) => {
  const widget = getDisplayName(InprogressOrderDetailsPage);
  const dispatch = useDispatch();
  const { orderId = "" } = useParams<any>();
  const { mySite } = useSite();
  const { t, i18n } = useTranslation();
  const currency: string = mySite?.defaultCurrencyID ?? "";
  const details = useSelector((s: any) => s.orderDetails[orderId]);
  const items = details?.detailedOrderItems;
  const cart = useSelector(cartSelector);
  const opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const lang = i18n.languages[0];
  const dFmt = new Intl.DateTimeFormat(lang, opts);
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const navigate = useNavigate();
  const payloadBase = {
    widget,
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const isDisableAddProductsButton = useMemo(() => {
    if (cart?.orderId !== orderId) {
      return true;
    } else {
      return false;
    }
  }, [cart, orderId]);

  const isOrderItemsPresent = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [items]);
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const ipOrder = useSelector(activeInprogressOrderSelector);

  useEffect(() => {
    if (orderId && currency) {
      dispatch(
        FETCH_ORDER_DETAILS_ACTION({
          orderId,
          currency,
          skipErrorSnackbar: true,
          ...payloadBase,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, mySite, currency]);

  useEffect(() => () => cancels.forEach((c) => c()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isDisableAddProductsButton && cart?.orderId && orderId) {
      const parameters: any = {
        errorMessage: t("InprogressOrders.NotActiveOrderMessage"),
      };
      dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
    } else if (!ipOrder && cart?.orderId === orderId) {
      // on first load, check to see if current-order is this order and inprogress-order-redux isn't
      //   active, activate it
      dispatch(SET_ACTIVE_INPROGRESS_ORDER_ACTION({ order: { orderId } }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, cart]);

  const handleCheckoutClick = () => {
    navigate(CHECKOUT);
  };

  const loading = orderId && details === undefined;
  const notFound = !orderId || details?.error;
  return (
    <StyledContainer cid="inprogress-order-details-page">
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={6}>
          <StyledBreadcrumbs className="vertical-padding-2">
            <StyledLink to={ROUTES.INPROGRESS_ORDERS}>
              <StyledTypography variant="h4">{t("InprogressItems.inprogressOrders")}</StyledTypography>
            </StyledLink>
            <StyledTypography style={{ overflowWrap: "break-word" }} variant="h4">
              {details?.orderDescription || details?.orderId}
            </StyledTypography>
          </StyledBreadcrumbs>
        </StyledGrid>
        <StyledGrid container item direction="row" xs={12} md={6} alignItems="center">
          <StyledGrid item xs={12} sm={6} md={3} className="top-margin-1 bottom-margin-1">
            <StyledTypography style={{ fontWeight: "bold" }}>{t("InprogressItems.createdBy")}</StyledTypography>
            <StyledTypography>
              {`${details?.x_firstName ?? "\u00A0"} ${details?.x_lastName ?? "\u00A0"}`}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12} sm={6} md={3} className="top-margin-1 bottom-margin-1">
            <StyledTypography style={{ fontWeight: "bold" }}>{t("InprogressItems.lastUpdated")}</StyledTypography>
            <StyledTypography>{dFmt.format(new Date(details?.lastUpdateDate ?? 0))}</StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12} sm={6} md={3} className="top-margin-1 bottom-margin-1">
            <StyledTypography style={{ fontWeight: "bold" }}>{t("InprogressItems.totalPrice")}</StyledTypography>
            <StyledTypography>
              <PriceDisplay
                min={details?.grandTotal}
                currency={details?.grandTotalCurrency}
                language={i18n.languages[0]}
                message={t("PriceDisplay.Labels.Pending")}
              />
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12} sm={6} md={3} className="top-margin-1 bottom-margin-1">
            <StyledTypography style={{ fontWeight: "bold" }}>{t("InprogressItems.visibility")}</StyledTypography>
            <StyledTypography>{t(`InprogressItems.orderType_${details?.orderTypeCode ?? "ORD"}`)}</StyledTypography>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>

      <Divider className="full-width bottom-margin-2" />
      <StyledGrid container spacing={2} className="bottom-margin-1">
        <StyledGrid item>
          <StyledButton
            testId="inprogress-items-proceed-to-checkout"
            color="primary"
            disabled={!isOrderItemsPresent || isDisableAddProductsButton || cart?.buyerId !== userId}
            onClick={handleCheckoutClick}
            className="button">
            {t("InprogressItems.proceed")}
          </StyledButton>
        </StyledGrid>

        <StyledGrid item>
          <StyledButton
            testId="inprogress-items-add-products"
            color="secondary"
            disabled={isDisableAddProductsButton}
            onClick={() => {
              navigate(ROUTES.HOME);
            }}
            className="button">
            {t("InprogressItems.addProds")}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
      {loading ? (
        <StyledCircularProgress />
      ) : notFound ? (
        <NotFound />
      ) : (
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12}>
            <InProgressItemsTable order={details ?? []} orderItems={items ?? []} />
          </StyledGrid>
        </StyledGrid>
      )}
    </StyledContainer>
  );
};

export default InprogressOrderDetailsPage;
