/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */

//Standard libraries
import React, { Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
//Redux
import { useWishList } from "../../../_foundation/hooks/use-wishlist";
//UI
import {
  StyledTypography,
  StyledCard,
  StyledCardMedia,
  StyledGrid,
  StyledCircularProgress,
} from "@hcl-commerce-store-sdk/react-component";
import { WISH_LIST } from "../../../constants/routes";

interface DisplayWishListViewProps {
  wishList: any;
}

const DisplayWishList: React.FC<DisplayWishListViewProps> = (props: any) => {
  const { deleteWishList, getProductsData, productsData } = useWishList();
  const { wishList } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const recentProducts = productsData.slice(0, 3);

  useEffect(() => {
    if (wishList) {
      getProductsData(wishList);
    }
  }, [wishList, getProductsData]);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      setLoading(false);
    }
    if (!wishList.item) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsData]);

  const cardActions = [
    {
      text: t("WishList.ViewList"),
      link: WISH_LIST + "/" + wishList.uniqueID,
      state: {
        wishListId: wishList.uniqueID,
      },
    },
    {
      text: t("WishList.Actions.DeleteList"),
      enableConfirmation: true,
      handleClick: () => {
        deleteWishList(wishList.uniqueID, wishList.description);
      },
    },
  ];

  const contentComponent = (
    <>
      <StyledTypography className="shipment-group-heading wrapText">{wishList.description}</StyledTypography>
      {wishList.item ? <StyledTypography> {t("WishList.WishListItemsMessage")}</StyledTypography> : null}
      <StyledGrid container spacing={1} justifyContent="flex-start" alignItems="flex-end" flex="1">
        {recentProducts.map((product) => (
          <Fragment key={product.partNumber}>
            <StyledGrid item>
              <StyledCardMedia component="img" image={product.thumbnail} size={120} />
            </StyledGrid>
          </Fragment>
        ))}
      </StyledGrid>
      {!wishList.item && (
        <StyledTypography className="top-margin-1 bottom-margin-10">
          {t("WishList.WishListEmptyMessage")}
        </StyledTypography>
      )}
    </>
  );
  return loading ? (
    <StyledCircularProgress />
  ) : (
    <StyledCard
      testId={`wishlist-card-${wishList.description}`}
      className="wishlist-card"
      contentComponent={contentComponent}
      cardActions={cardActions}
      confirmLabel={t("WishList.Confirm")}
      cancelLabel={t("WishList.Cancel")}
    />
  );
};

export default DisplayWishList;
