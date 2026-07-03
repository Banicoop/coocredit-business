
import { BellRing, BookOpenCheck, CalendarCheck, ChartNoAxesColumn, DollarSign, LayoutGrid, LogOut, LucideIcon, MapPinHouse, MessageSquareWarning, Settings, TrendingUp, UserRoundPlus, UserSearchIcon, UsersRound, Wallet, AlertTriangle, NotepadText, BriefcaseBusiness, CreditCard, Landmark, ShieldCog, ShieldHalf, LayoutDashboard } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
    layoutGrid: LayoutGrid,
    dashboardLayout: LayoutDashboard,
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
    notePadText: NotepadText,
    alertTriangle: AlertTriangle,
    portfolio: BriefcaseBusiness,
    repayment: CreditCard,
    landmark: Landmark,
    shieldHalf: ShieldHalf
};

export const agentsSidebar = [
  {
    label: 'Dashboard',
    href: '/agent',
    icon: 'layoutGrid',
  },
  {
    label: 'Customer Acquisition',
    href: '/agent/customers',
    icon: 'userRoundPlus',
  },
  {
    label: 'Loan Application',
    href: '/agent/loans',
    icon: 'wallet',
  },
  {
    label: 'Territory Map',
    href: '/agent/territory',
    icon: 'mapPinHouse',
  },
  {
    label: 'Daily Tasks',
    href: '/agent/daily',
    icon: 'calendarCheck',
  },
  {
    label: 'Commission Tracker',
    href: '/agent/commissions',
    icon: 'bookOpenCheck',
  },
  {
    label: 'Performance',
    href: '/agent/performance',
    icon: 'trendingUp',
  },
];


export const superAgentData = [
  {
    label: 'Dashbaord',
    href: '/super-agent',
    icon: 'layoutGrid'
  },
  {
    label: 'Team',
    href: '/super-agent/team',
    icon: 'team'
  },
  {
    label: 'Customers',
    href: '/super-agent/customers',
    icon: 'userRoundPlus'
  },
  {
    label: 'Pipeline',
    href: '/super-agent/pipeline',
    icon: 'pipeline'
  },
  {
    label: 'Reports',
    href: '/super-agent/reports',
    icon: 'report'
  },
  {
    label: 'Revenue',
    href: '/super-agent/revenue',
    icon: 'revenue'
  },
  {
    label: 'Alerts',
    href: '/super-agent/alerts',
    icon: 'alert'
  },
  {
    label: 'Wallets',
    href: '/super-agent/wallet',
    icon: 'wallet'
  },
  {
    label: 'Profile',
    href: '/super-agent/profile',
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
    label: 'Applications',
    href: '/loan-officer/applications',
    icon: 'notePadText'
  },
  {
    label: 'Portfolio',
    href: '/loan-officer/portfolio',
    icon: 'portfolio'
  },
  {
    label: 'Repayment',
    href: '/loan-officer/repayments',
    icon: 'repayment'
  },
  {
    label: 'Risk Assessment',
    href: '/loan-officer/risks',
    icon: 'alertTriangle'
  },
]


export const managersData = [
  {
    label: 'Overview',
    href: '/manager',
    icon: 'dashboardLayout'
  },
  {
    label: 'Loan Portfolio',
    href: '/manager/portfolio',
    icon: 'notePadText'
  },
  {
    label: 'Branch Assets',
    href: '/manager/branch',
    icon: 'landmark'
  },
  {
    label: 'Team Management',
    href: '/manager/team',
    icon: 'team'
  },
  {
    label: 'Risk Analytics',
    href: '/manager/analytics',
    icon: 'shieldHalf'
  },
  {
    label: 'Reports',
    href: '/manager/reports',
    icon: 'report'
  },
]
