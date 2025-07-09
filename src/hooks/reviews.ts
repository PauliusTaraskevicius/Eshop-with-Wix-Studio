import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  createProductReview,
  createProductReviewValues,
} from "@/wix-api/reviews";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProductReview() {
  return useMutation({
    mutationFn: (values: createProductReviewValues) =>
      createProductReview(wixBrowserClient, values),
    onError(error) {
      console.error(error);
      toast.error("Failed to create review. Please try again.");
    },
  });
}
