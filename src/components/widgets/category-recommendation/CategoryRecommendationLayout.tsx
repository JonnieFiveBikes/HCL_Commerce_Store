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
import React, { lazy, Suspense } from "react";
import HTMLReactParser from "html-react-parser";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import eSpotService from "../../../_foundation/apis/transaction/eSpot.service";
import categoryService from "../../../_foundation/apis/search/categories.service";
//Custom libraries
import { CommerceEnvironment } from "../../../constants/common";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
//UI
import {
  StyledGrid,
  StyledTypography,
  StyledProgressPlaceholder,
} from "../../StyledUI";

function CategoryRecommendationLayout({ cid, eSpot, ...props }: any) {
  const widgetName = getDisplayName(CategoryRecommendationLayout);

  const { eSpotName, type } = eSpot;
  const { page } = props;
  const { mySite } = useSite();
  const CategoryCardLayout = lazy(
    () => import("../category-card/CategoryCardLayout")
  );
  const contract = useSelector(currentContractIdSelector);
  const [showEspot, setShowEspot] = React.useState<boolean>(true);
  const [categoryList, setCategoryList] = React.useState<Array<object>>();
  const [categoryTitle, setCategoryTitle] = React.useState<string>();
  const [categoryESpot, setCategoryESpot] = React.useState<any>(null);
  const [
    categoryMarketingSpotIdentifier,
    setCategoryMarketingSpotIdentifier,
  ] = React.useState<string>();

  const ESPOT_TYPE_PAGE_PREFIX: string = "page-prefix";
  const ESPOT_TYPE_PAGE_SUFFIX: string = "page-suffix";
  const storeID: string = mySite ? mySite.storeID : "";
  const catalogID: string = mySite ? mySite.catalogID : "";
  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const initESpot = (pageName: string) => {
    let _eSpotName = eSpotName;
    if (type === ESPOT_TYPE_PAGE_SUFFIX) {
      _eSpotName = _eSpotName + pageName; // pagename
    } else if (type === ESPOT_TYPE_PAGE_PREFIX) {
      _eSpotName = pageName + _eSpotName;
    }
    const parameters: any = {
      storeId: storeID,
      name: _eSpotName,
      catalogId: catalogID,
      $queryParameters: {
        DM_ReturnCatalogGroupId: true,
        DM_ReturnCatalogEntryId: true,
      },
      ...payloadBase,
    };
    eSpotService
      .findByName(parameters)
      .then((res) => {
        const eSpotObject = res?.data.MarketingSpotData[0];
        const { marketingSpotIdentifier } = eSpotObject;
        const categoriesDescription: any[] =
          eSpotObject.baseMarketingSpotActivityData;
        const categoriesId: string[] = [];
        const categoriesEspot: object[] = [];
        const title = eSpotObject.marketingSpotDataTitle
          ? eSpotObject.marketingSpotDataTitle[0].marketingContentDescription[0]
              .marketingText
          : "";
        setCategoryTitle(title);
        setCategoryESpot(eSpotObject);
        setCategoryMarketingSpotIdentifier(marketingSpotIdentifier);
        for (const categoryDescription of categoriesDescription) {
          if (categoryDescription.baseMarketingSpotActivityID) {
            categoriesId.push(categoryDescription.baseMarketingSpotActivityID);
            categoriesEspot.push(categoryDescription);
          }
        }
        findCategoriesByUniqueId(categoriesId, categoriesEspot, eSpotObject);
      })
      .catch((e) => {
        //setShowEspot(false);
      });
  };
  const findCategoriesByUniqueId = (
    categoriesId: string[],
    categoriesEspot: object[],
    eSpotObject: any
  ) => {
    if (categoriesId && categoriesId.length > 0) {
      let requestParameters = {
        storeId: storeID,
        id: categoriesId,
        catalogId: catalogID,
        $queryParameters: {
          contractId: contract,
        },
        ...payloadBase,
      };
      categoryService
        .getV2CategoryResourcesUsingGET(requestParameters)
        .then((res) => {
          const categories = res?.data.contents;
          if (categories) {
            generateCategoryLists(
              categories,
              categoriesEspot,
              eSpotObject,
              categoriesId
            );
          }
        })
        .catch((e) => {});
    }
  };
  const generateCategoryLists = (
    categories: any[],
    categoryEspots: object[],
    eSpotObject: any,
    categoriesId: any[]
  ) => {
    let lists: object[] = [];
    for (let category of categories) {
      if (category) {
        let categorySkeleton = JSON.parse(
          JSON.stringify(CommerceEnvironment.categorySkeleton)
        );
        categorySkeleton.id = category.identifier;
        categorySkeleton.categoryInternal = category;
        categorySkeleton.eSpotInternal = eSpotObject;

        categorySkeleton.eSpotDescInternal = categoryEspots
          ? categoryEspots[categoriesId.indexOf(String(category.id))]
          : {};
        categorySkeleton.seoUrl = category.seo?.href;
        lists[categoriesId.indexOf(String(category.id))] = categorySkeleton;
      }
    }

    setCategoryList(lists);
  };

  React.useEffect(() => {
    if (
      mySite !== null &&
      mySite !== undefined &&
      page !== undefined &&
      page !== null &&
      contract !== null
    ) {
      initESpot(page.name);
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite, page, contract]);

  return showEspot ? (
    <>
      {categoryESpot && categoryMarketingSpotIdentifier && (
        <>
          {categoryTitle && (
            <StyledTypography variant="h4" className="vertical-margin-4">
              {HTMLReactParser(categoryTitle)}
            </StyledTypography>
          )}
        </>
      )}
      <StyledGrid container spacing={2} className="vertical-padding-2">
        {categoryList?.map((e: any) => (
          <StyledGrid
            item
            xs={12}
            md={6}
            key={e.id}
            id={`categoryRecommendation_div_2_${e.id}`}
            className="category-recommendation">
            <Suspense
              fallback={
                <StyledProgressPlaceholder className="vertical-padding-20" />
              }>
              <CategoryCardLayout renderingContext={e} />
            </Suspense>
          </StyledGrid>
        ))}
      </StyledGrid>
    </>
  ) : null;
}
CategoryRecommendationLayout.propTypes = {
  cid: PropTypes.string.isRequired,
  eSpot: PropTypes.object.isRequired,
  page: PropTypes.object,
};
export default CategoryRecommendationLayout;
