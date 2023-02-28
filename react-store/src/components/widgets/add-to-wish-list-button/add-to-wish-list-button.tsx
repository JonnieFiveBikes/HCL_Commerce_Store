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
//React libraries
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { kebabCase } from "lodash-es";
//Custom libraries
import { EMPTY_STRING, XS_MOBILE_W } from "../../../constants/common";
import { WISH_LIST } from "../../../constants/routes";
import { useSite } from "../../../_foundation/hooks/useSite";
//Redux
import { loginStatusSelector } from "../../../redux/selectors/user";
import { getWishListSelector } from "../../../redux/selectors/wish-list";
import * as wishListActions from "../../../redux/actions/wish-list";
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
    <StyledTooltip placement="top-start" leaveTouchDelay={0} title={t("productDetail.addToWL")}>
      <span>{children}</span>
    </StyledTooltip>
  ) : (
    <>{children}</>
  );
};
const cancels: Canceler[] = [];

export const AddToWishListButton = ({ disabled, addFn }) => {
  const loginStatus = useSelector(loginStatusSelector);
  const userWishList = useSelector(getWishListSelector);

  const { t } = useTranslation();

  const { mySite } = useSite();
  const visible = loginStatus && !mySite?.isB2B;
  const [selectedWL, setSelectedWL] = useState<any>();
  const ref = useRef<HTMLElement>();
  const [menuWidth, setMenuWidth] = useState<any>("unset");

  const dispatch = useDispatch();
  const widgetName = useMemo(() => {
    return getDisplayName("AddToWishListButton");
  }, []);
  const CancelToken = useMemo(() => {
    return Axios.CancelToken;
  }, []);
  const getList = useCallback(async () => {
    dispatch(
      wishListActions.GET_USER_WISHLIST_ACTION({
        widget: widgetName,
        cancelToken: new CancelToken((c) => cancels.push(c)),
      })
    );
  }, [dispatch, widgetName, CancelToken]);

  const selectWL = (selectOptionValue) => {
    setSelectedWL(selectOptionValue);
    addFn(selectOptionValue);
  };

  const renderValue = useCallback(
    (a) => (
      <ValueRenderer className={!a ? "label" : EMPTY_STRING}>
        <div className="text">{a === EMPTY_STRING ? t("productDetail.addToWL") : a.description}</div>
      </ValueRenderer>
    ),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const onOpen = useCallback(() => {
    setMenuWidth(ref.current ? ref.current.clientWidth : "unset");
  }, []);

  useEffect(() => {
    if (visible) {
      getList();
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      cancels.splice(0).forEach((cancel: Canceler) => {
        cancel();
      });
    };
  }, []);

  return (
    <>
      {visible ? (
        <Wrapper tooltip={!!selectedWL} t={t}>
          <StyledFormControl variant="outlined" className="add-to-wl top-margin-1 flex fullWidth">
            <StyledSelect
              ref={ref}
              style={{ maxWidth: `${XS_MOBILE_W}em`, minWidth: "180px" }}
              MenuProps={{
                PaperProps: {
                  style: { border: "1px solid #e0e0e0", maxHeight: "200px", width: menuWidth },
                },
              }}
              onOpen={onOpen}
              value={selectedWL ?? EMPTY_STRING}
              disabled={disabled}
              renderValue={renderValue}
              data-testid="wishlist-selection"
              id="wishList_select"
              placeholder={t("productDetail.addToWL")}
              displayEmpty
              fullWidth>
              <StyledMenuItem className="bordered" id="requisitionList_option_create" value="create">
                <StyledLink to={WISH_LIST}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AddIcon fontSize="small" />
                    <StyledMenuTypography className="wrapText">{t("productDetail.createWL")}</StyledMenuTypography>
                  </div>
                </StyledLink>
              </StyledMenuItem>
              {userWishList?.map((option: any, i) => (
                <StyledMenuItem
                  data-testid={kebabCase(`add-to-wishlist-options-${option.description}-${i}-menu-item`)}
                  key={i}
                  id={`${option}-${i}`}
                  value={option}
                  onClick={selectWL.bind(null, option)}
                  className="bordered">
                  <StyledMenuTypography className="wrapText">{option.description}</StyledMenuTypography>
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        </Wrapper>
      ) : null}
    </>
  );
};
