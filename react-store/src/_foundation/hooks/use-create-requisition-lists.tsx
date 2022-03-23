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
import React, { useState } from "react";
import Axios, { Canceler } from "axios";
import { CREATED, OK } from "http-status-codes";
//Redux
import { useDispatch, useSelector } from "react-redux";
import * as successActions from "../../redux/actions/success";
import { loginStatusSelector } from "../../redux/selectors/user";
//Custom libraries
import addressUtil from "../../utils/addressUtil";
import { PRIVATE_ORDER, SHARED_ORDER, EMPTY_STRING } from "../../constants/common";
import requisitionListService from "../apis/transaction/requisitionList.service";
import { useCustomTable, useTableUtils } from "@hcl-commerce-store-sdk/react-component";

export const useCreateRequisitionList = (): any => {
  const dispatch = useDispatch();
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    widget: "CreateRequisitionList",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const loginStatus = useSelector(loginStatusSelector);
  // List name
  const [requisitionListName, setRequisitionListName] = useState<string>(EMPTY_STRING);
  // List Type -> "private or shared"
  const [requisitionListType, setRequisitionListType] = useState<string>(PRIVATE_ORDER);
  const [dirty, setDirty] = useState(false);
  const { tableState, setTableState } = useCustomTable();
  const { setCurrentContextValue } = useTableUtils();

  /**
   * Onchange event handler for list name text field
   *
   * @param event
   */
  const handleRequisitionListName = (event) => {
    setRequisitionListName(event.target.value);
    setDirty(true);
  };

  /**
   * Onchange event handler for list type radio group
   *
   * @param event
   */
  const handleRequisitionListType = (event) => {
    setRequisitionListType(event.target.value);
    setDirty(true);
  };

  /**
   * listName validation
   *
   */
  const isValidRequisitionListName = (requisitionListName: string): boolean => {
    return requisitionListName.trim().length > 0 && addressUtil.validateNickName(requisitionListName);
  };

  /**
   * Onclick event handler for Create list button
   *
   */
  const createRequisitionList = (pageSize: number) => {
    const payload: any = {
      action: EMPTY_STRING,
      query: {
        name: requisitionListName,
      },
      ...payloadBase,
    };

    if (requisitionListType === SHARED_ORDER) {
      payload["query"] = {
        status: "Z",
        ...payload.query,
      };
    } else {
      payload["query"] = {
        status: "Y",
        ...payload.query,
      };
    }
    requisitionListService
      .performActionOnRequisitionList(payload)
      .then((res) => {
        if (res.status === CREATED) {
          const msg = {
            key: "success-message.CREATE_REQUISITIONLIST_SUCCESS",
            messageParameters: { "0": requisitionListName },
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
          setRequisitionListName(EMPTY_STRING);
          setDirty(false);
          const getUsableRLPayload: any = {
            q: "usable",
            orderBy: "D-lastUpdate",
            pageNumber: 1,
            pageSize,
            ...payloadBase,
          };
          requisitionListService
            .getRequisitionList(getUsableRLPayload)
            .then((res) => {
              if (res.status === OK) {
                const resultList = res?.data?.resultList;
                const count = res?.data?.recordSetTotal;
                setCurrentContextValue("recordState", { resultList, count, create: true }, tableState, setTableState);
              }
            })
            .catch((e) => {
              console.log("get requisition list throw exceptions ", e);
            });
        }
      })
      .catch((e) => {
        console.log("Could not create a requisition list", e);
      });
  };

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loginStatus,
    requisitionListName,
    requisitionListType,
    dirty,
    handleRequisitionListName,
    handleRequisitionListType,
    createRequisitionList,
    isValidRequisitionListName,
  };
};
