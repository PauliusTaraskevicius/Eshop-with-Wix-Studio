"use client";

import useAuth from "@/hooks/auth";
import { Button } from "./ui/button";
import { members } from "@wix/members";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Check,
  LogInIcon,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  classname?: string;
}

export const UserButton = ({ loggedInMember, classname }: UserButtonProps) => {
  const { login, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => login()} variant='ghost' className={classname}>
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="size-4 mr-2" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="size-4 mr-2" />
                System default
                {theme === "system" && <Check className="size-4 mr-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="size-4 mr-2" />
                Light
                {theme === "light" && <Check className="size-4 mr-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="size-4 mr-2" />
                Dark
                {theme === "dark" && <Check className="size-4 mr-2" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
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
