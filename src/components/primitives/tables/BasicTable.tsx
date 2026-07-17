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

  // Render only a cell
  render?: (
    value: any,
    row: T,
    index: number,
  ) => React.ReactNode;
};

export type BasicTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];

  title?: React.ReactNode;
  description?: string;

  loading?: boolean;
  error?: string;
  errorMessage? : string | null

  pagination?: boolean;
  pageSize?: number;

  emptyMessage?: string;

  className?: string;

  /**
   * Render an entire row manually
   * If provided, it overrides the default row rendering
   */
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
  emptyMessage = 'No data available.',
  className,
  renderRow,
}: BasicTableProps<T>) {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = pagination
    ? data.slice((page - 1) * pageSize, page * pageSize)
    : data;

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
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
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
                      style={{ width: column.width }}
                      className={clsx(
                        'border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700',
                        {
                          'text-left':
                            column.align === 'left' || !column.align,
                          'text-center': column.align === 'center',
                          'text-right': column.align === 'right',
                        },
                      )}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                { error ? (
                    <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-sm text-destructive"
                    >
                     {error}
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
                ) :paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => {
                    // CUSTOM ROW RENDERING
                    if (renderRow) {
                      return (
                        <React.Fragment key={rowIndex}>
                          {renderRow(row, rowIndex, columns)}
                        </React.Fragment>
                      );
                    }

                    // DEFAULT ROW RENDERING
                    return (
                      <tr
                        key={rowIndex}
                        className="transition hover:bg-gray-50"
                      >
                        {columns.map((column) => {
                          const value = row[column.key as keyof T];

                          return (
                            <td
                              key={String(column.key)}
                              className={clsx(
                                'border-b border-gray-100 px-6 py-4 text-sm text-gray-700',
                                {
                                  'text-left':
                                    column.align === 'left' ||
                                    !column.align,
                                  'text-center':
                                    column.align === 'center',
                                  'text-right':
                                    column.align === 'right',
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
                        })}
                      </tr>
                    );
                  })
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
          <p className="text-sm text-gray-500">
            Page{' '}
            <span className="font-medium text-gray-700">
              {page}
            </span>{' '}
            of{' '}
            <span className="font-medium text-gray-700">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

