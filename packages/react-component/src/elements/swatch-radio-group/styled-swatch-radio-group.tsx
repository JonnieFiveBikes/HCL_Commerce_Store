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
import PropTypes from "prop-types";
import styled from "styled-components";
import { StyledSwatch } from "../card";
import { StyledRadio, StyledRadioGroup } from "../radio";
import { StyledFormControl, StyledFormControlLabel } from "../form";
import { get, isEqual } from "lodash-es";

function RadioGroupWrapper({
  id,
  name,
  onChangeHandler,
  values,
  useSwatches,
  className,
  productDetailsAny,
  skusAsAttrs,
  isB2B,
  currentSelection,
  ...props
}: any) {
  let defaultSelected = "";
  let currentSelectedAttributes: any;
  let attributeChangeMap: Map<any, any>;
  let otherAttrs;

  if (isB2B) {
    attributeChangeMap = props.attributeState ?? new Map();
    defaultSelected = attributeChangeMap.get(id) ?? productDetailsAny;
  } else {
    currentSelectedAttributes = get(currentSelection, "selectedAttributes", {});
    defaultSelected = currentSelectedAttributes[id] ?? "";
    if (defaultSelected) {
      defaultSelected = Array.isArray(defaultSelected)
        ? currentSelectedAttributes[id][0]
        : currentSelectedAttributes[id];
    }

    // from current selection's attributes, discard the current name/value pair
    otherAttrs = Object.keys(currentSelectedAttributes)
      .filter((k) => k !== id)
      .reduce((m, v) => {
        m[v] = currentSelectedAttributes[v];
        return m;
      }, {});
  }
  const [value, setValue] = React.useState(defaultSelected);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    onChangeHandler(id, event.target.value);
  };

  const handleClick = (optionValue: string) => {
    setValue(optionValue);
    onChangeHandler(id, optionValue);
  };

  return (
    <StyledFormControl component="fieldset" className={useSwatches ? `${className} swatch-group` : className}>
      <StyledRadioGroup aria-label={name} name={name} value={value} onChange={handleChange}>
        {isB2B && (
          <StyledFormControlLabel value={productDetailsAny} control={<StyledRadio />} label={productDetailsAny} />
        )}
        {values?.map((v) => {
          // for B2C scenarios, if this attribute's value isn't in current selection, check to see
          //   if there exists such a SKU -- if it doesn't we will disable this attribute value, e.g.,
          //
          //   currentSku = { Color: "blue", Size: "48x48x48" }
          //   currentAttr = { Size: "52x52x52" };
          //
          // merge with `otherAttrs`, i.e., { Color: "blue" } --> { Color: "blue", Size: "52x52x52" }
          //   then look in skusAsAttrs array to see if such a sku exists
          //
          // if it exists, keep this attr-value enabled, otherwise disable it because no such SKU exists
          const findSku =
            !isB2B &&
            !useSwatches &&
            !Array.isArray(currentSelectedAttributes[id]) &&
            v.identifier !== currentSelectedAttributes[id];
          const skuToFind = findSku ? { ...otherAttrs, [id]: v.identifier } : null;
          const skuExists = findSku ? skusAsAttrs.find((sku) => isEqual(sku, skuToFind)) : null;

          return useSwatches ? (
            <StyledSwatch
              style={{
                backgroundImage: `url("${v.image1path}")`,
              }}
              onClick={() => handleClick(v.identifier)}
              selected={defaultSelected === v.identifier}
              size="medium"
              key={v.identifier}
              data-testid={`radio-group-wrapper-${v.identifier.toLowerCase()}-swatch`}
            />
          ) : (
            <StyledFormControlLabel
              key={v.identifier}
              value={v.identifier}
              control={<StyledRadio />}
              checked={defaultSelected === v.identifier}
              label={v.value}
              disabled={findSku && !skuExists}
            />
          );
        })}
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

const StyledSwatchRadioGroup = styled(({ ...props }) => <RadioGroupWrapper {...props} />)`
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

export { StyledSwatchRadioGroup };
