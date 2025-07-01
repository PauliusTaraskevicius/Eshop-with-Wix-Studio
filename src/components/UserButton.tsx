"use client";

import useAuth from "@/hooks/auth";
import { Button } from "./ui/button";
import { members } from "@wix/members";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  classname?: string;
}

export const UserButton = ({ loggedInMember, classname }: UserButtonProps) => {
  const { login, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button onClick={() => login()}>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-44 max-w-64">
        {loggedInMember && (
          <>
            <DropdownMenuLabel>
              Logged in as{" "}
              {loggedInMember?.contact?.firstName || loggedInMember?.loginEmail}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="size-4 mr-2" />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        {loggedInMember ? (
          <DropdownMenuItem onClick={() => logout()}>
            <LogOutIcon className="size-4 mr-2" />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => login()}>
            <LogInIcon className="size-4 mr-2" />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
