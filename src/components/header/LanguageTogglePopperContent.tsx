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
import React from "react";
import { useTranslation } from "react-i18next";

//UI
import { ClickAwayListener } from "@material-ui/core";
import {
  StyledPaper,
  StyledListItemText,
  StyledButton,
  StyledGrid,
} from "@hcl-commerce-store-sdk/react-component";

interface LanguageTogglePopperContentProps {
  handleClose: Function;
  supportedLanguages: string[];
  onLanguageClick: Function;
}

/**
 * LanguageTogglePopperContent component
 * displays language toggle popper contents
 * @param props
 */
const LanguageTogglePopperContent: React.FC<LanguageTogglePopperContentProps> = (
  props: any
) => {
  const { handleClose, supportedLanguages, onLanguageClick } = props;
  const { t } = useTranslation();

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <StyledPaper className="vertical-padding-1 horizontal-padding-2">
        {supportedLanguages.map((lid) => {
          return (
            <StyledGrid key={lid} container spacing={1}>
              <StyledGrid item>
                <StyledButton
                  variant="text"
                  onClick={() => onLanguageClick(lid)}>
                  <StyledListItemText style={{ whiteSpace: "nowrap" }}>
                    {t(`Language.${lid}`)}
                  </StyledListItemText>
                </StyledButton>
              </StyledGrid>
            </StyledGrid>
          );
        })}
      </StyledPaper>
    </ClickAwayListener>
  );
};

export default LanguageTogglePopperContent;
