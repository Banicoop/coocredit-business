'use client';

import Typography from '@/components/primitives/Typography';
import { cn, isActive } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { iconMap } from '@/config/sidebar.config';



type SidebarItem = {
  label: string;
  href?: string;
  icon: keyof typeof iconMap;
  onClick?: () => void;
};

type SidebarProps = {
  className?: string;
  className1?: string;
  data: SidebarItem[];
  others?: SidebarItem[];
  logo?: string;
  activeBasePath?: string;
};

const Sidebar = ({
  className = '',
  className1,
  data,
  others = [],
  logo = '/logo.svg',
  activeBasePath = '',
}: SidebarProps) => {
  const pathname = usePathname();

  const renderItem = (
    item: SidebarItem,
    isBottomItem = false
  ) => {
    const Icon = iconMap[item.icon];

    const active =
      item.href &&
      isActive(pathname, item.href, activeBasePath);

    const content = (
      <div
        className={`
          flex items-center gap-2 py-3 px-4 transition-all
          ${
            active
              ? 'border-r-4 border-primary bg-[#DBEAFE]'
              : ''
          }
        `}
      >
        <Typography
          startIcon={<Icon size={20} />}
          weight={active ? 'semibold' : 'medium'}
          color={active ? 'active' : 'primary'}
          className={cn('text-xs', className1)}
        >
          {item.label}
        </Typography>
      </div>
    );

    // BUTTON ITEM
    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={item.onClick}
          className="w-full text-left cursor-pointer"
        >
          {content}
        </button>
      );
    }

    // LINK ITEM
    return (
      <Link href={item.href || '#'} key={item.label}>
        {content}
      </Link>
    );
  };

  return (
    <aside
      className={`
        border-r border-r-[#E5E5E5]
        hidden lg:block
        w-[256px]
        h-screen
        overflow-y-auto
        scrollbar-hide
        fixed
        ${className}
      `}
    >
      <section className="flex flex-col justify-between h-full p-4 gap-4">
        {/* TOP */}
        <div className="flex flex-col gap-2.5 h-auto w-auto">
          <Image
            src={logo}
            alt="LOGO"
            width={120}
            height={30}
            loading="eager"
          />

          <div className="flex flex-col gap-1 mt-4">
            {data.map((item) => renderItem(item))}
          </div>
        </div>

        {/* BOTTOM ITEMS */}
        {others.length > 0 && (
          <div className="flex flex-col gap-4 p-2">
            <hr className="bg-[#E5E5E5] h-0.5 w-full border-0" />

            <div className="flex flex-col gap-1">
              {others.map((item) =>
                renderItem(item, true)
              )}
            </div>
          </div>
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
