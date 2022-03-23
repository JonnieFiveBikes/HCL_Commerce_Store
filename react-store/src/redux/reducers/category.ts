/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import { createReducer, AnyAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
//Redux
import initStates from "./initStates";
import { CategoryReducerState } from "./reducerStateInterface";
import { UPDATE_CATEGORIES_STATE_ACTION } from "../actions/category";

/**
 * Category reducer
 */
const categoryReducer = createReducer(initStates.categories, (builder) => {
  builder.addCase(UPDATE_CATEGORIES_STATE_ACTION, (state: CategoryReducerState | any, action: AnyAction) => {
    const categories = cloneDeep(action.payload);
    const topCategoriesList: any[] = [];
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        topCategoriesList.push(categories[i]);
        if (category.children) {
          categories.push(...category.children);
        }
      }
    }
    state.categories = topCategoriesList;
  });
});

export default categoryReducer;
