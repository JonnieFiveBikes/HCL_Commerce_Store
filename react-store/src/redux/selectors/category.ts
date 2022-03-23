/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

//Redux
import { RootReducerState } from "../reducers";

const GetCategoriesSelector = (state: RootReducerState) => state.categories.categories;

export { GetCategoriesSelector };
