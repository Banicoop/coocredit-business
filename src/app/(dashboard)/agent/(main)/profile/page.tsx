import { agentGetMyProfile } from '@/lib/api.agent';
import {
  BadgeCheck,
  Banknote,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserRound,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface AgentProfile {
  _id: string;
  userId: string;

  firstName: string;
  lastName: string;
  username: string;

  email: string;
  phoneNumber: string;
  bvnPhoneNumber?: string;

  profileImage?: string;

  role: string;
  country: string;
  gender: string;
  dateOfBirth: string;

  bvn?: string;
  nin?: string;

  referralCode?: string;

  kycLevel: string;
  identityScore: number;
  identityDescription: string;

  emailVerified: boolean;
  phoneVerified: boolean;
  pinCreated: boolean;

  disabled: boolean;
  approvalStatus: string;
  approvalFailureReason?: string | null;

  bookedBalance: number;
  availableBalance: number;
  creditLienBalance: number;
  debitLienBalance: number;

  accountName?: string;
  accountNumber?: string;

  walletId?: string;
  walletName?: string;
  walletNumber?: string;

  customerReference?: string;

  location?: {
    state?: string;
    localGovernment?: string;
  };

  bank?: {
    id?: string;
    code?: string;
    name?: string;
  };

  kycWalletInfo?: {
    hasPendingKycUpgradeApproval?: boolean;
    requiredKycUpgradeAction?: boolean;
  };

  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);

const formatDate = (date?: string) => {
  if (!date) return 'N/A';

  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

const formatDateTime = (date?: string) => {
  if (!date) return 'N/A';

  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
};

const formatText = (value?: string) => {
  if (!value) return 'N/A';

  return value
    .replace(/_/g, ' ')
    .split(' ')
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase(),
    )
    .join(' ');
};

const maskValue = (value?: string, visible = 4) => {
  if (!value) return 'N/A';

  if (value.length <= visible) return value;

  return `${'*'.repeat(
    value.length - visible,
  )}${value.slice(-visible)}`;
};

const AgentProfilePage = async () => {
  const me = (await agentGetMyProfile()) as any;

  const profile: AgentProfile | undefined = me?.data;

  if (!profile) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl border bg-white">
        <p className="text-sm text-gray-500">
          Unable to load your profile.
        </p>
      </div>
    );
  }

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div className="grid gap-6">
      {/* HEADER */}

      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="h-28 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

        <div className="px-5 pb-6 md:px-7">
          <div className="-mt-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-sm">
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt={fullName}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <UserRound className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {fullName}
                  </h1>

                  {profile.phoneVerified && (
                    <BadgeCheck className="h-5 w-5 text-emerald-500" />
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  @{profile.username}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge
                    label={formatText(profile.role)}
                    variant="default"
                  />

                  <StatusBadge
                    label={formatText(profile.approvalStatus)}
                    variant={
                      profile.approvalStatus === 'completed'
                        ? 'success'
                        : 'warning'
                    }
                  />

                  <StatusBadge
                    label={profile.kycLevel}
                    variant="primary"
                  />
                </div>
              </div>
            </div>

            <div className="pb-1 text-left md:text-right">
              <p className="text-xs text-gray-400">
                Agent ID
              </p>

              <p className="mt-1 text-sm font-medium text-gray-700">
                {profile.userId}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BALANCE CARDS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BalanceCard
          title="Available Balance"
          value={formatCurrency(profile.availableBalance)}
          icon={<Wallet className="h-5 w-5" />}
        />

        <BalanceCard
          title="Booked Balance"
          value={formatCurrency(profile.bookedBalance)}
          icon={<CircleDollarSign className="h-5 w-5" />}
        />

        <BalanceCard
          title="Credit Lien"
          value={formatCurrency(profile.creditLienBalance)}
          icon={<Banknote className="h-5 w-5" />}
        />

        <BalanceCard
          title="Debit Lien"
          value={formatCurrency(profile.debitLienBalance)}
          icon={<CreditCard className="h-5 w-5" />}
        />
      </div>

      {/* KYC */}

      <Section
        title="Verification & KYC"
        description="Account verification and identity information."
        icon={<ShieldCheck className="h-5 w-5" />}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <VerificationItem
            label="Phone Verification"
            verified={profile.phoneVerified}
          />

          <VerificationItem
            label="Email Verification"
            verified={profile.emailVerified}
          />

          <VerificationItem
            label="Transaction PIN"
            verified={profile.pinCreated}
            successText="Created"
            failureText="Not created"
          />

          <VerificationItem
            label="KYC Level"
            verified
            successText={profile.kycLevel}
          />
        </div>

        <div className="mt-6 grid gap-5 border-t border-gray-100 pt-6 md:grid-cols-3">
          <InfoItem
            label="Identity Status"
            value={formatText(profile.identityDescription)}
          />

          <InfoItem
            label="Identity Score"
            value={profile.identityScore}
          />

          <InfoItem
            label="KYC Upgrade"
            value={
              profile.kycWalletInfo
                ?.requiredKycUpgradeAction
                ? 'Action Required'
                : profile.kycWalletInfo
                    ?.hasPendingKycUpgradeApproval
                  ? 'Pending Approval'
                  : 'No Action Required'
            }
          />
        </div>
      </Section>

      {/* PERSONAL + LOCATION */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Section
          title="Personal Information"
          icon={<User className="h-5 w-5" />}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoItem
              label="First Name"
              value={profile.firstName}
            />

            <InfoItem
              label="Last Name"
              value={profile.lastName}
            />

            <InfoItem
              label="Username"
              value={profile.username}
            />

            <InfoItem
              label="Gender"
              value={formatText(profile.gender)}
            />

            <InfoItem
              label="Date of Birth"
              value={formatDate(profile.dateOfBirth)}
              icon={<CalendarDays />}
            />

            <InfoItem
              label="Country"
              value={profile.country}
            />
          </div>
        </Section>

        <Section
          title="Contact & Location"
          icon={<MapPin className="h-5 w-5" />}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoItem
              label="Email Address"
              value={profile.email}
              icon={<Mail />}
            />

            <InfoItem
              label="Phone Number"
              value={profile.phoneNumber}
              icon={<Phone />}
            />

            <InfoItem
              label="State"
              value={profile.location?.state}
            />

            <InfoItem
              label="Local Government"
              value={profile.location?.localGovernment}
            />

            <InfoItem
              label="BVN Phone Number"
              value={profile.bvnPhoneNumber}
              icon={<Phone />}
            />

            <InfoItem
              label="Referral Code"
              value={profile.referralCode}
            />
          </div>
        </Section>
      </div>

      {/* WALLET */}

      <Section
        title="Wallet Information"
        description="Agent wallet and settlement information."
        icon={<Wallet className="h-5 w-5" />}
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <InfoItem
            label="Wallet Name"
            value={profile.walletName}
          />

          <InfoItem
            label="Wallet Number"
            value={profile.walletNumber}
          />

          <InfoItem
            label="Wallet ID"
            value={profile.walletId}
          />

          <InfoItem
            label="Customer Reference"
            value={profile.customerReference}
          />
        </div>
      </Section>

      {/* BANK */}

      <Section
        title="Bank Account"
        description="Linked account and financial institution information."
        icon={<Landmark className="h-5 w-5" />}
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <InfoItem
            label="Account Name"
            value={profile.accountName}
          />

          <InfoItem
            label="Account Number"
            value={profile.accountNumber}
          />

          <InfoItem
            label="Bank"
            value={profile.bank?.name}
          />

          <InfoItem
            label="Bank Code"
            value={profile.bank?.code}
          />
        </div>
      </Section>

      {/* IDENTITY */}

      <Section
        title="Identity Information"
        description="Sensitive identity information is partially hidden for security."
        icon={<ShieldCheck className="h-5 w-5" />}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            label="BVN"
            value={maskValue(profile.bvn)}
          />

          <InfoItem
            label="NIN"
            value={maskValue(profile.nin)}
          />

          <InfoItem
            label="Account Status"
            value={
              profile.disabled ? 'Disabled' : 'Active'
            }
          />
        </div>
      </Section>

      {/* ACCOUNT INFORMATION */}

      <Section
        title="Account Information"
        icon={<CalendarDays className="h-5 w-5" />}
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <InfoItem
            label="Joined"
            value={formatDate(profile.createdAt)}
          />

          <InfoItem
            label="Last Login"
            value={formatDateTime(profile.lastLogin)}
          />

          <InfoItem
            label="Last Updated"
            value={formatDateTime(profile.updatedAt)}
          />

          <InfoItem
            label="OTP Preference"
            value={formatText(
              (profile as any).otpPreference,
            )}
          />
        </div>
      </Section>
    </div>
  );
};

export default AgentProfilePage;

/* ---------------------------------- */
/* COMPONENTS                         */
/* ---------------------------------- */

const Section = ({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
      <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 md:px-6">
        {icon && (
          <div className="mt-0.5 text-gray-500">
            {icon}
          </div>
        )}

        <div>
          <h2 className="font-semibold text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
};

const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
        {icon &&
          React.isValidElement(icon) &&
          React.cloneElement(
            icon as React.ReactElement<{
              className?: string;
            }>,
            {
              className: 'h-3.5 w-3.5',
            },
          )}

        {label}
      </div>

      <p className="mt-1.5 break-words text-sm font-medium text-gray-900">
        {value === undefined ||
        value === null ||
        value === ''
          ? 'N/A'
          : value}
      </p>
    </div>
  );
};

const BalanceCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xl font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
};

const VerificationItem = ({
  label,
  verified,
  successText = 'Verified',
  failureText = 'Not verified',
}: {
  label: string;
  verified: boolean;
  successText?: string;
  failureText?: string;
}) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            verified
              ? 'bg-emerald-500'
              : 'bg-amber-500'
          }`}
        />

        <span
          className={`text-sm font-semibold ${
            verified
              ? 'text-emerald-700'
              : 'text-amber-700'
          }`}
        >
          {verified
            ? successText
            : failureText}
        </span>
      </div>
    </div>
  );
};

const StatusBadge = ({
  label,
  variant = 'default',
}: {
  label: string;
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning';
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary/10 text-primary',
    success:
      'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
};