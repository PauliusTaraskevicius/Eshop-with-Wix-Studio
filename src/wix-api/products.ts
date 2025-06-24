import { getWixClient } from "@/lib/wix-client.base";

type ProductsSort = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsFilter {
  collectionsIds?: string[] | string;
  sort?: ProductsSort;
}

export async function queryProducts({
  collectionsIds,
  sort = "last_updated",
}: QueryProductsFilter) {
  const wixClient = getWixClient();

  let query = wixClient.products.queryProducts();

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

  return query.find();
}
