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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Axios, { Canceler } from "axios";

import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";
import { OK } from "http-status-codes";
//Custom libraries
import requisitionListService from "../../../../_foundation/apis/transaction/requisitionList.service";
import addressUtil from "../../../../utils/addressUtil";
import { RequisitionListItemsTable } from "../../../widgets/requisition-list-items-table";
import * as ROUTES from "../../../../constants/routes";

import NotFound from "../../../commerce-layouts/not-found";
import { useSite } from "../../../../_foundation/hooks/useSite";
import { PRIVATE_ORDER, SHARED_ORDER, EMPTY_STRING } from "../../../../constants/common";

import {
  StyledContainer,
  StyledGrid,
  StyledLink,
  StyledBreadcrumbs,
  StyledButton,
  StyledFormControl,
  StyledRadioGroup,
  StyledTypography,
  StyledRadio,
  StyledFormControlLabel,
  StyledFormHelperText,
  StyledTextField,
  StyledCircularProgress,
  SearchAndAdd,
  SelectedValue,
} from "@hcl-commerce-store-sdk/react-component";

//redux

import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import * as successActions from "../../../../redux/actions/success";
import { FETCH_ORDER_DETAILS_ACTION } from "../../../../redux/actions/orderDetails";
import { useSKUSearch } from "../../../../_foundation/hooks/use-sku-search";
import { forUserIdSelector, userIdSelector } from "../../../../redux/selectors/user";

const RequisitionListDetailsPage = (props: any) => {
  const [requisitionList, setRequisitionList] = useState({
    name: EMPTY_STRING,
    type: EMPTY_STRING,
  });

  const contract = useSelector(currentContractIdSelector);
  const dispatch = useDispatch();
  const { orderId } = useParams<any>();
  const { mySite } = useSite();
  const { t, i18n } = useTranslation();
  const currency: string = mySite?.defaultCurrencyID ?? "";
  const details = useSelector((status: any) => status.orderDetails[String(orderId)]);
  const items = details?.detailedOrderItems;
  const loading = orderId && details === undefined;
  const notFound = !orderId || (details && details.error);

  const opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const lang = i18n.languages[0];
  const dFmt = new Intl.DateTimeFormat(lang, opts);
  const cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<any>(false);
  const [dirty, setDirty] = useState(false);
  const { fetchOptions } = useSKUSearch();
  const buyerId = details?.buyerId;
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const disabled = userId !== buyerId;

  const payloadBase = {
    widget: "Requisition List detail ",
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };

  const onAddClick = ({ value, quantity = 1 }: SelectedValue) => {
    const payload: any = {
      widget: payloadBase.widget,
      action: "updateItem",
      query: {
        requisitionListId: orderId,
        partNumber: value.partNumber,
        quantity,
      },
    };

    requisitionListService
      .performActionOnRequisitionList(payload)
      .then((res) => {
        const m = {
          key: "success-message.addItemListSuccessfully",
          messageParameters: { v: value.partNumber },
        };
        dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(m));
        dispatch(
          FETCH_ORDER_DETAILS_ACTION({
            orderId,
            currency,
            skipErrorSnackbar: true,
            ...payloadBase,
          })
        );
      })
      .catch((e) => {
        console.log("Could not add item", e);
      });
  };

  const searchAddprops = useMemo(() => {
    return {
      optionUniqueID: "partNumber",
      searchPlaceholder: t("RequisitionLists.SKUSearch"),
      quantityPlaceholder: t("RequisitionLists.Quantity"),
      addButtonLabel: t("RequisitionLists.Add"),
    };
  }, [t]);

  /**
   * Onchange event handler for list name text field
   *
   * @param event
   */
  const handleRequisitionListName = (event) => {
    setRequisitionList({ ...requisitionList, name: event.target.value });
    setDirty(true);
  };

  /**
   * Onchange event handler for list type radio group
   *
   * @param event
   */
  const handleRequisitionListType = (event) => {
    setRequisitionList({ ...requisitionList, type: event.target.value });
    setDirty(true);
  };

  /**
   * listName validation
   *
   */
  const isValidRequisitionListName = (requisitionListName: string): boolean => {
    return requisitionListName.trim().length > 0 && addressUtil.validateNickName(requisitionListName);
  };

  useEffect(() => () => cancels.forEach((c) => c()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (details)
      setRequisitionList({
        name: details.orderDescription ?? EMPTY_STRING,
        type: details?.orderTypeCode === "PRL" ? PRIVATE_ORDER : SHARED_ORDER,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  useEffect(() => {
    if (orderId && currency && contract) {
      dispatch(
        FETCH_ORDER_DETAILS_ACTION({
          orderId,
          currency,
          skipErrorSnackbar: true,
          ...payloadBase,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, mySite, currency, editMode, contract]);

  /**
   * Onclick event handler for Edit list button
   *
   */
  const handleSaveEditListChanges = () => {
    const payload: any = {
      requisitionListId: orderId,
      query: {
        status: requisitionList.type === SHARED_ORDER ? "Z" : "Y",
        name: requisitionList.name.trim(),
      },
      ...payloadBase,
    };

    requisitionListService
      .updateRequisitionListById(payload)
      .then((res) => {
        if (res.status === OK) {
          const msg = {
            key: "success-message.UPDATED_REQUISITIONLIST_SUCCESS",
          };
          dispatch(successActions.HANDLE_SUCCESS_MESSAGE_ACTION(msg));
          setEditMode(false);
        }
      })
      .catch((e) => {
        console.log("Could not update a requisition list", e);
      });
  };

  return (
    <StyledContainer cid="requisition-list-details-page">
      {editMode ? (
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={8}>
            <StyledBreadcrumbs className="vertical-padding-2">
              <StyledLink to={ROUTES.REQUISITION_LISTS}>
                <StyledTypography variant="h4">{t("RequisitionLists.Title")}</StyledTypography>
              </StyledLink>
              <StyledTextField
                className="vertical-margin-1"
                required
                id="edit-list-name"
                name="listName"
                value={requisitionList.name}
                inputProps={{ maxLength: 128 }}
                autoComplete="requisitionListName"
                placeholder={t("RequisitionLists.NewRequisitionName")}
                onChange={handleRequisitionListName}
                error={dirty && !isValidRequisitionListName(requisitionList.name)}
                helperText={
                  dirty && !isValidRequisitionListName(requisitionList.name)
                    ? t("RequisitionLists.InvalidListName")
                    : EMPTY_STRING
                }
              />
            </StyledBreadcrumbs>
          </StyledGrid>
          <StyledGrid container item xs={12} md={4} alignItems="center">
            <StyledFormControl component="fieldset">
              <StyledFormHelperText>
                <StyledTypography variant="body2">
                  <b>{t("RequisitionListItems.Visibility")}</b>
                </StyledTypography>
              </StyledFormHelperText>
              <StyledRadioGroup
                row
                name="listType"
                value={requisitionList.type}
                onChange={(event) => handleRequisitionListType(event)}>
                <StyledFormControlLabel
                  value={PRIVATE_ORDER}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("RequisitionLists.PrivateList")}</StyledTypography>}
                />
                <StyledFormControlLabel
                  value={SHARED_ORDER}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("RequisitionLists.SharedList")}</StyledTypography>}
                />
              </StyledRadioGroup>
            </StyledFormControl>
          </StyledGrid>
        </StyledGrid>
      ) : (
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={6}>
            <StyledBreadcrumbs className="vertical-padding-2">
              <StyledLink to={ROUTES.REQUISITION_LISTS}>
                <StyledTypography variant="h4">{t("RequisitionLists.Title")}</StyledTypography>
              </StyledLink>
              <StyledTypography style={{ overflowWrap: "break-word" }} variant="h4">
                {details?.orderDescription || details?.orderId}
              </StyledTypography>
            </StyledBreadcrumbs>
          </StyledGrid>
          <StyledGrid container item direction="row" xs={12} md={6} alignItems="center">
            <StyledGrid item xs={12} sm={6} md={4} className="top-margin-1 bottom-margin-1">
              <StyledTypography style={{ fontWeight: "bold" }}>{t("RequisitionListItems.createdBy")}</StyledTypography>
              <StyledTypography>
                {`${details?.x_firstName ?? "\u00A0"} ${details?.x_lastName ?? "\u00A0"}`}
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={12} sm={6} md={4} className="top-margin-1 bottom-margin-1">
              <StyledTypography style={{ fontWeight: "bold" }}>{t("InprogressItems.lastUpdated")}</StyledTypography>
              <StyledTypography>{dFmt.format(new Date(details?.lastUpdateDate ?? 0))}</StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={12} sm={6} md={4} className="top-margin-1 bottom-margin-1">
              <StyledTypography style={{ fontWeight: "bold" }}>{t("RequisitionListItems.Visibility")}</StyledTypography>
              <StyledTypography>{t(`RequisitionListItems.orderType_${details?.orderTypeCode}`)}</StyledTypography>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      )}

      <Divider className="full-width bottom-margin-2" />
      {editMode ? (
        <StyledGrid container spacing={2} className="bottom-margin-1">
          <StyledGrid item>
            <StyledButton
              testId="requisition-list-save-edit-changes"
              color="primary"
              disabled={dirty && !isValidRequisitionListName(requisitionList.name)}
              onClick={handleSaveEditListChanges}
              className="button bottom-margin-1 left-margin-1">
              {t("RequisitionListItems.saveChanges")}
            </StyledButton>
            <StyledButton
              testId="requisition-list-cancel-edit-changes"
              color="secondary"
              onClick={() => setEditMode(false)}
              className="button bottom-margin-1 left-margin-1">
              {t("RequisitionListItems.cancel")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      ) : (
        <StyledGrid container spacing={2} className="bottom-margin-1">
          <StyledGrid item xs={false}>
            <StyledButton
              testId="requisition-list-edit-details"
              color="secondary"
              onClick={() => setEditMode(true)}
              className="button bottom-margin-1 left-margin-1"
              {...{ disabled }}>
              {t("RequisitionListItems.editListDetails")}
            </StyledButton>
            <StyledButton
              testId="requisition-list-add-products"
              color="secondary"
              onClick={() => {
                navigate(ROUTES.HOME);
              }}
              className="button bottom-margin-1 left-margin-1"
              {...{ disabled }}>
              {t("RequisitionListItems.addProds")}
            </StyledButton>
          </StyledGrid>
          <StyledGrid xs item container justifyContent="flex-end">
            <StyledGrid item>
              <SearchAndAdd fetchOptions={fetchOptions} onAddClick={onAddClick} {...{ disabled, ...searchAddprops }} />
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      )}

      {loading ? (
        <StyledCircularProgress />
      ) : notFound ? (
        <NotFound />
      ) : (
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12}>
            <RequisitionListItemsTable order={details ?? []} orderItems={items ?? []} />
          </StyledGrid>
        </StyledGrid>
      )}
    </StyledContainer>
  );
};

export default RequisitionListDetailsPage;
