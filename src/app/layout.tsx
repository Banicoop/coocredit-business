import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { atomiAge, katibeh, nunitoSans } from "@/assets/constant/font.config";


const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "CooCredit Business - Manage customer businesses in a glance",
  description: "CooCredit is the operating system for community-led capital. Build enduring economic structures through field precision and institutional authority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${katibeh.variable} ${nunitoSans.variable} ${atomiAge.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
