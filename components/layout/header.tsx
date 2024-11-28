"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileSidebar } from "./mobile-sidebar";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MobileSidebar />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}