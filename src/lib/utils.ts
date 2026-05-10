import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };


export const isActive = (pathname: string, href: string, url: string) => {
  if (href === url) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
};

