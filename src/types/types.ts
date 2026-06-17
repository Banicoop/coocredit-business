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
    stage: string
}


export interface CardWidgetProps {
  icon: React.ReactNode, 
  label: string, 
  info?: React.ReactNode, 
  num: string
}