
export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border shadow-sm">
    <div className="border-b px-6 py-4">
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>

    <div className="p-6 space-y-4">{children}</div>
  </div>
);

export const Item = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between gap-4 border-b last:border-0 pb-3">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

export const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div className="bg-white border rounded-xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>

    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

export const Badge = ({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  const colors = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    emerald: "bg-emerald-100 text-emerald-700",
  } as any;

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${colors[color]}`}
    >
      {children}
    </span>
  );
};