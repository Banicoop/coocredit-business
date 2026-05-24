'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn, isActive } from '@/lib/utils';
import Typography from '@/components/primitives/Typography';
import { iconMap } from '@/config/sidebar.config';

export type SidebarItem = {
  label: string;
  href: string;
  icon?: keyof typeof iconMap;
};

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  items: SidebarItem[];
  title?: string;
  logo?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

const MobileSidebar = ({
  open,
  onClose,
  items,
  title = 'Menu',
  logo,
  className,
  footer,
}: MobileSidebarProps) => {
  const pathname = usePathname();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close sidebar on ESC press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden',
          open
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        )}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-screen w-[82%] max-w-[320px] flex-col',
          'border-r border-neutral-100 bg-white shadow-2xl',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div className="flex items-center gap-3">
            {logo}

            <Typography
              weight="bold"
              className="text-lg "
            >
              {title}
            </Typography>
          </div>

          <button
            onClick={onClose}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full',
              'transition-colors hover:bg-neutral-100'
            )}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href, item.href);
                // pathname === item.href ||
                // pathname.startsWith(`${item.href}/`);

              const Icon = item.icon ? iconMap[item.icon] : undefined;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-4 py-3',
                    'transition-all duration-200',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  )}
                >
                  {Icon && (
                    <Icon
                      size={20}
                      className={cn(
                        'transition-colors',
                        active
                          ? 'text-primary'
                          : 'text-neutral-500 group-hover:text-neutral-900'
                      )}
                    />
                  )}

                  <Typography
                    weight={active ? 'semibold' : 'medium'}
                    className="text-sm"
                  >
                    {item.label}
                  </Typography>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-neutral-100 p-4">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

export default MobileSidebar;
