import { agentGetAllLead, agentGetDashboardOverview, getAllAgentsBusinessCustomers } from '@/lib/api.agent';
import AgentCustomersTab from './(tabs)/AgentCustomersTab';
import AgentleadTab from './(tabs)/AgentleadTab';
import { Tabs2 } from '@/components/ui/Tabs2';


const AgentsCustomersPage = async () => {

  const customers = await getAllAgentsBusinessCustomers() as any;
  const customerStats = await agentGetDashboardOverview() as any;

  const leads = await agentGetAllLead() as any;


    const tabs = [
      {
        label: 'Customers',
        content: <AgentCustomersTab customerStats={customerStats} customers={customers}/>
      },
      {
        label: 'Leads',
        content: <AgentleadTab leads={leads}/>
      },
    ]


  return (
    <main>
      <Tabs2 tabs={tabs} defaultValue='Customers'/>
    </main>
  )
}

export default AgentsCustomersPage;

