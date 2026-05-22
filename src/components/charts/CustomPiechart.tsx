'use client';

import { Label, Pie, PieChart, Tooltip, TooltipIndex } from 'recharts';
import { GridItem } from '../ui/ui-layout';
import { ReactNode } from 'react';


export default function CustomPieChart({
  isAnimationActive = true,
  defaultIndex,
  data,
  label,
  title,
  footer
}: {
    isAnimationActive?: boolean;  
    defaultIndex?: TooltipIndex;
    data: any[];
    label?: any;
    title?: ReactNode;
    footer?: ReactNode;
}) {


  return (
    <GridItem>
        {title && <h3>{title}</h3>}
        <PieChart
        style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
        responsive
        >
        <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            isAnimationActive={isAnimationActive}
            />
        <Label position='center' fill="#e24eee">
            {label}
        </Label>
        <Tooltip defaultIndex={defaultIndex} />
        </PieChart>
        {footer && <footer>{footer}</footer>}
    </GridItem>
  );
}
