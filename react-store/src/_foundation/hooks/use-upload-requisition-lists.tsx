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
import { useRef, useEffect, useState } from "react";
import Axios, { Canceler } from "axios";
import { useNavigate } from "react-router";
import { CREATED } from "http-status-codes";
//Custom libraries
import {
  UPLOAD,
  URL,
  UPLOADED_FILE,
  FILE_REQUEST_HEADERS,
  EMPTY_STRING,
  CSV_FILE_EXTENSION,
} from "../../constants/common";
import addressUtil from "../../utils/addressUtil";
//Foundation libraries
import requisitionListService from "../apis/transaction/requisitionList.service";
import { VIEW_UPLOAD_LOGS } from "../../constants/routes";

export const useUploadReqisitionList = (): any => {
  const uploadFileRef = useRef(null);
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    widget: "UploadRequisitionList",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const navigate = useNavigate();
  const [requisitionListName, setRequisitionListName] = useState<string>(EMPTY_STRING);
  const [file, setFile] = useState<any>();

  const handleRequisitionListName = (event) => {
    setRequisitionListName(event.target.value);
  };

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileSelect = (e) => {
    const file: File = e.target.files[0];
    setFile(file);
  };

  const canCreateList = () => {
    if (file && addressUtil.validateNickName(requisitionListName)) {
      return true;
    }
    return false;
  };

  /**
   * Onclick event handler for Upload list button
   */
  const uploadList = () => {
    if (canCreateList()) {
      const formData = new FormData();
      // binary objects must be placed list
      formData.append(URL, "/requisition-list");
      const fileName = requisitionListName.trim().length > 0 ? requisitionListName + CSV_FILE_EXTENSION : file.name;
      formData.append(UPLOADED_FILE, file, fileName);
      const payload: any = {
        action: UPLOAD,
        body: formData,
        headers: FILE_REQUEST_HEADERS,
        payloadBase,
      };
      requisitionListService
        .performActionOnRequisitionList(payload)
        .then((res) => {
          if (res.status === CREATED) {
            navigate(VIEW_UPLOAD_LOGS);
          }
        })
        .catch((e) => console.log("Requisition list CSV file upload operation failed", e));
    }
  };
  return {
    uploadList,
    uploadFileRef,
    requisitionListName,
    handleRequisitionListName,
    file,
    onFileSelect,
    canCreateList,
  };
};
