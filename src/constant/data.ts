import { Path } from "@/types/types";


export const paths: Path[] = [
  {
    num: "01",
    title: "Field Agent",
    role: "The Ground Architect",
    desc: "Focused on local impact. Navigating the terrain to identify and build the first layer of economic opportunity.",
    bullets: ["Regional Outreach", "Community Vetting"],
    cta: "Select Path",
    href: '/auth/sign-in/agents'
  },
  {
    num: "02",
    title: "Super Agent",
    role: "The Network Strategist",
    desc: "Designing complex regional networks. Oversight of multiple hubs with high-profile portfolio management.",
    bullets: ["Hub Management", "Strategic Deployment"],
    cta: "Begin Onboarding",
    featured: true,
    href: '/auth/sign-in/super-agent'
  },
  {
    num: "03",
    title: "Loan Officer",
    role: "The Decision Engine",
    desc: "The analytical heart of the system. Ensuring structural integrity through meticulous approval protocols.",
    bullets: ["Risk Analysis", "Capital Allocation"],
    cta: "Engine Path",
    href: '/auth/sign-in/loan-officer'
  },
  {
    num: "04",
    title: "Regional Manager",
    role: "The Network Architect",
    desc: "Orchestrating growth across multiple territories. Oversight of operational efficiency and strategic node expansion.",
    bullets: ["Territory Optimization", "Strategic Resource Allocation"],
    cta: "Join Management",
    href: '/auth/sign-in/admin'
  },
];


export const recentActivities = [
    {
        id: '1',
        title: 'Repayment Collected',
        description: '₦25,000 from Amina Bello',
        time: '10:20 AM'
    },
    {
        id: '2',
        title: 'Loan Approved',
        description: '₦150,000 for John Doe',
        time: '09:45 AM'
    },
    {
        id: '3',
        title: 'New Customer Added',
        description: 'Sarah James registered',
        time: '08:30 AM'
    }
];


export const LOAN_APPLICATION_STEPS = [
  {
    title: "PIN Verification",
    description: "Verify the agent and customer before proceeding.",
  },
  {
    title: "Loan Details",
    description: "Provide the loan amount and repayment information.",
  },
  {
    title: "Guarantors",
    description: "Provide information about the customer's guarantor(s).",
  },
  {
    title: "Review & Submit",
    description: "Review the application details before submission.",
  },
];
