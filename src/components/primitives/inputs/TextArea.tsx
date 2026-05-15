import clsx from 'clsx';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';



interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string;
    desc?: string;
    descClass?: string
    wrapperClass?: string;
    startIcon?: React.ReactNode;
    className?: string;
}


export const TextArea = forwardRef<HTMLTextAreaElement, TextFieldProps>(({ label, startIcon, className = 'bg-[#DBE9FE] text-[#94A3B8] p-1', wrapperClass, desc, descClass, ...props}, ref) => {
  return (
    <section className={`flex flex-col gap-2 ${wrapperClass}`}>
        {label && (
          <label className="text-sm font-semibold text-[#546474]">
            {label}
          </label>
        )}

        <div className={`flex flex-row items-center gap-1.5 rounded-lg ${className}`}>
            {startIcon && (
                <span className="">{startIcon}</span>
            )}

            <textarea 
                className={`w-full outline-none transition-all border-none p-2.5` 
            }
            ref={ref}
            {...props}
            />
        </div>

        {desc && (
          <p className={descClass}>
            {desc}
          </p>
        )}

    </section>
  )
})


TextArea.displayName = 'TextArea';
