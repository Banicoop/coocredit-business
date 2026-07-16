import { CustomBarChart } from "@/components/charts/CustomBarChart";
import Typography from "@/components/primitives/Typography";
import { Flex, Grid } from "@/components/ui/ui-layout";
import { cn } from "@/lib/utils";


const data = [
  {
    name: 'Mon',
    approved: 2400,
  },
  {
    name: 'Tues',
    approved: 1398,
  },
  {
    name: 'Wed',
    approved: 9800,
  },
  {
    name: 'Thurs',
    approved: 3908,
},
  {
    name: 'Fri',
    approved: 9800,
},
{
    name: 'Sat',
    approved: 3908,
},
]

const BranchCharts = () => {
  return (
    <Grid className="grid-cols-3 gap-6"> 
        <CustomBarChart
            className={cn('gap-4 h-50' )}
                data={data} 
                title={<Flex className='justify-between w-full'>
                    <Typography color="primary" weight="semibold">Disbursement</Typography>
                    <Typography>₦12.4M</Typography>
                    </Flex>}
                xDataKey="name"
                height={120}
                showLegend={false}
                showYAxis={false}
                showXAxis={false}
                barSize={24}
                    bars={[
                    {
                        dataKey: 'approved',
                        label: 'Total Disbursement',
                        color: '#0053CC',
                        radius: [0, 0 , 0, 0],
                    }]}
        />
        <CustomBarChart
            className={cn('gap-4 h-50')}
                data={data} 
                title={<Flex className='justify-between w-full'>
                <Typography color="primary" weight="semibold">COLLECTIONS</Typography>
                <Typography>₦8.9M</Typography>
                </Flex>}
                xDataKey="name"
                showLegend={false}
                height={120}
                showYAxis={false}
                showXAxis={false}
                barSize={24}
                    bars={[
                    {
                        dataKey: 'approved',
                        label: 'Total Collections',
                        color: '#F59E0B',
                        radius: [0, 0 , 0, 0],
                    }]}
        />
        <CustomBarChart
            className={cn('gap-4 h-50')}
                data={data} 
                title={<Flex className='justify-between w-full'>
                <Typography color="primary" weight="semibold">NET GROWTH</Typography>
                <Typography>+₦3.5M</Typography>
                </Flex>}
                xDataKey="name"
                height={120}
                showLegend={false}
                showYAxis={false}
                showXAxis={false}
                barSize={24}
                    bars={[
                    {
                        dataKey: 'approved',
                        label: 'NET GROWTH',
                        color: '#10B981',
                        radius: [0, 0 , 0, 0],
                    }]}
        />
    </Grid>
  )
}

export default BranchCharts;
