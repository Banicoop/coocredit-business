export type Path = {
  num: string;
  title: string;
  role: string;
  desc: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
};

export interface UIProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}


export interface PipeLineProps {
    className: string
    num: number
    numClassName: string
    label: string
    last?: boolean
    lastClassName?: string
    stage?: string
}


export interface CardWidgetProps {
  icon: React.ReactNode;
  label: string;
  info?: React.ReactNode;
  others?: React.ReactNode;
  num: string
}

export interface ActivityCardProps {
    title: string;
    description: string;
    time: string;
    icon?: React.ReactNode;
}

export interface LoanOfficerCardWidgetProps {
    icon: React.ReactNode;
    percent: number | React.ReactNode;
    title: string;
    amount: number | string;
    desc: string | React.ReactNode;
    isNegative?: boolean;
    suffix?: boolean;
    className?: string
}