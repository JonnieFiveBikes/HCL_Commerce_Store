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
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedSellersSelector, sellersSelector } from "../../redux/selectors/sellers";
import { EMPTY_STRING, XS_MOBILE_W } from "../../constants/common";
import {
  StyledFormControl,
  StyledSelect,
  StyledListItem,
  StyledListItemText,
  StyledMenuItem,
  StyledMenuTypography,
} from "@hcl-commerce-store-sdk/react-component";
import styled from "@mui/styled-engine-sc";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { HOME } from "../../constants/routes";
import storeUtil from "../../utils/storeUtil";
import { useSite } from "../../_foundation/hooks/useSite";
import StoreIcon from "@mui/icons-material/Store";
import CloseIcon from "@mui/icons-material/Close";
import { SET_SELLER_ACTION } from "../../redux/actions/sellers";

const StyledWrapper = styled("div")`
  ${({ theme }) => `
    background: ${theme.palette.background.default};
    padding: ${theme.spacing(2)};
  `}
`;

const ValueRenderer = styled(({ children, ...props }) => <div {...props}>{children}</div>)`
  ${({ theme }) => `
    &.label {
      color: ${theme.palette.text.disabled};
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

export const Sellers = () => {
  const selectedSellers = useSelector(selectedSellersSelector);
  const [chosenSellers, setChosenSellers] = useState(selectedSellers?.length ? selectedSellers : []);
  const [chosenMap, setChosenMap] = useState(storeUtil.toMap(chosenSellers));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sellers = useSelector(sellersSelector);
  const [sellerMap, setSellerMap] = useState({});
  const navigate = useNavigate();
  const { storeDisplayName } = useSite();
  const [open, setOpen] = useState(false);
  const saveSeller = useCallback(
    (e) => {
      const v: any[] = e?.target?.value ?? [];
      setChosenSellers(v);
      setChosenMap(storeUtil.toMap(v));
      setOpen(false);
      dispatch(SET_SELLER_ACTION({ sellers: v }));
      navigate(HOME);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const renderValue = useCallback(
    (a) => (
      <ValueRenderer className={!a?.length ? "label" : EMPTY_STRING}>
        <StoreIcon fontSize="small" className="right-margin-1" />
        <div className="text">{a.length ? a.map((v) => sellerMap[v]?.name).join(", ") : t("sellers.fBy")}</div>
      </ValueRenderer>
    ),
    [sellerMap] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const m = storeUtil.toMap(sellers?.sellers ?? [], "id");
    setSellerMap(m);
  }, [sellers]);

  return sellers?.showSellerList ? (
    <>
      <StyledListItem>
        <StyledListItemText primary={t("sellers.emMp", { store: storeDisplayName })}></StyledListItemText>
      </StyledListItem>
      <StyledWrapper>
        <StyledFormControl variant="outlined">
          <StyledSelect
            data-testid="mp-seller-select"
            style={{ maxWidth: `${XS_MOBILE_W}em` }}
            value={chosenSellers}
            renderValue={renderValue}
            displayEmpty
            id="seller-select"
            open={open}
            onClick={setOpen.bind(null, !open)}
            onChange={saveSeller}
            multiple
            fullWidth>
            {sellers?.sellers.map((s, i) => (
              <StyledMenuItem
                data-testid={`mp-seller-select-${s.name.toLowerCase()}`}
                key={i}
                id={`${s}-${i}`}
                value={s.id}
                className="bordered"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <StyledMenuTypography>{s.name}</StyledMenuTypography>
                {chosenMap[s.id] ? <CloseIcon fontSize="small" /> : null}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
      </StyledWrapper>
    </>
  ) : null;
};
