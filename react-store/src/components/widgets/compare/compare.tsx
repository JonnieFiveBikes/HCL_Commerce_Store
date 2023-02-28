/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import {
  CustomTable,
  StyledCardMedia,
  StyledIconButton,
  StyledLink,
  StyledButton,
  StyledProgressPlaceholder,
  StyledSwatch,
  StyledTypography,
  withCustomTableContext,
} from "@hcl-commerce-store-sdk/react-component";
import { cloneDeep, uniqBy } from "lodash-es";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { EMPTY_STRING, STRING_TRUE, S_MOBILE_W } from "../../../constants/common";
import { useWinDimsInEM } from "../../../_foundation/hooks/use-win-dims-in-em";
import { useSite } from "../../../_foundation/hooks/useSite";
import { useDispatch, useSelector } from "react-redux";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import * as catActs from "../../../redux/actions/catalog";
import storeUtil from "../../../utils/storeUtil";
import FormattedPriceDisplay from "../formatted-price-display";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import styled from "@mui/styled-engine-sc";

const HeaderWrapper = styled("div")`
  ${({ theme }) => `
    position: relative;
    display: flex;
    flex-direction: column;

    .closeButton {
      position: absolute;
      right: 0;
      top: 0;
      padding: 0;
      color: ${theme.palette.text.secondary};

      &:hover {
        color: ${theme.palette.primary.dark};
      }
    }

    &.data-col {
      justify-content: flex-start;
    }

    &.ph-col {
      justify-content: center;
    }

    .addAnotherProduct {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: ${theme.spacing(0.5)};
      color: ${theme.palette.primary.dark};
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }

      .icon {
        background: ${theme.palette.primary.dark};
        color: white;
        width: ${theme.spacing(5)};
        height: ${theme.spacing(5)};
        border-radius: ${theme.spacing(2.5)};
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.75;
      }
    }
  `}
`;

const MobileDisplay = styled(({ label, ...props }) => <StyledTypography {...props}>{label}</StyledTypography>)`
  ${({ theme }) => `
    word-break: break-word;
    display: flex;
    text-align: center;
    align-items: center;
  `}
`;

const ThumbnailTemplate = ({ seo, thumbnail, name }) => {
  return (
    <StyledLink to={seo?.href ?? ""}>
      <LazyLoadComponent visibleByDefault={(window as any).__isPrerender__ || false}>
        <StyledCardMedia image={thumbnail} title={name} />
      </LazyLoadComponent>
    </StyledLink>
  );
};

const HeaderTemplate = ({ current }) => {
  const { context, title, prices, currency, keyLookup } = current ?? {};
  const { from, imageSrc, product, all, setProdsById } = context ?? {};
  const { t } = useTranslation();
  const navigate = useNavigate();

  return current ? (
    <HeaderWrapper className={context.product ? "data-col" : "ph-col"}>
      {context.product ? (
        <>
          <StyledIconButton
            data-testid={`product-compare-${product.partNumber?.toLowerCase()}-close-button`}
            className="closeButton"
            onClick={() => {
              delete all[product.id];
              setProdsById({ ...all });
            }}>
            <CloseIcon />
          </StyledIconButton>
          <ThumbnailTemplate {...imageSrc} />
          <div className="text">{t(title)}</div>
          <StyledTypography variant="subtitle1">
            <FormattedPriceDisplay {...{ currency, ...prices }} />
          </StyledTypography>
        </>
      ) : (
        <>
          <div className="addAnotherProduct">
            <StyledButton
              variant="text"
              testId={`product-compare-add-another-product-${keyLookup?.key}`}
              onClick={() => navigate(from, { state: { compare: all } })}>
              <div className="icon">
                <AddIcon />
              </div>
            </StyledButton>
          </div>
          <StyledTypography className="addAnotherProduct" variant="body2" component="div">
            {t(title)}
          </StyledTypography>
        </>
      )}
    </HeaderWrapper>
  ) : null;
};

const DisplayTemplate = ({ rowData, current }) => {
  const T = rowData[current.keyLookup.key];
  return typeof T === "object" ? (
    <StyledTypography component="div" style={T.style}>
      {T.jsx}
    </StyledTypography>
  ) : (
    <>{T}</>
  );
};

const useCompareHelper = () => {
  const findAttrs = (product) => {
    const attrMap = product.attributes.reduce((m, v) => {
      m[v.identifier] = v;
      return m;
    }, {});
    return attrMap;
  };

  const mapToArray = (m) => {
    const asArray = Object.values<any>(m)
      .sort((a, b) => a.seq - b.seq)
      .map(({ obj }) => Object.assign(obj, { attrMap: findAttrs(obj) }));
    return asArray;
  };

  const findCompAttrs = (products) => {
    const attrs: any[] = [];
    products.forEach((p) => {
      p.attributes
        .filter(({ comparable: c }) => c === STRING_TRUE)
        .forEach(({ identifier, name, sequence }) => attrs.push({ identifier, name, sequence }));
    });
    const uniq = uniqBy(attrs, "identifier").sort((a, b) =>
      a.sequence === b.sequence ? a.name.localeCompare(b.name) : a.sequence - b.sequence
    );
    return uniq;
  };

  const products2Headers = (products, max, productsById, setProdsById, from, currency) => {
    const prodWidths = Math.floor(85.0 / max);
    const INIT_HEADER = {
      idProp: "__rid",
      display: {
        template: DisplayTemplate,
        cellStyle: {
          verticalAlign: "middle",
          wordBreak: "break-word",
          width: `${prodWidths}%`,
        },
      },
    };
    const attrWidth = 100 - prodWidths * max;
    const headers: any[] = [];

    // add column for attr names to the front
    headers.push({
      ...cloneDeep(INIT_HEADER),
      title: "",
      headerStyle: { verticalAlign: "top", width: `${attrWidth}%` },
      context: { all: productsById, from },
      keyLookup: { key: "__attr" },
      display: {
        template: DisplayTemplate,
        cellStyle: {
          fontWeight: "700",
          textAlign: "right",
          width: `${attrWidth}%`,
        },
      },
    });

    // products as columns
    headers.push(
      ...products.map((h) => ({
        ...cloneDeep(INIT_HEADER),
        headerStyle: { verticalAlign: "top", width: `${prodWidths}%` },
        title: h.name,
        prices: storeUtil.getOfferPrice(h),
        currency,
        header: HeaderTemplate,
        keyLookup: { key: h.id },
        context: {
          imageSrc: h,
          product: h,
          all: productsById,
          setProdsById,
          from,
        },
      }))
    );

    // placeholder columns
    for (let i = headers.length; i <= max; ++i) {
      headers.push({
        ...cloneDeep(INIT_HEADER),
        headerStyle: { verticalAlign: "middle", width: `${prodWidths}%` },
        title: "compare.addAnother",
        header: HeaderTemplate,
        keyLookup: { key: `placeholder-${i}` },
        context: { all: productsById, from },
      });
    }

    return headers;
  };

  const changeThumbnail = (attrId, valId, product, rows, setRows, headers) => {
    const sku = (product.items ?? []).find((sku: any) => {
      const attr = sku.attributes?.find(({ identifier: id }) => attrId === id);
      return !!attr?.values?.find(({ identifier: id }) => valId === id);
    });
    if (sku) {
      const h = headers.find((h) => h.keyLookup.key === product.id);
      h.context.imageSrc = sku;

      // trigger re-render
      setRows([...rows]);
    }
  };

  const getAttrValueDisplay = (id, product, t, rows, setRows, headers) => {
    const attr = product.attrMap[id];
    const attrVals = attr?.values ?? [{ value: t("compare.notavl") }];
    const vals: any[] = [];
    const jsxVals: any[] = [];

    attrVals.forEach(({ identifier, image1path: img, value: v }) => {
      const images = img?.length ? (Array.isArray(img) ? img : [img]) : [];
      const ids = Array.isArray(identifier) ? identifier : [identifier];
      const attrVals = Array.isArray(v) ? v : [v];
      if (images.length) {
        jsxVals.push(
          ...images.map((i, x) => (
            <StyledSwatch
              data-testid={`product-compare-${product.partNumber?.toLowerCase()}-swatch-${attrVals[x]}`}
              style={{ backgroundImage: `url("${i}")` }}
              key={`${id}_${x}`}
              title={attrVals[x]}
              onClick={(e) => changeThumbnail(attr.identifier, ids[x], product, rows, setRows, headers)}
            />
          ))
        );
      } else {
        vals.push(...attrVals);
      }
    });

    const strVals = vals.map((v, i) => (vals.length > 1 ? <li key={i}>{v}</li> : <Fragment key={i}>{v}</Fragment>));

    return { strVals, jsxVals };
  };

  const attrs2Rows = (attrs, products, t, setRows, headers) => {
    const rows: any[] = [];

    // attributes as rows
    rows.push(
      ...attrs.map(({ identifier: id, name }) => {
        const asRows = {};
        products.forEach((v) => {
          const { strVals, jsxVals } = getAttrValueDisplay(id, v, t, rows, setRows, headers);
          asRows[v.id] = {
            jsx: jsxVals.length ? jsxVals : strVals,
            style: jsxVals.length ? { textAlign: "center" } : { height: "100%" },
          };
        });
        return { __rid: id, __attr: name, ...asRows };
      })
    );

    return rows;
  };

  return { mapToArray, findCompAttrs, products2Headers, attrs2Rows };
};

export const CompareWidget = (props) => {
  const { data, from } = props;
  const { checked } = data;
  const [productsById, setProdsById] = useState({ ...checked });
  const { t } = useTranslation();
  const { w } = useWinDimsInEM();
  const { mySite } = useSite();
  const curr = mySite?.defaultCurrencyID ?? EMPTY_STRING;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contractId = useSelector(currentContractIdSelector);
  const cache = useSelector((r: any) => r.catalog.productCache.byId);
  const [init, setInit] = useState(false);
  const { mapToArray, findCompAttrs, products2Headers, attrs2Rows } = useCompareHelper();
  const nProds = useMemo(() => Object.keys(productsById ?? {}).length, [productsById]);
  const getProductInfo = useCallback(
    (ids) => {
      const parameters: any = {
        storeId: mySite.storeID,
        catalogId: mySite.catalogID,
        id: ids,
        contractId,
      };

      dispatch(catActs.getProductListDetailsAction({ parameters }));
    },
    [mySite, contractId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    // update input object as well -- this won't change the state (or cause a re-render),
    //   but it **WILL** update the object (by reference) -- when the navigate back is
    //   clicked, it will reference this object which will have the correct data
    Object.keys(checked)
      .filter((k) => !productsById[k])
      .forEach((k) => delete checked[k]);

    // fetch SKUs for any others
    const ofInterest = Object.entries<any>(productsById)
      .map(([id, o]) => {
        const rc = !o.obj.items && !cache[id] ? id : undefined;
        if (!o.obj.items && cache[id]) {
          o.obj = { ...o.obj, items: cache[id].items };
        }
        return rc;
      })
      .filter((p) => p);

    if (ofInterest.length) {
      getProductInfo(ofInterest);
    } else {
      setInit(true);
    }
  }, [cache, productsById]); // eslint-disable-line react-hooks/exhaustive-deps

  const [rows, setRows] = useState<any[]>([]);

  const { columns } = useMemo(() => {
    let c;
    if (init) {
      const products = mapToArray(productsById);
      const attrs = findCompAttrs(products);
      c = products2Headers(products, data.max, productsById, setProdsById, from, curr);
      const rows = attrs2Rows(attrs, products, t, setRows, c);
      setRows(rows);
    }
    return { columns: c };
  }, [productsById, t, init, data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nProds === 0) {
      navigate(from, { state: { compare: productsById } });
    }
  }, [nProds]); // eslint-disable-line react-hooks/exhaustive-deps

  const T = useMemo(() => withCustomTableContext(CustomTable), []);
  return nProds > 0 ? (
    <>
      {w > S_MOBILE_W ? (
        <>
          {init ? (
            <T
              {...{
                t,
                style: { height: "100%" },
                className: "inner-borders",
                data: rows,
                columns,
                outerClassName: "compare-product-table",
                labels: {},
              }}
            />
          ) : (
            <StyledProgressPlaceholder />
          )}
        </>
      ) : (
        <MobileDisplay className="full-height" variant="h1" label={t("compare.tabletOrDesk")} />
      )}
    </>
  ) : null;
};
