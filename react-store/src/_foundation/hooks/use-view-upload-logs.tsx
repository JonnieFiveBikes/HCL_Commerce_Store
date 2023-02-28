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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "./useSite";
import fileUploadJobService from "../apis/transaction/fileUploadJob.service";
//Custom libraries
import { EMPTY_STRING, PAGINATION } from "../../constants/common";
import { get } from "lodash-es";
import { CONSTANTS } from "../../constants/view-upload-logs-table";
import Closed from "@mui/icons-material/ChevronRight";
import Open from "@mui/icons-material/ExpandMoreOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
//UI
import {
  useCustomTable,
  useTableUtils,
  TableConstants,
  withCustomTableContext,
  CustomTable,
  StyledTypography,
  StyledGrid,
  StyledIconButton,
  StyledProgressPlaceholder,
  StyledTooltip,
} from "@hcl-commerce-store-sdk/react-component";

const DetailPanel = ({ rowData }) => {
  const { t } = useTranslation();
  const {
    rowInfo: { fileUploadJobId },
  } = rowData;
  const [details, setDetails] = useState<any>();
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : EMPTY_STRING;
  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = {
    signal: controller.signal,
  };

  // for retrieving the open/close state of the panel/drawer
  const headers = [{ idProp: "fileUploadJobId" }];
  const { tableState } = useCustomTable();
  const { getRowKey } = useTableUtils();
  const k = getRowKey(rowData, headers);
  const panelOpen = get(tableState, `${k}.${TableConstants.PANEL}`, false);

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (panelOpen) {
      const parameters: any = {
        storeId: storeId,
        fileUploadJobId: fileUploadJobId,
        accessProfile: CONSTANTS.IBM_Store_Details,
        ...payloadBase,
      };
      fileUploadJobService
        .getFileUploadJobById(parameters)
        .then((response) => {
          const diag = JSON.parse(get(response, "data.resultList[0].processFile[0].processInfo", "{}"));
          const uploadStatus = get(response, "data.resultList[0].processFile[0].status", "{}");
          setDetails({
            uploadStatus: uploadStatus,
            successful: diag.ProcessedItemsNumber,
            total: diag.ProcessedItemsNumber + diag.FailedPartNumbers.length,
            failed: diag.FailedPartNumbers.length,
            failedSkus: diag.FailedPartNumbers.map((f, idx) => {
              const [lineNumber, sku] = f.split(",");
              return {
                idx,
                lineNumber,
                sku,
              };
            }),
          });
        })
        .catch((e) => {
          console.log("Could not retrieve file upload job by id details", e);
        });
    } else {
      setDetails(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelOpen]);

  // generate headers array
  const columns = useMemo(
    () => [
      {
        idProp: "idx",
        title: t("RequisitionLists.LineNumber"),
        keyLookup: { key: CONSTANTS.lineNumber },
        display: { cellStyle: { verticalAlign: "middle", padding: "0.25rem" } },
      },
      {
        title: t("RequisitionLists.SKU"),
        keyLookup: { key: CONSTANTS.sku },
        display: { cellStyle: { verticalAlign: "middle", padding: "0.25rem" } },
      },
    ],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const style = { width: "auto", border: "0" };
  const D = useMemo(() => withCustomTableContext(CustomTable), []);
  return details ? (
    <>
      <StyledTypography variant="caption" style={{ fontWeight: "700" }} component="div">
        {t("RequisitionLists.UpdNofM", {
          n: details.successful,
          m: details.total,
        })}
      </StyledTypography>

      {details.uploadStatus !== "Failed" ? (
        <StyledTypography variant="caption">{t("RequisitionLists.PartialCompleteStatusTop")}</StyledTypography>
      ) : (
        <StyledTypography variant="caption">{t("RequisitionLists.FailedStatusTop")}</StyledTypography>
      )}
      {details.failed ? (
        <>
          {details.uploadStatus === "Partially Complete" ? (
            <StyledTypography className="top-margin-1 bottom-margin-1" variant="caption" component="div">
              {t("RequisitionLists.PartialCompleteStatusBottom")}
            </StyledTypography>
          ) : details.uploadStatus === "Failed" ? (
            <StyledTypography className="top-margin-1 bottom-margin-1" variant="caption" component="div">
              {t("RequisitionLists.FailedStatusBottom")}
            </StyledTypography>
          ) : null}
          <D
            {...{
              data: details.failedSkus,
              columns,
              style,
              t,
              labels: { emptyMsg: "RequisitionLists.NoViewRecord" },
            }}
          />
        </>
      ) : null}
    </>
  ) : panelOpen ? (
    <StyledProgressPlaceholder className="vertical-padding-1" />
  ) : null;
};

const OpenDrawer = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledTypography variant="caption">{t("RequisitionLists.ViewLog")}</StyledTypography>
      <Closed />
    </>
  );
};
const CloseDrawer = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledTypography variant="caption">{t("RequisitionLists.ViewLog")}</StyledTypography>
      <Open />
    </>
  );
};
const StatusCell = ({ rowData, ...props }) => {
  const { t } = useTranslation();
  const complete = {
    src: <CheckCircleIcon htmlColor="#009874" fontSize="small" />,
    text: t("RequisitionLists.Uploaded"),
  };
  const partialComplete = {
    src: <ErrorOutlinedIcon fontSize="small" />,
    text: t("RequisitionLists.PartiallyUploaded"),
  };
  const processing_New = {
    src: <InsertDriveFileIcon fontSize="small" />,
    text: t("RequisitionLists.Processing"),
  };
  const failed = {
    src: <ErrorOutlinedIcon htmlColor="crimson" fontSize="small" />,
    text: t("RequisitionLists.UploadFailed"),
  };
  const statusIconText: any =
    rowData.status && rowData.status === "Complete"
      ? complete
      : rowData.status === "Partially Complete"
      ? partialComplete
      : rowData.status === "Processing" || rowData.status === "New"
      ? processing_New
      : rowData.status === "Failed"
      ? failed
      : {};

  return (
    <div>
      <StyledGrid container>
        <StyledGrid item xs={2}>
          {statusIconText.src}
        </StyledGrid>
        <StyledGrid item xs={10}>
          {statusIconText.text}
        </StyledGrid>
      </StyledGrid>
    </div>
  );
};

const RefreshButton = ({ getTableData, tooltipTitle }) => (
  <StyledIconButton
    style={{ padding: 0 }}
    color="secondary"
    onClick={getTableData}
    data-testid="use-view-upload-refresh-icon-button">
    <StyledTooltip title={tooltipTitle}>
      <RefreshIcon />
    </StyledTooltip>
  </StyledIconButton>
);

export const useViewUploadLogs = () => {
  const { t, i18n } = useTranslation();

  const [orig, setOrig] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const cellStyle = { verticalAlign: "middle" };
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : EMPTY_STRING;
  const controller = useMemo(() => new AbortController(), []);
  const payloadBase: any = {
    widget: "ViewUploadLogs",
    signal: controller.signal,
  };

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const dateFormatter = new Intl.DateTimeFormat(i18n.languages[0], dateFormatOptions);
  const panelExpanderComps = useMemo(
    () => ({
      compShow: OpenDrawer,
      compHide: CloseDrawer,
    }),
    []
  );

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTableData = () => {
    const parameters: any = {
      storeId: storeId,
      q: CONSTANTS.byNumberOfDaysAndUploadType,
      numberOfDays: CONSTANTS.numberOfDays,
      uploadType: CONSTANTS.RequisitionListUpload,
      accessProfile: CONSTANTS.IBM_Store_Details,
      ...payloadBase,
    };
    fileUploadJobService
      .getFileUploadJobs(parameters)
      .then((response) => {
        if (response.data && response.data?.resultList) {
          getViewUploadedFilesDetails(response.data);
        }
      })
      .catch((e) => {
        console.log("Could not retrieve the file upload job details", e);
      });
  };

  useEffect(() => {
    getTableData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getViewUploadedFilesDetails = (res) => {
    const viewUploadData = res.resultList
      .filter(
        (p) =>
          p.uploadFile.fileInfo.fileName && p.uploadFile.uploadTime && p.processFile[0]?.status && p.fileUploadJobId
      )
      .map((e) => ({
        fileName: e.uploadFile.fileInfo.fileName,
        uploadTime: e.uploadFile.uploadTime,
        status: e.processFile[0]?.status,
        fileUploadJobId: e.fileUploadJobId,
        rowInfo: e,
      }));
    setOrig(viewUploadData);
    setRows(viewUploadData);
  };

  const headers = useMemo(
    () => [
      {
        title: t("RequisitionLists.UploadedFile"),
        idProp: "fileUploadJobId",
        keyLookup: {
          key: CONSTANTS.fileName,
        },
        sortable: {},
        display: { cellClass: "break-word" },
      },
      {
        title: t("RequisitionLists.Status"),
        keyLookup: {
          key: CONSTANTS.status,
        },
        sortable: {
          fn: ({ rowData: { status: s } }) => {
            return s === "Complete"
              ? t("RequisitionLists.Uploaded")
              : s === "Partially Complete"
              ? t("RequisitionLists.PartiallyUploaded")
              : s === "Processing" || s === "New"
              ? t("RequisitionLists.Processing")
              : s === "Failed"
              ? t("RequisitionLists.UploadFailed")
              : EMPTY_STRING;
          },
        },
        display: { cellStyle, template: StatusCell },
      },
      {
        title: t("RequisitionLists.UploadTime"),
        keyLookup: {
          key: CONSTANTS.uploadTime,
        },
        sortable: {},
        display: {
          template: ({ rowData, ...props }) => {
            return (
              <StyledTypography>
                {rowData.uploadTime && dateFormatter.format(new Date(rowData.uploadTime))}
              </StyledTypography>
            );
          },
        },
      },
    ],
    [i18n.language] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const doSearch = ({ search }) => {
    const s = (search ?? EMPTY_STRING).trim();
    let f = orig;
    if (s) {
      const re = new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      f = orig.filter((r) => re.test(r.fileName));
    }
    setRows(f);
  };

  return {
    tableData: {
      className: "table-tablet",
      columns: headers,
      detailPanel: DetailPanel,
      showPanelOnMobile: true,
      data: rows,
      t,
      labels: { emptyMsg: "RequisitionLists.NoViewRecord" },
      panelExpanderComps,
      paginationData: {
        clientSide: true,
        t,
        sizes: PAGINATION.sizes,
        labels: {
          ofTotalCount: "commonTable.ofTotalCount",
        },
      },
      actionData: {
        headers,
        hasSearch: true,
        getPage: doSearch,
        labels: {
          searchPlaceholder: "RequisitionLists.search",
        },
        extraActions: [<RefreshButton {...{ getTableData, tooltipTitle: t("RequisitionLists.Refresh") }} />],
      },
    },
  };
};
