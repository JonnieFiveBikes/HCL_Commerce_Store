/**
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
import React, { useCallback, useMemo } from "react";
import styled from "@mui/styled-engine-sc";
import { debounce } from "lodash-es";
import { SearchOption } from "./search-option";
import { StyledAutocomplete, StyledButton, StyledGrid, StyledNumberInput, StyledTextField } from "../../elements";

const MySI = styled(StyledNumberInput)`
  min-width: 150px;
  & input {
    background: none;
    border-color: rgba(0, 0, 0, 0.23); //material ui source border color
    font: inherit;
    &::placeholder {
      color: rgba(0, 0, 0, 0.23);
    }
  }
`;

const useSearchAndAdd = (fetchOptions: (value: string) => Promise<SearchOption[]>) => {
  const [value, setValue] = React.useState<any>(null);
  const [quantity, setQuantity] = React.useState<any>("");
  const [options, setOptions] = React.useState<SearchOption[]>([]);

  const onChange = useCallback((_event: object, v: any, _reason: string) => {
    setQuantity("");
    setValue(v);
  }, []);
  const onInputChange = useMemo(
    () =>
      debounce((_event: object, v: string, reason: string) => {
        if (reason === "input" && v) {
          setValue(null);
          fetchOptions(v).then((options) => {
            setOptions(options);
          });
        } else if (reason === "clear") {
          setOptions([]);
        } else if (reason === "reset") {
          setQuantity("");
        }
      }, 300),
    [fetchOptions]
  );
  const onQuantityChange = useCallback((v: string) => {
    setQuantity(v);
  }, []);

  const reset = useCallback(() => {
    setOptions([]);
    setQuantity("");
    setValue(null);
  }, []);

  const readyToSubmit = useMemo(() => {
    return quantity && quantity > 0 && value;
  }, [quantity, value]);

  return {
    value,
    quantity,
    onChange,
    onInputChange,
    onQuantityChange,
    options,
    readyToSubmit,
    reset,
  };
};

/**
 * @param fetchOptions: function return options
 * @param onAddClick: function that handle click on add button
 * @param optionName: the `name` property name in option object used for display purpose
 * @param optionUniqueID: the uniqueID property that identifies the option
 * @param searchPalceholder: placeholder text for search field
 * @param quantityPlaceholder: placeholder text for quantity field
 * @param addButtonLabel: label text for add button
 */
const SearchAndAdd: React.FC<any> = ({
  fetchOptions,
  onAddClick,
  optionName = "name",
  optionUniqueID = "uniqueID",
  searchPlaceholder = "Type and search",
  quantityPlaceholder = "Quantity",
  addButtonLabel = "Add",
  disabled = false,
}) => {
  const { value, quantity, onChange, onInputChange, onQuantityChange, options, readyToSubmit, reset } =
    useSearchAndAdd(fetchOptions);

  const renderInput = useCallback(
    (params: any) => {
      return (
        <StyledTextField
          {...params}
          margin="none"
          placeholder={searchPlaceholder}
          InputProps={{
            ...params.InputProps,
            className: "full-width",
          }}
        />
      );
    },
    [searchPlaceholder]
  );

  //do not filter, already filtered by service
  const filterOptions = useCallback((opts) => opts, []);

  const getOptionSelected = useCallback(
    (option, value) => option[optionUniqueID] === value[optionUniqueID],
    [optionUniqueID]
  );

  const getOptionLabel = useCallback(
    (option) => `${option[optionUniqueID]} ${option[optionName]}`,
    [optionName, optionUniqueID]
  );

  const onClick = useCallback(() => {
    onAddClick && onAddClick({ value, quantity });
    reset();
  }, [value, quantity, onAddClick, reset]);

  return (
    <StyledGrid container alignItems="center">
      <StyledGrid item className="left-margin-1 bottom-margin-1" xs={12} sm={6}>
        <StyledAutocomplete
          data-testid="search-and-add-search"
          value={value}
          freeSolo
          onInputChange={onInputChange}
          onChange={onChange}
          isOptionEqualToValue={getOptionSelected}
          getOptionLabel={getOptionLabel}
          options={options}
          filterOptions={filterOptions}
          renderInput={renderInput}
          {...{ disabled }}
        />
      </StyledGrid>
      <StyledGrid item className="left-margin-1 bottom-margin-1" xs>
        <MySI
          className="full-width"
          data-testid="search-and-add-quantity"
          placeholder={quantityPlaceholder}
          name="quantity"
          value={quantity}
          onChange={onQuantityChange}
          min={1}
          step={1}
          precision={0}
          debounceTiming={250}
          disabled={disabled || !value}
          strict
        />
      </StyledGrid>
      {onAddClick && (
        <StyledGrid item className="left-margin-1 bottom-margin-1" xs>
          <StyledButton
            disabled={disabled || !readyToSubmit}
            onClick={onClick}
            className="full-width"
            testId="search-and-add-button">
            {addButtonLabel}
          </StyledButton>
        </StyledGrid>
      )}
    </StyledGrid>
  );
};

export { SearchAndAdd };
