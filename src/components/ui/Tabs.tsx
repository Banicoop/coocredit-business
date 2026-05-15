'use client';

import { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TabItem = {
  label: string;
  value: string;
  count?: number;
};

type TabsContextType = {
  active: string;
  setActive: (val: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within <Tabs />');
  return context;
};

type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  className?: string;
};

export const Tabs = ({
  items,
  value,
  defaultValue,
  onChange,
  className,
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || items[0]?.value);

  const isControlled = value !== undefined;
  const active = isControlled ? value! : internalValue;

  const setActive = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn('relative flex gap-2 bg-[#E2E8F080] p-1 rounded-md w-fit', className)}>
        
        {/* Animated background */}
        {items.map((item) =>
          active === item.value ? (
            <motion.div
              key={item.value}
              layoutId="activeTab"
              className="absolute inset-1 rounded-md shadow-sm"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
          ) : null
        )}

        {items.map((item) => (
          <Tab key={item.value} item={item} />
        ))}
      </div>
    </TabsContext.Provider>
  );
};

type TabProps = {
  item: TabItem;
};

const Tab = ({ item }: TabProps) => {
  const { active, setActive } = useTabs();
  const isActive = active === item.value;

  return (
    <button
      onClick={() => setActive(item.value)}
      className={cn(
        'relative z-10 flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer',
        isActive
          ? 'text-[#136DEC] bg-white'
          : 'text-[#475569] hover:text-black'
      )}
    >
      <span>{item.label}</span>

      {item.count !== undefined && (
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full transition-all',
            isActive
              ? 'bg-[#136DEC]/10 text-[#136DEC]'
              : 'bg-gray-200 text-gray-600'
          )}
        >
          {item.count}
        </span>
      )}
    </button>
  );
};