'use client';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

type Variant = | 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';

type Size = | 'sm' | 'md' | 'lg';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
  size1?: Size;
  label?: string;
  desc?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  descClassName?: string;
  error?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[#DBE9FE] text-[#94A3B8]',
  secondary: 'bg-gray-100 ',
  tertiary: 'bg-white border border-gray-200 ',
  ghost: 'bg-transparent border border-transparent',
  outline: 'bg-white border border-gray-300 ',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-2.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-base rounded-lg',
}

export const TextField = forwardRef<HTMLInputElement,TextFieldProps>(({
      variant = 'primary',
      size1 = 'md',
      label,
      desc,
      type = "text",
      startIcon,
      endIcon,
      wrapperClassName,
      inputWrapperClassName,
      inputClassName,
      labelClassName,
      descClassName,
      error,
      disabled,
      ...props
    },
    ref,
  ) => {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? showPassword ? "text" : "password" : type;

    return (
      <section className={cn('flex flex-col gap-1.5', wrapperClassName,)}>
        {label && (
          <label className={cn('text-sm font-semibold text-[#546474]', labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <div className={cn('flex w-full items-center gap-2 transition-all',
            variantStyles[variant],
            sizeStyles[size1],
            error && 'border border-red-500 focus-within:border-red-500',
            disabled && 'cursor-not-allowed opacity-60',
            inputWrapperClassName,
          )}
        >
          {startIcon && (
            <span className='text-gray-400'>
              {startIcon}
            </span>
          )}
          <div className="flex justify-between w-full">
            <input
              ref={ref}
              type={inputType}
              disabled={disabled}
              className={cn('w-full border-none outline-none',
              disabled && 'cursor-not-allowed',
              inputClassName,
              )}
              {...props}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-gray-500 hover:text-gray-700 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}

            {!isPassword && endIcon && (
              <span className='text-gray-400'>
                {endIcon}
              </span>
            )}
          </div>
        </div>

        {desc && (
          <p
            className={cn(
              'text-xs text-gray-500',
              error && 'text-red-500',
              descClassName,
            )}
          >
            {desc}
          </p>
        )}
      </section>
    );
  },
);

TextField.displayName = 'TextField';
