import React from "react";
import clsx from "clsx";

interface TypographyProps {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "small"
    | "span";
  font?: "inter" | "geist" | "mono" | "atomi"; // add custom fonts
  className?: string;
  onClick?: () => void;
}

const baseStyles: Record<string, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  p: "text-base",
  small: "text-sm",
  span: "text-base",
};

// Map fonts to your CSS variables (from next/font)
const fontMap: Record<string, string> = {
  inter: "font-inter",
  geist: "font-sans",
  mono: "font-mono",
  atomi: "font-atomi", 
};

const Typography = ({
  children,
  variant = "span",
  font = "inter",
  onClick,
  className,
}: TypographyProps) => {
  const Tag = variant; 

  return (
    <Tag onClick={onClick} className={clsx(baseStyles[variant], fontMap[font], className)}>
      {children}
    </Tag>
  );
};

export default Typography;