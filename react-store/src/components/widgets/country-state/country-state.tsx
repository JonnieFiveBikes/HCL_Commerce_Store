/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */

//Standard libraries
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash-es";
import { useSelector } from "react-redux";
//UI
import { StyledGrid, StyledTextField, StyledAutocomplete } from "@hcl-commerce-store-sdk/react-component";
//Custom libraries
import { EMPTY_STRING, ACOMP } from "../../../constants/common";
//REDUX
import { countrySelector } from "../../../redux/selectors/country";

interface CountryStateProps {
  setAddressFormData?: any; //address form data setter fn
  addressFormData?: any; //address form data
  country?: string;
  setCountry?: any;
  state?: string;
  setState?: any;
  [extraProps: string]: any;
}

const clean4Regex = (s) => s?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const CountryState: React.FC<CountryStateProps> = (props: CountryStateProps) => {
  const { addressFormData, setAddressFormData, country, setCountry, state, setState, grids = [] } = props;
  const { t } = useTranslation();
  const [all, setAll] = useState<any[]>([]);
  const [allStates, setAllStates] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const countriesFromStore = useSelector(countrySelector);
  const countryGrid = grids[0] ?? { xs: 12, sm: 6 };
  const stateGrid = grids[1] ?? { xs: 12, sm: 6 };
  const handleCountryChange = debounce((e, country, reason) => {
    // update form data
    setAddressFormData ? setAddressFormData({ ...addressFormData, country }) : setCountry(country);

    // update options in auto-complete
    const clean = clean4Regex(country);
    const re = new RegExp(ACOMP.reset === reason ? `^${clean}$` : clean, "i");
    const filt = all.filter((c) => re.test(c.countryName));
    setCountries(filt);

    // if input matches a country exactly
    const reExact = new RegExp(`^${clean}$`);
    const exact = all.find((c) => reExact.test(c.countryName));
    setAllStates(exact?.states ?? []);
    setStates(exact?.states ?? []);
  }, 300);

  const handleStateChange = debounce((e, state, reason) => {
    // update form data
    setAddressFormData ? setAddressFormData({ ...addressFormData, state }) : setState(state);

    // filter states down to what was typed
    const clean = clean4Regex(state);
    const re = new RegExp(ACOMP.reset === reason ? `^${clean}$` : clean, "i");
    setStates(allStates.filter((s) => state === EMPTY_STRING || re.test(s.displayName)));
  }, 300);

  const getCountries = () => {
    const countries = countriesFromStore?.map((c) => ({ states: c.states, countryName: c.displayName }));
    if (countries) {
      setAll(countries);
      setCountries(countries);
    }
  };

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesFromStore]);

  useEffect(() => {
    if (all.length > 0) {
      handleCountryChange(null, addressFormData?.country ?? country, "init");
      handleStateChange(null, addressFormData?.state ?? state, "init");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);

  return (
    <>
      <StyledGrid item {...countryGrid}>
        <StyledAutocomplete
          freeSolo
          disableClearable
          data-testid="country-autocomplete"
          options={countries?.map((option) => option.countryName)}
          onInputChange={handleCountryChange}
          value={addressFormData?.country ?? country}
          renderInput={(params) => (
            <StyledTextField
              required
              data-testid="country-textfield"
              name="country"
              {...params}
              label={t("AddressForm.Labels.Country")}
              InputProps={{
                ...params.InputProps,
                className: "full-width",
              }}
            />
          )}
        />
      </StyledGrid>
      <StyledGrid item {...stateGrid}>
        <StyledAutocomplete
          freeSolo
          disableClearable
          data-testid="state-autocomplete"
          options={states.map((option) => option.displayName)}
          value={addressFormData?.state ?? state}
          onInputChange={handleStateChange}
          renderInput={(params) => (
            <StyledTextField
              required
              data-testid="state-textfield"
              name="state"
              {...params}
              label={t("AddressForm.Labels.State")}
              InputProps={{
                ...params.InputProps,
                className: "full-width",
              }}
            />
          )}
        />
      </StyledGrid>
    </>
  );
};

export default CountryState;
