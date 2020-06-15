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
//Custom libraries
import { REG_EX } from "../constants/common";

const storeUtil = {
  isNumeric: (input: string) => {
    const NUMERIC = REG_EX.NUMERIC;
    return NUMERIC.test(input);
  },
};

export default storeUtil;
