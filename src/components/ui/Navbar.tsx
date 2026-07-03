'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Flex } from "./ui-layout";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};


type ctaProps = {
    label: string;
    href: string;
    className?: string
}

interface NavbarProps {
  logo: any;
  items: NavItem[];
  cta?: ctaProps[];
  trackActive?: boolean; // 👈 enable scroll tracking
}

export function Navbar({
  logo,
  items,
  cta,
  trackActive = false,
}: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0]?.href);

  // Scroll tracking (optional)
  useEffect(() => {
    if (!trackActive) return;

    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.querySelector(item.href);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveItem(item.href);
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items, trackActive]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    setActiveItem(href);
    setOpenMenu(false);

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-9999 h-20 border-b bg-[#F8FAFC] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-full flex items-center justify-between">

        {/* Logo */}
        <Image src={logo} alt="logo" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={clsx(
                "transition",
                activeItem === item.href
                  ? "text-brand border-b border-brand"
                  : "hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Flex className="gap-2.5">
          {cta?.map((cta: ctaProps) => (
            <Link
              href={cta.href}
              key={cta.href}
              className={cn("hidden md:inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand/90 transition", cta.className)}
            >
              {cta.label}
            </Link>
            ))}
        </Flex>


        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand cursor-pointer"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          {openMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden transition-all duration-300 overflow-hidden bg-white border-b",
          openMenu ? "max-h-100 py-4" : "max-h-0"
        )}
      >
        <div className="flex flex-col px-6 gap-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={clsx(
                "text-sm font-medium",
                activeItem === item.href
                  ? "text-brand"
                  : "text-ink"
              )}
            >
              {item.label}
            </a>
          ))}

          <Flex className="gap-2.5">
            {cta?.map((cta: ctaProps) => (
              <Link
                href={cta.href}
                key={cta.href}
                className="mt-2 inline-flex justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white"
              >
                {cta.label}
              </Link>
            ))}
          </Flex>

          {/* {cta && (
            <Link
              href={cta.href}
              className="mt-2 inline-flex justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white"
            >
              {cta.label}
            </Link>
          )} */}
        </div>
      </div>
    </header>
  );
}

