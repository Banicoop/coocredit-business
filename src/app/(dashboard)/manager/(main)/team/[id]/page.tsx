import Image from "next/image";
import { BackButton } from "@/components/primitives/buttons/BackButton";
import { Grid } from "@/components/ui/ui-layout";
import { getAgentProfileById } from "@/lib/api";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const AgentProfile = async ({ params }: Props) => {

  const { id } = await params;

  const { data } = await getAgentProfileById(id) as any;

  return (
    <Grid className="gap-6">
      <BackButton />

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Image
            src={data?.profileImage}
            alt={data.firstName}
            width={120}
            height={120}
            className="rounded-full border object-cover"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {data.firstName} {data.lastName}
            </h1>

            <p className="text-gray-500">{data.email}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>{data?.role?.replace("_", " ")}</Badge>
              <Badge color="green">{data.approvalStatus}</Badge>
              <Badge color="blue">{data.kycLevel}</Badge>

              {data.phoneVerified && (
                <Badge color="emerald">Phone Verified</Badge>
              )}

              {data.emailVerified ? (
                <Badge color="emerald">Email Verified</Badge>
              ) : (
                <Badge color="red">Email Unverified</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          title="Available Balance"
          value={`₦${data?.availableBalance?.toLocaleString()}`}
        />

        <StatCard
          title="Booked Balance"
          value={`₦${data?.bookedBalance?.toLocaleString()}`}
        />

        <StatCard
          title="Credit Lien"
          value={`₦${data?.creditLienBalance?.toLocaleString()}`}
        />

        <StatCard
          title="Debit Lien"
          value={`₦${data?.debitLienBalance?.toLocaleString()}`}
        />
      </div>

      {/* Information */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Personal Information">
          <Item label="Full Name" value={`${data.firstName} ${data.lastName}`} />
          <Item label="Username" value={data.username} />
          <Item label="Gender" value={data.gender} />
          <Item label="Date of Birth" value={data.dateOfBirth} />
          <Item label="Phone" value={data.phoneNumber} />
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
          <Item
            label="Local Government"
            value={data?.location?.localGovernment}
          />
        </Section>

        <Section title="KYC Information">
          <Item label="KYC Level" value={data.kycLevel} />
          <Item label="Identity Score" value={data.identityScore} />
          <Item
            label="Risk Assessment"
            value={data.identityDescription}
          />

          <Item
            label="Pending Upgrade"
            value={
              data?.kycWalletInfo?.hasPendingKycUpgradeApproval
                ? "Yes"
                : "No"
            }
          />

          <Item
            label="Upgrade Required"
            value={
              data.kycWalletInfo?.requiredKycUpgradeAction
                ? "Yes"
                : "No"
            }
          />
        </Section>

        <Section title="System Information">
          <Item label="User ID" value={data.userId} />
          <Item label="Role" value={data.role} />
          <Item label="Type" value={data.type} />
          <Item label="OTP Preference" value={data.otpPreference} />
          <Item label="PIN Created" value={data.pinCreated ? "Yes" : "No"} />
          <Item label="Disabled" value={data.disabled ? "Yes" : "No"} />
          <Item label="Created" value={new Date(data.createdAt).toLocaleString()} />
          <Item
            label="Last Login"
            value={new Date(data.lastLogin).toLocaleString()}
          />
        </Section>
      </div>
    </Grid>
  );
};

export default AgentProfile;

/* ---------------- Components ---------------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border shadow-sm">
    <div className="border-b px-6 py-4">
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>

    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const Item = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between gap-4 border-b last:border-0 pb-3">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div className="bg-white border rounded-xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>

    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

const Badge = ({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  const colors = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    emerald: "bg-emerald-100 text-emerald-700",
  } as any;

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
};