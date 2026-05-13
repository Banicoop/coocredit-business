'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface ModalProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disableOutsideClick?: boolean;
}

const ModalRoot = ({
  trigger,
  children,
  open,
  onOpenChange,
  disableOutsideClick,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

        {/* Content */}
        <Dialog.Content
          onPointerDownOutside={(e) => {
            if (disableOutsideClick) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (disableOutsideClick) e.preventDefault();
          }}
          className={cn(
            "fixed z-50 top-1/2 left-1/2 w-[90%] max-w-lg",
            "-translate-x-1/2 -translate-y-1/2",
            "bg-white rounded-2xl shadow-xl",
            "p-6 flex flex-col gap-4",
            "max-h-[85vh] overflow-y-auto"
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};


// ================= SUBCOMPONENTS ================= //

const Header = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-1 relative">
      {title && (
        <Dialog.Title className="text-lg font-semibold text-gray-900">
          {title}
        </Dialog.Title>
      )}
      {description && (
        <Dialog.Description className="text-sm text-gray-500">
          {description}
        </Dialog.Description>
      )}

      {/* Close Button */}
      <Dialog.Close asChild>
        <button className="absolute top-0 right-0 p-1 rounded-md hover:bg-gray-100 transition">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </Dialog.Close>
    </div>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1">{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-end gap-2 pt-2 border-t">
      {children}
    </div>
  );
};


// ================= EXPORT ================= //

export const Modal = Object.assign(ModalRoot, {
  Header,
  Body,
  Footer,
});