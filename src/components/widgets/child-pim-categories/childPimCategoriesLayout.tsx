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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Axios, { AxiosResponse, Canceler } from "axios";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import categoryService from "../../../_foundation/apis/search/categories.service";
//Custom libraries
import { CommerceEnvironment } from "../../../constants/common";
import { CategoryCardLayout } from "../category-card";
//Redux
import { currentContractIdSelector } from "../../../redux/selectors/contract";
//UI
import { StyledGrid, StyledTypography } from "../../StyledUI";
import "./childPimCategoriesLayout.scss";

function ChildPimCategoriesLayout({ cid, page, ...props }: any) {
  const catId = page.externalContext.identifier;
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>();
  const { mySite } = useSite();
  const contract = useSelector(currentContractIdSelector);
  const { t } = useTranslation();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];
  const getSubCategories = (catIdentifier: string) => {
    const param = {
      identifier: catIdentifier,
      catalogId: mySite.catalogID,
      $queryParameters: {
        contractId: contract,
      },
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    categoryService
      .getV2CategoryResourcesUsingGET(param)
      .then((response: AxiosResponse<any>) => {
        const category = response.data.contents[0];
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
            $queryParameters: {
              contractId: contract,
            },
            cancelToken: new CancelToken(function executor(c) {
              cancels.push(c);
            }),
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
          let buffer: any[] = [];
          for (let cat of subCategories) {
            const skeleton = JSON.parse(
              JSON.stringify(CommerceEnvironment.categorySkeleton)
            );
            skeleton.id = cat.identifier;
            skeleton.categoryInternal = cat;
            skeleton.seoUrl = cat.seo?.href;
            buffer.push(skeleton);
          }
          setCategories(buffer);
        }
      });
  };

  React.useEffect(() => {
    if (mySite && contract !== null) {
      getSubCategories(catId);
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [catId, mySite, contract]);

  return (
    <>
      {categories.length > 0 && (
        <StyledTypography variant="h4" className="vertical-margin-4">
          {categoryTitle}
        </StyledTypography>
      )}
      <StyledGrid container spacing={2}>
        {categories.map((cat: any) => (
          <StyledGrid item xs={12} md={6} key={cat.id}>
            <CategoryCardLayout renderingContext={cat} />
          </StyledGrid>
        ))}
      </StyledGrid>
    </>
  );
}

ChildPimCategoriesLayout.propTypes = {
  cid: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
};
export default ChildPimCategoriesLayout;
