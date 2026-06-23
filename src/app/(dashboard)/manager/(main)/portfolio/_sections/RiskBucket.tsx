'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex } from '@/components/ui/ui-layout';
import { Ellipsis } from 'lucide-react';


const data = Array.from({length: 10}, (_, i) => ({
    id: `${i + 1}`,
    bucket: 'current',
    noOfloans: 85,
    percent: 80,
    outstanding: '12,050,000',
    officer: 'Kola Ibrahim'
}))


const Title = () => (
    <Flex className='justify-between'>
        <Typography>Risk Bucket Analysis</Typography>
        <Button variant='ghost'>Export Full Data</Button>
    </Flex>
)

const RiskBucket = ({className}: {className: string}) => {

    const columns = [
        {
            key: 'bucket',
            title: 'RISK BUCKET',
            render: (val: string) => (
                <Typography variant='small' weight='semibold' color='success' className='py-1 px-2 bg-accent rounded-md capitalize'>{val}</Typography>
            )
        },
        {
            key: 'noOfloans',
            title: 'NO. OF LOANS'
        },
        {
            key: 'outstanding',
            title: 'TOTAL OUTSTANDING (₦)'
        },
        {
            key: 'percent',
            title: '% OF PORTFOLIO',
            render: (val: number) =>(
                <Flex className='gap-2'>
                    <ProgressBar value={val} className='bg-chart-2' />
                    <Typography variant='small' className='text-chart-2 font-bold'>{val}%</Typography>
                </Flex>
            )
        },
        {
            key: 'officer',
            title: 'ASSIGNED OFFICER'
        },
        {
            key: 'id',
            title: 'Actions',
            render: (id: number) => (
                <Ellipsis className='text-primary cursor-pointer'/>
            )
        },
    ]

  return (
    <BasicTable
        className={className}
        columns={columns} 
        data={data ?? []} 
        title={<Title/>}
        pageSize={3} pagination/>
  )
}

export default RiskBucket;
