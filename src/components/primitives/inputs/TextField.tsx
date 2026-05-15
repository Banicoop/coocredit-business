import clsx from 'clsx';
import React, {
  forwardRef,
  InputHTMLAttributes,
} from 'react';

type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'outline';

type Size =
  | 'sm'
  | 'md'
  | 'lg';

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
  primary:
    'bg-[#DBE9FE] text-[#94A3B8]',

  secondary:
    'bg-gray-100 ',

  tertiary:
    'bg-white border border-gray-200 ',

  ghost:
    'bg-transparent border border-transparent',

  outline:
    'bg-white border border-gray-300 ',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-2.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-base rounded-lg',
}

export const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps
>(
  (
    {
      variant = 'primary',
      size1 = 'md',

      label,
      desc,

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
    return (
      <section
        className={clsx(
          'flex flex-col gap-1.5',
          wrapperClassName,
        )}
      >
        {label && (
          <label
            className={clsx(
              'text-sm font-semibold text-[#546474]',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div
          className={clsx(
            'flex w-full items-center gap-2 transition-all',

            variantStyles[variant],
            sizeStyles[size1],

            error &&
              'border border-red-500 focus-within:border-red-500',

            disabled &&
              'cursor-not-allowed opacity-60',

            inputWrapperClassName,
          )}
        >
          {startIcon && (
            <span className='text-gray-400'>
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={clsx(
              'w-full border-none outline-none',

              disabled &&
                'cursor-not-allowed',

              inputClassName,
            )}
            {...props}
          />

          {endIcon && (
            <span className='text-gray-400'>
              {endIcon}
            </span>
          )}
        </div>

        {desc && (
          <p
            className={clsx(
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
