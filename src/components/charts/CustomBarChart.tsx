'use client';

import React, { ReactNode } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import clsx from 'clsx';
import { GridItem } from '../ui/ui-layout';
import { TypedDataKey } from 'recharts/types/util/typedDataKey';

type BarConfig<T> = {
  dataKey: TypedDataKey<T, any> | undefined
  label?: string;
  color?: string;
  stackId?: string;
  radius?: number | [number, number, number, number];
  hide?: boolean;
};

type CustomBarChartProps<T> = {
  data: T[];
  bars: BarConfig<T>[];

  title?: ReactNode;
  className?: string;

  /**
   * Axis
   */
  xDataKey: TypedDataKey<T, any> | undefined;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;

  /**
   * Dimensions
   */
  height?: number;

  /**
   * Styling
   */
  gridColor?: string;
  barSize?: number;

  /**
   * Optional custom colors per data item
   */
  dynamicBarColors?: string[];
};

export function CustomBarChart<T extends Record<string, any>>({
  data,
  bars,

  title,
  className,

  xDataKey,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,

  height = 350,

  gridColor = '#E5E7EB',
  barSize = 30,

  dynamicBarColors,
}: CustomBarChartProps<T>) {
  return (
    <GridItem className={clsx('gap-5 w-full', className)}>
      {title && (
        <div className="flex items-center justify-between">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-semibold">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}

      <div className="w-full h-full min-h-[250px]">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
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

            {showXAxis && ( 
              <XAxis
                dataKey={xDataKey}
                tickLine={false}
                axisLine={false}
              />)
            }

            {showYAxis && (
              <YAxis
                tickLine={false}
                axisLine={false}
                width={40}
              />
            )}
            {showTooltip && <Tooltip />}

            {showLegend && <Legend />}

            {bars.map((bar, index) => (
              <Bar
                key={`${String(bar.dataKey)}-${index}`}
                dataKey={bar.dataKey}
                name={bar.label}
                fill={bar.color || '#2563EB'}
                stackId={bar.stackId}
                radius={bar.radius || [8, 8, 0, 0]}
                hide={bar.hide}
                barSize={barSize}
              >

              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GridItem>
  );
}