'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Typography from '@/components/primitives/Typography';

// Generic Tabs Component
export type TabItem<T extends string> = {
  label: T;
  content: React.ReactNode;
  count?: number
};

type TabsProps<T extends string> = {
  tabs: readonly TabItem<T>[];
  defaultValue: T;
  className?: string;
};

export function Tabs2<T extends string>({ tabs, defaultValue, className }: TabsProps<T>) {
  const [active, setActive] = React.useState<T>(defaultValue);

  return (
    <div className={cn('max-w-full overflow-x-auto', className)}>
      {/* Tab Headers */}
      <div className="border-b border-b-[#e5e5e5] flex items-center gap-5">
        {tabs.map((tab) => {
          const isActive = active === tab.label;

          return (
            <div
              key={tab.label}
              onClick={() => setActive(tab.label)}
              className={cn(
                'flex items-center gap-1 py-1 px-5 border-b-2 cursor-pointer transition-all',
                isActive
                  ? 'border-b-[#136DEC]'
                  : 'text-[#64748B] bg-[#F1F5F9]'
              )}
            >
              <Typography
                variant="span"
                className={cn(
                  'font-semibold text-sm gap-1 md:text-lg',
                  isActive ? 'text-[#136DEC]' : 'text-[#64748B]'
                )}
              >
                {tab.label}
               ({tab.count}) 
              </Typography>
            </div>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find((tab) => tab.label === active)?.content}
      </div>
    </div>
  );
}

