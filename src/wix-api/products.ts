import { cache } from "react";
import { WixClient } from "@/lib/wix-client.base";

export type ProductsSort = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsFilter {
  q?: string;
  collectionsIds?: string[] | string;
  sort?: ProductsSort;
  skip?: number;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
}

export async function queryProducts(
  wixClient: WixClient,
  {
    collectionsIds,
    sort = "last_updated",
    skip,
    limit,
    q,
    priceMax,
    priceMin,
  }: QueryProductsFilter
) {
  let query = wixClient.products.queryProducts();

  if (q) {
    query = query.startsWith("name", q);
  }

  const collectionIdsArray = collectionsIds
    ? Array.isArray(collectionsIds)
      ? collectionsIds
      : [collectionsIds]
    : [];

  if (collectionIdsArray.length > 0) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }

  switch (sort) {
    case "price_asc":
      query = query.ascending("price");
      break;
    case "price_desc":
      query = query.descending("price");
      break;
    case "last_updated":
      query = query.descending("lastUpdated");
      break;
    default:
      break;
  }

  if (priceMin) {
    query = query.ge("priceData.price", priceMin);
  }

  if (priceMax) {
    query = query.le("priceData.price", priceMax);
  }

  if (limit) query = query.limit(limit);
  if (skip) query = query.skip(skip);

  return query.find();
}

export const getProductBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { items } = await wixClient.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();

    const product = items[0];

    if (!product || !product.visible) {
      return null;
    }

    return product;
  }
);
