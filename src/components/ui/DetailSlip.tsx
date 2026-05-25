import React from 'react';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';

type SplitItem = {
  title: string;
  val: number | string;
};

type DetailedSplitProps = {
  title: string;
  items: SplitItem[];
  currencySymbol?: string;
};

const DetailedSlip: React.FC<DetailedSplitProps> = ({
  title,
  items,
  currencySymbol ,
}) => {
  return (
    <div className='gap-2'>
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
