import React from "react";
import clsx from "clsx";


type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "span";

interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
  as?: React.ElementType; // more flexible than variant
  font?: "inter" | "sans" | "atomic" | 'katibeh' | 'poppins' | 'manrope';
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "primary" | 'secondary' | 'success' | 'neutral' | 'active' | 'light';
  truncate?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const baseStyles: Record<Variant, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  p: "text-base",
  small: "text-xs",
  span: "text-sm",
};

const fontMap = {
  inter: "font-inter",
  sans: "font-nunito",
  atomic: "font-atomic",
  katibeh: 'font-katibeh',
  poppins: 'font-poppins',
  manrope: 'font-manrope'
};

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorMap = {
  default: "text-[#0F1C2C]",
  primary: "text-[#546474]",
  active: 'text-[#1D4ED8]',
  success: "text-[#059669]",
  muted: "text-gray-400",
  secondary: "text-[#059669cc]",
  neutral: "text-blue-100",
  light: "text-[#FFFFFF]",
};

const Typography = ({
  children,
  variant = "span",
  as,
  font = "inter",
  weight,
  color = "default",
  truncate = false,
  startIcon,
  endIcon,
  className,
  onClick,
}: TypographyProps) => {
  const Component = as || variant;

  return (
    <Component
      onClick={onClick}
      className={clsx(
        baseStyles[variant],
        fontMap[font],
        weight && weightMap[weight],
        colorMap[color],
        truncate && "truncate",
        (startIcon || endIcon) && "inline-flex items-center gap-2",
        className
      )}
    >
      {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
      <span className="leading-tight">{children}</span>
      {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
    </Component>
  );
};

export default Typography;
