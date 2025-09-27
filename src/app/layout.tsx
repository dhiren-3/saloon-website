// file: src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // <-- IMPORT OUR PROVIDER

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Grace Unisex Saloon",
  description: "Premium saloon services, ready for booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider> {/* <-- WRAP EVERYTHING */}
          <Navbar />
          <main>{children}</main>
        </AuthProvider> {/* <-- END WRAP */}
      </body>
    </html>
  );
}
