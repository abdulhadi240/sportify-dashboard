import "./globals.css";
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
        </Suspense>
      </body>
    </html>
  );
}
