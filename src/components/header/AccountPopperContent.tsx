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
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//Custom libraries
import * as ROUTES from "../../constants/routes";
//Redux
import {
  entitledOrgSelector,
  activeOrgSelector,
} from "../../redux/selectors/organization";
import {
  currentContractIdSelector,
  contractSelector,
} from "../../redux/selectors/contract";

//UI
import {
  StyledTypography,
  StyledSelect,
  StyledList,
  StyledListItem,
  StyledListItemText,
  StyledListItemIcon,
  StyledButton,
  StyledFormControl,
  StyledInputLabel,
  StyledProgressPlaceholder,
} from "../StyledUI";
import { Divider } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import { forUserIdSelector } from "../../redux/selectors/user";

const StyledB2BOrgSection = styled.div`
  ${({ theme }) => `
    background: ${theme.palette.background.default};
    padding: ${theme.spacing(2)}px;
  `}
`;

function AccountPopperContent(props: any): JSX.Element {
  const {
    isB2B,
    userName,
    handleClose,
    handleOrgChange,
    handleContractChange,
    handleLogout,
  } = props;
  const { t } = useTranslation();
  const [activeOrg, setActiveOrg] = useState<any>(null);
  const [activeContract, setActiveContract] = useState<any>(null);

  const entitledOrgs = useSelector(entitledOrgSelector);
  const activeOrgId = useSelector(activeOrgSelector);
  const currentContractId = useSelector(currentContractIdSelector);
  const eligibleContracts = useSelector(contractSelector);
  const forUserId = useSelector(forUserIdSelector);

  const [edit, setEdit] = useState<boolean>(false);

  const handleEditClicked = () => {
    setEdit(true);
  };

  const onOrgChange = (event) => {
    setActiveContract(null);
    setEdit(false);
    handleOrgChange(event);
  };

  const onContractChange = (event) => {
    setActiveContract(null);
    setEdit(false);
    handleContractChange(event);
  };

  useEffect(() => {
    if (entitledOrgs && activeOrgId) {
      let org = entitledOrgs.filter((o) => o.organizationId === activeOrgId)[0];
      if (org) {
        setActiveOrg(org);
      }
    }
    if (eligibleContracts && currentContractId) {
      const c = eligibleContracts[currentContractId];
      if (c) {
        setActiveContract(c);
      } else {
        setActiveContract(null);
      }
    }
  }, [entitledOrgs, activeOrgId, currentContractId, eligibleContracts]);

  const B2BOrgContractReadOnly = () => {
    return (
      <>
        <StyledTypography variant="body2" id="header-account-org">
          {t("Header.AccountPopper.Organization")}
        </StyledTypography>
        <StyledTypography
          id="header-account-activeOrg"
          aria-describedby="header-account-org"
          gutterBottom>
          {activeOrg.displayName}
        </StyledTypography>
        <StyledTypography variant="body2" id="header-account-contract">
          {t("Header.AccountPopper.Contract")}
        </StyledTypography>
        <StyledTypography
          id="header-account-activeContract"
          aria-describedby="header-account-contract"
          gutterBottom>
          {activeContract}
        </StyledTypography>
        <StyledButton
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleEditClicked}>
          {t("Header.AccountPopper.Edit")}
        </StyledButton>
      </>
    );
  };

  const B2BOrgContractForm = () => {
    return (
      <form
        name="headerOrgSwitchForm"
        id={`header-org-contract-form`}
        noValidate>
        {activeOrg && (
          <StyledFormControl variant="outlined">
            <StyledInputLabel
              disableAnimation={true}
              htmlFor="header-account-org">
              {t("Header.AccountPopper.Organization")}
            </StyledInputLabel>
            <StyledSelect
              native
              fullWidth
              value={activeOrg.organizationId}
              onChange={(event) => onOrgChange(event)}
              id="header-account-org">
              {entitledOrgs.map((o) => {
                return (
                  <option key={o.organizationId} value={o.organizationId}>
                    {o.displayName}
                  </option>
                );
              })}
            </StyledSelect>
          </StyledFormControl>
        )}
        {eligibleContracts && (
          <StyledFormControl variant="outlined">
            <StyledInputLabel
              disableAnimation={true}
              htmlFor="header-account-contract">
              {t("Header.AccountPopper.Contract")}
            </StyledInputLabel>
            <StyledSelect
              native
              fullWidth
              value={currentContractId}
              onChange={(event) => onContractChange(event)}
              id="header-account-contract">
              {Object.entries(eligibleContracts).map((v) => {
                const [k, c] = v;
                return (
                  <option key={k} value={k}>
                    {c}
                  </option>
                );
              })}
            </StyledSelect>
          </StyledFormControl>
        )}
      </form>
    );
  };

  const OrgAndContract = () => {
    return (
      <StyledB2BOrgSection>
        {activeContract ? (
          edit ? (
            <B2BOrgContractForm />
          ) : (
            <B2BOrgContractReadOnly />
          )
        ) : (
          <StyledProgressPlaceholder />
        )}
      </StyledB2BOrgSection>
    );
  };

  const WelcomeSection = () => {
    return (
      <StyledListItem>
        <StyledListItemText
          primary={
            <>
              <StyledTypography variant="body2">
                {t("Header.AccountPopper.Welcome", { ...userName })}
              </StyledTypography>
            </>
          }></StyledListItemText>
      </StyledListItem>
    );
  };

  const AccountSetting = () => {
    return (
      <Link
        to={isB2B ? ROUTES.DASHBOARD : ROUTES.ACCOUNT}
        id="head-popper-myaccount_link"
        onClick={handleClose}>
        <StyledListItem>
          <StyledListItemIcon>
            <AccountCircleIcon />
          </StyledListItemIcon>
          <StyledListItemText
            primary={
              <>
                {isB2B
                  ? t("Dashboard.Title")
                  : t("Header.AccountPopper.AccountSetting")}
              </>
            }></StyledListItemText>
        </StyledListItem>
      </Link>
    );
  };

  const LogoutSection = () => {
    return (
      <a href="#" onClick={(event) => handleLogout(event)}>
        <StyledListItem>
          <StyledListItemIcon>
            <ExitToAppIcon />
          </StyledListItemIcon>
          <StyledListItemText
            primary={
              <>{t("Header.AccountPopper.SignOut")}</>
            }></StyledListItemText>
        </StyledListItem>
      </a>
    );
  };

  return (
    <>
      <StyledList disablePadding>
        <WelcomeSection />
        {isB2B && activeOrg && (
          <>
            <OrgAndContract />
          </>
        )}
        <Divider component="li" />
        <AccountSetting />
        {!forUserId && (
          <>
            <Divider component="li" />
            <LogoutSection />
          </>
        )}
      </StyledList>
    </>
  );
}

AccountPopperContent.propTypes = {
  isB2B: PropTypes.bool.isRequired,
  userName: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOrgChange: PropTypes.func.isRequired,
  handleContractChange: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default AccountPopperContent;
