import { getProductBySlug, getRelatedProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";
import { ProductDetails } from "./ProductDetail";
import { Metadata } from "next";
import { getWixServerClient } from "@/lib/wix-client.server";
import { Suspense } from "react";
import { delay } from "@/lib/utils";
import { Product } from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product?._id) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product on Flow Shop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product?._id) notFound();

  return (
    <main className="max-w-7xl mx-auto space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <hr />
      <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <RelatedProducts productId={product._id} />
      </Suspense>
    </main>
  );
};

export default Page;

interface RelatedProductsProps {
  productId: string;
}

async function RelatedProducts({ productId }: RelatedProductsProps) {
  await delay(2000);

  const relatedProducts = await getRelatedProducts(
    getWixServerClient(),
    productId
  );

  if (!relatedProducts.length) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Related products</h2>
      <div className="flex flex-col gap-5 sm:grid grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}

// interface ProductReviewsSectionProps {
//   product: products.Product;
// }
