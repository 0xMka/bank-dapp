import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Web3Provider } from "@/config/Web3Provider";

import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BankDapp",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Web3Provider>
          <Toaster position="top-center" duration={8000} />
          <Layout>{children}</Layout>
        </Web3Provider>
      </body>
    </html>
  );
}
