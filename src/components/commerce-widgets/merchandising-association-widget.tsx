/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
 *
 *==================================================
 */
//view is separated and liked with store sdk package
import { MerchandisingAssociationContent } from "@hcl-commerce-store-sdk/react-component";
//hooks
import { useMerchandisingAssociation } from "../../_foundation/hooks/use-merchandising-association";

//Custom libraries
import { ProductCardLayout } from "../../components/widgets/product-card";

function MerchandisingAssociationWidget({ page, ...props }: any) {
  const { recommendedProdTitle, productList } = useMerchandisingAssociation({
    page,
  });
  const slides: JSX.Element[] = [];
  productList?.forEach((product: any, index: number) => {
    slides.push(
      <ProductCardLayout product={product} key={`${product.id}_${index}`} />
    );
  });
  return productList && productList.length > 0 ? (
    <MerchandisingAssociationContent {...{ slides, recommendedProdTitle }} />
  ) : null;
}

export default MerchandisingAssociationWidget;
