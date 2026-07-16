import { CustomBarChart } from '@/components/charts/CustomBarChart';
import Typography from '@/components/primitives/Typography';
import { Tabs } from '@/components/ui/Tabs';
import { FlexCol } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';



const data = [
    {
    name: 'Jan',
    submitted: 4000,
    approved: 2400,
  },
  {
    name: 'Feb',
    submitted: 3000,
    approved: 1398,
  },
  {
    name: 'Mar',
    submitted: 2000,
    approved: 9800,
  },
  {
    name: 'Apr',
    submitted: 2780,
    approved: 3908,
},
  {
    name: 'May',
    submitted: 2000,
    approved: 9800,
},
{
    name: 'Jun',
    submitted: 2780,
    approved: 3908,
},
]

const tabs = [
    {
        label: 'Weekly',
        value: 'weekly'
    },
    {
        label: 'Monthly',
        value: 'monthly'
    },
]

const BarTitle = () => (
    <FlexCol className='md:flex-row md:justify-between gap-2.5 w-full'>
        <FlexCol>
            <Typography weight='semibold'>Disbursement vs Collection</Typography>
            <Typography color='primary'>Activity volume for the current fiscal period</Typography>
        </FlexCol>

        <Tabs items={tabs} defaultValue='monthly'/>
    </FlexCol>
)

const DisbursementCollectionChart = ({className}: {className: string}) => {
  return (
    <CustomBarChart
        className={cn('gap-4', className)}
            data={data} 
            title={<BarTitle/>}
            xDataKey="name"
            height={320}
            showYAxis={false}
            barSize={18}
                bars={[
                {
                    dataKey: 'approved',
                    label: 'Total Disbursement',
                    color: '#0053CC',
                    radius: [10, 10 , 0, 0],
                },
                {
                    dataKey: 'submitted',
                    label: 'Total Collection',
                    color: '#F59E0B',
                    radius: [10, 10 , 0, 0],
                },
                ]}
    />
  )
}

export default DisbursementCollectionChart;
