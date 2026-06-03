import type { Metadata } from "next";
import { Inter, Katibeh, Poppins, Manrope } from "next/font/google";
import "./globals.css";
import { atomiAge, nunitoSans } from "@/assets/constant/font.config";
import { Toaster } from 'sonner';


const manrope = Manrope({
  variable: '--font-manrope-face',
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400', '500', '600', '700', '800']
})

const poppins = Poppins({
  variable: '--font-poppins-face',
  subsets: ['latin'],
  style: ['italic', 'normal'],
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
  metadataBase: new URL('https://coocredit-business.netlify.app/')
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
        ${manrope.variable}
        ${nunitoSans.variable} 
        ${atomiAge.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
