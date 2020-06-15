/**
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
import { createReducer, AnyAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONS from "../action-types/account";
import initStates from "./initStates";
import { LOGOUT_SUCCESS_ACTION } from "../actions/user";

/**
 * Account reducer
 * handles states used by account related components
 * @param state State object managed by account reducer
 * @param action The dispatched action
 */
const accountReducer = createReducer(initStates.account, (builder) => {
  builder.addCase(ACTIONS.ORDERS_GET_SUCCESS, (state, action: AnyAction) => {
    state.orders = action.response;
  });
  builder.addCase(
    ACTIONS.ADDRESS_DETAILS_GET_SUCCESS,
    (state, action: AnyAction) => {
      const response = action.response;

      let newPerson = { ...response };
      if (response) {
        let contactMap = {};
        const contactList = response.contact;
        if (contactList) {
          contactList.forEach((address: any, index: number) => {
            if (address && address.addressId) {
              contactMap[address.addressId] = address;
            }
          });

          const { contact, ...person } = response;
          newPerson = {
            ...person,
            contactMap,
          };
        }
        state.address = newPerson;
      }
    }
  );
  builder.addCase(LOGOUT_SUCCESS_ACTION, (state, action: AnyAction) => {
    state.address = null;
    state.orders = null;
  });
});

export default accountReducer;
