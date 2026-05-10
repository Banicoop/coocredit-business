import { BookOpenCheck, CalendarCheck, LayoutGrid, LogOut, LucideIcon, MapPinHouse, Settings, TrendingUp, UserRoundPlus } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
    layoutGrid: LayoutGrid,
    userRoundPlus: UserRoundPlus,
    mapPinHouse: MapPinHouse,
    calendarCheck: CalendarCheck,
    bookOpenCheck: BookOpenCheck,
    trendingUp: TrendingUp,
    settings: Settings,
    logout: LogOut,
};

export const agentsSidebar = [
  {
    label: 'Dashboard',
    href: '/agents',
    icon: 'layoutGrid',
  },
  {
    label: 'Customer Acquisition',
    href: '/agents/customers',
    icon: 'userRoundPlus',
  },
  {
    label: 'Territory Map',
    href: '/agents/territory',
    icon: 'mapPinHouse',
  },
  {
    label: 'Daily Tasks',
    href: '/agents/daily',
    icon: 'calendarCheck',
  },
  {
    label: 'Commission Tracker',
    href: '/agents/commissions',
    icon: 'bookOpenCheck',
  },
  {
    label: 'Performance',
    href: '/agents/performance',
    icon: 'trendingUp',
  },
];
