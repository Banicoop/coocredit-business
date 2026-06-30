export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  token?: string;
  tags?: string[];         // Next.js cache tags for revalidation
  cache?: RequestCache;
  revalidate?: number;     // Next.js ISR revalidation in seconds
}

export interface ApiResponse<TData> {
  data: TData | null;
  error: string | null;
  status: number;
}


export type Path = {
  num: string;
  title: string;
  role: string;
  desc: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
  href: string;
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
  num: string;
  className?: string
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

