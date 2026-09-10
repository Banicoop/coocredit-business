import { BackButton } from "@/components/primitives/buttons/BackButton";
import { Grid } from "@/components/ui/ui-layout";
import { getAgentProfileById } from "@/lib/api";
import ErrorPage from "@/components/ui/ErrorPage";
import { Item, Section, StatCard } from "./features/AgentProfileCards";
import AgentProfileHeader from "./features/AgentProfileHeader";
import { IDParam } from "@/types/types";
import { maskBVN } from "@/helpers/funcs";


const AgentProfile = async ({ params }: IDParam) => {

  const { id } = await params;

  const { data } = await getAgentProfileById(id) as any;

  if(!data) return <ErrorPage href="/manager" />


  return (
    <Grid className="gap-6">
      <BackButton />

      {/* HEADER */}
      <AgentProfileHeader data={data}/>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Available Balance" value={`₦${data?.availableBalance?.toLocaleString()}`} />
        <StatCard title="Booked Balance" value={`₦${data?.bookedBalance?.toLocaleString()}`} />
        <StatCard title="Credit Lien" value={`₦${data?.creditLienBalance?.toLocaleString()}`}/>
        <StatCard title="Debit Lien" value={`₦${data?.debitLienBalance?.toLocaleString()}`}/>
      </div>

      {/* Information */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Personal Information">
          <Item label="Full Name" value={`${data.firstName} ${data.lastName}`} />
          <Item label="Username" value={data.username} />
          <Item label="Gender" value={data.gender} />
          <Item label="Date of Birth" value={data.dateOfBirth} />
          <Item label="Phone" value={data.phoneNumber} />
          <Item label="BVN" value={maskBVN(data.bvn)} />
          <Item label="BVN Phone" value={data.bvnPhoneNumber} />
          <Item label="Country" value={data.country} />
          <Item label="NIN" value={data.nin} />
          <Item label="Referral Code" value={data.referralCode} />
        </Section>

        <Section title="Wallet Information">
          <Item label="Wallet Name" value={data.walletName} />
          <Item label="Wallet Number" value={data.walletNumber} />
          <Item label="Wallet ID" value={data.walletId} />
          <Item label="Customer Ref" value={data.customerReference} />
          <Item label="Scheme ID" value={data.schemeId} />
        </Section>

        <Section title="Bank Information">
          <Item label="Bank" value={data?.bank?.name} />
          <Item label="Bank Code" value={data?.bank?.code} />
          <Item label="Account Name" value={data?.accountName} />
          <Item label="Account Number" value={data?.accountNumber} />
        </Section>

        <Section title="Location">
          <Item label="State" value={data?.location?.state} />
          <Item label="Local Government" value={data?.location?.localGovernment}/>
          <Item label="Country" value={data?.country}/>
        </Section>

        <Section title="KYC Information">
          <Item label="KYC Level" value={data.kycLevel} />
          <Item label="Identity Score" value={data.identityScore} />
          <Item label="Risk Assessment" value={data.identityDescription} />
          <Item label="Pending Upgrade" value={data?.kycWalletInfo?.hasPendingKycUpgradeApproval ? "Yes": "No" }/>
          <Item label="Upgrade Required" value={ data.kycWalletInfo?.requiredKycUpgradeAction ? "Yes" : "No" } />
        </Section>

        <Section title="System Information">
          <Item label="User ID" value={data.userId} />
          <Item label="Role" value={data.role} />
          <Item label="Type" value={data.type} />
          <Item label="OTP Preference" value={data.otpPreference} />
          <Item label="PIN Created" value={data.pinCreated ? "Yes" : "No"} />
          <Item label="Disabled" value={data.disabled ? "Yes" : "No"} />
          <Item label="Created" value={new Date(data.createdAt).toLocaleString()} />
          {data.approvalStatus === 'completed' && <Item
            label="Last Login"
            value={new Date(data.lastLogin).toLocaleString()}
          />}
        </Section>
      </div>
    </Grid>
  );
};

export default AgentProfile;
