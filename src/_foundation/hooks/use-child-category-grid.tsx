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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Axios, { AxiosResponse, Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "./useSite";
import categoryService from "../apis/search/categories.service";
import { Page, Widget, WidgetProps } from "../constants/seo-config";
//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";

/**
 * useChildCategoryGrid hook will retrieve and process child categories of a category and make ready
 * for `ChildCategoryGridWidget`  {@link @hcl-commerce-store-sdk/react-component#ChildCategoryGridWidget | the Child Category Grid Widget}
 * @param page
 */
export const useChildCategoryGrid = (widget: Widget, page: Page) => {
  const widgetName = getDisplayName(widget.widgetName);
  const catId = page?.externalContext?.identifier;
  const [categories, setCategories] = useState<any[]>(() => []);
  const [categoryTitle, setCategoryTitle] = useState<string>(() => "");
  const { mySite } = useSite();
  const contract = useSelector(currentContractIdSelector);
  const { t } = useTranslation();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
  };

  const getSubCategories = (catIdentifier: string) => {
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
    categoryService
      .getV2CategoryResourcesUsingGET(param)
      .then((response: AxiosResponse<any>) => {
        const category = response?.data?.contents?.[0];
        if (category) {
          return category;
        } else {
          return null;
        }
      })
      .then((category: any) => {
        if (category && category.links.children) {
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
          setCategoryTitle(
            t("ChildPimCategories.title", { name: category.name })
          );
          return categoryService
            .getV2CategoryResourcesUsingGET(parameters)
            .then((response: AxiosResponse<any>) => {
              return response.data.contents;
            });
        } else {
          return null;
        }
      })
      .then((subCategories: any) => {
        if (subCategories) {
          setCategories(subCategories);
        }
      });
  };

  React.useEffect(() => {
    if (mySite && contract !== null) {
      getSubCategories(catId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId, mySite, contract]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories,
    categoryTitle,
  };
};

export const withChildCategoryGrid = (
  WrappedComponent: React.ComponentType<any>
): React.FC<WidgetProps> => ({ widget, page }) => {
  const { categories, categoryTitle } = useChildCategoryGrid(widget, page);
  return categories.length > 0 ? (
    <WrappedComponent {...{ categories, categoryTitle }}></WrappedComponent>
  ) : null;
};
