import React, { forwardRef, InputHTMLAttributes } from 'react'


interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    desc?: string;
    descClass?: string
    wrapperClass?: string;
    icon?: React.ReactNode;
    className?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({label, icon, className, wrapperClass, desc, descClass, ...props}, ref) => {
  return (
    <section className={`flex flex-col gap-1.5 ${wrapperClass}`}>
        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}

        <div className={`flex flex-row items-center gap-1.5 rounded-lg ${className}`}>
            {icon && (
                <span className="">{icon}</span>
            )}

            <input 
                className={`w-full outline-none transition-all border-none` 
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


TextField.displayName = 'TextField';
