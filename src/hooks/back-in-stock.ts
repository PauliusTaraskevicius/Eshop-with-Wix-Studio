import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  BackInStrockNotificationRequestValues,
  createBackInStrockNotificationRequest,
} from "@/wix-api/backInStockNotifications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBackInStrockNotificationRequest() {
  return useMutation({
    mutationFn: (values: BackInStrockNotificationRequestValues) =>
      createBackInStrockNotificationRequest(wixBrowserClient, values),
    onError(error) {
      console.error(error);
      if (
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast.error("You are already subscribed to this product.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
}
