import Image from "next/image";
import Link from "next/link";

import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";

import { UserButton } from "@/components/UserButton";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import { MainNavigation } from "./MainNavigation";

export async function Navbar() {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto p-5 flex items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Flow Shop logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">Flow Shop</span>
          </Link>
          <MainNavigation collections={collections} />
        </div>
        <div className="flex items-center justify-center gap-5">
          <UserButton loggedInMember={loggedInMember} />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
