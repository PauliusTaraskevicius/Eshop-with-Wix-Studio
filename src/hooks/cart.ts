import { addToCart, AddToCartValues, getCart } from "@/wix-api/cart";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";

import { wixBrowserClient } from "@/lib/wix-client-browser";
import { toast } from "sonner";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast.success("Item added to cart");
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to add item to cart. Please try again.");
    },
  });
}
