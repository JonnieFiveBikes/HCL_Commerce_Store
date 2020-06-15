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

//Custom libraries
import { TwoColumnsLeftFilterLayout } from "../../layouts/two-colums-left-filter";
import { SectionContent } from "../../layouts/sectionContentType";
import { BreadcrumbLayout } from "../../widgets/breadcrumb";
import { ProductFilterLayout } from "../../widgets/product-filter";
import { ProductGridLayout } from "../../widgets/product-grid";
import { CATEGORY_DISPLAY } from "../../../constants/marketing";

//Redux
import { TRIGGER_MARKETING_ACTION } from "../../../redux/actions/marketingEvent";

function CategoryProducts(props: any) {
  const dispatch = useDispatch();

  const { page } = props;
  const catId = page.externalContext.identifier;
  const categoryId = page.tokenValue;

  const topContentSection: SectionContent[] = [
    {
      key: `category-products-topContentSection-breadcrumb-${catId}`,
      CurrentComponent: () => {
        return <BreadcrumbLayout cid={`category-products-${catId}`} />;
      },
    },
  ];
  const rightContentSection: SectionContent[] = [
    {
      key: `category-products-rightContentSection-product-grid-${catId}`,
      CurrentComponent: () => {
        return (
          <ProductGridLayout
            cid={`category-products-${catId}`}
            categoryId={categoryId}
          />
        );
      },
    },
    {
      key: `category-products-rightContentSection-product-recommendation-${catId}`,
      CurrentComponent: () => {
        //place holder for product-recommendation layout.
        return <></>;
      },
    },
  ];

  const leftNavigationSection: SectionContent[] = [
    {
      key: `category-products-leftNavigationSection-product-filter-${catId}`,
      CurrentComponent: () => {
        return (
          <ProductFilterLayout
            cid={`category-products-${catId}`}
            categoryId={categoryId}
          />
        );
      },
    },
  ];

  useEffect(() => {
    const mtkParam = {
      categoryId: page.tokenValue,
      DM_ReqCmd: CATEGORY_DISPLAY,
    };
    dispatch(TRIGGER_MARKETING_ACTION(mtkParam));
  }, []);

  return (
    <>
      <TwoColumnsLeftFilterLayout
        cid={`category-products-${catId}`}
        leftNavigationSection={leftNavigationSection}
        rightContentSection={rightContentSection}
        topContentSection={topContentSection}
        page={page}
      />
    </>
  );
}

export default CategoryProducts;
