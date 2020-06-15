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
import React, { useEffect, useState } from "react";
import Axios, { Canceler } from "axios";
import { useDispatch, useSelector } from "react-redux";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import productsService from "../../../_foundation/apis/search/products.service";
//Custom libraries
import { ProductPageLayout } from "../../layouts/product-page";
import { SectionContent } from "../../layouts/sectionContentType";
import { ProductDetailsLayout } from "../../layouts/product-details-page";
import { ProductB2BDetailsLayout } from "../../layouts/product-details-page";
import { PRODUCT_DISPLAY } from "../../../constants/marketing";
import { MerchandisingAssociationLayout } from "../../widgets/merchandising-association";
import { BreadcrumbLayout } from "../../widgets/breadcrumb";
//Redux
import { TRIGGER_MARKETING_ACTION } from "../../../redux/actions/marketingEvent";
import { currentContractIdSelector } from "../../../redux/selectors/contract";
import * as catalogActions from "../../../redux/actions/catalog";

/**
 * Product page component
 * @param props
 */
const Product: React.FC = (props: any) => {
  let cancels: Canceler[] = [];
  const CancelToken = Axios.CancelToken;
  const mySite: any = useSite();
  const storeIdentifier: string = mySite ? mySite.storeID : "";
  const catalogIdentifier: string = mySite ? mySite.catalogID : "";
  const defaultCurrencyID: string = mySite ? mySite.defaultCurrencyID : "";
  const defaultLanguageID: string = mySite ? mySite.defaultLanguageID : "";
  const contract = useSelector(currentContractIdSelector);
  const dispatch = useDispatch();
  const { page } = props;
  const partNumber = page.externalContext.identifier;
  const [pdpData, setPdpData] = useState<any>(null);
  let categoryIdentifier: string = "";
  let productDetails: any;

  // Top section of the product includes breadcrumbs
  const topMarketingSection: SectionContent[] = [
    {
      key: `Product-${partNumber}-topMarketingSection`,
      CurrentComponent: () => {
        return (
          <>
            <BreadcrumbLayout cid={categoryIdentifier} />
          </>
        );
      },
    },
  ];

  // Commerce data section to display all the product information
  const commercedatasection: SectionContent[] = [
    {
      key: `Product-details-${partNumber}}`,
      CurrentComponent: () => {
        return (
          <>
            {mySite && mySite.isB2B ? (
              <ProductB2BDetailsLayout
                productPartNumber={partNumber}
                productLayout={page.layout}
                pdpData={pdpData}
                storeId={storeIdentifier}
              />
            ) : (
              <ProductDetailsLayout
                productPartNumber={partNumber}
                productLayout={page.layout}
                pdpData={pdpData}
                storeId={storeIdentifier}
              />
            )}
          </>
        );
      },
    },
  ];

  // Bottom marketing section to display merchandising association details
  const bottomMarketingSection: SectionContent[] = [
    {
      key: `Product-details-${partNumber}}`,
      CurrentComponent: () => {
        return (
          // placeholder for merchandising-association-layout
          <MerchandisingAssociationLayout pdpData={pdpData} />
        );
      },
    },
  ];

  /**
   *Get product information from part number
   */
  const getProductDetails = () => {
    let parameters: any = {
      storeId: storeIdentifier,
      partNumber: partNumber,
      contractId: contract,
      catalogId: catalogIdentifier,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    productsService
      .findProductsUsingGET(parameters)
      .then((productData: any) => {
        productDetails = productData.data.contents;
        if (productDetails && productDetails.length > 0) {
          let ids = productDetails[0].parentCatalogGroupID?.split("/");
          if (ids && ids.length > 0) {
            categoryIdentifier = ids[ids.length - 1];
          }
          setPdpData(productDetails);
          let parameters: any = {
            categoryId: categoryIdentifier,
            contractId: contract,
            currency: defaultCurrencyID,
            storeId: storeIdentifier,
            langId: defaultLanguageID,
            productName: productData.data.contents[0].name,
            cancelToken: new CancelToken(function executor(c) {
              cancels.push(c);
            }),
          };
          dispatch(
            catalogActions.getProductListForPDPAction({
              parameters: parameters,
            })
          );
        }
      })
      .catch((e) => {
        console.log("Could not retrieve product details page informarion", e);
      });
  };

  useEffect(() => {
    if (mySite !== null && mySite !== undefined) {
      getProductDetails();
      const mtkParam = {
        productId: page.tokenValue,
        DM_ReqCmd: PRODUCT_DISPLAY,
      };
      dispatch(TRIGGER_MARKETING_ACTION(mtkParam));
    }
    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [mySite, contract]);
  return (
    <ProductPageLayout
      cid={page.externalContext.identifier}
      topMarketingSection={topMarketingSection}
      commercedatasection={commercedatasection}
      bottomMarketingSection={bottomMarketingSection}
      page={page}
    />
  );
};

export default Product;
