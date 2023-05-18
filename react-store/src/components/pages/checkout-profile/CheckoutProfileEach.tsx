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
//Standard libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import * as ROUTES from "../../../constants/routes";

//UI
import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledButton,
  StyledGrid,
  StyledTypography,
  StyledTooltip,
  StyledIconButton,
  StyledIcon,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import EditOutlined from "@mui/icons-material/EditOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import getDisplayName from "react-display-name";
import { useDispatch, useSelector } from "react-redux";
import { CPROF_DELETE_ACTION } from "../../../redux/actions/checkout-profile";
import { ConfirmationOverlay } from "../../StyledUI";
import { CheckoutProfileType } from "../../../_foundation/hooks/use-checkout-profile";
import { allowableShipModesSelector } from "../../../redux/selectors/order";
import storeUtil from "../../../utils/storeUtil";
import { PAYMENT } from "../../../constants/order";

interface CheckoutProfileEachProps {
  profile: CheckoutProfileType;
}

const Address = (props) => {
  const { address: a } = props;
  const lines = [
    { v: ["firstName", "lastName"], j: " " },
    { v: "addressLine", m: true },
    { v: ["city", "state", "zipCode"], j: ", " },
    { v: "country" },
    { v: "phone1" },
    { v: "email1" },
  ].map((o) => {
    if (a) {
      o.v = Array.isArray(o.v) ? o.v.map((l) => a[l]) : a[o.v];
    }
    return o;
  });

  return a ? (
    <>
      {lines.map((o, i) => {
        if (o.m && Array.isArray(o.v)) {
          return o.v.map((l, j) => <StyledTypography key={`${i}_${j}`}>{l}</StyledTypography>);
        } else {
          const disp = Array.isArray(o.v) ? o.v.filter(Boolean).join(o.j) : o.v;
          return disp ? <StyledTypography key={i}>{disp}</StyledTypography> : null;
        }
      })}
    </>
  ) : null;
};

export const CheckoutProfileEach: React.FC<CheckoutProfileEachProps> = ({ profile: p }) => {
  const { t } = useTranslation();
  const widget = getDisplayName(CheckoutProfileEach);
  const payloadBase: any = {
    widget,
  };
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const EditCheckoutProfile = () => navigate(ROUTES.CHECKOUT_PROFILE_EDIT, { state: { profile: p } });
  const modesFromState = useSelector(allowableShipModesSelector);
  const [modes, setModes] = useState<any>({});

  useEffect(() => {
    const asMap = storeUtil.toMap(modesFromState, "shipModeId");
    setModes(asMap);
  }, [modesFromState]);

  const DeleteCheckoutProfile = (cprof) => {
    setConfirmState(false);
    dispatch(
      CPROF_DELETE_ACTION({
        profileId: cprof.xchkout_ProfileId,
        nickName: cprof.xchkout_ProfileName,
        ...payloadBase,
      })
    );
  };

  return (
    <StyledGrid container>
      <StyledAccordion testId={`checkout-profile-${p.xchkout_ProfileName}`} style={{ flex: "1" }}>
        <StyledAccordionSummary className="horizontal-padding-2 vertical-padding-2">
          <StyledGrid container direction="column">
            <StyledGrid item>
              <StyledTypography variant="h6" className="expanded-menu-bold">
                {p.xchkout_ProfileName}
                {!p.isValid ? (
                  <StyledTooltip title={t("CheckoutProfile.invalidProfile")}>
                    <StyledIconButton size="small">
                      <StyledIcon icon={<ErrorOutlinedIcon />} />
                    </StyledIconButton>
                  </StyledTooltip>
                ) : null}
              </StyledTypography>
            </StyledGrid>

            <StyledGrid container item spacing={2} alignItems="flex-start" style={{ flexWrap: "wrap" }}>
              <StyledGrid item xs={6} sm={6} md={3}>
                <StyledTypography variant="overline">{t("CheckoutProfile.ShippingAddr")}</StyledTypography>
                <Address {...{ address: p.shippingAddress }} />
              </StyledGrid>

              <StyledGrid item xs={6} sm={6} md={3}>
                <StyledTypography variant="overline">{t("CheckoutProfile.ShippingMethodDisp")}</StyledTypography>
                <StyledTypography>
                  {modes[p.shipping_modeId as string]?.shipModeDescription || <span>&nbsp;</span>}
                </StyledTypography>
              </StyledGrid>

              <StyledGrid item xs={6} sm={6} md={3}>
                <StyledTypography variant="overline">{t("CheckoutProfile.BillingAddr")}</StyledTypography>
                <Address {...{ address: p.billingAddress }} />
              </StyledGrid>

              <StyledGrid item xs={6} sm={6} md={3}>
                <StyledTypography variant="overline">{t("CheckoutProfile.BillingMethod")}</StyledTypography>
                <StyledTypography>
                  {t(`CheckoutProfile.payMethods.${p.billingData.payment_method.value}`)}
                </StyledTypography>

                {PAYMENT.ccMethods[p.billingData.payment_method.value] ? (
                  <StyledTypography>{p.billingData.account.value}</StyledTypography>
                ) : null}
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <StyledGrid container>
            <StyledGrid spacing={3} container item>
              <Divider
                style={{
                  width: "calc(100% + 0.5rem)",
                  marginLeft: "-0.25rem",
                }}
                className="top-margin-3"
              />
              <StyledGrid item>
                <StyledButton
                  testId={`checkout-profile-${p.xchkout_ProfileName}-edit`}
                  color="primary"
                  onClick={EditCheckoutProfile}
                  variant="text"
                  startIcon={<EditOutlined />}
                  className="button">
                  {t("CheckoutProfile.Edit")}
                </StyledButton>
              </StyledGrid>
              <StyledGrid item>
                <StyledButton
                  testId={`checkout-profile-${p.xchkout_ProfileName}-delete`}
                  color="primary"
                  onClick={setConfirmState.bind(null, true)}
                  variant="text"
                  startIcon={<Delete />}
                  className="button">
                  {t("CheckoutProfile.Delete")}
                </StyledButton>
              </StyledGrid>
              <ConfirmationOverlay
                {...{
                  show: confirmState,
                  confirm: DeleteCheckoutProfile.bind(null, p),
                  cancel: setConfirmState.bind(null, false),
                  confirmLabel: "CheckoutProfile.confirmDelete",
                  cancelLabel: "CheckoutProfile.Cancel",
                }}
              />
            </StyledGrid>
          </StyledGrid>
        </StyledAccordionDetails>
      </StyledAccordion>
    </StyledGrid>
  );
};
