import Link from "next/link";

import { media as wixMedia } from "@wix/sdk";
import { products } from "@wix/stores";

interface ProductProps {
  product: products.Product;
}

export const Product = ({ product }: ProductProps) => {
  const mainImage = product.media?.mainMedia?.image;

  const resizedImageUrl = mainImage?.url
    ? wixMedia.getScaledToFillImageUrl(mainImage.url, 700, 700, {})
    : null;

  return (
    <Link className="h-full" href={`/products/${product.slug}`}>
      <div className="overflow-hidden">
        <img
          src={resizedImageUrl || "/placeholder.png"}
          alt={mainImage?.altText || ""}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
};
