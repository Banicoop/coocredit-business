import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#016AFF] text-white shadow-md",

  secondary:
    "bg-[#E2E8F0] text-[#016AFF]",

  tertiary:
    "bg-transparent text-blue-400",

  outline:
    "border border-blue-500 text-blue-400 ",

  ghost:
    "text-[#016AFF]",

  light:
    "bg-card text-[#0053CC]",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      startIcon,
      endIcon,
      children,
      disabled,
      className='transition',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          isDisabled && "opacity-60 cursor-not-allowed",
          !isDisabled && "cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Spinner */}
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        {/* Left Icon */}
        {!loading && startIcon && <span className="flex">{startIcon}</span>}

        {/* Label */}
        <span>{loading ? "Loading..." : children}</span>

        {/* Right Icon */}
        {!loading && endIcon && <span className="flex">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

