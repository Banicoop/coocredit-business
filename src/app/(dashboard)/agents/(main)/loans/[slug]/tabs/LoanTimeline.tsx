import Timeline from './Timeline';
import { Check, Zap } from 'lucide-react';

const timelineData = [
  {
    id: '1',
    title: 'Application Submitted',
    description:
      'The digital application form and initial declarations were successfully captured through the field agent portal.',
    date: 'OCT 12, 08:42 AM',
    actor: 'Agent: System Process',
    icon: <Check size={16} />,
  },
  {
    id: '2',
    title: 'KYC Documents Verified',
    description:
      'Proof of identity, business registration, and tax certificates have been cross-referenced with national registries.',
    date: 'OCT 14, 02:15 PM',
    actor: 'Compliance Dept',
    icon: <Check size={16} />,
  },
  {
    id: '3',
    title: 'Credit Risk Assessment',
    description:
      'Scorecard generation and financial ratio ana lysis in progress. Automated cash-flow projections are being calculated.',
    date: 'RUNNING',
    actor: 'Automated Underwriter',
    status: 'RUNNING',
    icon: <Zap size={16} />,
    extra: (
      <div>
        <div className='h-2 overflow-hidden rounded-full bg-slate-200'>
          <div className='h-full w-[70%] rounded-full bg-primary' />
        </div>

        <p className='mt-2 text-xs text-slate-500'>
          Current Actor: Automated Underwriter
        </p>
      </div>
    ),
  },
];



const LoanTimeline = () => {

  return (
    <Timeline items={timelineData} />
  )
}

export default LoanTimeline;
