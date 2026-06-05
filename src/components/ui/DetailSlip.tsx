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
  titleTextClass?: string;
  textClass1?: string;
  textClass2?: string;
};

const DetailedSlip: React.FC<DetailedSplitProps> = ({
  title,
  items,
  titleTextClass,
  textClass1,
  textClass2,
  currencySymbol ,
  className,
  className1
}) => {
  return (
    <div className={cn('gap-4', className)}>
      <Typography color="primary" weight="semibold" className={cn(titleTextClass)}>
        {title}
      </Typography>

      {items.map((item) => (
        <Flex className={cn("justify-between", className1)} key={item.title}>
          <Typography color="primary" className={cn(textClass1)}>{item.title}</Typography>
          <Typography weight="semibold" className={cn(textClass2)}>
            {currencySymbol}
            {item.val}
          </Typography>
        </Flex>
      ))}
    </div>
  );
};

export default DetailedSlip;
