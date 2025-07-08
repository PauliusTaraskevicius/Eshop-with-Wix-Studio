import { useCartCheckout } from "@/hooks/checkout";
import { ButtonProps } from "./ui/button";
import LoadingButton from "./LoadingButton";

export default function CheckoutButton(props: ButtonProps) {
  const { pending, startCheckoutFlow } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Checkout
    </LoadingButton>
  );
}
