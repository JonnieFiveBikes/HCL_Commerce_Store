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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import { OK, CREATED } from "http-status-codes";
import { get, isNil } from "lodash-es";
//Redux
import * as orderActions from "../../redux/actions/order";
import * as successActions from "../../redux/actions/success";
import { CONFIRMATION_COMMS_ACTION, OPEN_CONFIRMATION_ACTION } from "../../redux/actions/confirmation";
import { ConfirmationReducerState } from "../../redux/reducers";
import * as errorActions from "../../redux/actions/error";
import { currentContractIdSelector } from "../../redux/selectors/contract";
//const
import { REQUISITION_LIST_DETAILS, VIEW_UPLOAD_LOGS } from "../../constants/routes";
import { EMPTY_STRING, PAGINATION } from "../../constants/common";
import { CONSTANTS } from "../../constants/requisition-list";
//UI liberary
import {
  TableColumnDef,
  StyledIconButton,
  StyledTextField,
  StyledLink,
  useCustomTable,
  useTableUtils,
  StyledButton,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ContentCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { AddShoppingCart } from "@material-ui/icons";
//Custom library
import addressUtil from "../../utils/addressUtil";
import requisitionListService from "../apis/transaction/requisitionList.service";
import { useNavigate } from "react-router";
import { useSite } from "./useSite";
import orderService from "../apis/transaction/order.service";
import { forUserIdSelector, userIdSelector } from "../../redux/selectors/user";

export const useRequisitionList = (): any => {
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const payloadBase: any = {
    widget: "Requisition List Table",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const { t, i18n } = useTranslation();
  const sizes: any = PAGINATION.sizes;
  const pageSize = sizes[0].size;
  const [rows, setRows] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    offset: 0,
    pageSize,
    data: [],
    count: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tableState, setTableState } = useCustomTable();
  const { getCurrentContext, setCurrentContextValue } = useTableUtils();
  const { mySite } = useSite();
  const currency: string = mySite?.defaultCurrencyID ?? "";
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const contract = useSelector(currentContractIdSelector);

  const processTableData = useCallback(
    (resultSet) => {
      if (Array.isArray(resultSet)) {
        const opts: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const fmt = new Intl.DateTimeFormat(i18n.languages[0], opts);
        const resultList = resultSet.map((e) => ({
          orderId: e.orderId,
          listDescription: e.description,
          lastUpdated: fmt.format(new Date(e.lastUpdate)),
          type: t(`${CONSTANTS.RequisitionLists}${e.status}`),
          orderInfo: e,
          language: i18n.languages[0],
          createdBy: Object.values(e.userRegistration).join(" "),
        }));
        setRows(resultList);
      }
    },
    [t, i18n]
  );

  /**
   *   fetch all usable requisition lists for the current user
   */
  const fetchAllRequisitionList = useCallback(
    (param: any, page: number) => {
      const { pageSize } = param;
      const getUsableRLPayload: any = {
        q: "usable",
        orderBy: "D-lastUpdate",
        ...param,
      };
      requisitionListService
        .getRequisitionList(getUsableRLPayload)
        .then((res) => {
          if (res.status === OK) {
            processTableData(res?.data?.resultList);
            setPagination({
              ...pagination,
              offset: page === 0 ? 0 : page * pageSize,
              count: res?.data?.recordSetTotal,
            });
          }
        })
        .catch((e) => {
          setRows([]);
          console.log("getPage throw exceptions ", e);
        });
    },
    [pagination, processTableData]
  );

  const columns = useMemo(() => {
    const ActionsCell = ({ rowData, ...props }) => {
      const CancelToken = Axios.CancelToken;
      const cancels: Canceler[] = [];
      const payloadBase: any = {
        widget: "Requisition List Table",
        cancelToken: new CancelToken((c) => cancels.push(c)),
      };
      const pageSize = props.fullTable.length;
      const disabled = userId !== rowData.orderInfo?.memberId;

      /**
       * Onclick event handler for Delete List
       */
      const deleteList = (rowData) => {
        const confirmState: ConfirmationReducerState = {
          key: "RequisitionLists.DeleteDialogHeading",
          messageParameters: {},
          title: "RequisitionLists.DeleteDialogTitle",
          okAction: () => confirmDelete(rowData),
        };
        dispatch(OPEN_CONFIRMATION_ACTION(confirmState));
      };

      /**
       * Delete Dialog confirm event
       */
      const confirmDelete = (rowData) => {
        const listName = rowData.listDescription;
        const { cancelToken, ...others } = payloadBase;
        const payload = { requisitionListId: rowData.orderId, ...others };
        requisitionListService
          .deleteRequisitionById(payload)
          .then((res) => {
            if (res.status === OK) {
              const msg = {
                key: "success-message.DELETE_REQUISITIONLIST_SUCCESS",
                messageParameters: { "0": listName ?? rowData.orderId },
              };
              dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
              const param = {
                pageNumber: 1,
                pageSize,
                ...others,
              };
              fetchAllRequisitionList(param, 0);
            }
          })
          .catch((e) => {
            console.log("Could not delete list", e);
          });
      };

      const CopyListInputNameDialog = () => {
        const dispatch = useDispatch();
        const { t } = useTranslation();
        const [local, setLocal] = useState<string>(EMPTY_STRING);

        return (
          <StyledTextField
            required
            label={t("RequisitionListItems.nameForCopiedList")}
            name="copiedListName"
            autoFocus
            fullWidth
            value={local}
            onChange={(e) => {
              const n = e.target.value;
              if (addressUtil.validateNickName(n)) {
                setLocal(n);
                dispatch(
                  CONFIRMATION_COMMS_ACTION({
                    newName: n,
                    okDisabled: !n.trim(),
                  })
                );
              }
            }}
            inputProps={{ maxLength: 254 }}
          />
        );
      };

      /**
       * Onclick event handler for Copy list
       */
      const copyList = (rowData) => {
        // disable OK button at start
        dispatch(CONFIRMATION_COMMS_ACTION({ okDisabled: true }));

        const confirmState: ConfirmationReducerState = {
          key: "RequisitionLists.CopyMessage",
          template: <CopyListInputNameDialog />,
          title: "RequisitionLists.CopyTitle",
          okAction: (data) => confirmCopy(rowData, data),
        };
        dispatch(OPEN_CONFIRMATION_ACTION(confirmState));
      };

      /**
       * Copy Dialog confirm event
       */
      const confirmCopy = (rowData, data) => {
        const body: any = {
          action: "copy",
          query: {
            orderId: rowData.orderId,
            name: data.newName,
            status: userId === rowData.orderInfo.memberId ? rowData.orderInfo.status : "Y",
          },
        };
        const { cancelToken, ...others } = payloadBase;
        const payload = { ...others, ...body };
        requisitionListService
          .performActionOnRequisitionList(payload)
          .then((res) => {
            if (res.status === CREATED) {
              const msg = {
                key: "success-message.CREATE_REQUISITIONLIST_SUCCESS",
                messageParameters: { "0": data.newName },
              };
              dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
              const newRL = res.data?.requisitionListId;
              if (newRL) {
                navigate(`${REQUISITION_LIST_DETAILS}/${newRL}`);
              } else {
                console.log("copied requisition-list is null");
              }
            }
          })
          .catch((e) => {
            console.log("Could not copy list", e);
          });
      };

      const handleCopyCart = (rowData) => {
        const param = {
          orderId: rowData.orderId,
          currency,
          skipErrorSnackbar: true,
          ...payloadBase,
        };
        orderService
          .findByOrderId(param)
          .then((res) => {
            const response = res.data;
            if (response) {
              const orderItem = get(response, "orderItem", []);
              if (orderItem.length > 0) {
                const partnumberArray: any[] = [];
                const quantityArray: any[] = [];

                orderItem.forEach((o) => {
                  partnumberArray.push(o.partNumber);
                  quantityArray.push(o.quantity);
                });

                const param = {
                  partnumber: partnumberArray,
                  quantity: quantityArray,
                  contractId: contract,
                  ...payloadBase,
                };
                dispatch(orderActions.ADD_ITEM_ACTION(param));
              } else {
                const msg = {
                  errorMessage: t("RequisitionLists.EmptyRL"),
                };
                dispatch(errorActions.GENERIC_ERROR_ACTION(msg));
              }
            }
          })
          .catch((error) => {
            console.log("cannot find this requisition list ", error);
          });
      };

      return (
        <div style={{ display: "flex" }}>
          <StyledIconButton style={{ padding: "0" }} color="primary" onClick={() => copyList(rowData)}>
            <ContentCopyOutlinedIcon />
          </StyledIconButton>
          <StyledIconButton
            style={{ padding: "0" }}
            color="primary"
            onClick={() => deleteList(rowData)}
            {...{ disabled }}>
            <DeleteOutlineOutlinedIcon />
          </StyledIconButton>
          <StyledIconButton style={{ padding: "0" }} color="primary" onClick={() => handleCopyCart(rowData)}>
            <AddShoppingCart color="primary" />
          </StyledIconButton>
        </div>
      );
    };

    const cellStyle = { verticalAlign: "middle" };

    const columns: TableColumnDef[] = [
      {
        title: t("RequisitionLists.Columns.ListName"),
        keyLookup: {
          key: CONSTANTS.listDescription,
        },
        idProp: "orderId",
        display: {
          cellStyle: {
            ...cellStyle,
            wordBreak: "break-word",
          },
          template: ({ rowData, ...props }) => (
            <StyledLink to={`${REQUISITION_LIST_DETAILS}/${rowData.orderId}`}>{rowData.listDescription}</StyledLink>
          ),
        },
        sortable: {},
      },
      {
        title: t("RequisitionLists.Columns.CreatedBy"),
        keyLookup: {
          key: CONSTANTS.createdBy,
        },
        display: { cellStyle },
        sortable: {},
      },
      {
        title: t("RequisitionLists.Columns.DateCreated"),
        keyLookup: {
          key: CONSTANTS.lastUpdated,
        },
        display: { cellStyle },
        sortable: {},
      },
      {
        title: t("RequisitionLists.Columns.Type"),
        keyLookup: {
          key: CONSTANTS.type,
        },
        display: { cellStyle },
        sortable: {},
      },
      {
        title: t("RequisitionLists.Columns.Actions"),
        keyLookup: {
          key: CONSTANTS.actions,
        },
        display: {
          cellStyle,
          template: ActionsCell,
        },
      },
    ];
    return columns;
  }, [t, dispatch, fetchAllRequisitionList, navigate, currency, userId, contract]);

  const getPage = ({ page, pageSize }) => {
    const pageNumber = page + 1;
    if (isNil(pageSize)) {
      pageSize = pagination.pageSize;
    }

    const getUsableRLPayload: any = {
      q: "usable",
      orderBy: "D-lastUpdate",
      pageNumber,
      pageSize,
      ...payloadBase,
    };
    fetchAllRequisitionList(getUsableRLPayload, page);
  };

  useEffect(() => {
    const recordState = get(getCurrentContext(tableState), "recordState", {});
    if (recordState && recordState.create) {
      const { resultList, count } = recordState;
      processTableData(resultList);
      setPagination({
        ...pagination,
        count,
      });
      setCurrentContextValue("recordState", { ...recordState, create: false }, tableState, setTableState);
    }
  }, [tableState, setTableState, setCurrentContextValue, getCurrentContext, processTableData, pagination]);

  useEffect(() => {
    getPage({ page: 0, pageSize: pagination.pageSize });
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ViewUploadLogsButton = () => {
    const viewUploadLogs = () => navigate(VIEW_UPLOAD_LOGS);
    return (
      <StyledButton testId={"requisition-list-view-upload-log"} size="medium" variant="text">
        <StyledTypography className="expanded-menu-bold" variant="body2" onClick={viewUploadLogs}>
          {t("RequisitionLists.ViewUploadLogs")}
        </StyledTypography>
      </StyledButton>
    );
  };

  return {
    columns,
    data: rows,
    labels: {
      emptyMsg: "RequisitionLists.NoRecord",
    },
    t,
    actionData: {
      extraActions: [<ViewUploadLogsButton />],
    },
    paginationData: {
      getPage,
      t,
      count: pagination.count,
      offset: pagination.offset,
      sizes: PAGINATION.sizes,
      labels: {
        ofTotalCount: "commonTable.ofTotalCount",
      },
    },
  };
};
