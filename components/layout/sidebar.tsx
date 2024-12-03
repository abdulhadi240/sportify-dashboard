"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  GamepadIcon,
  MapPin,
  Star,
  CreditCard,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/components/providers/sidebar-provider";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    label: "Bookings",
    icon: Calendar,
    href: "/bookings",
  },
  {
    label: "Games",
    icon: GamepadIcon,
    href: "/games",
  },
  {
    label: "Grounds",
    icon: MapPin,
    href: "/grounds",
  },
  {
    label: "Reviews",
    icon: Star,
    href: "/reviews",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-950 border-r transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-4 md:hidden">
            <h1 className="text-2xl font-bold text-purple-600">Sportefy</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              className="md:hidden"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden md:flex md:px-6 md:py-4">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Sportefy</h1>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2">
            <nav className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={close}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === route.href
                      ? "text-purple-600 bg-purple-100/50"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-100/50"
                  )}
                >
                  <route.icon className={cn(
                    "h-5 w-5 mr-3",
                    pathname === route.href ? "text-purple-600" : "text-gray-500"
                  )} />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t px-3 py-2">
            <Link
              href="/settings"
              onClick={close}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === "/settings"
                  ? "text-purple-600 bg-purple-100/50"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-100/50"
              )}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-purple-600 hover:bg-purple-100/50"
              onClick={() => {}}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}