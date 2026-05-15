type ProgressBarProps = {
  value: number;
  className: string;
};

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div
      className="w-full bg-gray-200 rounded-full h-2"
      aria-label="Score progress"
    >
      <div
        className={`h-2 rounded-full transition-all duration-500 ${className}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};