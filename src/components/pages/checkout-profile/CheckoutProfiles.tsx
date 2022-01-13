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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Axios, { Canceler } from "axios";
import { Trans, useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
//Foundation libraries
import { CHECKOUT_PROFILE_CREATE, SIGNIN } from "../../../constants/routes";
//Redux
import { loginStatusSelector } from "../../../redux/selectors/user";
//UI
import {
  StyledGrid,
  StyledTypography,
  StyledContainer,
  StyledAccordion,
  StyledAccordionSummary,
  StyledIconLabel,
  StyledAccordionDetails,
  StyledTextField,
  StyledButton,
  StyledPaper,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import Add from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
//Custom libraries
import AccountSidebar from "../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../widgets/title/TitleLayout";
import { CheckoutProfileEach } from "./CheckoutProfileEach";
import { checkoutProfileSelector } from "../../../redux/selectors/checkout-profile";
import getDisplayName from "react-display-name";
import { CPROF_FETCH_ALL_ACTION } from "../../../redux/actions/checkout-profile";
import { debounce, get } from "lodash-es";
import storeUtil from "../../../utils/storeUtil";
import {
  FETCH_ALLOWABLE_PAYMETHODS_ACTION,
  FETCH_ALLOWABLE_SHIPMODES_ACTION,
} from "../../../redux/actions/order";
import { EMPTY_STRING } from "../../../constants/common";

const CheckoutProfiles: React.FC = (props: any) => {
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const widget = getDisplayName(CheckoutProfiles);
  const payloadBase: any = {
    widget,
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const { t } = useTranslation();
  const loginStatus = useSelector(loginStatusSelector);
  const fromState = useSelector(checkoutProfileSelector);
  const dispatch = useDispatch();
  const [checkoutProfileList, setCheckoutProfileList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);

  //to transform the checkout profile details from json object to profileList array
  const getCheckoutProfileDetails = useMemo(
    () => (response) => {
      const p = response.curUserProfiles
        .filter((p) => p.xchkout_ProfileId && p.xchkout_ProfileName)
        .map((p) => {
          const rc = {
            ...p,
            billingData: storeUtil.toMap(get(p, "protocolData", []), "name"),
          };
          return rc;
        });
      return p;
    },
    []
  );

  // cleanup
  useEffect(
    () => {
      dispatch(CPROF_FETCH_ALL_ACTION({ ...payloadBase }));
      dispatch(FETCH_ALLOWABLE_SHIPMODES_ACTION({ ...payloadBase }));
      dispatch(FETCH_ALLOWABLE_PAYMETHODS_ACTION({ ...payloadBase }));
      return () => cancels.forEach((cancel) => cancel());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      const rc = getCheckoutProfileDetails(fromState);
      setCheckoutProfileList(rc);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fromState]
  );

  const history = useHistory();
  const filterer = useMemo(
    () => (e) => {
      const term = get(e, "target.value", "");
      setSearchTerm(term);
      let r = fromState;
      if (term) {
        const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        const f = fromState.curUserProfiles.filter((p) =>
          p.xchkout_ProfileName.match(re)
        );
        r = { curUserProfiles: f };
      }
      const rc = getCheckoutProfileDetails(r);
      setCheckoutProfileList(rc);
    },
    [
      getCheckoutProfileDetails,
      setCheckoutProfileList,
      fromState,
      setSearchTerm,
    ]
  );
  const debFilterer = useMemo(() => debounce(filterer, 500), [filterer]);

  const createNewProfile = () => history.push(CHECKOUT_PROFILE_CREATE);

  if (!loginStatus) {
    return <Redirect to={SIGNIN} />;
  } else {
    return (
      <StyledContainer cid="checkout-profiles" spacing={2}>
        <TitleLayout
          title={t("CheckoutProfile.TitleCreate")}
          cid="checkout-profiles-title"
        />
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={3} className="sidebar">
            <AccountSidebar />
          </StyledGrid>
          <StyledGrid
            container
            item
            xs={12}
            md={9}
            spacing={2}
            className="horizontal-padding-2"
            direction="column"
            wrap="nowrap">
            <StyledGrid container className="vertical-margin-1">
              <StyledAccordion style={{ flex: "1" }}>
                <StyledAccordionSummary
                  className="horizontal-padding-2 vertical-padding-2 cprof-cr8-acrdn"
                  expandIcon={<ExpandMoreIcon />}>
                  <StyledIconLabel
                    icon={<Add color="primary" className="full-center" />}
                    label={t("CheckoutProfile.CreateMessage")}
                  />
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <StyledGrid
                    item
                    container
                    spacing={2}
                    direction="row"
                    alignItems="flex-end">
                    <StyledGrid item xs={12} sm={6} md={5}>
                      <StyledTextField
                        fullWidth
                        type="text"
                        label={
                          <StyledTypography
                            variant="body1"
                            style={{ fontWeight: "bold" }}>
                            {t("CheckoutProfile.Name")}
                          </StyledTypography>
                        }
                        onChange={debFilterer}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon onClick={() => null} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </StyledGrid>
                    <StyledGrid item xs={12} sm={3} md={3}>
                      <StyledButton
                        fullWidth
                        color="primary"
                        onClick={createNewProfile}>
                        {t("CheckoutProfile.CreateNewButton")}
                      </StyledButton>
                    </StyledGrid>
                  </StyledGrid>
                </StyledAccordionDetails>
              </StyledAccordion>
            </StyledGrid>
            {checkoutProfileList.length === 0 ? (
              <StyledPaper
                variant="outlined"
                className="vertical-margin-1 vertical-padding-4 horizontal-padding-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                {searchTerm ? (
                  <Trans
                    i18nKey="CheckoutProfile.NoneFound"
                    t={t}
                    components={[
                      <StyledTypography variant="h4" />,
                      <StyledTypography />,
                      <StyledTypography>
                        <StyledLink to={CHECKOUT_PROFILE_CREATE} />
                      </StyledTypography>,
                    ]}
                  />
                ) : (
                  <StyledTypography>
                    <Trans
                      i18nKey="CheckoutProfile.NoProfiles"
                      t={t}
                      components={[<StyledLink to={CHECKOUT_PROFILE_CREATE} />]}
                    />
                  </StyledTypography>
                )}
              </StyledPaper>
            ) : (
              checkoutProfileList
                .reverse()
                .map((profile: any, key: number) => (
                  <CheckoutProfileEach {...{ key, profile }} />
                ))
            )}
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default CheckoutProfiles;
