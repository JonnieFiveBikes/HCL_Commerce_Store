/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *---------------------------------------------------
 */
//Standard libraries
import React from "react";
import { useTranslation } from "react-i18next";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
import { useSelector } from "react-redux";

//Foundation libraries
import { useSite } from "./useSite";
import productsService from "../apis/search/products.service";

//Redux
import { currentContractIdSelector } from "../../redux/selectors/contract";
import MerchandisingAssociationWidget from "../../components/commerce-widgets/merchandising-association-widget";

export const useMerchandisingAssociation = (props: any) => {
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
  const widgetName = getDisplayName(MerchandisingAssociationWidget);
  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const { mySite } = useSite();
  const storeId: string = mySite ? mySite.storeID : "";
  const catalogIdentifier: string = mySite ? mySite.catalogID : "";
  const contract = useSelector(currentContractIdSelector);
  const partNumber = props.page.externalContext.identifier;
  const { t } = useTranslation();
  const recommendedProdTitle = t("productDetail.recommendedProdTitle");
  const payloadBase: any = {
    widget: widgetName,
  };

  /**
   *Get product information from part number
   */
  const getProductDetails = () => {
    let parameters: any = {
      storeId: storeId,
      partNumber: partNumber,
      contractId: contract,
      catalogId: catalogIdentifier,
      ...payloadBase,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    productsService
      .findProductsUsingGET(parameters)
      .then((productData: any) => {
        const productDetails = productData.data.contents;
        if (productDetails && productDetails.length > 0) {
          getMerchandisingAssociationDetails(productDetails);
        }
      })
      .catch((e) => {
        console.log("Could not retrieve product details page informarion", e);
      });
  };

  const getMerchandisingAssociationDetails = (pdpData: any) => {
    let productList: any[] = [];

    if (pdpData && pdpData[0]?.merchandisingAssociations) {
      let merchandisingDetails = pdpData[0]?.merchandisingAssociations;
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

  React.useEffect(() => {
    if (mySite) {
      getProductDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    recommendedProdTitle,
    productList,
  };
};
