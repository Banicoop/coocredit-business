type ProgressBarProps = {
  value: number;
};

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div
      className="w-full bg-gray-200 rounded-full h-2"
      aria-label="Score progress"
    >
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};