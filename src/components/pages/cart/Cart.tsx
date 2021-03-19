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
import React, {
  useState,
  useEffect,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import DateFnsUtils from "@date-io/date-fns";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import assignedPromotionCode from "../../../_foundation/apis/transaction/assignedPromotionCode.service";
import { localStorageUtil } from "../../../_foundation/utils/storageUtil";
import { ACCOUNT } from "../../../_foundation/constants/common";
//Custom libraries
import { CHECKOUT } from "../../../constants/routes";
import { RECURRING_ORDER_OPTIONS } from "../../../constants/order";
import {
  INVENTORY,
  CommerceEnvironment,
  KEY_CODES,
  ORDER_ID,
  HYPHEN,
} from "../../../constants/common";
import { OrderItemTable } from "../../widgets/order-item-table";
import { OrderTotalSummary } from "../../widgets/order-total-summary";
import { OrderDiscountSummary } from "../../widgets/order-discount-summary";
//Redux
import * as orderActions from "../../../redux/actions/order";
import {
  cartSelector,
  orderItemsSelector,
  isCheckoutDisabledSelector,
  isRecurringOrderDisabledSelector,
  isFetchingSelector,
} from "../../../redux/selectors/order";
import {
  forUserIdSelector,
  loginStatusSelector,
  userIdSelector,
} from "../../../redux/selectors/user";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
//UI
import { Divider } from "@material-ui/core";
import {
  StyledGrid,
  StyledBox,
  StyledContainer,
  StyledTypography,
  StyledPaper,
  StyledButton,
  StyledTextField,
  StyledChip,
  StyledFormControlLabel,
  StyledCheckbox,
  StyledSelect,
  StyledKeyboardDatePicker,
  StyledMuiPickersUtilsProvider,
  StyledInputLabel,
  StyledProgressPlaceholder,
} from "../../StyledUI";
import {
  enUS,
  fr,
  de,
  it,
  es,
  ptBR,
  zhCN,
  zhTW,
  ja,
  ru,
  ro,
} from "date-fns/locale";
//GA360
import AsyncCall from "../../../_foundation/gtm/async.service";

/**
 * Shopping cart component
 * displays order item table, order total summary and promo code section
 * @param props
 */
const Cart: React.FC = (props: any) => {
  const widgetName = getDisplayName(Cart);

  const userId = useSelector(userIdSelector);
  const forUserId = useSelector(forUserIdSelector);
  const contractId = useSelector(currentContractIdSelector);
  const cart = useSelector(cartSelector);
  const orderItems = useSelector(orderItemsSelector);
  const isCheckoutDisabled = useSelector(isCheckoutDisabledSelector);
  const [isRecurringOrder, setIsRecurringOrder] = useState<boolean>(false);
  const [
    recurringOrderFrequency,
    setRecurringOrderFrequency,
  ] = useState<string>("0");
  const [recurringOrderStartDate, setRecurringOrderStartDate] = useState<Date>(
    () => new Date()
  );
  const isRecurringOrderDisabled = useSelector(
    isRecurringOrderDisabledSelector
  );
  const recurringOrderDetails = useMemo(
    () =>
      localStorageUtil.get(
        ACCOUNT + HYPHEN + ORDER_ID + HYPHEN + cart?.orderId
      ),
    [cart]
  );
  const isFetching = useSelector(isFetchingSelector);
  const loginStatus = useSelector(loginStatusSelector);

  const [promoCode, setPromoCode] = useState<string>("");
  const [promoCodeError, setPromoCodeError] = useState<boolean>(false);
  const [
    recurringOrderStartDateError,
    setRecurringOrderStartDateError,
  ] = useState<boolean>(false);

  const selectedPromoCodes: any[] = cart
    ? cart.promotionCode
      ? cart.promotionCode
      : []
    : [];
  const isCartLocked = (): boolean => {
    if (forUserId) {
      return false;
    } else {
      return cart
        ? cart.locked === "true" || cart.locked === true
          ? true
          : false
        : false;
    }
  };
  const frequencyOptions = RECURRING_ORDER_OPTIONS;
  const hasDiscounts = cart && cart.adjustment ? true : false;

  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { mySite, storeDisplayName } = useSite();
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const checkInventory: boolean = mySite
    ? mySite.inventorySystem === INVENTORY.NON_ATP
    : false;
  const isRecurringOrderFeatureEnabled = mySite?.isB2B && loginStatus;
  const locale: string = i18n.languages[0].split("-").join("_");
  const localeList = [enUS, fr, de, it, es, ptBR, zhCN, zhTW, ja, ru, ro];
  const localeMap = initLocaleMap();

  const payloadBase: any = {
    currency: defaultCurrencyID,
    contractId: contractId,
    checkInventory: checkInventory,
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (recurringOrderDetails && recurringOrderDetails.length === 3) {
      setIsRecurringOrder(recurringOrderDetails[0]);
      setRecurringOrderFrequency(recurringOrderDetails[1]);
      setRecurringOrderStartDate(recurringOrderDetails[2]);
    }
  }, [recurringOrderDetails]);

  useEffect(() => {
    if (mySite && contractId && defaultCurrencyID) {
      let payload = {
        ...payloadBase,
        fetchCatentries: true,
      };
      dispatch(orderActions.FETCHING_CART_ACTION({ ...payload }));
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, contractId, defaultCurrencyID]);

  //GA360
  React.useEffect(() => {
    if (mySite.enableGA) {
      AsyncCall.sendCartPageViewEvent(
        { pageTitle: storeDisplayName },
        { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
      );
      AsyncCall.sendViewCartEvent(
        { cart, orderItems },
        { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initLocaleMap() {
    let localeMap = {};
    for (let i in CommerceEnvironment.reverseLanguageMapForDateFns) {
      const dateFnCode = CommerceEnvironment.reverseLanguageMapForDateFns[i];

      for (let j = 0; j < localeList.length; j++) {
        if (localeList[j].code === dateFnCode) {
          localeMap[i] = localeList[j];
        }
      }
    }
    return localeMap;
  }

  /**
   * Reset promo code error if it was true
   */
  function resetPromoCodeError() {
    if (promoCodeError === true) {
      setPromoCodeError(false);
    }
  }

  function applyPromotionCode() {
    const code = promoCode.trim();

    if (code !== "") {
      let payload = {
        ...payloadBase,
        promoCode: code,
      };
      const body = {
        body: { ...payload },
      };

      if (payload?.widget) {
        body["widget"] = payload.widget;
      }

      assignedPromotionCode
        .applyPromotioncode(body)
        .then((res) => {
          let payload = {
            ...payloadBase,
            fetchCatentries: true,
          };
          dispatch(orderActions.FETCHING_CART_ACTION({ ...payload }));
          setPromoCodeError(false);
          setPromoCode("");
        })
        .catch((e) => {
          console.log("Could not add promo code");
          setPromoCodeError(true);
        });
    } else {
      setPromoCodeError(true);
    }
  }

  function applyPromoCodeBasedOnKey(e: KeyboardEvent<HTMLAnchorElement>) {
    if (e.keyCode === KEY_CODES.ENTER) {
      applyPromotionCode();
    }
  }

  /**
   * Update promotion code state upon input change
   */
  function onPromoCodeChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newPromoCode = event.target.value;
    setPromoCode(newPromoCode);
  }

  /**
   * Apply promo code to cart if code is not empty
   */
  function applyPromoCode(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    applyPromotionCode();
  }

  /**
   * Remove applied promo code from cart
   */
  function onPromoCodeRemove(code: string) {
    if (code !== "") {
      const parameters = {
        ...payloadBase,
        promoCode: code,
      };

      if (payloadBase?.widget) {
        parameters["widget"] = payloadBase.widget;
      }

      assignedPromotionCode
        .removePromotionCode({ ...parameters })
        .then((res) => {
          let payload = {
            ...payloadBase,
            fetchCatentries: true,
          };
          dispatch(orderActions.FETCHING_CART_ACTION({ ...payload }));
        })
        .catch((e) => {
          console.log("Could not remove promo code");
        });
    }
  }

  /**
   * Handle recurring order start date change
   */
  function onDateChange(date: Date | null) {
    date
      ? setRecurringOrderStartDate(date)
      : setRecurringOrderStartDate(new Date());
  }

  function onDateError(error) {
    if (error !== "") {
      setRecurringOrderStartDateError(true);
    } else {
      setRecurringOrderStartDateError(false);
    }
  }

  /**
   * Check if user can continue to checkout
   */
  function canContinue() {
    return (
      !isCartLocked() &&
      !isCheckoutDisabled &&
      (!isRecurringOrder ||
        (isRecurringOrder &&
          !isRecurringOrderDisabled &&
          recurringOrderFrequency !== "" &&
          recurringOrderStartDate != null &&
          !recurringOrderStartDateError))
    );
  }

  /**
   * Proceed to checkout if cart is valid
   */
  function checkout() {
    if (canContinue()) {
      if (cart && cart.orderId) {
        const recurringOrderInfo: any[] = [
          isRecurringOrder,
          recurringOrderFrequency,
          recurringOrderStartDate,
        ];
        localStorageUtil.set(
          ACCOUNT + HYPHEN + ORDER_ID + HYPHEN + cart.orderId,
          recurringOrderInfo
        );
      }
      history.push(CHECKOUT);
    }
  }

  return (
    <StyledContainer className="page">
      <StyledTypography
        tabIndex="0"
        variant="h4"
        component="h1"
        className="vertical-margin-4">
        {t("Cart.Title")}
      </StyledTypography>
      {isFetching ? (
        <StyledProgressPlaceholder className="vertical-padding-15" />
      ) : (
        <StyledGrid container spacing={2}>
          {orderItems.length > 0 && isRecurringOrderFeatureEnabled && (
            <StyledGrid item xs={12}>
              <StyledPaper>
                <StyledContainer className="vertical-margin-2">
                  <StyledGrid container spacing={2}>
                    <StyledGrid item xs={12} sm={4} md={3}>
                      <StyledFormControlLabel
                        label={t("Cart.Labels.RecurringOrder")}
                        control={
                          <StyledCheckbox
                            color="secondary"
                            name="recurringOrder"
                            checked={isRecurringOrder}
                            onChange={() =>
                              setIsRecurringOrder(!isRecurringOrder)
                            }
                            disabled={isRecurringOrderDisabled}
                          />
                        }
                      />
                    </StyledGrid>
                    {isRecurringOrder && (
                      <>
                        <StyledGrid item xs={8} sm={4} md={2} lg={2}>
                          <StyledInputLabel shrink required id="frequency">
                            {t("Cart.Labels.Frequency")}
                          </StyledInputLabel>
                          <StyledSelect
                            value={recurringOrderFrequency}
                            labelId="frequency"
                            native
                            name="frequency"
                            onChange={(event) =>
                              setRecurringOrderFrequency(event.target.value)
                            }
                            fullWidth>
                            {frequencyOptions.map(
                              (frequency: any, index: number) => (
                                <option
                                  value={frequency.value}
                                  key={frequency.value}>
                                  {t(`${frequency.translationKey}`)}
                                </option>
                              )
                            )}
                          </StyledSelect>
                        </StyledGrid>

                        <StyledGrid item xs={8} sm={4} md={2} lg={2}>
                          <StyledMuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={localeMap[locale]}>
                            <StyledKeyboardDatePicker
                              required
                              disableToolbar
                              disablePast
                              autoOk
                              variant="inline"
                              format="MM/dd/yyyy"
                              label={t("Cart.Labels.StartDate")}
                              value={recurringOrderStartDate}
                              onChange={(date: Date | null) =>
                                onDateChange(date)
                              }
                              onError={(error: string) => onDateError(error)}
                              fullWidth
                            />
                          </StyledMuiPickersUtilsProvider>
                        </StyledGrid>
                      </>
                    )}
                  </StyledGrid>
                </StyledContainer>
              </StyledPaper>
            </StyledGrid>
          )}

          <StyledGrid item xs={12}>
            {orderItems.length > 0 ? (
              <OrderItemTable data={orderItems} readOnly={false} />
            ) : (
              <StyledPaper>
                <StyledContainer className="vertical-margin-2">
                  <StyledTypography variant="body2" component="p">
                    {t("Cart.Msgs.Empty")}
                  </StyledTypography>
                </StyledContainer>
              </StyledPaper>
            )}
          </StyledGrid>

          {orderItems.length > 0 && (
            <StyledGrid container item justify="flex-end" spacing={2}>
              <StyledGrid item xs={12} sm={6} md={hasDiscounts ? 4 : 6}>
                <StyledPaper className="vertical-padding-2 horizontal-padding-2">
                  <StyledTypography variant="subtitle1" gutterBottom>
                    {t("Cart.Labels.PromoCode")}
                  </StyledTypography>
                  <StyledTextField
                    type="text"
                    size="small"
                    value={promoCode}
                    id={`cart_input_promocode`}
                    className="bottom-margin-1"
                    onFocus={() => resetPromoCodeError()}
                    onChange={(event) => onPromoCodeChange(event)}
                    onKeyDown={(keyPress) => applyPromoCodeBasedOnKey(keyPress)}
                    error={promoCodeError}
                    label={t("Cart.Msgs.PromoCode")}
                    fullWidth
                  />
                  <StyledGrid item>
                    <StyledButton
                      to="#"
                      onClick={(event) => applyPromoCode(event)}
                      id={`cart_link_2_promocode`}
                      variant="text">
                      {t("Cart.Actions.Apply")}
                    </StyledButton>
                  </StyledGrid>
                  <StyledGrid container spacing={1}>
                    {selectedPromoCodes.map((promoCode: any, index: number) => (
                      <StyledGrid item xs={12} sm={6} key={promoCode.code}>
                        <StyledChip
                          size="medium"
                          label={promoCode.code}
                          onClick={() => onPromoCodeRemove(promoCode.code)}
                          onDelete={() => onPromoCodeRemove(promoCode.code)}
                          id={`cart_link_3_${index}`}
                        />
                      </StyledGrid>
                    ))}
                  </StyledGrid>
                </StyledPaper>
              </StyledGrid>
              {hasDiscounts && (
                <StyledGrid item xs={12} sm={6} md={4}>
                  <StyledPaper className="vertical-padding-2 horizontal-padding-2">
                    <OrderDiscountSummary order={cart} />
                  </StyledPaper>
                </StyledGrid>
              )}
              <StyledGrid
                item
                xs={12}
                sm={hasDiscounts ? 12 : 6}
                md={hasDiscounts ? 4 : 6}>
                <StyledPaper className="vertical-padding-2 horizontal-padding-2">
                  <StyledTypography variant="subtitle1" gutterBottom>
                    {t("Cart.Labels.OrderSummary")}
                  </StyledTypography>
                  <OrderTotalSummary order={cart} />
                  <Divider className="vertical-margin-2" />
                  <StyledBox textAlign="center">
                    <StyledButton
                      color="primary"
                      fullWidth
                      style={{ maxWidth: "320px" }}
                      disabled={!canContinue()}
                      onClick={() => checkout()}>
                      {t("Cart.Actions.Checkout")}
                    </StyledButton>
                  </StyledBox>
                </StyledPaper>
              </StyledGrid>
            </StyledGrid>
          )}
        </StyledGrid>
      )}
    </StyledContainer>
  );
};

export default Cart;
