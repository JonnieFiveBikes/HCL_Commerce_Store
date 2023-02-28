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

import Axios, { Canceler } from "axios";
import { StyledLink, StyledTypography } from "@hcl-commerce-store-sdk/react-component";
import getDisplayName from "react-display-name";
import { useTranslation, Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PAGINATION_CONFIGS } from "../../../configs/catalog";
import { EMPTY_STRING, SELLER_FACET } from "../../../constants/common";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import { useSite } from "../../../_foundation/hooks/useSite";
import { getProductListAction } from "../../../redux/actions/catalog";
import { selectedSellersSelector } from "../../../redux/selectors/sellers";

const SellerLink = ({ breadcrumbs, sellerAttr }) => {
  const CancelToken = Axios.CancelToken;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cancels: Canceler[] = [];
  const cancelToken = new CancelToken((c) => cancels.push(c));
  const { mySite } = useSite();
  const currency: string = mySite?.defaultCurrencyID ?? EMPTY_STRING;
  const limit: number = PAGINATION_CONFIGS.pageLimit;
  const contractId = useSelector(currentContractIdSelector) ?? EMPTY_STRING;
  const widget = getDisplayName("UseProductDetails");
  const category = breadcrumbs ? breadcrumbs[breadcrumbs.length - 2] : null;
  const categoryId = category ? Number(category.value) : undefined;
  const { name: label, id: seller } = sellerAttr ?? {};

  const parameters: any = { categoryId, currency, contractId, limit, offset: 0, widget, cancelToken };
  const encLabel = encodeURIComponent(label).replace(/%20/g, "+");
  const selectedFacets = { [`${SELLER_FACET}%3A%22${encLabel}%22`]: label };
  const selectedSellers = useSelector(selectedSellersSelector);
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    // attach facets to redux state so they can be seen/loaded by PLP widgets
    //   (only if zero or more than 1 seller selected)
    if (selectedSellers?.length !== 1) {
      dispatch(getProductListAction({ parameters, states: { selectedFacets } }));
    }
    // go to category PLP
    navigate(category.seo.href);
  };

  return label && !mySite?.isB2B ? (
    <Trans
      values={{ seller: label }}
      i18nKey="productDetail.Seller"
      t={t}
      components={[
        <StyledTypography className="product-seller" variant="body2" />,
        category?.seo?.href && seller ? (
          <StyledLink to={category.seo.href} onClick={onClick} />
        ) : (
          <StyledTypography component="div" />
        ),
      ]}
    />
  ) : null;
};

export { SellerLink };
