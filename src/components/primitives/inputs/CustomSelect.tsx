import { cn } from '@/lib/utils';
import React, { FC } from 'react';

export interface Option {
    value: string
    label: string
}
  
interface SelectProps {
    name?: string;
    id?: string;
    options: Option[];
    label: string;
    labelClass?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    optionClass?: string;
    wrapperClass?: string;
    onClick?: any;
    onSelect?: (val: any) => void;
}


const CustomSelect:FC<SelectProps> = ({ 
    name = "select", 
    id = "select", 
    wrapperClass,
    options, 
    labelClass,
    onChange, 
    className = 'bg-[#DBE9FE] text-[#94A3B8] p-2.5', onSelect, label, optionClass }) => {
  return (
    <div className={`${wrapperClass}`}>
      <label 
        htmlFor={id} 
        className={cn('text-sm font-semibold text-[#546474]', labelClass)}>{label}</label>
      <select name={name} id={id} 
        className={`w-full h-full outline-none rounded-lg px-2 ${className}`} 
        onSelect={onSelect} onChange={onChange}>
        {
          options.map((option:Option) => (
            <option 
            key={option.value}
            className={optionClass}
            value={option?.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default CustomSelect;
