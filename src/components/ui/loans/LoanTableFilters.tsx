'use client';

import Button from '@/components/primitives/buttons/Button';
import { TextField } from '@/components/primitives/inputs/TextField';
import { LoanFilters, LoanStatus } from '@/types/domains/loan.types';
import { Search, RotateCcw } from 'lucide-react';


interface LoanTableFiltersProps {
  filters: LoanFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LoanStatus | 'all') => void;
  onDateChange: (
    field: 'startDate' | 'endDate',
    value: string
  ) => void;
  onResetFilters: () => void;
}

const LoanTableFilters = ({
  filters,
  onSearchChange,
  onStatusChange,
  onDateChange,
  onResetFilters,
}: LoanTableFiltersProps) => {
  const hasFilters =
    !!filters.search ||
    filters.status !== 'all' ||
    !!filters.startDate ||
    !!filters.endDate;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="w-full lg:flex-1">
          <TextField
            variant="secondary"
            placeholder="Search loans, applicants and keywords"
            wrapperClassName="w-full"
            startIcon={<Search size={18} />}
            value={filters.search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as LoanStatus | 'all'
            )
          }
          className="h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none focus:border-primary"
        >
          <option value="all">All Statuses</option>
          <option value="disbursed-bank">Disbursed</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5 text-sm text-gray-600">
          Start Date
          <input
            type="date"
            value={filters.startDate}
            max={filters.endDate || undefined}
            onChange={(e) =>
              onDateChange('startDate', e.target.value)
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 outline-none"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-gray-600">
          End Date
          <input
            type="date"
            value={filters.endDate}
            min={filters.startDate || undefined}
            onChange={(e) =>
              onDateChange('endDate', e.target.value)
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 outline-none"
          />
        </label>

        {hasFilters && (
          <Button
            variant="secondary"
            onClick={onResetFilters}
            startIcon={<RotateCcw size={16} />}
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoanTableFilters;
