"use client";

import { useCart } from "@/hooks/cart";
import { cart, currentCart } from "@wix/ecom";
import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export const ShoppingCartButton = ({
  initialData,
}: ShoppingCartButtonProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartQuery = useCart(initialData);

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    ) || 0;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
        <ShoppingCartIcon />
        <span className="absolute top-0 right-0 size-5 bg-primary text-xs text-primary-foreground flex items-center justify-center rounded-full">
          {totalQuantity < 10 ? totalQuantity : "9+"}{" "}
        </span>
      </Button>
    </div>
  );
};
