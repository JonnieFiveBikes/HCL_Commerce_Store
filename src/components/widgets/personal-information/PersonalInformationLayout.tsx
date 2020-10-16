/**
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
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { ChangePassword } from "../../widgets/change-password";
//Redux
import * as userAction from "../../../redux/actions/user";
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
//UI
import {
  StyledButton,
  StyledGrid,
  StyledPaper,
  StyledTypography,
  StyledTooltip,
} from "../../StyledUI";

function PersonalInformationLayout() {
  const addressDetails = useSelector(addressDetailsSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const AccountInformation = t("PersonalInformation.AccountInformation");
  const Edit = t("PersonalInformation.Edit");
  const Password = t("PersonalInformation.Password");
  const SignOut = t("PersonalInformation.SignOutButton");

  const { mySite } = useSite();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const logOutUser = (props: any) => {
    let payload = {
      ...payloadBase,
    };
    dispatch(userAction.LOGOUT_REQUESTED_ACTION(payload));
  };

  useEffect(() => {
    if (mySite) {
      let payload = {
        ...payloadBase,
      };
      dispatch(GET_ADDRESS_DETAIL_ACTION(payload));
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite]);

  return (
    <StyledPaper className="vertical-padding-2 horizontal-padding-2">
      <StyledGrid
        container
        justify="space-between"
        alignItems="center"
        className="bottom-padding-2">
        <StyledGrid item>
          <StyledTypography variant="subtitle1">
            {addressDetails?.firstName} {addressDetails?.lastName}
          </StyledTypography>
        </StyledGrid>
        <StyledGrid item>
          <StyledButton
            size="small"
            fullWidth
            color="primary"
            onClick={logOutUser}>
            {SignOut}
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
      <Divider />
      <StyledGrid container spacing={2} className="top-margin-1">
        <StyledGrid item xs={12} sm={6} md={4}>
          <StyledTypography variant="overline">
            {AccountInformation}
          </StyledTypography>
          <StyledTypography variant="body1" className="bottom-margin-1">
            {[
              addressDetails?.email1,
              addressDetails?.phone1,
              addressDetails?.preferredCurrency,
            ].map(
              (item: string, index: number) =>
                item && (
                  <StyledTypography variant="body1" component="div" key={index}>
                    {item}
                  </StyledTypography>
                )
            )}
          </StyledTypography>
          <StyledTooltip
            title={t("PersonalInformation.disabledMessage")}
            placement="bottom-start">
            <div>
              <StyledButton size="small" color="primary">
                {Edit}
              </StyledButton>
            </div>
          </StyledTooltip>
        </StyledGrid>
        <StyledGrid item xs={12} sm={6} md={4}>
          <StyledTypography variant="overline">{Password}</StyledTypography>
          <StyledTypography variant="body1" className="bottom-margin-1">
            ********
          </StyledTypography>
          <ChangePassword />
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
}

export { PersonalInformationLayout };
