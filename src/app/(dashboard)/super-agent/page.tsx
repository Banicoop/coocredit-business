import { FlexCol } from '@/components/ui/ui-layout';
import Banner from './_section/Banner';
import DashboardStats from './_section/DashboardStats';

const SuperAgentDashboard = () => {
  return (
    <FlexCol className='gap-4'>
      <Banner/>
      <DashboardStats/>
    </FlexCol>
  )
}

export default SuperAgentDashboard;
