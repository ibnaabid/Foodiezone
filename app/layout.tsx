import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PremiumNavbar } from "./Components/Navbar";
// import { PremiumNavbar } from "./Components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foodie Zone",
  description: "Order delicious food online with Foodie Zone",
  keywords: [
    "Foodie Zone",
    "Food Delivery",
    "Restaurant",
    "Food Ordering",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
     <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <PremiumNavbar />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}