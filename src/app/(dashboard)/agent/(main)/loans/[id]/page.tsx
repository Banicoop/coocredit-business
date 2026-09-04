import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import LoanOverview from './tabs/LoanOverview';
import { Tabs2 } from '@/components/ui/Tabs2';
import LoanDocument from './tabs/LoanDocument';
// import LoanTimeline from './tabs/LoanTimeline';
import LoanGuarantor from './tabs/LoanGuarantor';
// import LoanNotes from './tabs/LoanNotes';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { agentGetLoanById, agentGetLoanSupportedDocs, agentGuarantorInfo } from '@/lib/api.agent';
import { IDParam, Signature } from '@/types/types';
import { getUploadSignature } from '@/lib/uploads/file-uploads';



const LoanDetails = async ({ params }: IDParam) => {
  
  const { id } = (await params)
  
  const loanDetails = (await agentGetLoanById(id)) as any;
  const signature = (await getUploadSignature()) as Signature;
  const res = (await agentGetLoanSupportedDocs()) as {
    data: {
      slug: string;
      name: string;
    }[];
  };
  
  const data = loanDetails?.data
  const documents = res?.data
  
  const guarantoRres = (await agentGuarantorInfo(data.loanId)) as any
  // console.info('guarantors:', guarantors);

  const tabs = [
    {
      label: 'Overview',
      content: <LoanOverview loan={data} />
    },
    {
      label: 'Documents',
      content: <LoanDocument 
        documents={documents} 
        signature={signature} 
        loanDocuments={data?.loanDocuments}
        businessId={data?.businessId}/>
    },
    {
      label: 'Guarantor',
      content: <LoanGuarantor 
        signature={signature} 
        guarantors={guarantoRres?.data ?? []} 
        // onAddDocument={(guarantor) => {
        //   // Open upload modal
        //   console.log('Add document for:', guarantor);
        // }}
        // onRemoveDocument={(guarantor, document) => {
        //   // Call your remove document API
        //   console.log('Remove:', document, 'from:', guarantor);
        // }}
        />
    },
    // {
    //   label: 'Timeline',
    //   content: <LoanTimeline />
    // },
    // {
    //   label: 'Notes',
    //   content: <LoanNotes />
    // },
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
