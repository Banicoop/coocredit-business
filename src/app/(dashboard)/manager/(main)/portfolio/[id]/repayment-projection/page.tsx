import { BackButton } from '@/components/primitives/buttons/BackButton';
import { FlexCol, Flex } from '@/components/ui/ui-layout';
import { getLoanRepaymentProjection } from '@/lib/api';
import { IDParam } from '@/types/types';
import React from 'react';

interface RepaymentInstallment {
  loanId: string;
  userId: string;
  appliedBy: string;
  repaymentId: string;
  dueDate: string;
  amount: number;
}

type InstallmentStatus = 'overdue' | 'due-today' | 'upcoming';

const currencyFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function getStatus(dueDate: string): InstallmentStatus {
  const today = new Date();
  const due = new Date(dueDate);

  const todayKey = today.toDateString();
  const dueKey = due.toDateString();

  if (dueKey === todayKey) return 'due-today';
  return due.getTime() < today.getTime() ? 'overdue' : 'upcoming';
}

const statusStyles: Record<InstallmentStatus, string> = {
  overdue: 'bg-red-100 text-red-700',
  'due-today': 'bg-amber-100 text-amber-700',
  upcoming: 'bg-green-100 text-green-700',
};

const statusLabels: Record<InstallmentStatus, string> = {
  overdue: 'Overdue',
  'due-today': 'Due today',
  upcoming: 'Upcoming',
};

const RepaymentProjection = async ({ params }: IDParam) => {
  const { id } = await params;

  const response = (await getLoanRepaymentProjection(id)) as any;
  const installments: RepaymentInstallment[] = response?.data ?? [];

  const sorted = [...installments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const totalAmount = sorted.reduce((sum, i) => sum + i.amount, 0);
  const nextInstallment = sorted.find((i) => getStatus(i.dueDate) !== 'overdue');
  const overdueCount = sorted.filter((i) => getStatus(i.dueDate) === 'overdue').length;

  if (!sorted.length) {
    return (
      <FlexCol className="gap-4 p-4">
        <BackButton />
        <p className="text-sm text-gray-500">
          No repayment projection is available for this loan.
        </p>
      </FlexCol>
    );
  }

  return (
    <FlexCol className="gap-6 p-4">
      {/* <BackButton /> */}

      <div>
        <h1 className="text-lg font-semibold">Repayment Projection</h1>
        <p className="text-sm text-gray-500">Loan ID: {sorted[0].loanId}</p>
      </div>

      {/* Summary cards */}
      <Flex className="flex-wrap gap-4">
        <div className="min-w-[160px] flex-1 rounded-xl border p-4">
          <p className="text-xs text-gray-500">Total repayable</p>
          <p className="text-base font-semibold">
            {currencyFormatter.format(totalAmount)}
          </p>
        </div>

        <div className="min-w-[160px] flex-1 rounded-xl border p-4">
          <p className="text-xs text-gray-500">Installments</p>
          <p className="text-base font-semibold">{sorted.length}</p>
        </div>

        <div className="min-w-[160px] flex-1 rounded-xl border p-4">
          <p className="text-xs text-gray-500">Next due date</p>
          <p className="text-base font-semibold">
            {nextInstallment ? dateFormatter.format(new Date(nextInstallment.dueDate)) : '—'}
          </p>
        </div>

        {overdueCount > 0 && (
          <div className="min-w-[160px] flex-1 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-xs text-red-600">Overdue</p>
            <p className="text-base font-semibold text-red-700">{overdueCount}</p>
          </div>
        )}
      </Flex>

      {/* Installment list */}
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Due date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((installment, index) => {
              const status = getStatus(installment.dueDate);
              return (
                <tr key={installment.repaymentId} className="border-t">
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    {dateFormatter.format(new Date(installment.dueDate))}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {currencyFormatter.format(installment.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]}`}
                    >
                      {statusLabels[status]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </FlexCol>
  );
};

export default RepaymentProjection;
