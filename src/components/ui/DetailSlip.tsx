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
  className?: string
};

const DetailedSlip: React.FC<DetailedSplitProps> = ({
  title,
  items,
  currencySymbol ,
  className
}) => {
  return (
    <div className={cn('gap-2', className)}>
      <Typography color="primary" weight="semibold">
        {title}
      </Typography>

      {items.map((item) => (
        <Flex className="justify-between" key={item.title}>
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
