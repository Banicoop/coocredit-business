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
