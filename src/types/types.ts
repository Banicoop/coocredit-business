export type Role = 'field_agent' | 'super_agent' | 'loan_officer' | 'manager' | 'super_admin';


export interface IDParam {
  params: Promise<{
    id: string;
  }>;
}


export type UserData = {
    _id: string;
    agentId?: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: Role;
    availableBalance: number;
    emailVerified: boolean;
    kycLevel: number;
    country: string;
    kycDocuments: any[];
    phoneNumber: string;
    phoneVerified: boolean;
    identityScore: number
}


export type User = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  status: string;
  message: string;
  statusCode: number;
  user: UserData;
  agentId?: string;
};


export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  token?: string;
  tags?: string[];         // Next.js cache tags for revalidation
  cache?: RequestCache;
  timeout?: number;         // Timeout in milliseconds
  query?: Record<string, string | number | boolean | undefined | null>; // Query parameters
  signal?: AbortSignal;    // For request cancellation
  revalidate?: number;     // Next.js ISR revalidation in seconds
}

export interface ApiResponse<TData> {
  data: TData | null;
  error: string | null;
  status: number;
  headers: Headers;
}

export interface LoginPayload {
  email: string;
  password: string;
}


export interface otpPayload {
  otp: string;
  adminId: string;
}

// Agents only
export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: UserData
    accessToken: string;
    refreshToken: string;
  };
  agentId?: string;
}


// Matches your actual API envelope for admin
export interface LoginResponseEnvelope {
  success: boolean;
  status: string;
  message: string;
  statusCode: number;
  data: {
    user: {
      id: string;
      email: string;
    };
    otp?: string; 
  };
  timeStamp: string;
}

// Matches your actual API envelope
export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: {
    user: UserData;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ActionState<T = unknown> {
  success: boolean;
  message?: string | null;
  error?: string | null;
  data?: T;
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

