import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } = await wixClient.collections.getCollectionBySlug(
      slug
    );

    return collection || null;
  }
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") // all products
      .ne("_id", "7210d295-af0e-b820-ae05-37d46ff0d6f1") // featured productsfind();
      .find();

    return collections.items;
  }
);
