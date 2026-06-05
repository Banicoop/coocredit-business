'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import { Tabs } from '@/components/ui/Tabs';
import { Flex } from '@/components/ui/ui-layout';
import { ColItem } from '@/components/ui/PageHeader';
import Typography from '@/components/primitives/Typography';
import Image from 'next/image';

import user from '@/assets/svgs/agent-portrait.jpg';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { EyeIcon } from 'lucide-react';

const data = Array.from({length: 10}, (() => ({

})))

const tabs = [
    {
        label: 'All Customers',
        value: 'customers'
    },
    {
        label: 'Recent Additions',
        value: 'additions'
    },
    {
        label: 'High Activity',
        value: 'activity'
    },
    {
        label: 'Attention Required',
        value: 'attention'
    },
]


const BusinessCustTable = () => {

    const columns = [
        {
            key: 'business',
            title: 'BUSINESS ENTITY',
            render: (val: any) => (
                <Flex className='gap-1.5'>
                    <Flex className='w-10 h-10 rounded-full font-bold bg-primary flex justify-center'>
                        <Typography className='text-center text-card'>A</Typography>
                    </Flex>
                    <ColItem 
                        item1='Dangote Refinery Hub' 
                        item2='Lekki Free Zone, Lagos' 
                        className1='text-ink font-semibold' 
                        className2='text-ring'/>
                </Flex>
            )
        },
        {
            key: 'category',
            title: 'CATEGORY',
            render: (val: any) => (
                <Typography 
                className='py-1 px-3 rounded-md bg-accent text-brand'
                startIcon={<div className='w-2 h-2 rounded-full bg-brand'/>}
                variant='small'>SME Premium</Typography>
            )
        },
        {
            key: 'volume',
            title: 'TOTAL VOLUME',
            render: (val: any) => (
                <ColItem
                    item1='₦12,450,000' 
                    item2='ACTIVE LEDGER' 
                    className1='text-ink' 
                    className2='text-chart-2 text-[10px]'
                />
            )
        },
        {
            key: 'agent',
            title: 'ASSIGNED AGENT',
            render: (val: any) => (
                <Flex className='gap-1.5'>
                    <Image src={user} alt='AGENT' width={30} height={30} className='rounded-full object-cover h-auto w-auto'/>
                    <Typography variant='small'>Emeka Obi</Typography>
                </Flex>
            )
        },
        {
            key: 'status',
            title: 'STATUS',
            render: (val: string) => (
                <Typography color='success' className='py-1 px-3 rounded-md bg-accent'>verified</Typography>
            )
        },
        {
            key: 'id',
            title: 'Actions',
            render: (val: string) => (
                <ActionDropdown 
                actions={[{
                    label: 'View Details',
                    href: '/super-agent/customers/123',
                    icon: EyeIcon,
                }]}/>
            )
        },
    ]

  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={<Tabs items={tabs}/>}
        pageSize={4} 
        pagination={true} />
  )
}

export default BusinessCustTable;


{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639m2.036-.908a1.012 1.012 0 011.412-.47m2.036.908a1.012 1.012 0 010-.639m2.036-.908a1.012 1.012 0 011.412-.47m2.036.908a1.012 1.012 0 010-.639M17.502 18.362a1.012 1.012 0 01-1.412.47m-2.036-.908a1.012 1.012 0 010-.639m-2.036-.908a1.012 1.012 0 011.412-.47m-2.036.908a1.012 1.012 0 010-.639m2.036-.908a1.012 1.012 0 011.412-.47m2.036.908a1.012 1.012 0 010-.639" />
</svg> */}