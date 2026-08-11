import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import LoanOverview from './tabs/LoanOverview';
import { Tabs2 } from '@/components/ui/Tabs2';
import LoanDocument from './tabs/LoanDocument';
import LoanTimeline from './tabs/LoanTimeline';
import LoanGuarantor from './tabs/LoanGuarantor';
import LoanNotes from './tabs/LoanNotes';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { agentGetLoanById, agentGetSupportedDocs } from '@/lib/api.agent';
import { IDParam } from '@/types/types';



const LoanDetails = async ({ params }: IDParam) => {
  
  const { id } = (await params)
  
  const loanDetails = (await agentGetLoanById(id)) as any;
  const res = (await agentGetSupportedDocs()) as any

  const data = loanDetails?.data
  const documents = res?.data

  const tabs = [
    {
      label: 'Overview',
      content: <LoanOverview loan={data} />
    },
    {
      label: 'Documents',
      content: <LoanDocument documents={documents}/>
    },
    {
      label: 'Timeline',
      content: <LoanTimeline />
    },
    {
      label: 'Guarantor',
      content: <LoanGuarantor />
    },
    {
      label: 'Notes',
      content: <LoanNotes />
    },
  ]


  return (
    <Grid className='gap-6'>
      <BackButton/>
      <PageHeader title='Loan Details' />

      <Tabs2 tabs={tabs} defaultValue="Overview" />
    </Grid>
  )
}

export default LoanDetails;
