import type { Metadata } from "next";
import { Inter, Katibeh, Poppins } from "next/font/google";
import "./globals.css";
import { atomiAge, nunitoSans } from "@/assets/constant/font.config";

const poppins = Poppins({
  variable: '--font-poppins-face',
  subsets: ['latin'],
  style: ['italic', 'italic'],
  weight: ['300', '400', '500', '600', '700', '800']
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700', '800']
})

export const katibeh = Katibeh({
    variable: '--font-katibeh-face',
    weight: ['400'],
    subsets: ['latin'],
    style: "normal"
})


export const metadata: Metadata = {
  title: {
    default: 'CooCredit Business - Manage customer businesses in a glance',
    template: '% CooCredit'
  },
  icons: {
    icon: '/logo.svg'
  },
  description: "CooCredit is the operating system for community-led capital. Build enduring economic structures through field precision and institutional authority",
  keywords: [
    'CooCredit', 'Loans', 'Loan', 'Micro Credit', 'Credit', 'Business', 'Transacion'
  ],
  metadataBase: new URL('https://')
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} 
        ${poppins.variable}
        ${katibeh.variable} 
        ${nunitoSans.variable} 
        ${atomiAge.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
