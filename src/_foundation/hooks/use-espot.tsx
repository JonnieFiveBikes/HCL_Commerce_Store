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
import React, { lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import HTMLReactParser, { DomElement, domToReact } from "html-react-parser";
import Axios, { Canceler } from "axios";
import { Link, useHistory } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import getDisplayName from "react-display-name";
import { isNull } from "lodash-es";
//hcl packages.
import {
  StyledProgressPlaceholder,
  ESpotState,
} from "@hcl-commerce-store-sdk/react-component";
import { commonUtil, marketingConstants } from "@hcl-commerce-store-sdk/utils";
//foundation libraries
import { ESPOT_ACTIONS, useESpotValue } from "../context/espot-context";
import categoryService from "../apis/search/categories.service";
import { Page, Widget, WidgetProps } from "../constants/seo-config";
import eSpotService from "../apis/transaction/eSpot.service";
import { DISABLED_ESPOT_LIST } from "../constants/gtm";
import { useSite } from "./useSite";
import AsyncCall from "../gtm/async.service";
import { localStorageUtil } from "../utils/storageUtil";
import { LOCALE } from "../constants/common";
import mLConfigControllerService from "../apis/dx/mLConfigController.service";
import contentControllerService from "../apis/dx/contentController.service";
import productsService from "../apis/search/products.service";
//custom libraries
import { CLICK_EVENT_TRIGGERED_ACTION } from "../../redux/actions/marketingEvent";
import { ADD_ITEM_ACTION } from "../../redux/actions/order";
import { currentContractIdSelector } from "../../redux/selectors/contract";
import { CommerceEnvironment, EMPTY_STRING } from "../../constants/common";

/**
 * The hook for processing eSpot data.
 * @param widget the widget that contains eSpot.
 * @param page the page that contains this widget.
 * @returns an eSpot object
 */
export const useESpot = (widget: Widget, page: Page): ESpotState => {
  const ESPOT_TYPE_PAGE_SPECIFIC: string = "local";
  const widgetName = getDisplayName(widget.widgetName);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const _history = useHistory();
  const { mySite } = useSite();
  const { eSpot, dispatch: dispatchESpot } = useESpotValue();
  const contract = useSelector(currentContractIdSelector);
  const { emsName, emsType } = widget.properties || {};
  const [productRecommendedList, setProductRecommendedList] = React.useState<
    any[]
  >(() => []);
  const [recommendedProductTitle, setRecommendedProductTitle] =
    React.useState<string>(EMPTY_STRING);
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

  let cancels: Canceler[] = [];

  const allowGAEvent = (eSpotRoot) =>
    !DISABLED_ESPOT_LIST.includes(eSpotRoot.eSpotName);

  const initESpot = (pageName: string) => {
    let eSName = emsName;
    if (emsType === ESPOT_TYPE_PAGE_SPECIFIC) {
      eSName = pageName + eSName;
    }
    const parameters: any = {
      storeId: storeID,
      name: eSName,
      catalogId: catalogID,
      widget: widgetName,
      query: {
        DM_ReturnCatalogGroupId: true,
        DM_FilterResults: false,
      },
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    eSpotService
      .findByName(parameters)
      .then((res) => {
        const eSpotRoot = res.data.MarketingSpotData[0];
        processMarketingSpotData(eSpotRoot);
        //GA360
        if (
          mySite.enableGA &&
          eSpotRoot.baseMarketingSpotActivityData &&
          allowGAEvent(eSpotRoot)
        ) {
          AsyncCall.sendPromotionImpression(eSpotRoot, {
            enableUA: mySite.enableUA,
            enableGA4: mySite.enableGA4,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const processProductRecommendation = (catEntries: any[]) => {
    let catalogSkeletonLists: any[] = [];
    let slides: JSX.Element[] = [];
    const payloadBase: any = {
      widget: widgetName,
    };
    for (let product of catEntries) {
      if (product && product.attributes) {
        let productSkeleton = JSON.parse(
          JSON.stringify(CommerceEnvironment.productSkeleton)
        );
        productSkeleton.id = product.productId;
        const storePath = product.attributes.find(
          (a) => a.name === "rootDirectory"
        ).stringValue;
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
                ? contract
                  ? product.contractPrice.find((p) => p.contractID === contract)
                      .contractPrice
                  : product.contractPrice[0].contractPrice
                : EMPTY_STRING,
            },
          ],
        };
        productSkeleton.productInternal = prod;
        productSkeleton.eSpotInternal = catEntries;
        productSkeleton.eSpotDescInternal = product;
        productSkeleton.seoUrl = prod.seo?.href;
        catalogSkeletonLists.push(productSkeleton);
      }
    }

    if (catalogSkeletonLists && catalogSkeletonLists.length > 0) {
      let requestParameters = {
        storeId: storeID,
        id: catalogSkeletonLists.map((p) => p.id),
        cancelToken: new CancelToken((c) => {
          cancels.push(c);
        }),
        ...payloadBase,
      };
      productsService
        .findProductsUsingGET(requestParameters)
        .then((res) => {
          const products = res?.data.contents;
          if (products) {
            for (let product of products) {
              const p = catalogSkeletonLists.find((p) => p.id === product.id);
              //remove wcsstore and hclstore prefix to match the thumbnail url created by eSpot data
              //so that we will not see flickering on page.
              product.thumbnail = product.thumbnail
                .replace("/wcsstore", EMPTY_STRING)
                .replace("/hclstore", EMPTY_STRING);
              Object.assign(p, { productInternal: product });
              p.seoUrl = product.seo?.href;
            }
            const ProductRecCard = lazy(
              () =>
                import(
                  "../../components/widgets/product-recommendation-card/product-recommendation-card"
                )
            );
            catalogSkeletonLists?.forEach((e: any) => {
              slides.push(
                <Suspense
                  fallback={
                    <StyledProgressPlaceholder className="vertical-padding-20" />
                  }>
                  <ProductRecCard renderingContext={e} />
                </Suspense>
              );
            });
            setProductRecommendedList(slides);
          }
        })
        .catch((e) => console.log("Could not retrieve products"));
    }
  };

  const processCategoryRecommendation = (categories: any) => {
    const categoriesId = categories.map(
      (category) => category.baseMarketingSpotActivityID
    );
    if (categoriesId && categoriesId.length > 0) {
      const requestParameters = {
        storeId: storeID,
        id: categoriesId,
        catalogId: catalogID,
        $queryParameters: {
          contractId: contract,
        },
        widget: widgetName,
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      };
      return categoryService
        .getV2CategoryResourcesUsingGET(requestParameters)
        .then((res) => {
          const _categories = res?.data.contents;
          if (_categories) {
            _categories.forEach((_category) => {
              const _c =
                categories.find(
                  (c) => c.baseMarketingSpotActivityID === _category.id
                ) || {};
              Object.assign(_category, { ..._c });
              _category.performClick = (event) =>
                performClick(event, { eSpotDesc: _category });
            });
            return _categories;
          } else {
            return [];
          }
        });
    } else {
      return Promise.resolve([]);
    }
  };

  const processDxContent = async (dxContentId: string) => {
    const locale =
      localStorageUtil.get(LOCALE)?.split("_")[0] ||
      CommerceEnvironment.dxLanguageMap[mySite.defaultLanguageID];
    const payload = {
      skipErrorSnackbar: true,
      content_id: dxContentId,
      access_type: "dxrest",
      locale,
      widget: widgetName,
      cancelToken: new CancelToken(function executor(c) {
        cancels.push(c);
      }),
    };
    const _data = await mLConfigControllerService
      .accessMLSTranslations(payload)
      .then((res) => {
        var mlcontentId: any;
        mlcontentId = res?.data?.translatedItems[locale].id;
        if (mlcontentId !== isNull) {
          const payload_translation = {
            dxContentId: mlcontentId,
            access_type: "dxrest",
            widget: widgetName,
            cancelToken: new CancelToken(function executor(c) {
              cancels.push(c);
            }),
          };
          return contentControllerService
            .webContentReadContent(payload_translation)
            .then((res) => {
              return res?.data;
            });
        }
      })
      .catch((error) => {
        return contentControllerService
          .webContentReadContent(payload)
          .then((res) => {
            return res?.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    if (_data?.content) {
      const content = _data.content;
      let contentType = EMPTY_STRING;
      let templateID = _data.links.contentTemplate.href;
      templateID = templateID.split("/content-templates/")[1];
      if (
        templateID === marketingConstants.CONTENT_TEMPLATE.VIDEO_TEMPLATE_ID
      ) {
        contentType = marketingConstants.CONTENT_TYPE_VIDEO;
      }
      return { dxContentId, content, contentType };
    }
    return { dxContentId };
  };

  const processMarketingContent = (content: any) => {
    // Define the component using Component decorator.
    let currentTemplate: any = {
      id: null,
      template: null,
      isDxContent: false,
    };
    const desc = content.marketingContentDescription;
    const assetSrc =
      content.attachmentAsset && content.attachmentAsset[0]
        ? content.attachmentAsset[0]["attachmentAssetPath"]
        : EMPTY_STRING;
    const assetName =
      content.attachmentDescription && content.attachmentDescription[0]
        ? content.attachmentDescription[0]["attachmentName"]
        : EMPTY_STRING;

    const replace = (node: DomElement): any => {
      if (node.type && node.type === "tag" && node.name && node.name === "a") {
        return (
          <Link
            key={`a_${content.contentId}}`}
            to={content.contentUrl}
            onClick={(event) => performClick(event, { eSpotDesc: content })}>
            {node.children && domToReact(node.children)}
          </Link>
        );
      } else {
        return;
      }
    };

    if (
      content.contentFormatId === marketingConstants.CONTENT_FORMAT_ID.EXTERNAL
    ) {
      currentTemplate.isDxContent = true;
      //dx content using url field to save content reference.
      if (
        content.contentUrl &&
        content.contentUrl.startsWith(marketingConstants.HCL_Dx_PREFIX)
      ) {
        currentTemplate.template = content.contentUrl.substr(
          marketingConstants.HCL_Dx_PREFIX.length
        );
      } else {
        currentTemplate.template = content.contentUrl || EMPTY_STRING;
      }
    } else if (
      desc &&
      desc[0] &&
      desc[0]["marketingText"] &&
      desc[0]["marketingText"].length > 0
    ) {
      const marketingText = desc[0].marketingText.trim();

      //each template text suppose to only have one <a> tag
      currentTemplate.template = HTMLReactParser(marketingText, {
        replace,
      });
    } else {
      currentTemplate.template = (
        <div>
          <Link
            to={content.contentUrl}
            onClick={(event) => performClick(event, { eSpotDesc: content })}>
            <LazyLoadComponent
              placeholder={
                <StyledProgressPlaceholder className="vertical-padding-20" />
              }>
              <img alt={assetName} src={assetSrc}></img>
            </LazyLoadComponent>
          </Link>
        </div>
      );
    }
    currentTemplate.id = content.contentId;
    return currentTemplate;
  };

  const processMarketingSpotData = async (eSpotRoot: any) => {
    const { eSpotName } = eSpotRoot;
    eSpotData = (eSpotRoot.baseMarketingSpotActivityData || []).reduce(
      (a, c) => {
        if (
          c.baseMarketingSpotDataType ===
          marketingConstants.MARKETING_SPOT_DATA_TYPE.CONTENT
        ) {
          a.content.templates.push({
            ...c,
            eSpotName,
            marketingSpotIdentifier: eSpotRoot.marketingSpotIdentifier,
          });
        } else if (
          (c.baseMarketingSpotDataType ===
            marketingConstants.MARKETING_SPOT_DATA_TYPE.CATALOG_GROUP_ID ||
            c.baseMarketingSpotDataType ===
              marketingConstants.MARKETING_SPOT_DATA_TYPE.CATEGORY) &&
          c.baseMarketingSpotActivityID
        ) {
          a.category.categories.push({
            ...c,
            eSpotName,
            marketingSpotIdentifier: eSpotRoot.marketingSpotIdentifier,
          });
        } else if (
          (c.baseMarketingSpotDataType ===
            marketingConstants.MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID ||
            c.baseMarketingSpotDataType ===
              marketingConstants.MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY) &&
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
      ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0]
          .marketingText
      : EMPTY_STRING;
    eSpotData.content.templates = eSpotData.content.templates.map(
      processMarketingContent
    );
    eSpotData.category.title = eSpotRoot.marketingSpotDataTitle
      ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0]
          .marketingText
      : EMPTY_STRING;
    eSpotData.category.id = eSpotRoot.marketingSpotIdentifier;

    if (eSpotData.catEntry.catEntries.length > 0) {
      eSpotData.catEntry.title = eSpotRoot.marketingSpotDataTitle
        ? eSpotRoot.marketingSpotDataTitle[0].marketingContentDescription[0]
            .marketingText
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
      eSpotData.category.categories = await processCategoryRecommendation(
        eSpotData.category.categories
      );
    } catch (e) {
      console.warn(e);
    }

    dispatchESpot({
      type: ESPOT_ACTIONS.GET_ESPOT_CONTENT_CATEGORY_SUCCESS,
      payload: eSpotData,
    });
  };

  const performClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    { eSpotDesc }: any
  ) => {
    dispatch(
      CLICK_EVENT_TRIGGERED_ACTION({
        eSpotDesc,
        widget: widgetName,
        cancelToken: new CancelToken(function executor(c) {
          cancels.push(c);
        }),
      })
    );
    const linkAction = commonUtil.parseConentUrl(
      eSpotDesc.contentUrl || EMPTY_STRING
    );
    if (eSpotDesc.contentUrl && linkAction) {
      event.preventDefault();
      switch (linkAction["action"]) {
        case "navigate":
          if (
            linkAction.toLink.length > 0 &&
            linkAction.toLink !== _history.location.pathname
          ) {
            _history.push(linkAction.toLink);
          }
          break;
        case "addToCart":
          const payload = {
            quantity: [1],
            partnumber: linkAction.partnumber,
            contractId: contract,
          };
          dispatch(ADD_ITEM_ACTION(payload));
          break;
        case "addToWishlist":
          //TODO
          break;
      }
    }
    //GA360
    if (mySite.enableGA && allowGAEvent(eSpotDesc)) {
      AsyncCall.sendPromotionClick(eSpotDesc, {
        enableUA: mySite.enableUA,
        enableGA4: mySite.enableGA4,
      });
    }
  };

  React.useEffect(() => {
    if (mySite && page && emsName) {
      let pageName = page.name;
      if (page.externalContext?.identifier) {
        pageName = page.externalContext.identifier;
      }
      initESpot(pageName);
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
