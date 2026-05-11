// import { label } from "framer-motion/client";
import { BellRing, BookOpenCheck, CalendarCheck, ChartNoAxesColumn, DollarSign, LayoutGrid, LogOut, LucideIcon, MapPinHouse, MessageSquareWarning, Settings, TrendingUp, UserRoundPlus, UserSearchIcon, UsersRound, Wallet } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
    layoutGrid: LayoutGrid,
    userRoundPlus: UserRoundPlus,
    mapPinHouse: MapPinHouse,
    calendarCheck: CalendarCheck,
    bookOpenCheck: BookOpenCheck,
    trendingUp: TrendingUp,
    team: UsersRound,
    pipeline: ChartNoAxesColumn,
    report: MessageSquareWarning,
    revenue: DollarSign,
    alert: BellRing,
    wallet: Wallet,
    profile: UserSearchIcon,
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
    label: 'Loan Application',
    href: '/agents/loans',
    icon: 'wallet',
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
    icon: 'team'
  },
  {
    label: 'Customers',
    href: '/super-agents/customers',
    icon: 'userRoundPlus'
  },
  {
    label: 'Pipeline',
    href: '/super-agents/pipeline',
    icon: 'pipeline'
  },
  {
    label: 'Reports',
    href: '/super-agents/reports',
    icon: 'report'
  },
  {
    label: 'Revenue',
    href: '/super-agents/revenue',
    icon: 'revenue'
  },
  {
    label: 'Alerts',
    href: '/super-agents/alerts',
    icon: 'alert'
  },
  {
    label: 'Wallets',
    href: '/super-agents/wallets',
    icon: 'wallet'
  },
  {
    label: 'Profile',
    href: '/super-agents/profilw',
    icon: 'profile'
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
    icon: 'layoutGrid'
  },
  {
    label: 'Repayment',
    href: '/loan-officer/',
    icon: 'layoutGrid'
  },
  {
    label: 'Risk Assessment',
    href: '/loan-officer/',
    icon: 'layoutGrid'
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
    icon: 'layoutGrid'
  },
  {
    label: 'Branch Assets',
    href: '/manager/branch',
    icon: 'layoutGrid'
  },
  {
    label: 'Team Management',
    href: '/manager/team',
    icon: 'layoutGrid'
  },
  {
    label: 'Risk Analytics',
    href: '/manager/analytics',
    icon: 'layoutGrid'
  },
  {
    label: 'Reports',
    href: '/manager/reports',
    icon: 'layoutGrid'
  },
]
