import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import AgentCard from './AgentCard';
import CustomSelect from '@/components/primitives/inputs/CustomSelect';
import Typography from '@/components/primitives/Typography';

const AgentsList = () => {
  return (
    <Grid className='gap-4'>        
        <FlexCol className='p-2.5 rounded-lg bg-[#DBE9FE] justify-between md:flex-row md:items-center'>
            <Flex className='gap-3'>
                <CustomSelect 
                    wrapperClass='flex items-center gap-1.5'
                    labelClass='text-sm'
                    className='py-2 px-4 bg-card'
                    label='Status:' 
                    options={[{label: 'All', value: 'all'}, 
                        {label: 'Active', value: 'active'},
                        {label: 'Inactive', value: 'inactive'},
                        {label: 'Pending KYC', value: 'pending'}
                    ]}/>
                <CustomSelect 
                    wrapperClass='flex items-center gap-1.5'
                    labelClass='text-sm'
                    className='py-2 px-4 bg-card' 
                    label='Region:' 
                    options={[{label: 'All', value: 'all'}, 
                        {label: 'Lagos', value: 'active'},
                        {label: 'Abuja', value: 'inactive'},
                    ]}/>

            </Flex>
            <Typography color='primary' weight='semibold'>Showing 174 total agents</Typography>
        </FlexCol>
        {/* CARD LIST */}
        <Grid className='md:grid-cols-3 gap-5'>
            <AgentCard/>
            <AgentCard/>
            <AgentCard/>
            <AgentCard/>
        </Grid>
    </Grid>
  )
}
    
export default AgentsList;
