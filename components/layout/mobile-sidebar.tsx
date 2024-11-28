"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/providers/sidebar-provider";

export function MobileSidebar() {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggle}
      aria-label="Toggle Menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}