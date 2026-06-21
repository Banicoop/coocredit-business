import { FlexCol } from '@/components/ui/ui-layout';
import AgentsList from './_sections/AgentsList';
import TeamManager from './_sections/TeamManager';



const TeamsPage = () => {
  return (
    <FlexCol className='gap-7'>
      <TeamManager/>
      <AgentsList/>
    </FlexCol>
  )
}

export default TeamsPage;
