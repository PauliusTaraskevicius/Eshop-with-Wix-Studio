import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { Button, ButtonProps } from "./ui/button";
import { addToCart } from "@/wix-api/cart";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export const AddToCartButton = ({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) => {
  return (
    <Button
      onClick={() =>
        addToCart({
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
    >
      Add to cart
    </Button>
  );
};
