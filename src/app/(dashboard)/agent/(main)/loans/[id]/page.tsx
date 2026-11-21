import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import LoanOverview from './tabs/LoanOverview';
import { Tabs2 } from '@/components/ui/Tabs2';
import LoanDocument from './tabs/LoanDocument';
// import LoanTimeline from './tabs/LoanTimeline';
import LoanGuarantor from './tabs/LoanGuarantor';
// import LoanNotes from './tabs/LoanNotes';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { agentGetBusinessCustomersDetails, agentGetLoanById, agentGetLoanRepayment, agentGetLoanSupportedDocs, agentGuarantorInfo } from '@/lib/api.agent';
import { Signature } from '@/types/types';
import { getUploadSignature } from '@/lib/uploads/file-uploads';
import LoanRepayment from './tabs/LoanRepayment';
import CustomerProfile from '@/components/ui/customers/CustomerProfile';
import { LoanRepaymentHistoryProps } from '@/types/domains/loan.types';




const LoanDetails = async ({ params }: LoanRepaymentHistoryProps) => {
  
  const { id } = (await params);
  const search = await params;

  const page = Math.max(
    Number(search.page) || 1,
    1
  );

  const size = Math.max(
    Number(search.size) || 50,
    1
  );
  
  const loanDetails = (await agentGetLoanById(id)) as any;
  const signature = (await getUploadSignature()) as {
    data: Signature;
  };
  const res = (await agentGetLoanSupportedDocs()) as {
    data: {
      slug: string;
      name: string;
    }[];
  };

  const userId = loanDetails?.data?.userId
  const repaymentRes =  (await  agentGetLoanRepayment(id, {page, size})) as any;
  const customerRes = (await agentGetBusinessCustomersDetails(userId) as any);



  
  const data = loanDetails?.data
  const documents = res?.data
  
  const guarantoRres = (await agentGuarantorInfo(data?.loanId)) as any
  // console.info('guarantors:', guarantors);

  // console.info('docs:', data?.loanDocuments);

  const tabs = [
    {
      label: 'Overview',
      content: <LoanOverview loan={data} />
    },
    {
      label: 'Documents',
      content: <LoanDocument 
      documents={documents} 
      signature={signature.data} 
      loanDocuments={data?.loanDocuments ?? []}
      businessId={id}/>
    },
    {
      label: 'Guarantor',
      content: <LoanGuarantor 
        signature={signature.data} 
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
    {
      label: 'Repayment',
      content: <LoanRepayment 
      repayments={repaymentRes?.data} 
      summary={repaymentRes?.summary}
      pagination={repaymentRes.pagination}
      />
    },
    // {
    //   label: 'Timeline',
    //   content: <LoanTimeline />Res
    // },
    // {
    //   label: 'Notes',
    //   content: <LoanNotes />
    // },
  ]


  return (
    <Grid>
      <BackButton/>
      <PageHeader title='Loan Details' />
      <CustomerProfile customer={customerRes?.data} />

      <Tabs2 tabs={tabs} defaultValue="Overview" className='mt-4'/>
    </Grid>
  )
}

export default LoanDetails;
