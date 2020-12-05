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
import React from "react";
import PropTypes from "prop-types";
//Custom libraries
import ProductCardLayout from "../product-card/ProductCardLayout";
//UI
import styled from "styled-components";
import {
  StyledTypography,
  StyledProductRecommendationSlider,
  StyledProgressPlaceholder,
} from "../../StyledUI";

const StyledProductRecommendationLayout = styled.div`
  ${({ theme }) => `
    margin: ${theme.spacing(4)}px 0;
  `}
`;

function MerchandisingAssociationLayout({ pdpData, ...props }: any) {
  const [productList, setProductList] = React.useState<Array<object>>();
  const ProductData = {
    productSkeleton: {
      id: "",
      name: "Product",
      thumbnail: "",
      attributes: [],
      seo: {
        href: "",
      },
      price: [],
    },
  };

  const getMerchandisingAssociationDetails = () => {
    let productList: any[] = [];
    let productDetails = pdpData;
    if (productDetails && productDetails[0]?.merchandisingAssociations) {
      let merchandisingDetails = productDetails[0]?.merchandisingAssociations;
      for (let p of merchandisingDetails) {
        let c = JSON.parse(JSON.stringify(ProductData.productSkeleton));
        c.id = p.id;
        c.name = p.name;
        c.thumbnail = p.thumbnail;
        c.attributes = p.attributes;
        c.seo.href = p.seo?.href; // TODO, need to implement
        c.price = p.price;
        productList.push(c);
      }
      setProductList(productList);
    }
  };
  let slides: JSX.Element[] = [];

  productList?.map((product: any, index: number) => {
    slides.push(
      <ProductCardLayout product={product} key={`${product.id}_${index}`} />
    );
  });

  React.useEffect(() => {
    getMerchandisingAssociationDetails();
  }, []);

  return productList && productList.length > 0 ? (
    <StyledProductRecommendationLayout>
      {slides && slides.length > 0 ? (
        <>
          <StyledTypography variant="h4">Recommended Products</StyledTypography>
          <StyledProductRecommendationSlider slidesList={slides} />
        </>
      ) : (
        <StyledProgressPlaceholder className="vertical-padding-5" />
      )}
    </StyledProductRecommendationLayout>
  ) : null;
}

MerchandisingAssociationLayout.propTypes = {
  pdpData: PropTypes.any,
};
export default MerchandisingAssociationLayout;
