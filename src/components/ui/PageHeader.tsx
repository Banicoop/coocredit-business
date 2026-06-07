'use client';


import React from 'react'
import Typography from '../primitives/Typography';
import Link from "next/link";
import { forwardRef } from "react";
import { cn } from '@/lib/utils';


interface ColItemProps {
  item1: string, 
  item2: string, 
  className?: string;
  className1?: string, 
  className2?: string
}

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ActionButton[];
  className?: string;
}


export const ColItem = ({item1, item2, className, className1, className2}: ColItemProps) => {
  return(
    <div className={cn("flex flex-col", className)}>
      <Typography className={className1}>{item1}</Typography>
      <Typography className={className2}>{item2}</Typography>
    </div>
  )
}


export const PageTitle = forwardRef(({title, desc}: {title: string, desc: string}, ref) => {
  return (
    <div className="flex gap-1" >
      <span className="text-[#64748B] text-sm font-medium">{title} {'>'}</span> 
      <span className="text-[#0F172A] text-sm font-medium">{desc}</span>
    </div>
  );
});



export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions = [], className }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className ?? ""}`}
      >
        {/* Left Content */}
        <div className="flex flex-col gap-1">
          <Typography variant="h2">{title}</Typography>
          {description && (
            <Typography color='primary'>{description}</Typography>
          )}
        </div>

        {/* Right Actions (Optional) */}
        {actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => {
              const content = (
                <>
                  {action.icon}
                  <Typography variant="span" className={`${action.variant === 'primary' ? 'bg-primary text-white': ''}`}>{action.label}</Typography>
                </>
              );

              // If it's a link
              if (action.href) {
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className={`flex items-center justify-center gap-1 py-2 px-5 rounded-lg text-sm w-full md:w-fit ${
                      action.variant === "primary"
                        ? "bg-primary text-white"
                        : "bg-white border border-[#E2E8F0] text-[#334155]"
                    }`}
                  >
                    {content}
                  </Link>
                );
              }

              // Otherwise it's a button
              return (
                <div
                  key={index}
                  onClick={action.onClick}
                  className={`flex items-center justify-center cursor-pointer gap-1 py-2 px-5 rounded-lg text-sm w-full md:w-fit ${
                    action.variant === "primary"
                      ? "bg-[#136DEC] text-white"
                      : "bg-white border border-[#E2E8F0] text-[#334155]"
                  }`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

PageTitle.displayName = 'PageTitle';
PageHeader.displayName = "PageHeader";



