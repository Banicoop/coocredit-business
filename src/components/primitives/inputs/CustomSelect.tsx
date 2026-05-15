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
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    optionClass?: string;
    wrapperClass?: string;
    onClick?: any;
    onSelect?: (val: any) => void;
}


const CustomSelect:FC<SelectProps> = ({ name = "select", id = "select", wrapperClass, options, onChange, className, onSelect, label, optionClass }) => {
  return (
    <div className={`${wrapperClass}`}>
      <label htmlFor={id}>{label}</label>
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
