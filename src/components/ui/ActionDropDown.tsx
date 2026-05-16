'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type DropdownAction = {
  label: string;
  icon?: any;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'primary';
  separator?: boolean;
};

type Props = {
  actions: DropdownAction[];
  triggerIcon?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
};

export const ActionDropdown = ({
  actions,
  triggerIcon,
  align = 'end',
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-1 rounded-md hover:bg-gray-100 transition">
          {triggerIcon || <Ellipsis size={18} className='cursor-pointer text-primary'/>}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={5}
          className="bg-white shadow-lg rounded-lg border w-48 p-1 z-50"
        >
          {actions.map((action, index) => {
            if (action.separator) {
              return (
                <DropdownMenu.Separator
                  key={index}
                  className="h-px bg-gray-200 my-1"
                />
              );
            }

            const Icon = action.icon;

            const baseClass = cn(
              'flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer outline-none',
              'hover:bg-gray-100',
              action.disabled && 'opacity-50 pointer-events-none',
              action.variant === 'destructive' ?
                'text-red-600 hover:bg-red-50' : action.variant === 'primary' ? 'text-primary': ''
            );


            if (action.href) {
              return (
                <DropdownMenu.Item asChild key={index} disabled={action.disabled}>
                  <Link href={action.href} className={baseClass}>
                    {Icon && <Icon size={16} />}
                    {action.label}
                  </Link>
                </DropdownMenu.Item>
              );
            }

            return (
              <DropdownMenu.Item
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer outline-none',
                  'hover:bg-gray-100',
                  action.disabled && 'opacity-50 pointer-events-none',
                  action.variant === 'destructive' &&
                    'text-red-600 hover:bg-red-50'
                )}
              >
                {Icon && <Icon size={16} />}
                {action.label}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
