// import { label } from "framer-motion/client";
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


export const superAgentData = [
  {
    label: 'Dashbaord',
    href: '/super-agents',
    icon: 'layoutGrid'
  },
  {
    label: 'Team',
    href: '/super-agents/team',
    icon: ''
  },
  {
    label: 'Customers',
    href: '/super-agents/customers',
    icon: ''
  },
  {
    label: 'Pipeline',
    href: '/super-agents/pipeline',
    icon: ''
  },
  {
    label: 'Reports',
    href: '/super-agents/reports',
    icon: ''
  },
  {
    label: 'Revenue',
    href: '/super-agents/revenue',
    icon: ''
  },
  {
    label: 'Alerts',
    href: '/super-agents/alerts',
    icon: ''
  },
  {
    label: 'Wallets',
    href: '/super-agents/wallets',
    icon: ''
  },
  {
    label: 'Profile',
    href: '/super-agents/profilw',
    icon: ''
  },
]


export const loanOfficerData = [
  {
    label: 'Dashboard',
    href: '/loan-officer',
    icon: 'layoutGrid'
  },
  {
    label: 'Application',
    href: '/loan-officer/',
    icon: ''
  },
  {
    label: 'Portfolio',
    href: '/loan-officer/',
    icon: ''
  },
  {
    label: 'Repayment',
    href: '/loan-officer/',
    icon: ''
  },
  {
    label: 'Risk Assessment',
    href: '/loan-officer/',
    icon: ''
  },
]


export const managersData = [
  {
    label: 'Overview',
    href: '/manager',
    icon: 'layoutGrid'
  },
  {
    label: 'Loan Portfolio',
    href: '/manager/portfolio',
    icon: ''
  },
  {
    label: 'Branch Assets',
    href: '/manager/branch',
    icon: ''
  },
  {
    label: 'Team Management',
    href: '/manager/team',
    icon: ''
  },
  {
    label: 'Risk Analytics',
    href: '/manager/analytics',
    icon: ''
  },
  {
    label: 'Reports',
    href: '/manager/reports',
    icon: ''
  },
]
