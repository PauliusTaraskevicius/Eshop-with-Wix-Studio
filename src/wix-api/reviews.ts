import { WixClient } from "@/lib/wix-client.base";
import { getLoggedInMember } from "./members";

export interface createProductReviewValues {
  productId: string;
  title: string;
  body: string;
  rating: number;
}

export async function createProductReview(
  wixClient: WixClient,
  { body, productId, rating, title }: createProductReviewValues
) {
  const member = await getLoggedInMember(wixClient);

  if (!member) {
    throw new Error("Must be logged in to create a review");
  }

  const authorName =
    member.contact?.firstName && member.contact.lastName
      ? `${member.contact?.firstName} ${member.contact?.lastName}`
      : member.contact?.firstName ||
        member.contact?.lastName ||
        member.profile?.nickname ||
        "Anonymous";

  return wixClient.reviews.createReview({
    author: {
      authorName,
      contactId: member.contactId,
    },
    entityId: productId,
    namespace: "stores",
    content: {
      title,
      body,
      rating,
    },
  });
}
