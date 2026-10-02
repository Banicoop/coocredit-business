import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Grid } from '@/components/ui/ui-layout';
import { formatCurrency, formatDate } from '@/helpers/funcs';
import { getTransactionById } from '@/lib/api';
import { Transaction } from '@/types/domains/transaction.type';
import { IDParam } from '@/types/types';
import { ArrowDownLeft, ArrowUpRight, Building2, CalendarDays, CheckCircle2, CircleDollarSign, CreditCard, Hash, Landmark, ReceiptText, UserRound, WalletCards } from 'lucide-react';


const TransactionDetails = async ({ params }: IDParam) => {
  const { id } = await params;

  const res = (await getTransactionById(id)) as any;

  const transaction = res.data as Transaction;

  const isCredit = transaction.transactionType?.toLowerCase() === 'credit';

  const isSuccessful = transaction.transactionStatus?.toLowerCase() === 'successful';

  return (
    <Grid className="gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />

        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Transaction Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View complete information about this transaction
          </p>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex size-12 items-center justify-center rounded-full ${
                isCredit
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {isCredit ? (
                <ArrowDownLeft size={22} />
              ) : (
                <ArrowUpRight size={22} />
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Transaction amount
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-gray-900">
                {formatCurrency(transaction.transactionAmount)}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {transaction.transactionEvent} •{' '}
                {transaction.transactionType}
              </p>
            </div>
          </div>

          <div className="md:text-right">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                isSuccessful
                  ? 'bg-emerald-50 text-emerald-700'
                  : transaction.transactionStatus?.toLowerCase() ===
                    'pending'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {isSuccessful && <CheckCircle2 size={15} />}

              {transaction.transactionStatus}
            </span>

            <p className="mt-3 text-xs text-gray-400">
              {formatDate(transaction.transactionStartDate)}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Transaction Reference
          </p>

          <p className="mt-1 break-all font-mono text-sm font-medium text-gray-800">
            {transaction.transactionReference}
          </p>
        </div>
      </div>

      {/* General Transaction Information */}
      <DetailSection
        title="Transaction Information"
        icon={<ReceiptText size={18} />}
      >
        <DetailsGrid>
          <DetailItem
            label="Transaction ID"
            value={transaction.transactionId}
            icon={<Hash size={16} />}
          />

          <DetailItem
            label="Transaction Type"
            value={transaction.transactionType}
            icon={<CreditCard size={16} />}
          />

          <DetailItem
            label="Transaction Event"
            value={transaction.transactionEvent}
            icon={<CircleDollarSign size={16} />}
          />

          <DetailItem
            label="Transaction Mode"
            value={transaction.transactionMode}
            icon={<WalletCards size={16} />}
          />

          <DetailItem
            label="Value Amount"
            value={formatCurrency(transaction.transactionValueAmount)}
          />

          <DetailItem
            label="Transaction Fee"
            value={formatCurrency(transaction.transactionFeeAmount)}
          />

          <DetailItem
            label="Start Date"
            value={formatDate(transaction.transactionStartDate)}
            icon={<CalendarDays size={16} />}
          />

          <DetailItem
            label="End Date"
            value={formatDate(transaction.transactionEndDate)}
            icon={<CalendarDays size={16} />}
          />
        </DetailsGrid>
      </DetailSection>

      {/* Sender & Beneficiary */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sender */}
        <DetailSection
          title="Sender Information"
          icon={<ArrowUpRight size={18} />}
        >
          <div className="grid gap-5">
            <DetailItem
              label="Account Name"
              value={transaction.senderAccountName}
              icon={<UserRound size={16} />}
            />

            <DetailItem
              label="Account Number"
              value={transaction.senderAccountNumber}
              icon={<CreditCard size={16} />}
            />

            <DetailItem
              label="Bank Name"
              value={transaction.senderBankName}
              icon={<Landmark size={16} />}
            />

            <DetailItem
              label="Bank Code"
              value={transaction.senderBankCode}
              icon={<Building2 size={16} />}
            />
          </div>
        </DetailSection>

        {/* Beneficiary */}
        <DetailSection
          title="Beneficiary Information"
          icon={<ArrowDownLeft size={18} />}
        >
          <div className="grid gap-5">
            <DetailItem
              label="Account Name"
              value={transaction.beneficiaryAccountName}
              icon={<UserRound size={16} />}
            />

            <DetailItem
              label="Account Number"
              value={transaction.beneficiaryAccountNumber}
              icon={<CreditCard size={16} />}
            />

            <DetailItem
              label="Bank Name"
              value={transaction.beneficiaryBankName}
              icon={<Landmark size={16} />}
            />

            <DetailItem
              label="Bank Code"
              value={transaction.beneficiaryBankCode}
              icon={<Building2 size={16} />}
            />
          </div>
        </DetailSection>
      </div>

      {/* Processor */}
      <DetailSection
        title="Processing Information"
        icon={<Building2 size={18} />}
      >
        <DetailsGrid>
          <DetailItem
            label="Processor Response Code"
            value={transaction.processorResponseCode}
          />

          <DetailItem
            label="Processor Reference"
            value={transaction.processorResponseReference}
          />

          <DetailItem
            label="Bonus Pot Credit"
            value={formatCurrency(transaction.bonusPotCreditAmount)}
          />

          <DetailItem
            label="Bonus Pot Debit"
            value={formatCurrency(transaction.bonusPotDebitAmount)}
          />
        </DetailsGrid>
      </DetailSection>

      {/* Narration */}
      <DetailSection
        title="Additional Information"
        icon={<ReceiptText size={18} />}
      >
        <div className="grid gap-5">
          <DetailItem
            label="Narration"
            value={transaction.narration || 'N/A'}
          />

          {transaction.purchaseToken && (
            <DetailItem
              label="Purchase Token"
              value={transaction.purchaseToken}
            />
          )}

          <DetailItem
            label="Record Created"
            value={formatDate(transaction.createdAt)}
          />

          <DetailItem
            label="Last Updated"
            value={formatDate(transaction.updatedAt)}
          />
        </div>
      </DetailSection>
    </Grid>
  );
};

export default TransactionDetails;

/* ---------------------------------- */
/* Reusable Components                */
/* ---------------------------------- */

const DetailSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        {icon && <span className="text-gray-500">{icon}</span>}

        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <div className="p-5">
        {children}
      </div>
    </section>
  );
};

const DetailsGrid = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  );
};

const DetailItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-1.5 break-all text-sm font-medium text-gray-900">
        {value === null ||
        value === undefined ||
        value === ''
          ? 'N/A'
          : value}
      </p>
    </div>
  );
};