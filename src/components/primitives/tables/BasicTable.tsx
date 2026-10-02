'use client';

import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type TableColumn<T> = {
  key: keyof T | string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
};

export interface PaginationMeta {
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export type BasicTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  title?: React.ReactNode;
  description?: string;
  loading?: boolean;
  error?: string;
  errorMessage?: string | null;
  pagination?: boolean;
  pageSize?: number;

  /** Pass when pagination is handled by the backend. */
  paginationMeta?: PaginationMeta;

  /**
   * Called when the user clicks next/previous in server-pagination mode.
   * The parent decides what happens (update URL, refetch, etc.).
   */
  onPageChange?: (page: number, size: number) => void;

  emptyMessage?: string;
  className?: string;
  renderRow?: (
    row: T,
    index: number,
    columns: TableColumn<T>[],
  ) => React.ReactNode;
};

export function BasicTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  description,
  error,
  errorMessage = 'Something went wrong. Please try again later.',
  loading = false,
  pagination = true,
  pageSize = 10,
  paginationMeta,
  onPageChange,
  emptyMessage = 'No data available.',
  className,
  renderRow,
}: BasicTableProps<T>) {
  const [localPage, setLocalPage] = React.useState(1);

  const isServerPagination = Boolean(paginationMeta);

  const currentPage = isServerPagination ? paginationMeta!.page : localPage;
  const effectivePageSize = isServerPagination ? paginationMeta!.size : pageSize;
  const totalPages = isServerPagination
    ? paginationMeta!.totalPages
    : Math.ceil(data.length / effectivePageSize);
  const totalItems = isServerPagination ? paginationMeta!.total : data.length;

  const paginatedData =
    pagination && !isServerPagination
      ? data.slice(
          (localPage - 1) * effectivePageSize,
          localPage * effectivePageSize,
        )
      : data;

  const goToPage = (newPage: number) => {
    if (isServerPagination) {
      if (process.env.NODE_ENV !== 'production' && !onPageChange) {
        console.warn(
          'BasicTable: paginationMeta was provided without onPageChange. Page buttons will do nothing.',
        );
      }
      onPageChange?.(newPage, effectivePageSize);
      return;
    }
    setLocalPage(newPage);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;
    goToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;
    goToPage(currentPage + 1);
  };

  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * effectivePageSize + 1;
  const endItem = Math.min(currentPage * effectivePageSize, totalItems);

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm',
        className,
      )}
    >
      {(title || description) && (
        <div className="border-b border-gray-100 px-6 py-5">
          {title && (
            <div className="text-lg font-semibold text-gray-900">
              {title}
            </div>
          )}

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}

      <ScrollArea.Root className="w-full overflow-hidden">
        <ScrollArea.Viewport className="w-full">
          <div className="min-w-100">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      style={{
                        width: column.width,
                      }}
                      className={clsx(
                        'border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700',
                        {
                          'text-left':
                            column.align ===
                              'left' ||
                            !column.align,
                          'text-center':
                            column.align ===
                            'center',
                          'text-right':
                            column.align ===
                            'right',
                        },
                      )}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {error ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-sm text-destructive"
                    >
                      {error ||
                        errorMessage}
                    </td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-sm text-gray-500"
                    >
                      Loading table data...
                    </td>
                  </tr>
                ) : paginatedData.length >
                  0 ? (
                  paginatedData.map(
                    (row, rowIndex) => {
                      if (renderRow) {
                        return (
                          <React.Fragment
                            key={
                              row._id ??
                              row.id ??
                              rowIndex
                            }
                          >
                            {renderRow(
                              row,
                              rowIndex,
                              columns,
                            )}
                          </React.Fragment>
                        );
                      }

                      return (
                        <tr
                          key={
                            row._id ??
                            row.id ??
                            rowIndex
                          }
                          className="transition hover:bg-gray-50"
                        >
                          {columns.map(
                            (column) => {
                              const value =
                                row[
                                  column.key as keyof T
                                ];

                              return (
                                <td
                                  key={String(
                                    column.key,
                                  )}
                                  className={clsx(
                                    'border-b border-gray-100 px-6 py-4 text-sm text-gray-700',
                                    {
                                      'text-left':
                                        column.align ===
                                          'left' ||
                                        !column.align,
                                      'text-center':
                                        column.align ===
                                        'center',
                                      'text-right':
                                        column.align ===
                                        'right',
                                    },
                                  )}
                                >
                                  {column.render
                                    ? column.render(
                                        value,
                                        row,
                                        rowIndex,
                                      )
                                    : value}
                                </td>
                              );
                            },
                          )}
                        </tr>
                      );
                    },
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-sm text-gray-500"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb className="bg-gray-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div>
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-medium text-gray-700">
                {startItem}
              </span>{' '}
              -{' '}
              <span className="font-medium text-gray-700">
                {endItem}
              </span>{' '}
              of{' '}
              <span className="font-medium text-gray-700">
                {totalItems.toLocaleString()}
              </span>
            </p>

            <p className="mt-0.5 text-xs text-gray-400">
              Page {currentPage} of{' '}
              {totalPages}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={
                currentPage <= 1 ||
                loading
              }
              onClick={
                handlePreviousPage
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              disabled={
                currentPage >= totalPages ||
                loading
              }
              onClick={handleNextPage}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
