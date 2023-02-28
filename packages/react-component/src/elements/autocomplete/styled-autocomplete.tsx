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
import styled from "@mui/styled-engine-sc";
import Autocomplete from "@mui/material/Autocomplete";
import { dimensions } from "../../themes/variables";

export const StyledAutocomplete = styled(Autocomplete)`
  .MuiInputBase-root {
    height: ${dimensions.inputFields.height}px;
  }
`;
