import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/context/AuthContext";
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
    <html lang="en" suppressHydrationWarning >
      <body>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
