import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TwoCoreX Sales — B2B Lead Intelligence",
  description: "TwoCoreX (OPC) Pvt Ltd — B2B Sales Intelligence Platform for Mumbai, Pune & Navi Mumbai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full bg-gray-50 overflow-x-hidden">
        <div className="flex h-full min-h-screen">
          <AppSidebar />
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
