import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface Option {
  value: string | number;
  label: string | number;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  options: Option[];
  label: string;
  labelClass?: string;
  className?: string;
  optionClass?: string;
  wrapperClass?: string;
  placeholder?: string;
  error?: string;
}

const CustomSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      options,
      label,
      labelClass,
      className = "bg-[#DBE9FE] text-[#94A3B8] p-2.5",
      optionClass,
      wrapperClass,
      placeholder = "Select an option",
      error,
      ...rest // onChange, onBlur, defaultValue, etc. from register()
    },
    ref,
  ) => {
    const selectId = id ?? name;

    return (
      <div>
        <div className={wrapperClass}>
          <label
            htmlFor={selectId}
            className={cn("text-sm font-semibold text-[#546474]", labelClass)}
          >
            {label}
          </label>
          <select
            {...rest}
            ref={ref}
            id={selectId}
            name={name}
            defaultValue={rest.defaultValue ?? ""}
            className={cn("w-full h-full outline-none rounded-lg px-2", className)}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                className={optionClass}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
