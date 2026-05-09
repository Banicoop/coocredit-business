import { Inter, Katibeh } from "next/font/google";

import localFont from "next/font/local";

export const atomiAge = localFont({
  src: [
    {
      path: "../fonts/atomic-age/AtomicAge-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-atomic-age",
});


export const nunitoSans = localFont({
  src: [
    {
      path: "../fonts/nunito-sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf",
      weight: "300",
      style: "Italic"
    },
    {
      path: "../fonts/nunito-sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/nunito-sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
      weight: "500",
      style: "normal"
    },
  ],
  variable: "--font-nunito-sans",
})

export const inter = Inter({
  variable: '--font-inter-face',
  subsets: ['latin']
})

export const katibeh = Katibeh({
    variable: '--font-katibeh-face',
    weight: ['400'],
    subsets: ['latin'],
    style: "normal"
})

