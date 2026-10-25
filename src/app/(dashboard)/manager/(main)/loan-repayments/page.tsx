
"use client";

import { useState } from "react";
import {
  Search,
  RefreshCw,
  CalendarDays,
  Wallet,
  CircleCheck,
  Clock3,
  Banknote,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
} from "lucide-react";

import { Grid } from "@/components/ui/ui-layout";
import { useGetDailyRepayment } from "@/lib/hooks/useLoans";
import { LoanRepayment, RepaymentListingResponse, RepaymentQuery, RepaymentSortBy, RepaymentStatus, RepaymentTimeframe, SortOrder } from "@/types/domains/loan.types";

// import type {
//   RepaymentQuery,
//   RepaymentTimeframe,
//   RepaymentStatus,
//   RepaymentSortBy,
//   SortOrder,
// } from "@/types/repayment.types";

// import type {
//   LoanRepayment,
//   RepaymentListingResponse,
// } from "@/types/loan-repayments.types";

// ---------- Helpers ----------

const formatMoney = (value?: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value ?? 0);

const formatDate = (date?: string | null) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(parsed);
};

const getCustomerName = (item: LoanRepayment) => {
  const name = [
    item.user?.firstName,
    item.user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    name ||
    item.applicant?.walletName ||
    item.applicant?.username ||
    "Unknown Customer"
  );
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "U";

const getAgentName = (item: LoanRepayment) => {
  const name = [
    item.agent?.firstName,
    item.agent?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return name || "Unassigned";
};

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  late: "bg-red-50 text-red-700",
  partially_paid: "bg-blue-50 text-blue-700",
};

const formatStatus = (status: string) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (c) =>
    c.toUpperCase()
  );

// ---------- Summary Card ----------

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  description,
}: SummaryCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="mt-2 break-words text-xl font-bold text-slate-900">
          {value}
        </h3>
      </div>

      <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
        {icon}
      </div>
    </div>

    {description && (
      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    )}
  </div>
);

// ---------- Main Component ----------

const LoanRepayments = () => {
  const [filters, setFilters] = useState<RepaymentQuery>({
    timeframe: "today",
    status: "all",
    page: 1,
    limit: 50,
  });

  const [searchInput, setSearchInput] = useState("");

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetDailyRepayment(filters);

  const response = data as
    | RepaymentListingResponse
    | undefined;

  const repayments = response?.data?.repayments ?? [];
  const summary = response?.data?.summary;
  const pagination = response?.pagination;

  // ---------- Filter Handlers ----------

  const updateFilter = <K extends keyof RepaymentQuery>(
    key: K,
    value: RepaymentQuery[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handleTimeframeChange = (
    timeframe: RepaymentTimeframe
  ) => {
    setFilters((prev) => ({
      ...prev,
      timeframe,
      startDate: undefined,
      endDate: undefined,
      page: 1,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    updateFilter("search", searchInput.trim());
  };

  const resetFilters = () => {
    setSearchInput("");
    setFilters({
      timeframe: "today",
      status: "all",
      page: 1,
      limit: 50,
    });
  };

  const handlePageChange = (page: number) => {
    if (!pagination) return;

    if (page < 1 || page > pagination.totalPages) return;

    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSort = (field: RepaymentSortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc"
          ? "desc"
          : "asc",
      page: 1,
    }));
  };

  const isCustom = filters.timeframe === "custom";

  return (
    <Grid className="gap-6 p-4 lg:p-6">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Loan Repayments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor repayments, collections and outstanding balances.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={isFetching ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Total Due"
          value={formatMoney(summary?.totalDueAmount)}
          icon={<Wallet size={20} />}
          description="Total repayment amount due"
        />

        <SummaryCard
          title="Total Collected"
          value={formatMoney(summary?.totalCollectedAmount)}
          icon={<CircleCheck size={20} />}
          description="Amount received"
        />

        <SummaryCard
          title="Pending Amount"
          value={formatMoney(summary?.totalPendingAmount)}
          icon={<Clock3 size={20} />}
          description="Outstanding collections"
        />

        <SummaryCard
          title="Total Repayments"
          value={summary?.totalCount ?? 0}
          icon={<Banknote size={20} />}
          description="Repayment records"
        />

        <SummaryCard
          title="Paid Repayments"
          value={summary?.paidCount ?? 0}
          icon={<CircleCheck size={20} />}
          description="Completed repayments"
        />

        <SummaryCard
          title="Pending Repayments"
          value={summary?.pendingCount ?? 0}
          icon={<Clock3 size={20} />}
          description="Awaiting payment"
        />
      </div>

      {/* Filters */}
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">
            Filter Repayments
          </h2>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
          >
            <X size={14} />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Timeframe */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Timeframe
            </label>

            <select
              value={filters.timeframe ?? "today"}
              onChange={(e) =>
                handleTimeframeChange(
                  e.target.value as RepaymentTimeframe
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Status
            </label>

            <select
              value={filters.status ?? "all"}
              onChange={(e) =>
                updateFilter(
                  "status",
                  e.target.value as RepaymentStatus
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="late">Late</option>
              <option value="partially_paid">
                Partially Paid
              </option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Sort By
            </label>

            <select
              value={filters.sortBy ?? "dueDate"}
              onChange={(e) =>
                updateFilter(
                  "sortBy",
                  e.target.value as RepaymentSortBy
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="dueDate">Due Date</option>
              <option value="amount">Amount</option>
              <option value="status">Status</option>
              <option value="paidAt">Payment Date</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Sort Order
            </label>

            <select
              value={filters.sortOrder ?? "desc"}
              onChange={(e) =>
                updateFilter(
                  "sortOrder",
                  e.target.value as SortOrder
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {/* Custom Dates */}
        {isCustom && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Start Date
              </label>

              <input
                type="date"
                value={filters.startDate ?? ""}
                max={filters.endDate || undefined}
                onChange={(e) =>
                  updateFilter("startDate", e.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                End Date
              </label>

              <input
                type="date"
                value={filters.endDate ?? ""}
                min={filters.startDate || undefined}
                onChange={(e) =>
                  updateFilter("endDate", e.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
              />
            </div>
          </div>
        )}

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search customer, phone number or repayment ID..."
              className="h-10 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm"
            />
          </div>

          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-5 text-sm font-medium text-white"
          >
            Search
          </button>
        </form>
      </section>

      {/* Repayment Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Repayment Records
            </h2>

            <p className="text-sm text-slate-500">
              {pagination?.totalCount ?? 0} records found
            </p>
          </div>

          {isFetching && !isPending && (
            <span className="text-xs text-slate-500">
              Updating...
            </span>
          )}
        </div>

        {isPending ? (
          <div className="flex h-60 items-center justify-center">
            <RefreshCw
              size={24}
              className="animate-spin text-primary"
            />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <AlertCircle size={32} className="text-red-500" />

            <p className="text-sm text-red-600">
              {error?.message ?? "Failed to load repayments"}
            </p>

            <button
              onClick={() => refetch()}
              className="text-sm font-medium text-primary"
            >
              Try Again
            </button>
          </div>
        ) : repayments.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <CalendarDays
              size={36}
              className="text-slate-300"
            />

            <p className="font-medium text-slate-700">
              No repayments found
            </p>

            <p className="text-sm text-slate-500">
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  {/* <th className="px-4 py-3">Repayment ID</th> */}
                  <th className="px-4 py-3">Loan Amount</th>

                  <th className="px-4 py-3">
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center gap-1"
                    >
                      Amount Due
                      <ArrowUpDown size={13} />
                    </button>
                  </th>

                  <th className="px-4 py-3">Amount Paid</th>
                  <th className="px-4 py-3">Balance</th>

                  <th className="px-4 py-3">
                    <button
                      onClick={() => handleSort("dueDate")}
                      className="flex items-center gap-1"
                    >
                      Due Date
                      <ArrowUpDown size={13} />
                    </button>
                  </th>

                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {repayments.map((item) => {
                  const name = getCustomerName(item);

                  const balance = Math.max(
                    0,
                    item.amount - item.paidAmount
                  );

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/70"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {getInitials(name)}
                          </div>

                          <div>
                            <p className="font-medium text-slate-900">
                              {name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {item.user?.phoneNumber ||
                                item.applicant?.phoneNumber ||
                                "—"}
                            </p>
                          </div>
                        </div>
                      </td>


                      <td className="px-4 py-4">
                        {formatMoney(item.loan?.totalAmount)}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        {formatMoney(item.amount)}
                      </td>

                      <td className="px-4 py-4 text-emerald-700">
                        {formatMoney(item.paidAmount)}
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-700">
                        {formatMoney(balance)}
                      </td>

                      <td className="px-4 py-4">
                        {formatDate(item.dueDate)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyles[item.status] ??
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {formatStatus(item.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalCount > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              {(pagination.page - 1) * pagination.limit + 1}
              {" - "}
              {Math.min(
                pagination.page * pagination.limit,
                pagination.totalCount
              )}{" "}
              of {pagination.totalCount}
            </p>

            <div className="flex items-center gap-3">
              <button
                disabled={
                  !pagination.hasPrevPage || isFetching
                }
                onClick={() =>
                  handlePageChange(pagination.page - 1)
                }
                className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm">
                Page {pagination.page} of{" "}
                {pagination.totalPages}
              </span>

              <button
                disabled={
                  !pagination.hasNextPage || isFetching
                }
                onClick={() =>
                  handlePageChange(pagination.page + 1)
                }
                className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>
    </Grid>
  );
};

export default LoanRepayments;
