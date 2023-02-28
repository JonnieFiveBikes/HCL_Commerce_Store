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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import LanguageTogglePopperContent from "./LanguageTogglePopperContent";
import { DEFAULT_LANG_ID, HYPHEN, UNDERSCORE } from "../../constants/common";

//Redux
import { CommerceEnvironment } from "../../constants/common";

//UI
import {
  StyledAccountPopper,
  StyledButton,
  StyledTypography,
  StyledHeaderActions,
} from "@hcl-commerce-store-sdk/react-component";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Hidden } from "@mui/material";

//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import { LOCALE, URL_LANG_REJECTED } from "../../_foundation/constants/common";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { useSelector, useDispatch } from "react-redux";
import { langSelector } from "../../redux/selectors/language";
import * as lsActions from "../../redux/actions/local-storage";
import { useLocation } from "react-router";

interface LanguageToggleProps {
  id: string;
  open: boolean;
  handleClick: (e?: any) => void;
  handleClose: (e?: any) => void;
}

/**
 * LanguageToggle component
 * displays the supported languages and allows for changing the language of the store
 * @param props
 */
const LanguageToggle = React.forwardRef<HTMLButtonElement | null, LanguageToggleProps>((props: any, ref: any) => {
  const { mySite } = useSite();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const { id, open, handleClick, handleClose } = props;
  const [arrowRef, setArrowRef] = useState<any>(null);

  const defaultLanguageID = mySite ? mySite.defaultLanguageID : DEFAULT_LANG_ID;
  const supportedLanguages = mySite ? mySite.supportedLanguages : [defaultLanguageID]; //obtain langid(s) of supported languages

  const localLocaleCode = localStorageUtil.get(LOCALE); //obtain locale from local storage code

  const languageId = localLocaleCode
    ? CommerceEnvironment.reverseLanguageMap[localLocaleCode.split(HYPHEN).join(UNDERSCORE)]
    : defaultLanguageID; // if locale code, set languageName to local locale language name, else default locale language name
  const defaultLanguageShortName: string = CommerceEnvironment.dxLanguageMap[languageId].toLocaleUpperCase();
  const [language, setLanguage] = useState<string>(languageId); // Initially set as default locale/language
  const [languageShortName, setLanguageShortName] = useState<string>(defaultLanguageShortName);

  const languageSelector = useSelector(langSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (languageSelector) {
      const langId = CommerceEnvironment.reverseLanguageMap[languageSelector];
      setLanguageShortName(CommerceEnvironment.dxLanguageMap[langId].toLocaleUpperCase());
    }
  }, [languageSelector]);

  // there may be some language specific data in the location-state, e.g., breadcrumbs
  //   that were put there during menu routing -- those should be cleared
  const resetOtherLanguageData = () => {
    const locState: any = location.state;
    if (locState) {
      const keys = ["breadCrumbTrailEntryView"];
      keys.forEach((k) => delete locState[k]);
    }
  };

  // Get the selected Language as a callback from LanguageTogglePopperContent
  // when user clicks a supported language option
  const onLanguageClick = (newLangId: string) => {
    const newLocale = CommerceEnvironment.languageMap[newLangId].split(UNDERSCORE).join(HYPHEN);
    if (newLocale !== i18n.languages[0]) {
      const rejected = localStorageUtil.get(URL_LANG_REJECTED) ?? {};
      const langName = CommerceEnvironment.languageMap[newLangId];

      // remove the language from set of previously rejected languages -- so that we can prompt again in future
      delete rejected[langName];
      localStorageUtil.set(URL_LANG_REJECTED, rejected);
      resetOtherLanguageData();

      setLanguage(newLangId);

      i18n.changeLanguage(newLocale);
      dispatch(lsActions.LS_LANG_CHANGE_ACTION({ newLangId }));
    }
    handleClose();
  };

  return (
    <>
      <StyledButton
        testId="header-language-button"
        ref={ref}
        className="header-actionsButton header-actionsButton-languageToggle"
        variant="text"
        color="secondary"
        onClick={handleClick}>
        <StyledHeaderActions>
          <Hidden smUp>
            <StyledTypography variant="body1" component="p">
              {languageShortName}
              <ExpandMoreIcon />
            </StyledTypography>
          </Hidden>
          <Hidden smDown>
            <StyledTypography variant="body1" component="p">
              {languageSelector
                ? t(`Language.${CommerceEnvironment.reverseLanguageMap[languageSelector]}`)
                : t(`Language.${language}`)}
              <ExpandMoreIcon />
            </StyledTypography>
          </Hidden>
        </StyledHeaderActions>
      </StyledButton>

      <StyledAccountPopper
        id={id}
        open={open}
        anchorEl={ref?.current}
        onClose={handleClose}
        placement="bottom-end"
        modifiers={[
          {
            name: "flip",
            enabled: false,
          },
          {
            name: "preventOverflow",
            enabled: false,
          },
          {
            name: "hide",
            enabled: false,
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}>
        <span className="arrow" ref={setArrowRef} />
        <LanguageTogglePopperContent
          handleClose={handleClose}
          supportedLanguages={supportedLanguages}
          onLanguageClick={onLanguageClick}
        />
      </StyledAccountPopper>
    </>
  );
});

export default LanguageToggle;
