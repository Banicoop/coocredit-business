import { BookOpenCheck, CalendarCheck, LayoutGrid, MapPinHouse, TrendingUp, UserRoundPlus } from "lucide-react";

export const agentsSidbar = [
    {
        label: 'Dashbaord',
        href: '/agents',
        icon: LayoutGrid
    },
    {
        label: 'Customer Acquisition',
        href: '/agents/customers',
        icon: UserRoundPlus
    },
    {
        label: 'Territory Map',
        href: '/agents/territory',
        icon: MapPinHouse
    },
    {
        label: 'Daily Tasks',
        href: '/agents/daily',
        icon: CalendarCheck
    },
    {
        label: 'Commission Tracker',
        href: '/agents/commisions',
        icon: BookOpenCheck
    },
    {
        label: 'Performance',
        href: '/agents/performance',
        icon: TrendingUp
    },
]
