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
import { useHistory, useParams } from "react-router";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { useSite } from "../../../../_foundation/hooks/useSite";
import NotFound from "../../../commerce-layouts/not-found";
import { FETCH_ORDER_DETAILS_ACTION } from "../../../../redux/actions/orderDetails";
import * as errorActions from "../../../../redux/actions/error";
import { cartSelector } from "../../../../redux/selectors/order";

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

import { Divider } from "@material-ui/core";
import * as ROUTES from "../../../../constants/routes";

import {
  forUserIdSelector,
  userIdSelector,
} from "../../../../redux/selectors/user";
import { CHECKOUT } from "../../../../constants/routes";

const InprogressOrderDetailsPage = (props: any) => {
  const widget = getDisplayName(InprogressOrderDetailsPage);
  const dispatch = useDispatch();
  const { orderId } = useParams<any>();

  const { mySite } = useSite();
  const { t, i18n } = useTranslation();
  const currency: string = mySite?.defaultCurrencyID ?? "";
  const details = useSelector((s: any) => s.orderDetails[String(orderId)]);
  const items = details?.detailedOrderItems;
  const cart = useSelector(cartSelector);
  const opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const lang = i18n.languages[0];
  const dFmt = new Intl.DateTimeFormat(lang, opts);
  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const history = useHistory();
  const payloadBase = {
    widget,
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const isDisableAddProductsButton = useMemo(() => {
    if (cart?.orderId !== orderId.toString()) {
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

  useEffect(
    () => () => cancels.forEach((cancel) => cancel()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isDisableAddProductsButton && cart?.orderId && orderId) {
      let parameters: any = {
        errorMessage: t("InprogressOrders.NotActiveOrderMessage"),
      };
      dispatch(errorActions.VALIDATION_ERROR_ACTION(parameters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, cart]);

  const handleCheckoutClick = () => {
    history.push(CHECKOUT);
  };

  const loading = orderId && details === undefined;
  const notFound = !orderId || (details && details.error);
  return (
    <StyledContainer cid="inprogress-order-details-page">
      <StyledGrid container spacing={2} style={{ display: "flex" }}>
        <StyledGrid item xs={12} md={6}>
          <StyledBreadcrumbs className="vertical-padding-2">
            <StyledLink to={ROUTES.INPROGRESS_ORDERS}>
              <StyledTypography variant="h4">
                {t("InprogressItems.inprogressOrders")}
              </StyledTypography>
            </StyledLink>
            <StyledTypography
              style={{ overflowWrap: "break-word" }}
              variant="h4">
              {details && (details.orderDescription || details.orderId)}
            </StyledTypography>
          </StyledBreadcrumbs>
        </StyledGrid>
        <StyledGrid
          container
          item
          direction="row"
          xs={12}
          md={6}
          alignItems="center">
          <StyledGrid
            item
            xs={6}
            md={3}
            className="top-margin-1 bottom-margin-1">
            <StyledTypography variant="body1" style={{ fontWeight: "bold" }}>
              {t("InprogressItems.createdBy")}
            </StyledTypography>
            <StyledTypography variant="body1">
              {details && `${details.x_firstName} ${details.x_lastName}`}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid
            item
            xs={6}
            md={3}
            className="top-margin-1 bottom-margin-1">
            <StyledTypography variant="body1" style={{ fontWeight: "bold" }}>
              {t("InprogressItems.lastUpdated")}
            </StyledTypography>
            <StyledTypography variant="body1">
              {dFmt.format(new Date(details ? details.lastUpdateDate : 0))}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid
            item
            xs={6}
            md={3}
            className="top-margin-1 bottom-margin-1">
            <StyledTypography variant="body1" style={{ fontWeight: "bold" }}>
              {t("InprogressItems.totalPrice")}
            </StyledTypography>
            <StyledTypography variant="body1">
              <PriceDisplay
                min={details?.grandTotal}
                currency={details?.grandTotalCurrency}
                language={i18n.languages[0]}
                message={t("PriceDisplay.Labels.Pending")}
              />
            </StyledTypography>
          </StyledGrid>
          <StyledGrid
            item
            xs={6}
            md={3}
            className="top-margin-1 bottom-margin-1">
            <StyledTypography variant="body1" style={{ fontWeight: "bold" }}>
              {t("InprogressItems.visibility")}
            </StyledTypography>
            <StyledTypography variant="body1">
              {t(
                `InprogressItems.orderType_${details?.orderTypeCode ?? "ORD"}`
              )}
            </StyledTypography>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>

      <Divider style={{ width: "100%" }} className="bottom-margin-3" />
      <StyledGrid
        container
        spacing={2}
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <StyledGrid item style={{ display: "flex", alignItems: "center" }}>
          <StyledButton
            data-testid="proceed-to-checkout"
            color="primary"
            disabled={
              !isOrderItemsPresent ||
              isDisableAddProductsButton ||
              cart?.buyerId !== userId
            }
            onClick={handleCheckoutClick}
            className="button">
            {t("InprogressItems.proceed")}
          </StyledButton>
          <StyledButton
            data-testid="add-products"
            color="secondary"
            disabled={isDisableAddProductsButton}
            onClick={() => {
              history.push(ROUTES.HOME);
            }}
            style={{ marginLeft: "0.5rem" }}
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
            <InProgressItemsTable
              order={details ?? []}
              orderItems={items ?? []}
            />
          </StyledGrid>
        </StyledGrid>
      )}
    </StyledContainer>
  );
};

export default InprogressOrderDetailsPage;
