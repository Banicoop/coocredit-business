import React from 'react';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';

type SplitItem = {
  title: string;
  val: number | string;
};

type DetailedSplitProps = {
  title: string;
  items: SplitItem[];
  currencySymbol?: string;
  className?: string;
  className1?: string
};

const DetailedSlip: React.FC<DetailedSplitProps> = ({
  title,
  items,
  currencySymbol ,
  className,
  className1
}) => {
  return (
    <div className={cn('gap-4', className)}>
      <Typography color="primary" weight="semibold">
        {title}
      </Typography>

      {items.map((item) => (
        <Flex className={cn("justify-between", className1)} key={item.title}>
          <Typography color="primary">{item.title}</Typography>
          <Typography weight="semibold">
            {currencySymbol}
            {item.val}
          </Typography>
        </Flex>
      ))}
    </div>
  );
};

export default DetailedSlip;
