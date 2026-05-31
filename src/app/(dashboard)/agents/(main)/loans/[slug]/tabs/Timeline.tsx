'use client';

import Typography from '@/components/primitives/Typography';
import clsx from 'clsx';
import React from 'react';
import { Check, Zap } from 'lucide-react';

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  actor: string;
  icon?: React.ReactNode;
  status?: string;
  extra?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className='relative'>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className='relative flex gap-4 pb-8'
          >
            {/* Timeline Indicator */}
            <div className='relative flex flex-col items-center'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm'>
                {item.icon ?? <Check size={16} />}
              </div>

              {!isLast && (
                <div className='absolute top-8 h-[calc(100%+1rem)] border-l border-dashed border-primary/30' />
              )}
            </div>

            {/* Content */}
            <div className='flex-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm'>
              <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
                <div>
                  <Typography
                    weight='semibold'
                    className='text-lg'
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    className='mt-2 text-sm text-slate-500'
                  >
                    {item.description}
                  </Typography>
                </div>

                <div className='flex flex-col items-end gap-2'>
                  <span className='rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>
                    {item.date}
                  </span>

                  {item.status && (
                    <span
                      className={clsx(
                        'rounded-full px-2 py-1 text-[10px] font-semibold uppercase',
                        item.status === 'RUNNING'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      )}
                    >
                      {item.status}
                    </span>
                  )}
                </div>
              </div>

              <div className='mt-4 flex items-center gap-2 border-t border-slate-100 pt-3'>
                <div className='h-6 w-6 rounded-full bg-slate-200' />
                <Typography className='text-xs text-slate-500'>
                  by <span className='font-medium'>{item.actor}</span>
                </Typography>
              </div>

              {item.extra && (
                <div className='mt-4'>
                  {item.extra}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
