
"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";
import { Grid } from "@/components/ui/ui-layout";
import { ActionDropdown } from "@/components/ui/ActionDropDown";
import { BasicTable, TableColumn } from "@/components/primitives/tables/BasicTable";
import Typography from "@/components/primitives/Typography";


// TYPES
export type RepaymentStatus =
  | "pending"
  | "late"
  | "paid"
  | "completed"
  | "partial"
  | "failed";

export interface Repayment {
  _id: string;
  userId: string;
  repaymentId: string;
  loanId: string;
  appliedBy: string;
  dueDate: string;
  amount: number;
  accruedAmount: number;
  status: RepaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RepaymentResponse {
  data: Repayment[];
  meta: {
    total: number;
    page: number;
    size: number;
    totalPages: number;
  };
}

interface LoanRepaymentProps {
  repayments: RepaymentResponse;
  href: string;
}

type FilterStatus = "all" | RepaymentStatus;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(date));

const statusStyles: Record<RepaymentStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  late: "bg-red-50 text-red-700 border-red-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  partial: "bg-blue-50 text-blue-700 border-blue-200",
  failed: "bg-gray-100 text-gray-700 border-gray-200",
};

const StatusBadge = ({ status }: { status: RepaymentStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${
      statusStyles[status]
    }`}
  >
    <span
      className={`mr-2 h-1.5 w-1.5 rounded-full ${
        status === "late"
          ? "bg-red-500"
          : status === "pending"
          ? "bg-amber-500"
          : status === "paid" || status === "completed"
          ? "bg-emerald-500"
          : "bg-gray-400"
      }`}
    />
    {status}
  </span>
);

const LoanRepayment = ({
  repayments,
  href,
}: LoanRepaymentProps) => {
  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("all");

  const repaymentData = repayments?.data ?? [];

  // NORMALIZE URL
  const baseHref = href.replace(/\/+$/, "");

  // SUMMARY
  const summary = useMemo(() => {
    const totalAmount = repaymentData.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const late = repaymentData.filter(
      (item) => item.status === "late"
    );

    const pending = repaymentData.filter(
      (item) => item.status === "pending"
    );

    const paid = repaymentData.filter((item) =>
      ["paid", "completed"].includes(item.status)
    );

    return {
      totalAmount,
      totalCount: repaymentData.length,
      lateCount: late.length,
      lateAmount: late.reduce(
        (sum, item) => sum + item.amount,
        0
      ),
      pendingCount: pending.length,
      pendingAmount: pending.reduce(
        (sum, item) => sum + item.amount,
        0
      ),
      paidCount: paid.length,
      paidAmount: paid.reduce(
        (sum, item) => sum + item.amount,
        0
      ),
    };
  }, [repaymentData]);

  // FILTER + SORT
  const filteredRepayments = useMemo(() => {
    return repaymentData
      .filter(
        (item) =>
          statusFilter === "all" ||
          item.status === statusFilter
      )
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
      );
  }, [repaymentData, statusFilter]);

  // SUMMARY CARDS
  const stats = [
    {
      title: "Total Scheduled",
      value: formatCurrency(summary.totalAmount),
      subtitle: `${summary.totalCount} repayments`,
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Overdue Repayments",
      value: formatCurrency(summary.lateAmount),
      subtitle: `${summary.lateCount} overdue payments`,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Pending Repayments",
      value: formatCurrency(summary.pendingAmount),
      subtitle: `${summary.pendingCount} pending payments`,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Paid Repayments",
      value: formatCurrency(summary.paidAmount),
      subtitle: `${summary.paidCount} paid payments`,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  // FILTERS
  const filters: {
    label: string;
    value: FilterStatus;
    count: number;
  }[] = [
    {
      label: "All Repayments",
      value: "all",
      count: repaymentData.length,
    },
    {
      label: "Pending",
      value: "pending",
      count: summary.pendingCount,
    },
    {
      label: "Overdue",
      value: "late",
      count: summary.lateCount,
    },
    {
      label: "Paid",
      value: "paid",
      count: summary.paidCount,
    },
  ];

  // TABLE COLUMNS
  const columns: TableColumn<Repayment>[] = [
    {
      key: "dueDate",
      title: "Due Date",
      render: (value) => (
        <span className="whitespace-nowrap">
          {formatDate(value)}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (value) => (
        <span className="whitespace-nowrap font-medium text-gray-900">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: "accruedAmount",
      title: "Accrued Amount",
      render: (value) => (
        <span className="whitespace-nowrap">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: "totalDue",
      title: "Total Due",
      render: (_, row) => (
        <span className="whitespace-nowrap font-semibold text-gray-900">
          {formatCurrency(row.amount + row.accruedAmount)}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      key: "actions",
      title: "Actions",
      align: "right",
      render: (_, row) => (
        <ActionDropdown
          actions={[
            {
              label: "View Details",
              href: `${baseHref}/${row._id}`,
            },
          ]}
        />
      ),
    },
  ];

  const RepaymentTitle = () => (
    <div className="grid gap-4">
      <Typography variant="h5">Repayment History</Typography>
      <Typography variant="small" color="primary">View and track all loan repayment installments.</Typography>
     <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                statusFilter === filter.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-70">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
    </div>
  )

  return (
    <Grid className="gap-6 p-4 md:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Loan Repayments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor repayment schedules, outstanding balances
            and payment statuses.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm text-gray-600">
          <CalendarDays size={16} />
          {formatDate(new Date().toISOString())}
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  <Icon
                    size={21}
                    className={stat.color}
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-gray-500">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

        {/* REUSABLE BASIC TABLE */}
        <BasicTable<Repayment>
          key={statusFilter}
          title={<RepaymentTitle/>}
          data={filteredRepayments}
          columns={columns}
          pagination
          pageSize={10}
          emptyMessage="No repayments found for the selected status."
        />
    </Grid>
  );
};

export default LoanRepayment;
