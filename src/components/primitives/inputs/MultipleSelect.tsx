'use client';

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Command } from "cmdk"; // or your shadcn Command wrapper

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  values?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function MultiSelect({
  options,
  values = [],
  onChange,
  placeholder = "Select options",
  label,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(values);

  const toggleSelect = (value: string) => {
    let updated: string[];

    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }

    setSelected(updated);
    onChange?.(updated);
  };

  const removeTag = (value: string) => {
    const updated = selected.filter((v) => v !== value);
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-1">{label}</label>}

      <Popover.Root open={open} onOpenChange={setOpen}>
        {/* Trigger */}
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`w-full border rounded-lg px-3 py-2 flex items-center justify-between ${className}`}
          >
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selected.map((value) => {
                  const option = options.find((o) => o.value === value);
                  return (
                    <span
                      key={value}
                      className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      {option?.label}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTag(value);
                        }}
                        className="cursor-pointer"
                      >
                        <X size={14} />
                      </span>
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}

            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </button>
        </Popover.Trigger>

        {/* Content */}
        <Popover.Content
          align="start"
          className="w-[var(--radix-popover-trigger-width)] bg-white border rounded-lg shadow-md p-0 z-50"
        >
          <Command>
            {/* Search */}
            <Command.Input
              placeholder="Search..."
              className="w-full px-3 py-2 border-b outline-none"
            />

            <Command.List className="max-h-60 overflow-y-auto">
              <Command.Empty className="p-3 text-sm text-gray-500">
                No results found.
              </Command.Empty>

              {options.map((option) => {
                const isSelected = selected.includes(option.value);

                return (
                  <Command.Item
                    key={option.value}
                    onSelect={() => toggleSelect(option.value)}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span>{option.label}</span>

                    {isSelected && <Check className="h-4 w-4" />}
                  </Command.Item>
                );
              })}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
