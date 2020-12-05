/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { paramCase } from "change-case";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Custom libraries
import { categoryConfig } from "./categoryConstant";
import { ContentRecommendationLayout } from "../../widgets/content-recommendation";
import { CategoryPageLayout } from "../../layouts/category-page";
import { ChildPimCategoriesLayout } from "../../widgets/child-pim-categories";
import { SectionContent } from "../../layouts/sectionContentType";
import { CATEGORY_DISPLAY } from "../../../constants/marketing";
//Redux
import { TRIGGER_MARKETING_ACTION } from "../../../redux/actions/marketingEvent";

const Category: React.FC = (props: any) => {
  const widgetName = getDisplayName(Category);
  const dispatch = useDispatch();

  const { page } = props;
  const catId = page.externalContext.identifier;

  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const hero: SectionContent[] = [
    {
      key: `Category-${catId}-${paramCase(
        categoryConfig.hero.eSpot.eSpotName
      )}`,
      CurrentComponent: () => {
        return (
          <ContentRecommendationLayout
            cid={`Category-${catId}-${paramCase(
              categoryConfig.hero.eSpot.eSpotName
            )}`}
            eSpot={categoryConfig.hero.eSpot}
            page={page}
          />
        );
      },
    },
  ];

  const contentSection: SectionContent[] = [
    {
      key: `Category-${catId}}`,
      CurrentComponent: () => {
        return (
          <ChildPimCategoriesLayout cid={`Category-${catId}`} page={page} />
        );
      },
    },
  ];

  useEffect(() => {
    const mtkParam = {
      categoryId: page.tokenValue,
      DM_ReqCmd: CATEGORY_DISPLAY,
      ...payloadBase,
    };
    dispatch(TRIGGER_MARKETING_ACTION(mtkParam));

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, []);

  return (
    <CategoryPageLayout
      cid={page.externalContext.identifier}
      hero={hero}
      contentSection={contentSection}
      page={page}
    />
  );
};

export default Category;
