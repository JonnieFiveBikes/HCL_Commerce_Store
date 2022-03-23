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
//Standard libraries
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import Axios, { AxiosResponse, Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "./useSite";
import categoryService from "../apis/search/categories.service";
import { Page, Widget, WidgetProps } from "../constants/seo-config";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { GetCategoriesSelector } from "../../redux/selectors/category";
import storeUtil from "../../utils/storeUtil";

/**
 * useChildCategoryGrid hook will retrieve and process child categories of a category and make ready
 * for `ChildCategoryGridWidget`  {@link @hcl-commerce-store-sdk/react-component#ChildCategoryGridWidget | the Child Category Grid Widget}
 * @param page
 */
export const useChildCategoryGrid = (widget: Widget, page: Page) => {
  const widgetName = getDisplayName(widget.widgetName);
  const catId = page?.externalContext?.identifier;
  const [category, setCategory] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>(() => []);
  const [categoryTitle, setCategoryTitle] = useState<string>(() => "");
  const topCategoriesList = useSelector(GetCategoriesSelector);
  const { mySite } = useSite();
  const contract = useSelector(currentContractIdSelector);
  const { t } = useTranslation();
  const location: any = useLocation();

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
  };

  const breadcrumbTrail = useMemo(() => {
    if (category?.parentCatalogGroupID) {
      const { breadCrumbTrailEntryView }: any = location.state ?? {};
      const breadcrumbs = storeUtil.getCategoryBreadcrumbs(category.parentCatalogGroupID, topCategoriesList);
      return breadCrumbTrailEntryView || breadcrumbs;
    } else return null;
  }, [location.state, category?.parentCatalogGroupID, topCategoriesList]);

  const fetchCategory = async (catIdentifier: string) => {
    const param = {
      identifier: catIdentifier,
      catalogId: mySite.catalogID,
      query: {
        contractId: contract,
      },
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
      ...payloadBase,
    };

    try {
      const category = await categoryService
        .getV2CategoryResourcesUsingGET(param)
        .then((response: AxiosResponse<any>) => {
          return response?.data?.contents?.[0];
        });
      if (category) {
        setCategory(category);
      } else {
        setCategory(null);
      }
    } catch (e) {
      console.warn(widgetName, "fail to fetch category ", catIdentifier);
      setCategory(null);
    }
  };

  const getSubCategories = async (category: any) => {
    const parameters = {
      parentCategoryId: category.id,
      catalogId: mySite.catalogID,
      query: {
        contractId: contract,
      },
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
      ...payloadBase,
    };
    setCategoryTitle(t("ChildPimCategories.title", { name: category.name }));
    try {
      const subCategories = await categoryService
        .getV2CategoryResourcesUsingGET(parameters)
        .then((response: AxiosResponse<any>) => {
          return response.data.contents;
        });
      setCategories(subCategories);
    } catch (e) {
      console.warn(widgetName, "fail to fetch child categories from", category.name);
      setCategories([]);
    }
  };

  React.useEffect(() => {
    if (category && category.links.children) {
      getSubCategories(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  React.useEffect(() => {
    if (mySite && contract !== null) {
      fetchCategory(catId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId, mySite, contract]);

  React.useEffect(() => {
    return () =>
      //splice to empty array
      cancels.splice(0, cancels.length).forEach((cancel) => {
        cancel();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories,
    categoryTitle,
    breadcrumbTrail,
  };
};

export const withChildCategoryGrid =
  (WrappedComponent: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page }) => {
    const { categories, categoryTitle, breadcrumbTrail } = useChildCategoryGrid(widget, page);
    return categories.length > 0 ? (
      <WrappedComponent {...{ categories, categoryTitle, breadcrumbTrail }}></WrappedComponent>
    ) : null;
  };
