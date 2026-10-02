import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { getAllcommission } from '@/lib/api.agent';
import { Commission } from '@/types/domains/commission.type';


const currencyFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
});

const numberFormatter = new Intl.NumberFormat('en-NG');

function formatDate(value?: string) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  }).format(date);
}

function formatTaskType(value?: string) {
  if (value === 'disbursement_commission') return 'Disbursement';
  if (value === 'repayment_commission') return 'Repayment';
  return value?.replaceAll('_', ' ') ?? 'Other';
}

function getCustomerName(profile?: Commission['profile']) {
  const name = [
    profile?.firstName,
    profile?.lastName ?? profile?.LastName,
  ]
    .filter(Boolean)
    .join(' ');

  return name || 'Unknown customer';
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

const AgentCommission = async () => {
  const res = (await getAllcommission()) as any;

  // Adjust this line if your API wraps the array one level deeper.
  const commissions: Commission[] = Array.isArray(res?.data)
    ? res.data
    : [];

  const totalAmount = commissions.reduce(
    (sum, commission) => sum + commission.amount,
    0,
  );

  const totalPoints = commissions.reduce(
    (sum, commission) => sum + commission.rewardPoints,
    0,
  );

  const pendingAmount = commissions
    .filter((commission) => commission.status.toLowerCase() === 'pending')
    .reduce((sum, commission) => sum + commission.amount, 0);

  const disbursementCount = commissions.filter(
    (commission) => commission.taskType === 'disbursement_commission',
  ).length;

  const repaymentCount = commissions.filter(
    (commission) => commission.taskType === 'repayment_commission',
  ).length;

  return (
    <Grid className="gap-6 p-4 md:p-6">
      <PageHeader title="Commission Tracker" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total commission"
          value={currencyFormatter.format(totalAmount)}
          detail={`${commissions.length} commission records`}
        />
        <SummaryCard
          label="Pending commission"
          value={currencyFormatter.format(pendingAmount)}
          detail="Awaiting payment"
        />
        <SummaryCard
          label="Reward points"
          value={numberFormatter.format(totalPoints)}
          detail="Points earned across all records"
        />
        <SummaryCard
          label="Commission activity"
          value={numberFormatter.format(commissions.length)}
          detail={`${disbursementCount} disbursements · ${repaymentCount} repayments`}
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Commission history
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track earnings from loan disbursements and repayments.
          </p>
        </div>

        {commissions.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <h3 className="font-medium text-slate-900">
              No commissions yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Your commission records will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-237.5 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3">Customer</th>
                  <th scope="col" className="px-5 py-3">Type</th>
                  <th scope="col" className="px-5 py-3">Amount</th>
                  <th scope="col" className="px-5 py-3">Points</th>
                  <th scope="col" className="px-5 py-3">Calculated</th>
                  <th scope="col" className="px-5 py-3">Payable</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {commissions.map((commission) => {
                  const isPending =
                    commission.status.toLowerCase() === 'pending';

                  return (
                    <tr key={commission._id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-900">
                          {getCustomerName(commission.profile)}
                        </p>
                        <p className="mt-0.5 capitalize text-slate-500">
                          {commission.profile?.product ?? 'Product unavailable'}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {formatTaskType(commission.taskType)}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {currencyFormatter.format(commission.amount)}
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {numberFormatter.format(commission.rewardPoints)}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(commission.calculatedAt)}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(commission.payableAt)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            isPending
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {commission.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Grid>
  );
};

export default AgentCommission;
