import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import LoanOverview from './tabs/LoanOverview';
import { Tabs2 } from '@/components/ui/Tabs2';
import LoanDocument from './tabs/LoanDocument';
import LoanTimeline from './tabs/LoanTimeline';
import LoanGuarantor from './tabs/LoanGuarantor';
import LoanNotes from './tabs/LoanNotes';
import { BackButton } from '@/components/primitives/buttons/BackButton';

const tabs = [
  {
    label: 'Overview',
    content: <LoanOverview />
  },
  {
    label: 'Documents',
    content: <LoanDocument/>
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

const LoanDetails = () => {
  return (
    <Grid className='gap-6'>
      <BackButton/>
      <PageHeader title='Loan Details' />

      <Tabs2 tabs={tabs} defaultValue="Overview" />
    </Grid>
  )
}

export default LoanDetails;
