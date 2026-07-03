import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { getAllAgents } from '@/lib/api';
import AgentList from './(tabs)/AgentList';


const TeamPage = async () => {

  const data = await getAllAgents();

  return (
    <Grid className='gap-6 p-6'>
      <PageHeader title='Team Manager' 
        description='Monitor and manage your agent network performance.'/>
      <AgentList data={data ?? []} />
    </Grid>
  )
}

export default TeamPage;
