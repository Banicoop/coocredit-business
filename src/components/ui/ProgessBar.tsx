type ProgressBarProps = {
  value: number;
  className: string;
  className2?: string;
};

export const ProgressBar = ({ value, className, className2='bg-gray-200' }: ProgressBarProps) => {
  return (
    <div
      className={`w-full rounded-full h-2 ${className2}`}
      aria-label="Score progress"
    >
      <div
        className={`h-2 rounded-full transition-all duration-500 ${className}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
