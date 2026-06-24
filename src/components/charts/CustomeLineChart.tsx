'use client';

import { ReactNode } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { GridItem } from '../ui/ui-layout';
import { cn } from '@/lib/utils';
import { TypedDataKey } from 'recharts/types/util/typedDataKey';

type LineConfig<T> = {
  dataKey: TypedDataKey<T, string> | undefined;
  label?: string;
  color?: string;
  strokeWidth?: number;
  type?: 'linear' | 'monotone' | 'step' | 'basis' | 'natural';
  dot?: boolean;
};

type CustomLineChartProps<T> = {
  data: T[];
  title?: ReactNode;
  className?: string;

  xDataKey: TypedDataKey<T, string> | undefined;
  lines: LineConfig<T>[];

  height?: number;

  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  footer?: ReactNode
  gridColor?: string;
};

export function CustomLineChart<T extends Record<string, any>>({
    data,
    title,
    className,
    xDataKey,
    lines,

    height = 350,

    showGrid = true,
    showLegend = true,
    showTooltip = true,
    showXAxis = true,
    showYAxis = true,
    footer,
    gridColor = '#E5E7EB',
}: CustomLineChartProps<T>) {
  return (
    <GridItem className={cn('gap-5 w-full', className)}>
      {title && (
        <div className="flex items-center justify-between">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-semibold">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}

      <div className="w-full">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
            )}

            <XAxis
              dataKey={xDataKey}
              hide={!showXAxis}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              hide={!showYAxis}
              tickLine={false}
              axisLine={false}
            />

            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}

            {lines.map((line, index) => (
              <Line
                key={`${String(line.dataKey)}-${index}`}
                type={line.type || 'monotone'}
                dataKey={line.dataKey}
                name={line.label}
                stroke={line.color || '#2563EB'}
                strokeWidth={line.strokeWidth || 3}
                dot={line.dot ?? false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {footer && <footer>{footer}</footer>}
      </div>
    </GridItem>
  );
}

