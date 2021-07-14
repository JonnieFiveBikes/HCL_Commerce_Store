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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Hidden } from "@material-ui/core";

//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
import { LOCALE } from "../../_foundation/constants/common";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";

interface LanguageToggleProps {
  id: string;
  open: boolean;
  handleClick: Function;
  handleClose: Function;
}

/**
 * LanguageToggle component
 * displays the supported languages and allows for changing the language of the store
 * @param props
 */
const LanguageToggle = React.forwardRef<
  HTMLButtonElement | null,
  LanguageToggleProps
>((props: any, ref: any) => {
  const { mySite } = useSite();
  const { i18n, t } = useTranslation();

  const { id, open, handleClick, handleClose } = props;
  const [arrowRef, setArrowRef] = useState<any>(null);

  const defaultLanguageID = mySite ? mySite.defaultLanguageID : DEFAULT_LANG_ID;
  const supportedLanguages = mySite
    ? mySite.supportedLanguages
    : [defaultLanguageID]; //obtain langid(s) of supported languages

  const localLocaleCode = localStorageUtil.get(LOCALE); //obtain locale from local storage code

  const languageId = localLocaleCode
    ? CommerceEnvironment.reverseLanguageMap[
        localLocaleCode.split(HYPHEN).join(UNDERSCORE)
      ]
    : defaultLanguageID; // if locale code, set languageName to local locale language name, else default locale language name
  const defaultLanguageShortName: string = CommerceEnvironment.dxLanguageMap[
    languageId
  ].toLocaleUpperCase();
  const [language, setLanguage] = useState<string>(languageId); // Initially set as default locale/language
  const [languageShortName, setLanguageShortName] = useState<string>(
    defaultLanguageShortName
  );

  // Get the selected Language as a callback from LanguageTogglePopperContent
  // when user clicks a supported language option
  const onLanguageClick = (language: string) => {
    setLanguage(language);
    setLanguageShortName(
      CommerceEnvironment.dxLanguageMap[language].toLocaleUpperCase()
    );
    settingLocale(language);
    handleClose();
  };

  // This function sets the locale (language) of the store
  const settingLocale = (selectedLanguageId: string) => {
    const newLocale = CommerceEnvironment.languageMap[selectedLanguageId] //AA: get the newLocale by using langId and doing key/value pair
      .split(UNDERSCORE)
      .join(HYPHEN);
    if (newLocale !== i18n.languages[0]) {
      i18n.changeLanguage(newLocale);
      // set locale to local storage - so if we reload page, it will stay as this language and not change
      localStorageUtil.set(
        LOCALE,
        CommerceEnvironment.languageMap[selectedLanguageId],
        30 // means set for 30 days
      );
    }
  };
  return (
    <>
      <StyledButton
        data-testid="header-language-button"
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
          <Hidden xsDown>
            <StyledTypography variant="body1" component="p">
              {t(`Language.${language}`)}
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
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: false,
            boundariesElement: "scrollParent",
          },
          hide: {
            enabled: true,
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}>
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
