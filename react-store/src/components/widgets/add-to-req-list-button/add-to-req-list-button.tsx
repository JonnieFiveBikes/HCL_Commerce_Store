/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//UI
import {
  StyledFormControl,
  StyledSelect,
  StyledMenuItem,
  StyledMenuTypography,
  StyledLink,
  StyledTooltip,
} from "@hcl-commerce-store-sdk/react-component";
import styled from "@mui/styled-engine-sc";
import AddIcon from "@mui/icons-material/Add";
//Standard libraries
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios, { Canceler } from "axios";
import { useSelector } from "react-redux";
import { kebabCase } from "lodash-es";
//Foundation
import svc from "../../../_foundation/apis/transaction/requisitionList.service";
import { useSite } from "../../../_foundation/hooks/useSite";
import { useWinDimsInEM } from "../../../_foundation/hooks/use-win-dims-in-em";
//Common libraries
import { EMPTY_STRING, XS_MOBILE_W } from "../../../constants/common";
import { REQUISITION_LISTS } from "../../../constants/routes";
import { forUserIdSelector, loginStatusSelector, userIdSelector } from "../../../redux/selectors/user";

const ValueRenderer = styled(({ children, ...props }) => <div {...props}>{children}</div>)`
  ${({ theme }) => `
  &.label {
    color: ${theme.palette.text.primary};
  }
  display: flex;
  align-items: center;
  max-width: ${XS_MOBILE_W}em;

  > div.text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`}
`;

const Wrapper = ({ children, t, tooltip }) => {
  return tooltip ? (
    <StyledTooltip placement="top-start" leaveTouchDelay={0} title={t("productDetail.addToRL")}>
      <span>{children}</span>
    </StyledTooltip>
  ) : (
    <>{children}</>
  );
};

export const AddToRequisitionListButton = ({ disabled, addFn }) => {
  const notGuest = useSelector(loginStatusSelector);
  const { t } = useTranslation();
  const cancels: Canceler[] = [];
  const CancelToken = axios.CancelToken;
  const { mySite } = useSite();
  const storeId = mySite?.storeID ?? EMPTY_STRING;
  const visible = notGuest && mySite?.isB2B;
  const [selectedRL, setSelectedRL] = useState<any>();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const payloadBase: any = {
    storeId,
    cancelToken: new CancelToken((c) => cancels.push(c)),
  };
  const forUserId = useSelector(forUserIdSelector);
  const uId = useSelector(userIdSelector);
  const userId = forUserId ?? uId;
  const { h, w } = useWinDimsInEM();
  const selectRL = (selectOptionValue, event) => {
    setSelectedRL(selectOptionValue);
    if (selectOptionValue.orderId) {
      addFn(selectOptionValue.orderId);
    }
  };

  const onClick = useCallback(() => setOpen(!open), [open]);

  const renderValue = useCallback(
    (a) => (
      <ValueRenderer className={!a ? "label" : EMPTY_STRING}>
        <div className="text">{a === EMPTY_STRING ? t("productDetail.addToRL") : a.description}</div>
      </ValueRenderer>
    ),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const getList = useCallback(async () => {
    const payload: any = {
      q: "usable",
      orderBy: "D-lastUpdate",
      pageNumber: 1,
      pageSize: -1,
      ...payloadBase,
    };
    try {
      const res = await svc.getRequisitionList(payload);
      const f = res.data.resultList.filter(({ memberId }) => memberId === userId);
      setList(f);
    } catch (e) {
      console.log("Could not retrieve Inventory Details", e);
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (visible) {
      getList();
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      setOpen(false);
      setTimeout(() => setOpen(true), 50);
    }
  }, [h, w]); // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => cancels.forEach((cancel) => cancel()), []);

  return (
    <>
      {visible ? (
        <Wrapper tooltip={!!selectedRL} t={t}>
          <StyledFormControl variant="outlined" className="add-to-rl flex top-margin-1 fullWidth">
            <StyledSelect
              style={{ maxWidth: `${XS_MOBILE_W}em` }}
              MenuProps={{
                PaperProps: { style: { maxHeight: "200px" } },
              }}
              value={selectedRL ?? EMPTY_STRING}
              data-testid="requisition-list-selection"
              id="requisitionList_select"
              placeholder={t("productDetail.addToRL")}
              displayEmpty
              fullWidth
              {...{ open, onClick, disabled, renderValue }}>
              {list.map((option: any, i) => (
                <StyledMenuItem
                  data-testid={kebabCase(`add-to-reqlist-options-${option.description}-${i}-menu-item`)}
                  key={i}
                  id={`${option}-${i}`}
                  value={option}
                  onClick={selectRL.bind(null, option)}
                  className="bordered">
                  <StyledMenuTypography className="wrapText">{option.description}</StyledMenuTypography>
                </StyledMenuItem>
              ))}
              <StyledMenuItem id="requisitionList_option_create" value="create">
                <StyledLink to={REQUISITION_LISTS}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AddIcon />
                    <StyledMenuTypography className="wrapText">{t("productDetail.createRL")}</StyledMenuTypography>
                  </div>
                </StyledLink>
              </StyledMenuItem>
            </StyledSelect>
          </StyledFormControl>
        </Wrapper>
      ) : null}
    </>
  );
};
