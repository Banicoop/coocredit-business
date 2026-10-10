"use client";

import { useState } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { CalendarDays, RotateCcw, Search } from "lucide-react";

type TransactionType = "business" | "all";

interface TransactionStatsFilterProps {
  filters: {
    startDate?: string;
    endDate?: string;
    type?: TransactionType;
  };
}

const TransactionStatsFilter = ({
  filters,
}: TransactionStatsFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    filters.startDate ?? ""
  );

  const [endDate, setEndDate] = useState(
    filters.endDate ?? ""
  );

  const [type, setType] = useState<TransactionType>(
    filters.type ?? "business"
  );

  const [isPending, setIsPending] = useState(false);

  const handleApplyFilters = () => {
    if (startDate && endDate && startDate > endDate) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (startDate) {
      params.set("startDate", startDate);
    } else {
      params.delete("startDate");
    }

    if (endDate) {
      params.set("endDate", endDate);
    } else {
      params.delete("endDate");
    }

    params.set("type", type);

    setIsPending(true);

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setType("business");

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("startDate");
    params.delete("endDate");
    params.delete("type");

    setIsPending(true);

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4">
      {/* Transaction Type */}
      <div className="flex min-w-40 flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Transaction Type
        </label>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as TransactionType)
          }
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="business">Business</option>
          <option value="all">All Transactions</option>
        </select>
      </div>

      {/* Start Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
          max={endDate || undefined}
          onChange={(e) => setStartDate(e.target.value)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          End Date
        </label>

        <input
          type="date"
          value={endDate}
          min={startDate || undefined}
          onChange={(e) => setEndDate(e.target.value)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleApplyFilters}
          disabled={isPending}
          className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          <Search size={16} />
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium hover:bg-accent"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default TransactionStatsFilter;

