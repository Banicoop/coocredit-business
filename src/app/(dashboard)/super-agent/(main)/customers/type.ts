import { ReactNode } from "react";

export type CapitalAllocationProps = {
  title: string;
  items: {
    label: string;
    className: string
    val: number;
  }[];
};

export type FinCardsProps = {
  title: string;
  actions: {
    label: string;
    icon: ReactNode;
    onClick?: () => void;
  }[];
};


export type CardProps = {
  label: string;
  isUploaded?: boolean;
  onUpload?: (file: File) => void;
};
