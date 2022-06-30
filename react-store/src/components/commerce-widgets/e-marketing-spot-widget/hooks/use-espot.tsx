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
//standard libraries
import HTMLReactParser, { DOMNode, Element, domToReact } from "html-react-parser";
import Axios, { Canceler } from "axios";
import React, { lazy, Suspense } from "react";
import getDisplayName from "react-display-name";
import { useTranslation } from "react-i18next";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
//hcl packages.
import {
  AttachmentLayout,
  ESpotState,
  StyledButton,
  StyledContainer,
  StyledLink,
  StyledProgressPlaceholder,
} from "@hcl-commerce-store-sdk/react-component";
import { constants, marketingConstants } from "@hcl-commerce-store-sdk/utils";
//redux
import { currentContractIdSelector } from "../../../../redux/selectors/contract";
import categoryService from "../../../../_foundation/apis/search/categories.service";
import productsService from "../../../../_foundation/apis/search/products.service";
//custom libraries
import AsyncCall from "../../../../_foundation/gtm/async.service";
import storeUtil from "../../../../utils/storeUtil";
import { Page, Widget, WidgetProps } from "../../../../_foundation/constants/seo-config";
import { ESPOT_ACTIONS, useESpotValue } from "./espot-context";
import { useESpotHelper } from "./use-espot-helper";
import { useSite } from "../../../../_foundation/hooks/useSite";
import { CommerceEnvironment, EMPTY_STRING, SLASH } from "../../../../constants/common";

/**
 * The hook for processing eSpot data.
 * @param widget the widget that contains eSpot.
 * @param page the page that contains this widget.
 * @returns an eSpot object
 */
export const useESpot = (widget: Widget, page: Page): ESpotState => {
  const { initESpot, allowGAEvent, performClick, processDxContent } = useESpotHelper(widget, page);
  const widgetName = getDisplayName(widget.widgetName);
  const { t } = useTranslation();

  const { mySite } = useSite();
  const { eSpot, dispatch: dispatchESpot } = useESpotValue();
  const contract = useSelector(currentContractIdSelector);
  const { emsName } = widget.properties || {};
  const [productRecommendedList, setProductRecommendedList] = React.useState<any[]>(() => []);
  const [recommendedProductTitle, setRecommendedProductTitle] = React.useState<string>(EMPTY_STRING);
  const storeID: string = mySite ? mySite.storeID : EMPTY_STRING;
  const catalogID: string = mySite ? mySite.catalogID : EMPTY_STRING;
  const CancelToken = Axios.CancelToken;
  let eSpotData: ESpotState = {
    content: {
      title: EMPTY_STRING,
      templates: [],
    },
    category: {
      title: EMPTY_STRING,
      id: EMPTY_STRING,
      categories: [],
    },
    catEntry: {
      title: EMPTY_STRING,
      catEntries: [],
      slides: [],
    },
  };

  const cancels: Canceler[] = [];

  const processESpot = async (pageName: string) => {
    const eSpotRoot = await initESpot(pageName);
    if (eSpotRoot) {
      processMarketingSpotData(eSpotRoot);
      //GA360
      if (mySite.enableGA && eSpotRoot.baseMarketingSpotActivityData && allowGAEvent(eSpotRoot)) {
        AsyncCall.sendPromotionImpression(eSpotRoot, {
          enableUA: mySite.enableUA,
          enableGA4: mySite.enableGA4,
        });
      }
    }
  };
  const processProductRecommendation = async (catEntries: any[]) => {
    const catalogSkeletonLists: any[] = [];
    const slides: JSX.Element[] = [];
    const payloadBase: any = {
      widget: widgetName,
      cancelToken: new CancelToken((c) => cancels.push(c)),
    };
    for (const product of catEntries) {
      if (product && product.attributes) {
        const productSkeleton = JSON.parse(JSON.stringify(CommerceEnvironment.productSkeleton));
        productSkeleton.id = product.productId;
        const storePath = product.attributes.find((a) => a.name === "rootDirectory").stringValue;
        const prod = {
          id: product.productId,
          name: product.description[0].productName,
          thumbnail: product.description[0].thumbnail
            ? product.description[0].thumbnail.indexOf("/") === 0
              ? `/${storePath}${product.description[0].thumbnail}`
              : `/${storePath}/${product.description[0].thumbnail}`
            : EMPTY_STRING,
          seo: { href: "#" },
          price: [
            {
              usage: "Offer",
              value: product.contractPrice
                ? contract && product.contractPrice.find((p) => p.contractID === contract)
                  ? product.contractPrice.find((p) => p.contractID === contract).contractPrice
                  : product.contractPrice[0].contractPrice
                : EMPTY_STRING,
            },
          ],
        };
        productSkeleton.productInternal = prod;
        productSkeleton.eSpotInternal = catEntries;
        productSkeleton.eSpotDescInternal = product;
        productSkeleton.seoUrl = prod.seo?.href;

        const n = storeUtil.toMap(product.properties ?? [], "baseMarketingKey");
        productSkeleton.__seq = parseInt(n.displaySequence?.baseMarketingValue);
        catalogSkeletonLists.push(productSkeleton);
      }
    }
    catalogSkeletonLists.sort((a, b) => (a.__seq < b.__seq ? -1 : 1));

    if (catalogSkeletonLists && catalogSkeletonLists.length > 0) {
      const requestParameters = {
        storeId: storeID,
        id: catalogSkeletonLists.map((p) => p.id),
        contractId: contract,
        cancelToken: new CancelToken((c) => {
          cancels.push(c);
        }),
        ...payloadBase,
      };
      let products;
      try {
        const res = await productsService.findProductsUsingGET(requestParameters);
        products = res.data.contents;
      } catch (e) {
        console.log(e);
        products = null;
      }

      if (products) {
        const _m = storeUtil.toMap(catalogSkeletonLists, "id");
        for (const product of products) {
          const p = _m[product.id];
          //remove wcsstore and hclstore prefix to match the thumbnail url created by eSpot data
          //so that we will not see flickering on page.
          product.thumbnail = product.thumbnail?.replace("/wcsstore", EMPTY_STRING).replace("/hclstore", EMPTY_STRING);
          Object.assign(p, { productInternal: product });
          p.seoUrl = product.seo?.href;
        }
        const ProductRecCard = lazy(
          () => import("../../../widgets/product-recommendation-card/product-recommendation-card")
        );
        catalogSkeletonLists?.forEach((e: any) => {
          slides.push(
            <Suspense fallback={<StyledProgressPlaceholder className="vertical-padding-20" />}>
              <ProductRecCard renderingContext={e} />
            </Suspense>
          );
        });
        setProductRecommendedList(slides);
      }
    }
  };

  const processCategoryRecommendation = async (categories: any) => {
    const categoriesId = categories.map((category) => category.baseMarketingSpotActivityID);
    let _categories;
    if (categoriesId && categoriesId.length > 0) {
      const requestParameters = {
        storeId: storeID,
        id: categoriesId,
        catalogId: catalogID,
        query: {
          contractId: contract,
        },
        widget: widgetName,
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      };

      try {
        const res = await categoryService.getV2CategoryResourcesUsingGET(requestParameters);
        _categories = res?.data.contents;
      } catch (e) {
        console.log(e);
        _categories = null;
      }
    }

    const _m = storeUtil.toMap(categories, "baseMarketingSpotActivityID");
    if (_categories) {
      _categories.forEach((_category) => {
        const _c = _m[_category.id] ?? {};
        const _p = _c?.properties ?? [];
        const _n = storeUtil.toMap(_p, "baseMarketingKey");
        const __seq = parseInt(_n.displaySequence?.baseMarketingValue);
        Object.assign(_category, { ..._c, __seq });
        _category.performClick = (event) => performClick(event, { eSpotDesc: _category });
      });
      _categories.sort((a, b) => (a.__seq < b.__seq ? -1 : 1));
      return _categories;
    } else {
      return [];
    }
  };

  const processMarketingContent = (content: any) => {
    // Define the component using Component decorator.
    const currentTemplate: any = {
      id: null,
      template: null,
      isDxContent: false,
    };
    const desc = content.marketingContentDescription;
    let assetSrc: string = EMPTY_STRING;
    let assetName: string = EMPTY_STRING;

    if (Array.isArray(content.attachmentAsset)) {
      const descs = content.attachmentDescription || [];
      const n = content.attachmentAsset.length;
      let src;
      let root;
      let desc;
      let isUrl;
      content.attachmentAsset.forEach((a, i) => {
        desc = descs.length === n ? descs[i].attachmentName : EMPTY_STRING;
        src = a.attachmentAssetPath;
        root = a.attachmentAssetRootDirectory;
        if (
          src &&
          root &&
          src.indexOf(constants.DX_IMAGE_PATH_STARTS_WITH) < 0 &&
          (src.indexOf(root) < 0 || src.indexOf(root) > 1)
        ) {
          src = `/${root}/${src}`;
        }
        isUrl = /^https?:\/\//.test(src);
        a.name = desc || (isUrl ? src : src.replace(/.+\/(.+)/, "$1").replace(/\?([^=]+=[^&]+&?)+/, ""));
        a.mimeType = isUrl ? "content/url" : a.attachmentAssetMimeType || "content/unknown";
        a.attachmentAssetPath = src;
      });

      const elem0 = content.attachmentAsset[0];
      if (elem0) {
        assetSrc = elem0.attachmentAssetPath;
        assetName = elem0.name;
      }
    }

    const replace = (node: DOMNode): any => {
      if (node instanceof Element && node.type === "tag" && node.name === "a") {
        return (
          <StyledLink
            {...(content.contentUrl === SLASH ? { testId: `${content.eSpotName}` } : {})}
            key={`content_${content.contentId}`}
            to={content.contentUrl}
            onClick={(event) => performClick(event, { eSpotDesc: content })}>
            {node.children && domToReact(node.children, { replace })}
          </StyledLink>
        );
      } else if (node instanceof Element && node.type === "tag" && node.name === "button") {
        const { class: className, tabindex, ...attrs } = node.attribs;
        const tabIndex = Number(tabindex);
        return (
          <StyledButton
            testId={`content-${content.contentId}`}
            variant="contained"
            color="secondary"
            {...{ className, tabIndex, ...attrs }}>
            {node.children && domToReact(node.children)}
          </StyledButton>
        );
      } else {
        return;
      }
    };

    if (content.contentFormatId === marketingConstants.CONTENT_FORMAT_ID.EXTERNAL) {
      currentTemplate.isDxContent = true;
      //dx content using url field to save content reference.
      if (content.contentUrl && content.contentUrl.startsWith(marketingConstants.HCL_Dx_PREFIX)) {
        currentTemplate.template = content.contentUrl.substr(marketingConstants.HCL_Dx_PREFIX.length);
      } else {
        currentTemplate.template = content.contentUrl || EMPTY_STRING;
      }
    } else if (desc && desc[0] && desc[0]["marketingText"] && desc[0]["marketingText"].length > 0) {
      const marketingText = desc[0].marketingText.trim();

      //each template text suppose to only have one <a> tag
      currentTemplate.template = HTMLReactParser(marketingText, {
        replace,
      });
    } else if (
      content.contentMimeType === "image" ||
      assetSrc.endsWith(".svg")
      //this probably a defect in marketing,
      //checking file extension to workaround this
    ) {
      currentTemplate.template = (
        <div>
          <StyledLink
            {...(content.contentUrl === SLASH ? { testId: `${content.eSpotName}` } : {})}
            to={content.contentUrl}
            onClick={(event) => performClick(event, { eSpotDesc: content })}>
            <LazyLoadComponent
              visibleByDefault={(window as any).__isPrerender__ || false}
              placeholder={<StyledProgressPlaceholder className="vertical-padding-20" />}>
              <img alt={assetName} src={assetSrc}></img>
            </LazyLoadComponent>
          </StyledLink>
        </div>
      );
    } else {
      currentTemplate.template = (
        <StyledContainer>
          <AttachmentLayout attachmentsList={content.attachmentAsset || []} />
        </StyledContainer>
      );
    }
    currentTemplate.id = content.contentId;
    return currentTemplate;
  };

  const processMarketingSpotData = async (eSpotRoot: any) => {
    const { eSpotName } = eSpotRoot;
    eSpotData = (eSpotRoot.baseMarketingSpotActivityData || []).reduce(
      (a, c) => {
        if (c.baseMarketingSpotDataType === marketingConstants.MARKETING_SPOT_DATA_TYPE.CONTENT) {
          a.content.templates.push({
            ...c,
            eSpotName,
            marketingSpotIdentifier: eSpotRoot.marketingSpotIdentifier,
          });
        } else if (
          (c.baseMarketingSpotDataType === marketingConstants.MARKETING_SPOT_DATA_TYPE.CATALOG_GROUP_ID ||
            c.baseMarketingSpotDataType === marketingConstants.MARKETING_SPOT_DATA_TYPE.CATEGORY) &&
          c.baseMarketingSpotActivityID
        ) {
          a.category.categories.push({
            ...c,
            eSpotName,
            marketingSpotIdentifier: eSpotRoot.marketingSpotIdentifier,
          });
        } else if (
          (c.baseMarketingSpotDataType === marketingConstants.MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID ||
            c.baseMarketingSpotDataType === marketingConstants.MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY) &&
          c.baseMarketingSpotActivityID
        ) {
          a.catEntry.catEntries.push({
            ...c,
            eSpotName,
            marketingSpotIdentifier: eSpotRoot.marketingSpotIdentifier,
          });
        }
        return a;
      },
      {
        content: {
          title: EMPTY_STRING,
          templates: [],
        },
        category: {
          title: EMPTY_STRING,
          id: EMPTY_STRING,
          categories: [],
        },
        catEntry: {
          title: EMPTY_STRING,
          catEntries: [],
          slides: [],
        },
      }
    );
    eSpotData.content.title = eSpotRoot.marketingSpotDataTitle
      ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0].marketingText
      : EMPTY_STRING;
    eSpotData.content.templates = eSpotData.content.templates.map(processMarketingContent);
    eSpotData.category.title = eSpotRoot.marketingSpotDataTitle
      ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0].marketingText
      : EMPTY_STRING;
    eSpotData.category.id = eSpotRoot.marketingSpotIdentifier;

    if (eSpotData.catEntry.catEntries.length > 0) {
      eSpotData.catEntry.title = eSpotRoot.marketingSpotDataTitle
        ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0].marketingText
        : t("productDetail.recommendedProdTitle");
      setRecommendedProductTitle(eSpotData.catEntry.title || "");
      await processProductRecommendation(eSpotData.catEntry.catEntries);
    }

    const dxPromise: Promise<
      | {
          dxContentId: string;
          content: any;
          contentType: string;
        }
      | {
          dxContentId: string;
          content?: undefined;
          contentType?: undefined;
        }
    >[] = [];
    const _templates: any[] = [];
    eSpotData.content.templates.forEach((t) => {
      if (t.isDxContent) {
        _templates.push(t);
        dxPromise.push(processDxContent(t.template));
      }
    });
    try {
      const dxcontents = await Promise.all(dxPromise);
      for (let i = 0; i < dxcontents.length; i++) {
        _templates[i] = Object.assign(_templates[i], dxcontents[i]);
      }
    } catch (e) {
      console.warn(e);
    }

    try {
      eSpotData.category.categories = await processCategoryRecommendation(eSpotData.category.categories);
    } catch (e) {
      console.warn(e);
    }

    dispatchESpot({
      type: ESPOT_ACTIONS.GET_ESPOT_CONTENT_CATEGORY_SUCCESS,
      payload: eSpotData,
    });
  };

  React.useEffect(() => {
    if (mySite && page && emsName) {
      let pageName = page.name;
      if (page.externalContext?.identifier) {
        pageName = page.externalContext.identifier;
      }
      processESpot(pageName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, mySite, emsName]);

  React.useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (productRecommendedList && productRecommendedList.length > 0) {
      dispatchESpot({
        type: ESPOT_ACTIONS.GET_ESPOT_PRODUCT_SLIDES_SUCCESS,
        payload: {
          slides: productRecommendedList,
          title: recommendedProductTitle,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productRecommendedList]);

  return eSpot;
};

/**
 * A high order component that wraps a component needs processed eSpot data.
 * @param Component the wrapping component.
 * @returns A component that has ability to process eSpot data.
 */
export const withUseESpot =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }: WidgetProps) => {
    const eSpot = useESpot(widget, page);
    return <Component eSpot={eSpot} {...props}></Component>;
  };
