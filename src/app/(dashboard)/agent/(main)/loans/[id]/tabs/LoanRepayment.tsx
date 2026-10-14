"use client";

import { useMemo, useState } from "react";
import { Grid } from "@/components/ui/ui-layout";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Search,
  Wallet,
  ChevronLeft,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

// TYPES
type RepaymentStatus =
  | "pending"
  | "late"
  | "paid"
  | "completed"
  | "partial"
  | "failed";

interface Repayment {
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

interface RepaymentResponse {
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
      statusStyles[status] ?? "bg-gray-100 text-gray-700"
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

const LoanRepayment = ({ repayments }: LoanRepaymentProps) => {

  console.log('repayments:', repayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("all");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const repaymentData = repayments?.data ?? [];

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
      .filter((item) => {
        const matchesSearch =
          item.repaymentId
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.loanId
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.userId
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          item.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
      );
  }, [repaymentData, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredRepayments.length / pageSize
  );

  const paginatedRepayments = filteredRepayments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleFilterChange = (status: FilterStatus) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

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

      {/* REPAYMENT TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b px-5 py-5">
          <div className="flex items-center gap-2">
            <ReceiptText
              size={20}
              className="text-gray-700"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              Repayment History
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            View and track all loan repayment installments.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-4 border-b p-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  handleFilterChange(filter.value)
                }
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

          {/* SEARCH */}
          {/* <div className="relative w-full sm:max-w-sm"> */}
            {/* <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            /> */}

            {/* <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearchChange(e.target.value)
              }
              placeholder="Search repayment, loan or user ID..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400"
            /> */}
          {/* </div> */}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Repayment ID
                </th>
                {/* <th className="px-5 py-4 font-semibold">
                  Loan ID
                </th> */}
                <th className="px-5 py-4 font-semibold">
                  Due Date
                </th>
                <th className="px-5 py-4 font-semibold">
                  Amount
                </th>
                <th className="px-5 py-4 font-semibold">
                  Accrued Amount
                </th>
                <th className="px-5 py-4 font-semibold">
                  Total Due
                </th>
                <th className="px-5 py-4 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedRepayments.length > 0 ? (
                paginatedRepayments.map((repayment) => (
                  <tr
                    key={repayment._id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                          <CreditCard
                            size={17}
                            className="text-gray-600"
                          />
                        </div>

                        <span
                          title={repayment.repaymentId}
                          className="max-w-[160px] truncate font-medium text-gray-900"
                        >
                          {repayment.repaymentId}
                        </span>
                      </div>
                    </td>

                    {/* <td className="px-5 py-4">
                      <span
                        title={repayment.loanId}
                        className="block max-w-[130px] truncate text-gray-600"
                      >
                        {repayment.loanId}
                      </span>
                    </td> */}

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {formatDate(repayment.dueDate)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                      {formatCurrency(repayment.amount)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {formatCurrency(
                        repayment.accruedAmount
                      )}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                      {formatCurrency(
                        repayment.amount +
                          repayment.accruedAmount
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge
                        status={repayment.status}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <ReceiptText
                        size={36}
                        className="text-gray-300"
                      />

                      <p className="font-medium text-gray-700">
                        No repayments found
                      </p>

                      <p className="text-sm text-gray-400">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {filteredRepayments.length > 0 && (
          <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {(page - 1) * pageSize + 1}
              </span>
              {" - "}
              <span className="font-medium text-gray-900">
                {Math.min(
                  page * pageSize,
                  filteredRepayments.length
                )}
              </span>
              {" of "}
              <span className="font-medium text-gray-900">
                {filteredRepayments.length}
              </span>
              {" repayments"}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => Math.max(1, prev - 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="px-3 text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((prev) =>
                    Math.min(totalPages, prev + 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default LoanRepayment;
