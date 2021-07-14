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
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  StyledSwatch,
  StyledRadio,
  StyledRadioGroup,
  StyledFormControl,
  StyledFormControlLabel,
} from "@hcl-commerce-store-sdk/react-component";

function RadioGroupWrapper({
  id,
  name,
  onChangeHandler,
  values,
  useSwatches,
  className,
  ...props
}: any) {
  const { t } = useTranslation();
  let defaultSelected: string = "";
  let currentSelectedAttributes: any;
  let attributeChangeMap: Map<any, any>;
  if (props.isB2B) {
    attributeChangeMap = props.attributeState
      ? props.attributeState
      : new Map();
    defaultSelected = attributeChangeMap.get(id)
      ? attributeChangeMap.get(id)
      : t("productDetail.any");
  } else {
    currentSelectedAttributes = props.currentSelection?.selectedAttributes
      ? props.currentSelection.selectedAttributes
      : {};
    defaultSelected = currentSelectedAttributes[id]
      ? currentSelectedAttributes[id]
      : "";
  }
  const [value, setValue] = React.useState(defaultSelected);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChangeHandler(id, event.target.value);
  };

  const handleClick = (optionValue) => {
    setValue(optionValue);
    onChangeHandler(id, optionValue);
  };

  return (
    <StyledFormControl
      component="fieldset"
      className={useSwatches ? `${className} swatch-group` : className}>
      <StyledRadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={handleChange}>
        {props.isB2B && (
          <StyledFormControlLabel
            value={t("productDetail.any")}
            control={<StyledRadio />}
            label={t("productDetail.any")}
          />
        )}
        {values.map((v: any, index: number) =>
          useSwatches ? (
            <StyledSwatch
              style={{
                backgroundImage: `url("${v.image1path}")`,
              }}
              onClick={() => handleClick(v.identifier)}
              selected={currentSelectedAttributes[id] === v.identifier}
              size="medium"
              key={v.identifier}
            />
          ) : (
            <StyledFormControlLabel
              key={v.identifier}
              value={v.identifier}
              control={<StyledRadio />}
              label={v.value}
            />
          )
        )}
      </StyledRadioGroup>
    </StyledFormControl>
  );
}

RadioGroupWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.any.isRequired,
  values: PropTypes.any.isRequired,
  useSwatches: PropTypes.bool,
};

const StyledSwatchRadioGroup = styled(({ ...props }) => (
  <RadioGroupWrapper {...props} />
))`
  ${({ theme }) => `
    &.swatch-group .MuiFormGroup-root {
      flex-direction: row;
    }

    .MuiButtonBase-root {
      padding-top: ${theme.spacing(0.5)}px;
      padding-button: ${theme.spacing(0.5)}px;
    }
  `}
`;

export default StyledSwatchRadioGroup;
