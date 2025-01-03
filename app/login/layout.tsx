import "../globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@/components/ui/skeleton";


export const metadata: Metadata = {
  title: "Sportefy - Sports Facility Management",
  description: "Manage your sports facilities efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<Skeleton />}>
          <main className="p-6">{children}</main>
        </Suspense>{" "}
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SidebarProvider } from '@/components/providers/sidebar-provider';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthProvider } from '@/components/context/AuthContext';
export const metadata: Metadata = {
  title: 'Sportefy - Sports Facility Management',
  description: 'Manage your sports facilities efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
              <div className="flex-1 overflow-y-auto">
                <Suspense fallback={<Skeleton/>}>
                <main className="p-6">{children}</main>
                </Suspense>
              </div>
        <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}