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
import {
  StyledButton,
  StyledContainer,
  StyledGrid,
  StyledIconButton,
  StyledProductImage,
  StyledTypography,
  StyledLink,
} from "@hcl-commerce-store-sdk/react-component";
import { useCallback, useEffect, useRef, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ArrowDropUp";
import ExpandMoreIcon from "@mui/icons-material/ArrowDropDown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import MatButton from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import { useWinDimsInEM } from "../../../_foundation/hooks/use-win-dims-in-em";
import styled from "@mui/styled-engine-sc";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import storeUtil from "../../../utils/storeUtil";
import { useSite } from "../../../_foundation/hooks/useSite";
import { EMPTY_STRING } from "../../../constants/common";
import FormattedPriceDisplay from "../formatted-price-display";

const Price = ({ obj }) => {
  const { mySite: s } = useSite();
  const p = storeUtil.getOfferPrice(obj);
  const currency = s?.defaultCurrencyID ?? EMPTY_STRING;
  return <FormattedPriceDisplay {...{ ...p, currency }} />;
};

const OutlinedButton = styled(({ children, ...props }) => (
  <MatButton size="large" variant="outlined" {...props}>
    {children}
  </MatButton>
))`
  ${({ theme }) => `
    border-color: rgba(0,0,0,0.7);
    background-color: rgba(0,0,0,0.15);
    color: ${theme.palette.common.white};

    &:hover {
      background-color: rgba(100, 100, 100, 1);
    }

    > span {
      color: ${theme.palette.common.white};
    }
  `}
`;

const Diagnostic = styled(({ children, ...props }) => (
  <StyledTypography variant="body2" {...props}>
    {children}
  </StyledTypography>
))`
  ${({ theme }) => `
    color: ${theme.palette.common.white};

    &.link {
      color: ${theme.palette.primary.dark};
    }
  `}
`;

const Actions = styled(({ children, ...props }) => (
  <StyledGrid item {...props}>
    {children}
  </StyledGrid>
))`
  ${(props) => `
    &.right {
      justify-content: flex-end;
    }
    display: flex;
    > button {
      > span {
        display: flex;
        align-items: center;
      }
    }
`}
`;

const Bar = styled(({ children, ...props }) => <StyledContainer {...props}>{children}</StyledContainer>)`
  ${(props) => `
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
    div.MuiGrid-item {
      display: flex;
      align-items: center;
    }
  `}
`;

const BarContent = styled(({ children, ...props }) => <StyledContainer {...props}>{children}</StyledContainer>)`
  ${(props) => `
    background-color: rgba(0, 0, 0, 0.7);
  `}
`;

const StickyDiv = styled("div")`
  ${(props) => `
    display: inline;
    position: sticky;
    top: auto;
  `}
`;

const DrawerDiv = styled("div")`
  ${(props) => `
    position: absolute;
    top: auto;
    bottom: 0;
  `}
`;

const ThumbBox = styled(({ children, ...props }) => (
  <StyledGrid item {...props}>
    {children}
  </StyledGrid>
))`
  ${({ theme }) => `
    position: relative;
    display: flex;
    padding: ${theme.spacing(1)};
    gap: ${theme.spacing(1)};
    align-items: center;

    .closeIcon {
      position: absolute;
      right: ${theme.spacing(1)};
      top: ${theme.spacing(1)};
      padding: 0;
      width: ${theme.spacing(3)};
      height: ${theme.spacing(3)};
      color: ${theme.palette.text.secondary};

      &:hover {
        color: ${theme.palette.primary.dark};
      }
    }

    &.text {
      justify-content: center;
      border: 1px dashed ${theme.palette.common.white};
      &:not(:last-child) {
        border-right-width: 0;
      }
    }

    &.thumb {
      background-color: ${theme.palette.common.white};
      border: 1px dashed ${theme.palette.common.black};

      img {
        padding: ${theme.spacing(1)};
        width: ${theme.spacing(10)};
        height: ${theme.spacing(10)};
        max-height: 100%;
        max-width: 100%;
      }

      div.price-and-desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.25;

        .price {
          line-height: 1.5;
        }
      }
    }

    &:not(:last-child) {
      border-right-width: 0;
    }
  `}
`;

export const CompareCollectorWidget = (props) => {
  const { compare } = props;
  const { data } = compare ?? {};
  const [open, setOpen] = useState(false);
  const [once, setOnce] = useState(false);
  const theme = useTheme();
  const offset = useMediaQuery(theme.breakpoints.down("lg")) ? theme.spacing(3) : theme.spacing(6);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<any>({});
  const { w_px } = useWinDimsInEM();
  const { t } = useTranslation();

  const remove = useCallback(
    (obj, e) => {
      compare.onChange({ target: { checked: false } }, obj.id, obj);
    },
    [compare]
  );

  const updateDivPlacement = useCallback((anchor) => {
    if (anchor.current) {
      const { left } = anchor.current.getBoundingClientRect();
      setEdges({ left: `-${left}px`, width: `${document.body.clientWidth}px` });
    }
  }, []);

  useEffect(() => {
    updateDivPlacement(anchorRef);
  }, [open, anchorRef, w_px]); // eslint-disable-line react-hooks/exhaustive-deps

  // open compare widget on first addition
  useEffect(() => {
    const o = open;
    if (data.len && !once && !o) {
      setOpen(true);
    }
    if (o) {
      setOnce(true);
    }
  }, [data, once, open]);

  useEffect(() => {
    updateDivPlacement(anchorRef);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return compare ? (
    <StickyDiv ref={anchorRef} style={{ bottom: `${offset}` }}>
      <div style={{ position: "relative" }}>
        <DrawerDiv style={{ ...edges, marginBottom: `-${offset}` }}>
          <Bar onClick={setOpen.bind(null, !open)}>
            <StyledGrid container className="vertical-padding-2">
              <StyledGrid item sm={9} md={10} container spacing={2}>
                <StyledGrid item>
                  {data.len > 1 ? (
                    <StyledButton
                      testId="compare-selected-products"
                      size="small"
                      color="primary"
                      onClick={compare.openCompare}>
                      {t("compare.compSel")}
                    </StyledButton>
                  ) : (
                    <Diagnostic>{t("compare.addAtLeast")}</Diagnostic>
                  )}
                </StyledGrid>
                <Actions item>
                  <OutlinedButton data-testid="button-clear-selection" onClick={compare.removeAll}>
                    {t("compare.clearSel")}
                  </OutlinedButton>
                </Actions>
              </StyledGrid>
              <Actions sm={3} md={2} className="right">
                <OutlinedButton data-testid="button-hide-expand" onClick={setOpen.bind(null, !open)}>
                  {t(open ? "compare.hide" : "compare.expand")}
                  {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </OutlinedButton>
              </Actions>
            </StyledGrid>
          </Bar>
          {open ? (
            <BarContent>
              <StyledGrid container>
                <StyledGrid item sm={12} container className="bottom-margin-2">
                  {data.storage.filter(Boolean).map((obj, i) => (
                    <ThumbBox key={i} xs={12 / data.max} className="thumb">
                      <StyledIconButton
                        data-testid={`button-product-compare-${obj.partNumber?.toLowerCase()}-close`}
                        className="closeIcon"
                        color="primary"
                        onClick={remove.bind(this, obj)}>
                        <CloseIcon fontSize="small" />
                      </StyledIconButton>
                      <StyledProductImage src={obj.thumbnail} />
                      <div className="price-and-desc">
                        <Hidden lgUp>
                          <StyledTypography variant="body2" className="price">
                            <Price {...{ obj }} />
                          </StyledTypography>
                        </Hidden>
                        <Hidden lgDown>
                          <StyledTypography variant="subtitle1" className="price">
                            <Price {...{ obj }} />
                          </StyledTypography>
                        </Hidden>
                        <StyledLink to={obj.link?.pathname ?? obj.seo?.href}>
                          <Diagnostic className="link">{obj.name}</Diagnostic>
                        </StyledLink>
                      </div>
                    </ThumbBox>
                  ))}
                  {Array(data.max - data.len)
                    .fill(null)
                    .map((n, i) => (
                      <ThumbBox key={i} xs={12 / data.max} className="text">
                        <Diagnostic>
                          {t("compare.boxNofM", {
                            m: data.max,
                            n: data.len + i + 1,
                          })}
                        </Diagnostic>
                      </ThumbBox>
                    ))}
                </StyledGrid>
              </StyledGrid>
            </BarContent>
          ) : null}
        </DrawerDiv>
      </div>
    </StickyDiv>
  ) : null;
};
