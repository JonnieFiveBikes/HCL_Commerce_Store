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
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
//UI
import { StyledTypography, StyledCard, StyledGrid, StyledCardMedia } from "@hcl-commerce-store-sdk/react-component";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormattedPriceDisplay from "../../widgets/formatted-price-display";

interface WishListCardProps {
  product: any;
  toggleProductSelector: any;
  selectedLength: any;
  deleteListItem: any;
  addToCart: any;
}

/**
 * Wishlist Card component
 * displays the wishlist card by calling StyledCard
 * called by ViewWishList component for each product present in the wishlist
 * @param props
 */
const WishListCard: React.FC<WishListCardProps> = (props: any) => {
  const { product, toggleProductSelector, selectedLength, deleteListItem, addToCart } = props;
  const { __dispPrice: price, __defCurr: currency } = product;
  const { t } = useTranslation();
  const addProductToCart = useCallback(() => {
    addToCart([product]);
  }, [addToCart, product]); // eslint-disable-line react-hooks/exhaustive-deps
  const deleteFromWishList = useCallback(
    () => deleteListItem(product.giftListItemID, product.name),
    [deleteListItem, product]
  ); // eslint-disable-line react-hooks/exhaustive-deps
  const handleCardAreaSelector = () => toggleProductSelector(product.id);
  const cardActions = [
    {
      text: t("WishList.Actions.AddToCart"),
      handleClick: addProductToCart,
      disable: selectedLength > 1 && product.selected,
      outlined: true,
    },
    {
      text: t("WishList.Actions.Delete"),
      enableConfirmation: true,
      handleClick: deleteFromWishList,
      disable: selectedLength > 1 && product.selected,
    },
  ];
  const contentComponent = (
    <>
      {product.selected ? (
        <div style={{ position: "absolute" }}>
          <CheckCircleIcon color="primary" />
        </div>
      ) : null}
      <StyledGrid container direction="column" justifyContent="center" alignItems="stretch">
        <StyledGrid item>
          <StyledCardMedia image={product.thumbnail} />
        </StyledGrid>
        <StyledGrid item>
          <StyledTypography align="center">{product.name}</StyledTypography>
        </StyledGrid>
        <StyledGrid item>
          <StyledTypography align="center" color="primary">
            <FormattedPriceDisplay min={price?.min} max={price?.max} currency={currency} />
          </StyledTypography>
        </StyledGrid>
      </StyledGrid>
    </>
  );

  return (
    <StyledCard
      testId={`wishlist-${product.partNumber}`}
      key={product.partNumber}
      className={`wishlist-card ${product.selected ? "selected" : ""}`}
      cardAreaSelector={handleCardAreaSelector}
      contentComponent={contentComponent}
      cardActions={cardActions}
      confirmLabel={t("WishList.Confirm")}
      cancelLabel={t("WishList.Cancel")}
    />
  );
};

export { WishListCard };
